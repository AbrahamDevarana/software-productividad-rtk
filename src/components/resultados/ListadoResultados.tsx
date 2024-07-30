import { OperativoProps, ResultadoClaveProps, TaskProps } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Checkbox, Collapse, CollapseProps, Input, Select, Spin,message } from "antd";
import Loading from "../antd/Loading";
import { useEffect, useMemo, useState } from "react";
import { createResultadoThunk, getResultadosThunk } from "@/redux/features/resultados/resultadosThunk";
import EmptyResultado from "./EmptyResultado";
import { TablaTask, taskResultadosHeader } from "../tasks";
import { columnsNames, columnsVisible } from "@/pages/Operativos/utils";


interface Props {
    currentOperativo: OperativoProps,
    isClosed: boolean
}
interface Options {
    responsables: string[];
    estatus: string[];
    prioridad: string[];
}

export default function ListadoResultados({ currentOperativo, isClosed }: Props) {
    const dispatch = useAppDispatch()
    const { isLoading, resultadosClave, isCreatingResultado } = useAppSelector(state => state.resultados)
    const [activeKeys, setActiveKeys] = useState<string[]>([])
    const [ sort, setSort ] = useState<string>('default')
    const [ filter, setFilter ] = useState<string>('')
    const [options, setOptions] = useState<Options>({
        responsables: [],
        estatus: [],
        prioridad: [],
    })

    const handleNuevoResultado = async () => {
        await dispatch(createResultadoThunk({operativoId: currentOperativo.id})).unwrap().then((data) => {
            message.success('Resultado creado correctamente')
            const element = document.getElementById(`resultado-${data.id}`)
            element?.classList.add('ant-collapse-item-active')
            element?.scrollIntoView({behavior: 'smooth'})
        
        }).catch((err) => {
            message.error('Hubo un error al crear el resultado')
        })
    }

    useEffect(() => {
        if (currentOperativo.id !== '') {
            dispatch(getResultadosThunk(currentOperativo.id))
        }
    }, [currentOperativo])


   const normalizeString = (str: string) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const filteredAndSortedResultados = useMemo(() => {
        let resultados = [...resultadosClave];
    
        if (filter) {
            const normalizedSearchTerm = normalizeString(filter.toLowerCase());
            resultados = resultados.filter(resultado =>
                normalizeString(resultado.nombre.toLowerCase()).includes(normalizedSearchTerm)
            );
        }
    
        if (sort) {
            resultados.sort((a, b) => {
                if (sort === 'alphabetic-asc') {
                    return a.nombre.localeCompare(b.nombre);
                } else if (sort === 'alphabetic-desc') {
                    return b.nombre.localeCompare(a.nombre);
                }
                return 0;
            });
        }
    
        return resultados;
    }, [resultadosClave, filter, sort]);

    const items: CollapseProps['items'] = useMemo(() => {
        return filteredAndSortedResultados?.map((resultado: ResultadoClaveProps, index: number) => ({
            key: resultado.id.toString(),
            label: taskResultadosHeader({resultado, isClosed, currentOperativo}),
            children: <TablaTask data={resultado} options={options} taskeableType='RESULTADO_CLAVE' columnsNames={columnsNames} columnsVisible={columnsVisible} isClosed={isClosed} />,
        }))        
    }, [filteredAndSortedResultados])

    if(isLoading) return ( <Loading /> )
    if(resultadosClave.length === 0) return ( <EmptyResultado handleCreate={handleNuevoResultado} /> )

    return (
        <>
            <div className="flex gap-x-5 max-w-5xl w-full ml-auto justify-end">
            <div style={{width: 180}}>
                <Checkbox 
                    checked={activeKeys.length !== 0}
                    onChange={e => setActiveKeys(e.target.checked ? resultadosClave.map(resultado => resultado.id.toString()) : [])}
                    indeterminate={activeKeys.length > 0 && activeKeys.length < resultadosClave?.length!}
                >
                    Mostrar Todos
                </Checkbox>
            </div>
                <Select placeholder="Ordenar por" className="w-[200px] text-devarana-graph" onChange={(value) => setSort(value)} value={sort}>
                    <Select.Option value="default"> <p className="text-devarana-graph"> Sin Ordenar </p></Select.Option>
                    <Select.Option value="alphabetic-asc"> <p className="text-devarana-graph"> Nombre: Ascendente </p></Select.Option>
                    <Select.Option value="alphabetic-desc"> <p className="text-devarana-graph"> Nombre: Descendente </p></Select.Option>
                </Select>
                <Input allowClear placeholder="Buscar Resultado Clave"   className="w-[300px]" onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <Collapse 
                activeKey={activeKeys}
                items={items}
                onChange={(key) => setActiveKeys(key as string[])}
                ghost
            />
            {
                isCreatingResultado && <div className="h-56 w-full relative flex items-center justify-center"><Spin size="large" /></div>
            }
        </>
    )

    
};
