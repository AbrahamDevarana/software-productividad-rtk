import React, { useMemo, useState } from 'react'
import { useCreateHitoMutation, useDeleteHitoMutation, useGetHitosQuery, useUpdateHitoMutation } from '@/redux/features/hitos/hitosThunk'
import { HitosProps, ProyectosProps, TaskProps } from '@/interfaces'
import { Checkbox, Collapse, CollapseProps, ColorPicker, FloatButton, Form, Input, message, Popconfirm, Popover, Select, Tooltip } from 'antd'
import Loading from '@/components/antd/Loading'
import { Icon } from '@/components/Icon'
import { TablaTask } from '@/components/tasks/'
import { taskHitosHeader } from '@/components/tasks/TaskHitosHeader'
import { columnsVisible, columnsNames } from "@/pages/Proyectos/utils";
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

        await updateHito(query).unwrap().then(() => {
            message.success('Hito Actualizado')
        }).catch((error) => {
            message.error('Error al actualizar el hito')
        })
    };

    const handleCreateHito = async () => {
        
        const query = {
            proyectoId: currentProyecto.id,
        }
        await createHito(query).unwrap().then(( data ) => {
            message.success('Sección Creado')
            const element = document.getElementById(`hitos-${data.id}`)
            if(element) element.scrollIntoView({ behavior: 'smooth', block: 'end' })
            if(element) element.classList.add('ant-collapse-item-active')
        }).catch((error) => {
            message.error('Error al crear la sección')
        })

    };

    const handleDeleteHito = async (hito: HitosProps) => {
        await deleteHito({hitoId: hito.id, proyectoId: currentProyecto.id}).unwrap().then(() => {
            message.success('Sección Eliminada')
        }).catch((error) => {
            message.error('Error al eliminar la sección')
        })
    }
    
    const handleChangeColor = (hito: HitosProps, color: string) => {
        const query = {
            ...hito,
            color: color
        }
        updateHito(query).unwrap().then(() => {
            message.success('Color Actualizado')
        }).catch((error) => {
            message.error('Error al actualizar el color')
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
            label: taskHitosHeader({record: hito, handleChangeHito, handleChangeColor, handleDeleteHito}),
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
