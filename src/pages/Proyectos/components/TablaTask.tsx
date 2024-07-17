
import { priorityItems, statusItems } from "@/components/tasks";
import { getColor, getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useSelectUser } from "@/hooks/useSelectUser";
import { HitosProps, TaskProps } from "@/interfaces";
import { useGetProyectoQuery } from "@/redux/features/proyectos/proyectosThunk";
import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "@/redux/features/tasks/tasksThunk";
import { useGetUsuariosQuery } from "@/redux/features/usuarios/usuariosThunks";
import { Avatar, Badge, Checkbox, DatePicker, Drawer, Dropdown, Form, Image, Input, MenuProps, message, Popconfirm, Popover, Select, Table, Tooltip } from "antd"
import { DefaultOptionType } from "antd/es/select";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BsFillCalendarFill, BsThreeDots } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { PiChatCircleDotsLight } from "react-icons/pi";
import { RiUserAddFill } from "react-icons/ri";
import TaskComentarios from "./TaskComentarios";

interface TablaHitosProps {
    hito: HitosProps;
    options: Options
}
interface Options {
    responsables: string[];
    estatus: string[];
    prioridad: string[];
}

const taskeableType = "HITO"

export const TablaTask = ({ hito, options}: TablaHitosProps) => {

    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
    const [visiblePopoverId, setVisiblePopoverId] = useState<number | null>(null);

    const { data: usuarios} = useGetUsuariosQuery({status: 'ACTIVO'})
    const { data: proyecto} = useGetProyectoQuery({proyectoId: hito.proyectoId})

    const { tagRender, spanUsuario } = useSelectUser(usuarios, 'default')

    const {data: tasks, isLoading} = useGetTasksQuery({taskeableId: hito.id}, {skip: !hito.id})
    const [ createTask, { isLoading: isCreatingTask, error: createTaskError } ] = useCreateTaskMutation()
    const [ updateTask, { isLoading: isUpdatingTask, error: updateTaskError } ] = useUpdateTaskMutation()
    const [ deleteTask, { isLoading: isDeletingTask, error: deleteTaskError } ] = useDeleteTaskMutation()

    const [contextMenuVisible, setContextMenuVisible] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
    const [selectedRecord, setSelectedRecord] = useState<TaskProps | null>(null);

    const handleUpdateTask = async (e: React.FocusEvent<HTMLInputElement, Element>, task: TaskProps) => {
        if(e.target.value === task.nombre) return
        if(e.target.value === '') return e.currentTarget.focus()
        if(!e.target.value) return e.currentTarget.focus        

        const query = {
            ...task,
            [e.target.name]: e.target.value
        }

        updateTask(query).unwrap().then(() => {
            message.success('Actividad Actualizada')
        }).catch((error) => {
            message.error('Error al actualizar actividad')
        })
    }

    const handleUpdateOwner = (value: any, task: TaskProps) => {
        const query = {
            ...task,
            propietarioId: value
        }
        updateTask(query).unwrap().then(() => {
            message.success('Propietario Actualizado')
        }).catch((error) => {
            message.error('Error al actualizar el propietario')
        })
    }

    const handleUpdateCoOwner = (value: any, task: TaskProps) => {
        const query = {
            ...task,
            coResponsables: value
        }
        updateTask(query).unwrap().then(() => {
            message.success('Co Propietario Actualizado')
        }).catch((error) => {
            message.error('Error al actualizar el co propietario')
        })
    }

    const handleVisibleChange = (newVisible: boolean, id: number) => {
        setVisiblePopoverId(newVisible ? id : null);
    };

    const handleUpdateStatus = (query: TaskProps) => {
        handleVisibleChange(false, query.id)
        updateTask(query).unwrap().then(() => {
            message.success('Estatus Actualizado')
        }).catch((error) => {
            message.error('Error al actualizar el estatus')
        })
    }

    const handleUpdateTaskPriority = (value: any, task: TaskProps) => {
        const query = {
            ...task,
            prioridad: value
        }
        updateTask(query).unwrap().then(() => {
            message.success('Prioridad Actualizada')
        }).catch((error) => {
            message.error('Error al actualizar la prioridad')
        })
    }

    const handleDeleteTask = async (task: TaskProps, ) => {
        await deleteTask({taskId: task.id, hitoId: hito.id}).unwrap().then(() => {
            message.success('Actividad Eliminada')
        }).catch((error) => {
            message.error('Error al eliminar la actividad')
        })
    }

    const handleUpdateDate = (e: any, dateString: dayjs.Dayjs, task: TaskProps) => {
            
        if(Array.isArray(dateString)) return

        const query = {
            ...task,
            fechaFin: dateString ? dayjs(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD 06:00:00') : task.fechaFin
        }

        console.log(query.fechaFin);
        

        
        updateTask(query).unwrap().then(() => {
            message.success('Fecha Actualizada')
        }).catch((error) => {
            message.error('Error al actualizar la fecha')
        })
    }

    const handleUpdateCreatedDate = (e: any, dateString: dayjs.Dayjs, task: TaskProps) => {
                
            if(Array.isArray(dateString)) return
    
            const query = {
                ...task,
                created: dateString ? dayjs(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD 06:00:00') : task.created
            }
            updateTask(query).unwrap().then(() => {
                message.success('Fecha Actualizada')
            }).catch((error) => {
                message.error('Error al actualizar la fecha')
            })
    }

    const handleOcultar = (task: TaskProps) => {
        const query = {
            ...task,
            visible: !task.visible
        }
        updateTask(query).unwrap().then(() => {
            message.success('Visibilidad Actualizada')
        }).catch((error) => {
            message.error('Error al actualizar la visibilidad')
        })
    }

    const PopoverContent = ({ task, text, }: { task: TaskProps, text:string }) => {
        return (
            <Popconfirm 
                title="¿Estás seguro de eliminar esta actividad?"
                onConfirm={ () => handleDeleteTask(task) }
                okText="Si"
                placement="topLeft"
                cancelText="No"
                className="flex items-center gap-2 group"
                okButtonProps={{
                    className: 'rounded-full mr-2 bg-primary'
                }}
                cancelButtonProps={{
                    className: 'rounded-full mr-2 bg-error-light text-white'
                }}
            >
            <BiTrash className='text-default text-right group-hover:text-error-light cursor-pointer' /> 
            {
                text && <p className='text-default text-right group-hover:text-error-light cursor-pointer'>{text}</p>
            }
        </Popconfirm>
        )
    }

    const handleCloseComentarios = () => {
        setSelectedTask(null)
    }
    
    const defaultColumns:ColumnsType<TaskProps> = [
        {
            title: () => ( <p className='tableTitle text-center'>Creación</p>),
            dataIndex: 'created',
            key: 'created',
            render: (text, record, index) => (
                <div className="flex">
                <div className='border-2 rounded-full mr-2' style={{ borderColor: getColor(record.status).color }}/> 
                <div className='w-full text-devarana-graph text-center'>
                    {/* { <span className='text-devarana-graph font-light'>{dayjs(record.created).format('DD MMM YY')} </span>  } */}
                    <DatePicker
                        className='w-full'
                        format={"DD-MMM-YYYY"}
                        defaultValue={ dayjs(record.created)  }
                        showNow
                        onChange={(date, dateString) => handleUpdateCreatedDate(null, date, record)}
                        allowClear={false}
                        placeholder="Fecha Creación"
                        variant="borderless"
                        name="fechaCreacion"
                        suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    />
                </div>
                </div>
            ),
            width: 170,
        },
        {
            title: () => ( <p className='tableTitle'>Actividad</p>),
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record, index) => (
                <div className="flex items-center gap-2">
                    <Tooltip title={record.nombre} >
                        <Input name="nombre" className="border-none disabled:bg-transparent" defaultValue={record.nombre} ref={inputRef} onBlur={(e) => handleUpdateTask(e, record)}
                            onFocus={(e) => { e.currentTarget.select() }} onPressEnter={ (e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.blur() }}
                        />
                    </Tooltip>
                    <button onClick={() => setSelectedTask(record)} className='text-devarana-graph'>
                        <Badge 
                            count={record.comentarios?.length}
                            offset={[0, 20]}
                            size="small"
                            className="flex items-center justify-center"
                            styles={{
                                indicator: {
                                    display: 'flex',
                                    alignItems: 'end',
                                    justifyContent: 'center',
                                    backgroundColor: '#56739B',
                                    height: '14px',
                                },
                            }}
                        >
                            <PiChatCircleDotsLight size={22} />
                        </Badge>
                    </button>
                </div>
            ),
            ellipsis: {
                showTitle: false,
            }
        },
        {
            title: () => ( <p className='tableTitle text-right'>Responsable</p>),
            key: 'usuariosTarea',
            render: (text, record, index) => (
                <div className='w-full text-devarana-graph flex justify-end'>
                    <Select
                        style={{ height: '100%' }}
                        showSearch
                        onChange={(value) => handleUpdateOwner(value, record)}
                        defaultValue={record.propietario?.id}
                        variant="borderless"
                        options={userItems}
                        optionRender={(option) => (
                            <div className='flex items-center gap-2'>
                              {option.data.item}
                            </div>
                        )}
                        dropdownStyle={{width: '280px'}}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                    </Select>
                </div>
            ),
            width: 120,
        },  
        {
            title: () => ( <p className='tableTitle text-right'>Co Responsable</p>),
            key: 'usuariosTarea',
            render: (text, record, index) => (
                <div className='w-full text-devarana-graph flex justify-end'>
                    
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder={
                            <Avatar className="mx-auto flex" style={{backgroundColor: '#56739B', color: 'white'}} size={30} icon={<RiUserAddFill />} />
                        }
                        allowClear
                        variant="borderless"
                        tagRender={tagRender}
                        onChange={(value) => handleUpdateCoOwner(value, record)}
                        defaultValue={record.coResponsables?.map( usuario => usuario.id)}
                        maxTagCount={3}
                        showSearch
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        dropdownStyle={{width: '280px'}}
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios?.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                            ))
                            // .filter( usuario => usuario.key !== record.propietario?.id)
                        }
                    </Select>
                </div>
            ),
            width: 180,
        },  
        {
            title: () => ( <p className='tableTitle text-right'>Estatus</p>),
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => (
                 <Select
                    className='w-[150px] flex items-end justify-end cursor-pointer'
                    defaultValue={record.status}
                    onChange={(value) => handleUpdateStatus({ ...record, status: value })}
                    variant="borderless"
                    options={statusItems}
                    suffixIcon={false}
                />
            ),
            width: 140
        },
        {
            title: () => ( <p className='tableTitle text-right'>Prioridad</p>),
            dataIndex: 'prioridad',
            key: 'prioridad',
            render: (text, record, index) => (
                <Select
                    className='w-[150px] flex items-end justify-end cursor-pointer'
                    defaultValue={record.prioridad}
                    onChange={(value) => handleUpdateTaskPriority(value, record)}
                    variant="borderless"
                    options={priorityItems}
                    suffixIcon={false}
                />
            ),
            width: 150
        },
        {
            title: () => ( <p className='tableTitle text-right'>Fecha Compromiso</p>),
            dataIndex: 'fechaFin',
            key: 'fecha',
            render: (text, record, index) => {
                return (
                    <DatePicker
                    className='w-full' 
                    format={"DD-MMM-YYYY"}
                    defaultValue={ dayjs(record.fechaFin)  }
                    showNow
                    allowClear={false}
                    variant="borderless"
                    placeholder="Fecha Fin"
                    name="fechaFin"
                    suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    onChange={(date, dateString) => handleUpdateDate(null, date, record)}
                />
                )
            },
            width: 170
        },
        {
            title: () => ( <p className='tableTitle text-right'>Acciones</p>),
            render: (text, record, index) => {
                return (
                    <Popover
                        trigger={'click'}
                        className='cursor-pointer'
                        onOpenChange={ (visible) => setOpen(visible)}
                        
                        content={
                            <>
                                <Popconfirm 
                                    title="¿Estás seguro de eliminar esta actividad?"
                                    onConfirm={ () => handleDeleteTask(record) }
                                    okText="Si"
                                    placement="topLeft"
                                    cancelText="No"
                                    className="flex items-center gap-2 group"
                                    okButtonProps={{
                                        className: 'rounded-full mr-2 bg-primary'
                                    }}
                                    cancelButtonProps={{
                                        className: 'rounded-full mr-2 bg-error-light text-white'
                                    }}
                                >
                                <BiTrash className='text-default text-right group-hover:text-error-light cursor-pointer' />
                                <p className='text-default text-right group-hover:text-error-light cursor-pointer'>Eliminar</p>
                                </Popconfirm>
                            </>
                        }
                    >
                        <BsThreeDots className='text-devarana-babyblue text-xl cursor-pointer ml-auto' />
                    </Popover>
                )
            },
            width: 100,
        }
    ]

    const FooterComp = (hito:HitosProps) => {

        const handleCreateTask = async (hito: HitosProps) => {

        if(!form.getFieldValue('nombre')) return
        
        const query = {
                ...form.getFieldsValue(),
                taskeableId: hito.id,
                taskeableType
            }

            createTask(query).unwrap().then(() => {
                message.success('Actividad Creada')
                form.resetFields()
            }).catch((error) => {
                message.error('Error al crear la actividad')
            })
           
        }

        const [form] = Form.useForm();

        return (
           <div className="flex items-center flex-1 justify-between">
                <div className="w-full">
                    <Form initialValues={{
                        ...hito,
                        nombre: ''
                    }}
                    form={form}
                    onBlur={ e => handleCreateTask(hito)}
                    > 
                        <Form.Item name='nombre' className='mb-0'>
                            <Input placeholder='Agregar Nueva Actividad' onPressEnter={
                                (e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    e.currentTarget.blur()
                                }
                            } className='w-3/4'/> 
                        </Form.Item>
                    </Form>
                </div>
                <div className="w-full text-right">
                    <Checkbox
                        onChange={(e) => setVisible(e.target.checked)}
                    > Mostrar Actividades Ocultas</Checkbox>
                </div>
            </div>
        )
    }

    const items: MenuProps['items'] = [
        {
            label: (
                <div className="flex items-center gap-2 group">
                    <FaEye className='text-default cursor-pointer group-hover:text-primary' />
                    <p className="text-default cursor-pointer group-hover:text-primary"> {selectedRecord?.visible ? 'Ocultar' : 'Mostrar'} </p>
                </div>
            ),
            key: '2',
            onClick: () => {
                selectedRecord && handleOcultar(selectedRecord)
            }
        },
        {
            key: 'divider',
            label: <hr  />,
        },
        {
          label: PopoverContent({ task: selectedRecord!, text: 'Eliminar' }),
          className: 'text-error-light',
          key: '3',
            onClick: () => {
                selectedRecord && handleDeleteTask(selectedRecord)
            }
        },
        // Divider
      
        
    ];

    const handleClickOutside = () => {
        setContextMenuVisible(false);
    };
    
    useEffect(() => {
        const handleDocumentClick = (event: MouseEvent) => {
        if (contextMenuVisible) {
            setContextMenuVisible(false);
        }
        };
    
        document.addEventListener('click', handleDocumentClick);
    
        return () => {
        document.removeEventListener('click', handleDocumentClick);
        };
    }, [contextMenuVisible]);


    const userItems = useMemo(() => {

        if(!usuarios) return []

        return usuarios.map(usuario => ({
            value: usuario.id,
            label: <Tooltip title={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno}>
                    <Avatar src={<Image src={`${getStorageUrl(usuario.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                    </Tooltip>,
            key: usuario.id,
            item: <div className='flex items-center gap-2'>
                    <Avatar
                        src={<Image src={`${getStorageUrl(usuario.foto)}`} preview={false} fallback={getBrokenUser()} />}
                        size='large'
                    >
                        {usuario.iniciales}
                    </Avatar>
                    <p className='font-light text-devarana-graph'>
                        {usuario.nombre} {usuario.apellidoPaterno} 
                    </p>
                </div>,
            dataName: usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno
        }))
    }, [usuarios])

    const renderedTask = useMemo(() => {
        
        const {} = options
        
        if(!tasks) return []

        const tasksCopy = [...tasks]

        const orderedTasks = tasksCopy.sort((a, b) => {
            if(a.status === 'FINALIZADO') return 1
            if(b.status === 'FINALIZADO') return -1
            return 0
        })
                
        return orderedTasks.filter(task => task.visible || visible)
    }, [tasks, visible])
        
        
    return (
       <>
        <div onClick={handleClickOutside}>
            <Table
                loading={isLoading}
                className='customSmallTable bg-white relative'
                scroll={{ x: 1300 }}
                bordered={false}
                size="small"
                pagination={false}
                columns={defaultColumns}
                dataSource={renderedTask}
                footer={ () => FooterComp(hito) }
                rowKey={(record: any) => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onContextMenu: (event) => {
                            event.preventDefault();
                            setSelectedRecord(record);
                            setContextMenuPosition({ x: event.clientX, y: event.clientY });
                            setContextMenuVisible(true);
                        },
                    }
                }}
            />
            {contextMenuVisible && (
                <Dropdown menu={{items}} className="relative" trigger={['contextMenu']} open={contextMenuVisible}  onOpenChange={(flag) => setContextMenuVisible(flag)}
                    overlayStyle={{ position: 'absolute', top: contextMenuPosition.y, left: contextMenuPosition.x, width: '200px' }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: contextMenuPosition.y,
                            left: contextMenuPosition.x,
                            zIndex: 1000,
                        }}
                    />
                </Dropdown>
            )}
        </div>
        <Drawer
            title={<p className='text-devarana-graph'>Comentarios</p>}
            placement="right"
            closable={true}
            onClose={handleCloseComentarios}
            open={selectedTask !== null}
            width={ window.innerWidth > 768 ? 600 : '100%' }
        >
            <TaskComentarios activeTask={selectedTask} />
        </Drawer>
        </>

    )
}
