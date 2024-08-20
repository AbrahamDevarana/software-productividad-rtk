import { useState } from 'react'
import { useParams } from 'react-router'
import { useGetProyectoQuery } from '@/redux/features/proyectos/proyectosThunk'
import { useAppSelector } from '@/redux/hooks'
import {  Avatar, Divider, Drawer, Image, Modal, Segmented, Skeleton, Tooltip } from 'antd';
import { Gantt } from '@/components/complexUI/Gantt';
import { ListadoProyectos } from '@/pages/Proyectos/components/ListadoProyectos';
import { FormTask } from '../../components/tareas/FormTask';
import { Icon } from '@/components/Icon';
import { KanbanProyecto } from '@/pages/Proyectos/components/KanbanProyecto';
import { Link } from 'react-router-dom';
import { ProyectosProps, TaskProps } from '@/interfaces';
import { getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';
import { Minutas } from '@/components/minutas/Minutas';
import { Proximamente } from '@/components/ui';
import { MdOutlineEditNote } from 'react-icons/md';
import { FaCog } from 'react-icons/fa';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { FormProyecto } from './components/FormProyecto';
import { SegmentedOptions } from 'antd/es/segmented';

type SegmentTypes = 'actividades' | 'kanban' | 'gantt' | 'minutas'

export const ProyectoView = () => {

    const { id } = useParams<{ id: string }>()


    const { data: proyecto, isLoading } = useGetProyectoQuery({proyectoId: id}, { skip: !id})
    const { socket } = useAppSelector(state => state.socket)
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [value, setValue] = useState<SegmentTypes>('actividades');
    const [visible, setVisible] = useState<boolean>(false);
    const [minutasVisible, setMinutasVisible] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null)
    const [ selectedProyect, setSelectedProyect ] = useState<ProyectosProps | null>(null)
        
    const projectViewsOptions: SegmentedOptions = [
        {
            label: 'Gantt',
            value: 'gantt',
            icon: <Icon iconName='faChartGantt' />
        },
        {
            label: 'Actividades',
            value: 'actividades',
            icon: <Icon iconName='faList' />
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

    const handleCancel = () => {
        setIsModalVisible(false)
        setSelectedProyect(null)
    }

    const handleEdit = (proyecto : ProyectosProps) => {
        setSelectedProyect(proyecto)
        setIsModalVisible(true)
    }


    const handleOnChangeSegment = (value: SegmentTypes ) => {
        setValue(value)
    }

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
                <div className="flex w-full items-center px-5 py-5 relative border justify-between rounded-ext shadow-ext bg-devarana-blue flex-row gap-x-2">
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

                    <div className="ml-auto flex items-center align-middle flex-col">
                        <p className="text-xs text-white text-opacity-50 block pb-2"> Responsables </p>
                        <Avatar.Group maxCount={3} className='flex justify-center' maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}>
                           {
                                 proyecto && proyecto.propietario && (
                                      <Tooltip title={proyecto.propietario.nombre + ' ' + proyecto.propietario.apellidoPaterno}>
                                        <Avatar src={<Image src={`${getStorageUrl(proyecto.propietario.foto)}`} preview={false} fallback={getBrokenUser()} />} className='border-none'>
                                             {proyecto.propietario.iniciales}
                                        </Avatar>
                                      </Tooltip>
                                 )
                            }
                            {
                                 proyecto && proyecto.usuariosProyecto && proyecto.usuariosProyecto.map((usuario) => (
                                      <Tooltip title={usuario.nombre + ' ' + usuario.apellidoPaterno} key={usuario.id} className='relative'>
                                        <Avatar key={usuario.id} src={<Image src={`${getStorageUrl(usuario.foto)}`} preview={false} fallback={getBrokenUser()} /> } className='border-none'>
                                             {usuario.iniciales} 
                                        </Avatar>
                                      </Tooltip>
                                 ))
                           }
                        </Avatar.Group>
                    </div>
                    <Divider type='vertical' className='h-20' style={{ borderColor: 'white', opacity: '.3'}}/>
                    <div className='flex flex-col gap-y-2'>
                        {
                            proyecto && (
                                <button onClick={() => handleEdit(proyecto)} className='justify-start'>
                                    <FaCog color='white' size={16}/>
                                </button>
                            )
                        }
                        <button className='justify-start' onClick={() => setMinutasVisible(true)}>
                            <MdOutlineEditNote color='white' size={18}/>
                        </button>
                        <button>
                            <IoInformationCircleOutline color='white' size={18}/>
                        </button>
                    </div>
                </div>

                <div className='flex justify-start max-w-screen-md items-center py-5'> 
                    <Segmented
                        options={projectViewsOptions}
                        value={value}
                        onChange={(value) => handleOnChangeSegment(value as SegmentTypes)}
                        // className='mt-5'
                    />
                    <button className='bg-devarana-blue text-white px-5 my-1 py-0.5 rounded shadow-sm flex items-center gap-1 hover:opacity-80 transition-all ease-in-out' onClick={() => setMinutasVisible(true)}>
                        <MdOutlineEditNote className='text-white' size={18}/> Minutas 
                    </button>
                </div>

                {
                    proyecto && (
                        <>
                            {
                                value === 'actividades' && (
                                    <div>
                                        <ListadoProyectos 
                                            setSelectedTask={setSelectedTask}
                                            selectedTask={selectedTask}
                                            currentProyecto={proyecto}
                                        />
                                    </div>
                                )
                            }
                            {
                                value === 'gantt' && (
                                    <Proximamente avance={55} />
                                )
                            }
                            {
                                value === 'kanban' && (
                                    <Proximamente avance={89} />
                                )
                            }
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
                            <Minutas minuteableId={proyecto.id} minuteableType='PROYECTO' />
                        )
                    }
                </Drawer>
                <Modal
                    open={isModalVisible}
                    onCancel={handleCancel}
                    width={800}
                    footer={null}
                    closable={false}
                    destroyOnClose={true}
                >
                    <FormProyecto currentProyecto={selectedProyect}  handleCancel={handleCancel} /> 
                </Modal>
            </div>
       </>

    )
}
