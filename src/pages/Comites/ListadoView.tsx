import { useState } from 'react'
import { useParams } from 'react-router'
import { useGetComiteQuery } from '@/redux/features/comitesApi'
import { useAppSelector } from '@/redux/hooks'
import {  Avatar, Divider, Drawer, Image, Modal, Segmented, Skeleton, Tooltip } from 'antd';
import { Gantt } from '@/components/complexUI/Gantt';
import { ListadoComite } from './components/ListadoComite';
import { FormTask } from '../../components/tareas/FormTask';
import { Icon } from '@/components/Icon';
import { KanbanProyecto } from '@/pages/Proyectos/components/KanbanProyecto';
import { Link } from 'react-router-dom';
import { ComitesProps, TaskProps } from '@/interfaces';
import { getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';
import { Minutas } from '../../components/minutas/Minutas';
import { Proximamente } from '@/components/ui';
import { MdOutlineEditNote } from 'react-icons/md';
import { FaCog } from 'react-icons/fa';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { FormComite } from './components/FormComite';

type SegmentTypes = 'actividades' | 'kanban' | 'gantt' | 'calendario'

export const ListadoView = () => {

    const { id } = useParams<{ id: string }>()


    const { data: comite, isLoading } = useGetComiteQuery({comiteId: id}, { skip: !id})
    const { socket } = useAppSelector(state => state.socket)
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [value, setValue] = useState<SegmentTypes>('actividades');
    const [visible, setVisible] = useState<boolean>(false);
    const [minutasVisible, setMinutasVisible] = useState<boolean>(false)
    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null)
    const [ selectedComite, setSelectedComite ] = useState<ComitesProps | null>(null)
        
    const projectViewsOptions = [
        {
            label: 'Actividades',
            value: 'actividades',
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

    const handleCancel = () => {
        setIsModalVisible(false)
        setSelectedComite(null)
    }

    const handleEdit = (proyecto : ComitesProps) => {
        setSelectedComite(proyecto)
        setIsModalVisible(true)
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
                <Link to='/comites' className='text-devarana-midnight text-sm'> <Icon iconName='faArrowLeft' /> Regresar </Link>
            </div>
            <div className='min-h-[500px]'>
                <div className="flex w-full items-center px-5 py-5 relative border justify-between rounded-ext shadow-ext bg-devarana-blue flex-row gap-x-2">
                    {
                        isLoading ? (
                            <Skeleton active paragraph={{ rows: 3 }} avatar={{ size: 100}}  />
                        ) : (
                            <div>
                                <p className="text-base text-white text-opacity-50"> Comité  </p>
                                <h1 className="text-2xl text-white">
                                    { comite?.titulo }
                                </h1>
                                <p className="text-white text-xs line-clamp-3 pt-2">
                                    {
                                        comite?.descripcion
                                    }
                                </p>
                            </div>
                        )
                    }

                    <div className="ml-auto flex items-center align-middle flex-col">
                        <p className="text-xs text-white text-opacity-50 block pb-2"> Responsables </p>
                        <Avatar.Group maxCount={3} className='flex justify-center' maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}>
                           {
                                 comite && comite.propietario && (
                                      <Tooltip title={comite.propietario.nombre + ' ' + comite.propietario.apellidoPaterno}>
                                        <Avatar src={<Image src={`${getStorageUrl(comite.propietario.foto)}`} preview={false} fallback={getBrokenUser()} />} className='border-none'>
                                             {comite.propietario.iniciales}
                                        </Avatar>
                                      </Tooltip>
                                 )
                            }
                            {
                                 comite && comite.usuariosComite && comite.usuariosComite.map((usuario) => (
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
                            comite && (
                                <button onClick={() => handleEdit(comite)} className='justify-start'>
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
                        onChange={(value) => setValue(value as SegmentTypes)}
                    />
                     <button className='bg-devarana-blue text-white px-5 my-1 py-0.5 rounded shadow-sm flex items-center gap-1 hover:opacity-80 transition-all ease-in-out' onClick={() => setMinutasVisible(true)}>
                        <MdOutlineEditNote className='text-white' size={18}/> Minutas 
                    </button>
                </div>

                {
                    comite && (
                        <>
                            {
                                value === 'actividades' && (
                                    <div>
                                        <ListadoComite
                                            setSelectedTask={setSelectedTask}
                                            selectedTask={selectedTask}
                                            currentComite={comite}
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
                        comite && (
                            <Minutas minuteableId={comite.id} minuteableType='COMITÉ'/>
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
                    <FormComite currentComite={selectedComite} handleCancel={handleCancel} />
                </Modal>
            </div>
       </>

    )
}
