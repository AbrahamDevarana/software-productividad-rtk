import { useMemo, useState } from 'react'
import { useParams } from 'react-router'
import { useGetProyectoQuery } from '@/redux/features/proyectos/proyectosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {  Avatar, Badge, Drawer, Image, Skeleton, Tooltip } from 'antd';
import { Gantt } from '@/components/complexUI/Gantt';
import { ListadoProyectos } from '@/pages/Proyectos/components/ListadoProyectos';
import { FormTask } from '../../components/tareas/FormTask';
import { Icon } from '@/components/Icon';
import { KanbanProyecto } from '@/pages/Proyectos/components/KanbanProyecto';
import { Link } from 'react-router-dom';
import { TaskProps } from '@/interfaces';
import { getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';
import { Spinner } from '@/components/antd/Spinner';
import { FaRegNoteSticky } from "react-icons/fa6";
import { Minutas } from './components/Minutas';

type SegmentTypes = 'listado' | 'kanban' | 'gantt' | 'calendario'

export const ProyectoView = () => {


    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()


    const { data: proyecto, isLoading } = useGetProyectoQuery({proyectoId: id}, { skip: !id})
    const { socket } = useAppSelector(state => state.socket)
    const [value, setValue] = useState<SegmentTypes>('listado');
    const [visible, setVisible] = useState<boolean>(false);
    const [minutasVisible, setMinutasVisible] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null)

    

    
    
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
    

    const handleClose = () => {
        setSelectedTask(null)
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
                <div className="flex w-full items-center px-5 py-5 relative border justify-between rounded-ext shadow-ext bg-devarana-blue flex-row gap-x-10">
                    {
                        isLoading ? (
                            <Skeleton active paragraph={{ rows: 3 }} avatar={{ size: 100}}  />
                        ) : (
                            <div>
                                <p className="text-base text-white text-opacity-50"> Proyecto </p>
                                <h1 className="text-2xl text-white">
                                    { proyecto?.titulo }
                                </h1>
                                <p className="text-white text-xs line-clamp-3 pt-2">
                                    {
                                        proyecto?.descripcion
                                    }
                                </p>
                            </div>
                        )
                    }
                    {
                        proyecto && proyecto.usuariosProyecto && (
                            <div className="flex flex-col justify-between items-center gap-5">
                                <button className='justify-start' onClick={() => setMinutasVisible(true)}>
                                    <Badge count={3} showZero
                                    styles={{
                                        indicator: {
                                            scale: '.8',
                                            backgroundColor: '#2E3136',
                                        }
                                    }}>
                                        <FaRegNoteSticky color='white' size={25}/>
                                    </Badge>

                                </button>
                                <Avatar.Group maxCount={5} className='m-auto'>
                                    {
                                        proyecto.propietario && (
                                            <Tooltip title={proyecto.propietario.nombre + ' ' + proyecto.propietario.apellidoPaterno}>
                                                <Avatar src={<Image src={`${getStorageUrl(proyecto.propietario.foto)}`} preview={false} fallback={getBrokenUser()} />} className='border-none'>
                                                    {proyecto.propietario.iniciales}
                                                </Avatar>
                                            </Tooltip>
                                        )
                                    }
                                    {
                                        proyecto.usuariosProyecto.map((usuario) => (
                                            <Tooltip title={usuario.nombre + ' ' + usuario.apellidoPaterno} key={usuario.id} className='relative'>
                                                <Avatar key={usuario.id} src={<Image src={`${getStorageUrl(usuario.foto)}`} preview={false} fallback={getBrokenUser()} /> } className='border-none'>
                                                    {usuario.iniciales} 
                                                </Avatar>
                                            </Tooltip>
                                        ))
                                    }
                                </Avatar.Group>
                            </div>
                        )
                    }
                </div>

                {
                    proyecto && (
                        <>
                            {
                                value === 'listado' && (
                                    <div>
                                        <ListadoProyectos 
                                            setSelectedTask={setSelectedTask}
                                            selectedTask={selectedTask}
                                            currentProyecto={proyecto} 
                                        />
                                    </div>
                                )
                            }
                            {/* {
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
                            } */}
                        </>
                    )
                }
            
                

                <Drawer
                    open={selectedTask !== null}
                    onClose={handleClose}
                    destroyOnClose={true}
                    placement='right'
                    width={600}
                >
                    {
                        selectedTask && (
                            <FormTask 
                               selectedTask={selectedTask}
                               handleClose={handleClose}
                            />
                        )
                    }
                </Drawer>

                <Drawer
                    open={minutasVisible}
                    onClose={() => setMinutasVisible(false)}
                    destroyOnClose={true}
                    placement='right'
                    width={'80%'}
                    title={ <p className='text-center uppercase text-lg'> Minutas </p> }
                >
                    {
                        proyecto && (
                            <Minutas proyectoId={proyecto.id} />
                        )
                    }
                </Drawer>
            </div>
       </>

    )
}
