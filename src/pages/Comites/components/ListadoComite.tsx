import React, { useMemo, useState } from 'react'
import { ComitesProps, ListadoProps, TaskProps } from '@/interfaces'
import { Checkbox, Collapse, CollapseProps, FloatButton, Input, Select } from 'antd'
import Loading from '@/components/antd/Loading'
import { Icon } from '@/components/Icon'
import { TablaTask } from '@/components/tasks/'
import { columnsVisible, columnsNames } from "@/pages/Proyectos/utils";
import { useCreateListadoMutation, useDeleteListadoMutation, useGetListadosQuery, useUpdateListadoMutation,  } from '@/redux/features/listadoApi'
import { TaskListadoHeader } from '@/components/tasks/TaskListadoHeader'
import { toast } from 'sonner'
interface TableProyectosProps {
    currentComite: ComitesProps
    setSelectedTask: (task: TaskProps) => void
    selectedTask: TaskProps | null
}

interface Options {
    responsables: string[];
    estatus: string[];
    prioridad: string[];
}


export const ListadoComite = ({currentComite, selectedTask, setSelectedTask}: TableProyectosProps) => {
    
    const [ createListado, { isLoading: isCreatingComite, error: createComiteError, data: created }] = useCreateListadoMutation()
    const [ updateListado, { isLoading: isUpdatingComite, error: updateComiteError }] = useUpdateListadoMutation()
    const [ deleteListado, { isLoading: isDeletingComite, error: deleteComiteError }] = useDeleteListadoMutation()

    // Filtros
    const [activeKeys, setActiveKeys] = useState<string[]>([])
    const [ sort, setSort ] = useState<string>('default')
    const [search, setSearch] = useState<string>('')
    const [options, setOptions] = useState<Options>({
        responsables: [],
        estatus: [],
        prioridad: [],
    })
    
    const { data: comite, isLoading} = useGetListadosQuery({comiteId: currentComite.id})

    const handleChangeListado = async (listado: ListadoProps, e: React.FocusEvent<HTMLInputElement, Element>) => {

        const { value } = e.target as HTMLInputElement

        if(value === listado.titulo) return
        if(value === '') return e.currentTarget.focus()
        if(!value) return e.currentTarget.focus()

        const query = {
            ...listado,
            titulo: value
        }

        toast.promise(updateListado(query).unwrap(), {
            loading: 'Actualizando Sección',
            success: () => 'Sección Actualizada',
            error: 'Error al actualizar la sección',
        })
    };

    const handleCreateListado = async () => {
        
        const query = {
            comiteId: currentComite.id,
        }

        toast.promise(createListado(query).unwrap(), {
            loading: 'Creando Sección',
            success: 'Sección Creada',
            error: 'Error al crear la sección',
            finally: () => {
                const element = document.getElementById(`comite-${created?.id}`)
                if(element) element.scrollIntoView({ behavior: 'smooth', block: 'end' })
                if(element) element.classList.add('ant-collapse-item-active')
            }
        })
    };

    const handleDeleteListado = async (listado: ListadoProps) => {

        toast.promise(deleteListado({id: listado.id, comiteId: listado.comiteId}).unwrap(), {
            loading: 'Eliminando Sección',
            success: () => 'Sección Eliminada',
            error: 'Error al eliminar la sección',
        })
    }
    
    const handleChangeColor = (comite: ListadoProps, color: string) => {
        const query = {
            ...comite,
            color: color
        }

        toast.promise(updateListado(query).unwrap(), {
            loading: 'Actualizando Color',
            success: () => 'Color Actualizado',
            error: 'Error al actualizar el color',
        })
    }

    const filteredAndSortedSections = useMemo(() => {
        if (!comite) return [];
        
        let comiteFilter = [...comite]
        // Filtrado por búsqueda
        const regex = new RegExp(search, 'i');
        let filteredComites = search === '' ? comiteFilter : comiteFilter.filter((comite: ListadoProps) => regex.test(comite.titulo));
    
        // Ordenamiento
        if (sort === 'alphabetic-asc') {
            filteredComites = filteredComites.sort((a, b) => a.titulo.localeCompare(b.titulo));
        } else if (sort === 'alphabetic-desc') {
            filteredComites = filteredComites.sort((a, b) => b.titulo.localeCompare(a.titulo));
        }
    
        return filteredComites;
    }, [comite, search, sort]);

   const items: CollapseProps['items'] = useMemo(() => {
        return filteredAndSortedSections?.map((listado: ListadoProps, index: number) => ({
            key: listado?.id?.toString(),
            label: TaskListadoHeader({record: listado, handleChangeListado, handleChangeColor, handleDeleteListado}),
            children: <TablaTask data={listado} options={options} taskeableType='LISTADO' columnsNames={columnsNames} columnsVisible={columnsVisible} />,
        }))        
    }, [filteredAndSortedSections, options])
   

    if(isLoading) return ( <Loading /> )
        
    return (
        <>
        <div className='flex gap-x-5 gap-y-1 items-center justify-end flex-wrap'>
            <div style={{width: 180}}>
                <Checkbox 
                    checked={activeKeys.length !== 0}
                    onChange={e => setActiveKeys(e.target.checked ? comite?.map(comite => comite.id.toString())! : [])}
                    indeterminate={activeKeys.length > 0 && activeKeys.length < comite?.length!}
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
            onClick={handleCreateListado}
            icon={<Icon iconName='faPlus' />}
            type="primary"
        />
        </>
    )
}
