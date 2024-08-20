import React, { useMemo, useState } from 'react'
import { useCreateHitoMutation, useDeleteHitoMutation, useDuplicateHitoMutation, useGetHitosQuery, useUpdateHitoMutation } from '@/redux/features/hitos/hitosThunk'
import { HitosProps, ProyectosProps, TaskProps } from '@/interfaces'
import { Checkbox, Collapse, CollapseProps, FloatButton, Input, Select } from 'antd'
import Loading from '@/components/antd/Loading'
import { Icon } from '@/components/Icon'
import { TablaTask } from '@/components/tasks/'
import { taskHitosHeader } from '@/components/tasks/TaskHitosHeader'
import { columnsVisible, columnsNames } from "@/pages/Proyectos/utils";
import { toast } from 'sonner'
interface TableProyectosProps {
    currentProyecto: ProyectosProps
    setSelectedTask: (task: TaskProps) => void
    selectedTask: TaskProps | null
}

interface Options {
    responsables: string[];
    estatus: string[];
    prioridad: string[];
}


export const ListadoProyectos = ({currentProyecto, selectedTask, setSelectedTask}: TableProyectosProps) => {
    
    const [ createHito, { isLoading: isCreatingHito, error: createHitoError }] = useCreateHitoMutation()
    const [ updateHito, { isLoading: isUpdatingHito, error: updateHitoError }] = useUpdateHitoMutation()
    const [ deleteHito, { isLoading: isDeletingHito, error: deleteHitoError }] = useDeleteHitoMutation()
    const [ dupeHito ] = useDuplicateHitoMutation()

    // Filtros
    const [activeKeys, setActiveKeys] = useState<string[]>([])
    const [ sort, setSort ] = useState<string>('default')
    const [search, setSearch] = useState<string>('')
    const [options, setOptions] = useState<Options>({
        responsables: [],
        estatus: [],
        prioridad: [],
    })
    
    const { data: hitos, isLoading} = useGetHitosQuery({proyectoId: currentProyecto.id})

    const handleChangeHito = async (hito: HitosProps, e: React.FocusEvent<HTMLInputElement, Element>) => {

        const { value } = e.target as HTMLInputElement

        if(value === hito.titulo) return
        if(value === '') return e.currentTarget.focus()
        if(!value) return e.currentTarget.focus()

        const query = {
            ...hito,
            titulo: value
        }

        toast.promise(updateHito(query).unwrap(), {
            loading: 'Actualizando hito...',
            success: 'Hito actualizado',
            error: 'Error al actualizar el hito'
        })
    };

    const handleCreateHito = async () => {
        
        const query = {
            proyectoId: currentProyecto.id,
        }

        toast.promise(createHito(query).unwrap(), {
            loading: 'Creando hito...',
            success: (data) => {
                const element = document.getElementById(`hitos-${data.id}`)
                if(element) element.scrollIntoView({ behavior: 'smooth', block: 'end' })
                if(element) element.classList.add('ant-collapse-item-active')
                    return 'Hito creado'
            },
            error: 'Error al crear el hito',
        })

    };

    const handleDeleteHito = async (hito: HitosProps) => {

        toast.promise(deleteHito({hitoId: hito.id, proyectoId: currentProyecto.id}).unwrap(), {
            loading: 'Eliminando hito...',
            success: 'Hito eliminado',
            error: 'Error al eliminar el hito',
        })

    }
    
    const handleChangeColor = (hito: HitosProps, color: string) => {
        const query = {
            ...hito,
            color: color
        }

        toast.promise(updateHito(query).unwrap(), {
            loading: 'Actualizando color...',
            success: 'Color actualizado',
            error: 'Error al actualizar el color',
        })
    }

    const handleDupliateResultado = async (id: string) => {
       toast.promise( dupeHito({hitoId: id, proyectoId: currentProyecto.id}).unwrap(), {
            loading: 'Duplicando hito...',
            success: 'Hito duplicado',
            error: 'Error al duplicar el hito',
        })
    }

    const filteredAndSortedSections = useMemo(() => {
        if (!hitos) return [];
        
        let hitosFilter = [...hitos]
        // Filtrado por búsqueda
        const regex = new RegExp(search, 'i');
        let filteredHitos = search === '' ? hitosFilter : hitosFilter.filter((hito: HitosProps) => regex.test(hito.titulo));
    
        // Ordenamiento
        if (sort === 'alphabetic-asc') {
            filteredHitos = filteredHitos.sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (sort === 'alphabetic-desc') {
            filteredHitos = filteredHitos.sort((a, b) => b.titulo.localeCompare(a.titulo));
        }
    
        return filteredHitos;
    }, [hitos, search, sort]);

   const items: CollapseProps['items'] = useMemo(() => {
        return filteredAndSortedSections?.map((hito: HitosProps, index: number) => ({
            key: hito.id.toString(),
            label: taskHitosHeader({record: hito, handleChangeHito, handleChangeColor, handleDeleteHito, handleDupliateResultado}),
            children: <TablaTask data={hito} options={options} taskeableType='HITO' columnsNames={columnsNames} columnsVisible={columnsVisible} />,
        }))        
    }, [filteredAndSortedSections, options])
   

    if(isLoading) return ( <Loading /> )
        
    return (
        <>
        <div className='flex gap-x-5 gap-y-1 items-center justify-end flex-wrap'>
            <div style={{width: 180}}>
                <Checkbox 
                    checked={activeKeys.length !== 0}
                    onChange={e => setActiveKeys(e.target.checked ? hitos?.map(hito => hito.id.toString())! : [])}
                    indeterminate={activeKeys.length > 0 && activeKeys.length < hitos?.length!}
                >
                    Mostrar Todos
                </Checkbox>
            </div>
            <Select placeholder="Ordenar por" className="w-[200px] text-devarana-graph" onChange={(value) => setSort(value)} value={sort}>
                <Select.Option value="default"> <p className="text-devarana-graph"> Sin Ordenar </p></Select.Option>
                <Select.Option value="alphabetic-asc"> <p className="text-devarana-graph"> Nombre: Ascendente </p></Select.Option>
                <Select.Option value="alphabetic-desc"> <p className="text-devarana-graph"> Nombre: Descendente </p></Select.Option>
            </Select>
            <Input placeholder='Buscar Sección' style={{width: 280}} onChange={e => setSearch(e.target.value)} allowClear/>
        </div>
        <Collapse
            activeKey={activeKeys}
            ghost
            onChange={(key) => setActiveKeys(key as string[])}
            items={items}
            className='customResultadosPanel cursor-default'   
        />


        <FloatButton
            onClick={handleCreateHito}
            icon={<Icon iconName='faPlus' />}
            type="primary"
        />
        </>
    )
}
