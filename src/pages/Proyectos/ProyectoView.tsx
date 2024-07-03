import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { clearProyectoThunk, getProyectoThunk, useGetProyectoQuery } from '@/redux/features/proyectos/proyectosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {  Drawer } from 'antd';
import { Gantt } from '@/components/complexUI/Gantt';
import { ListadoProyectos } from '@/pages/Proyectos/components/ListadoProyectos';
import { FormTareas } from '../../components/tareas/FormTareas';
import { clearCurrentTarea } from '@/redux/features/tareas/tareasSlice';
import { Icon } from '@/components/Icon';
import { KanbanProyecto } from '@/pages/Proyectos/components/KanbanProyecto';
import { getUpdatedHitoThunk } from '@/redux/features/hitos/hitosThunk';
import { getUpdatedTareaThunk } from '@/redux/features/tareas/tareasThunk';
import { Link } from 'react-router-dom';

type SegmentTypes = 'listado' | 'kanban' | 'gantt' | 'calendario'

export const ProyectoView = () => {


    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()


    const { data: proyecto } = useGetProyectoQuery({proyectoId: id}, { skip: !id})
    const { socket } = useAppSelector(state => state.socket)
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
    }
    
    
    
    const usuarios =  useMemo(() => {
        return proyecto?.usuariosProyecto
    }, [proyecto])
    

    // useEffect(() => {        
    //     socket?.on('hitos:updated', (hito) => {                       
    //         dispatch(getUpdatedHitoThunk(hito))
    //     })

    //     socket?.on('tareas:updated', (tarea) => {          
    //         dispatch(getUpdatedTareaThunk(tarea))
    //     })

    //     return () => {
    //         socket?.off('hitos:updated')
    //     }
    // }, [socket])
    
    return (
       <>
            <div className="mb-2">
                <Link to='/proyectos' className='text-devarana-midnight text-sm'> <Icon iconName='faArrowLeft' /> Regresar </Link>
            </div>
            <div className='min-h-[500px]'>
                <div className="flex w-full items-center px-5 py-5 relative border rounded-ext shadow-ext">
                        <div>
                            <p className="text-base text-devarana-graph text-opacity-50"> Objetivo </p>
                            <h1 className="text-2xl">
                                { proyecto?.titulo }
                            </h1>
                            <p className="text-devarana-graph text-xs line-clamp-3">
                                {
                                    proyecto?.descripcion
                                }
                            </p>
                        </div>
                    </div>

                {
                    proyecto && (
                        <>
                            {
                                value === 'listado' && (
                                    <div>
                                        <ListadoProyectos 
                                            visible={visible} 
                                            setVisible={setVisible} 
                                            currentProyecto={proyecto} 
                                        />
                                    </div>
                                )
                            }
                            {
                                value === 'gantt' && (
                                    <Gantt 
                                        visible={visible} 
                                        setVisible={setVisible} 
                                        currentProyecto={proyecto}
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
       </>

    )
}
