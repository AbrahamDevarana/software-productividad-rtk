import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { clearProyectoThunk, getProyectoThunk } from '@/redux/features/proyectos/proyectosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {  Drawer, Segmented } from 'antd';
import { Gantt } from '@/components/complexUI/Gantt';
import { TableProyectos } from '@/components/proyectos/TableProyectos';
import { FormTareas } from '../../components/tareas/FormTareas';
import { clearCurrentTarea } from '@/redux/features/tareas/tareasSlice';
import { useSelectUser } from '@/hooks/useSelectUser';
import { Icon } from '@/components/Icon';
import { KanbanProyecto } from '@/components/proyectos/KanbanProyecto';

type SegmentTypes = 'listado' | 'kanban' | 'gantt' | 'calendario'

export const ProyectoView = () => {

    const { currentProyecto, isLoadingProyecto } = useAppSelector(state => state.proyectos)
    const [value, setValue] = useState<SegmentTypes>('listado');
    const [visible, setVisible] = useState<boolean>(false);

    
    
    const options = [
        {
            label: 'Listado',
            value: 'listado',
            icon: <Icon iconName='faList' />
        },
        {
            label: 'Gantt',
            value: 'gantt',
            icon: <Icon iconName='faChartGantt' />
        },
        {
            label: 'Kanban',
            value: 'kanban',
            icon: <Icon iconName='faColumns' />
        }
    ]
    
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    
    useEffect(() => {
        if(id) {
            dispatch(getProyectoThunk(id))
        }
        return () => {
            dispatch(clearProyectoThunk())
        }
    }, [id])
    
    const handleClose = () => {
        setVisible(false)
        dispatch(clearCurrentTarea())
    }
    
    
    
    const usuarios =  useMemo(() => {
        return currentProyecto.usuariosProyecto
    }, [currentProyecto])
    
    const {selectedUsers, setSelectedUsers, spanUsuario, tagRender} = useSelectUser(usuarios)
    
    return (
        <div className='min-h-[500px]'>
            <p className='text-xs text-devarana-graph text-opacity-50'>Proyecto:</p>
            <h1>{ currentProyecto.titulo }</h1>
                <Segmented
                    className='my-4'
                    options={options}
                    value={value}
                    onChange={(value) => setValue(value as SegmentTypes)}

                />
                {/* <>
                    <p>Filtrar Por: </p>
                    <div className='flex gap-x-5'>
                        <UserDropDown searchFunc={ getUsuariosThunk } data={usuarios}  />
                        <Input placeholder='Buscar' className='w-60' />
                    </div>
                </> */}

            {
                currentProyecto && (
                    <>
                        {
                            value === 'listado' && (
                                <div>
                                    <TableProyectos 
                                        visible={visible} 
                                        setVisible={setVisible} 
                                        currentProyecto={currentProyecto} 
                                    />
                                </div>
                            )
                        }
                        {
                            value === 'gantt' && (
                                <Gantt 
                                    visible={visible} 
                                    setVisible={setVisible} 
                                    currentProyecto={currentProyecto}
                                />
                            )
                        }
                        {
                            value === 'kanban' && (
                                <p>
                                    <KanbanProyecto />
                                </p>
                            )
                        }
                    </>
                )
            }
           
            

            <Drawer
                open={visible}
                onClose={handleClose}
                destroyOnClose={true}
                placement='right'
                width={600}
            >
                <FormTareas />
            </Drawer>
        </div>


    )
}
