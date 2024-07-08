import { Icon } from "@/components/Icon";
import { PopoverEstado } from "@/components/resultados/PopoverEstado";
import { PopoverStatus } from "@/components/tasks/PopoverStatus";
import { getColor, getStatus, getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useSelectUser } from "@/hooks/useSelectUser";
import { HitosProps, TaskProps } from "@/interfaces";
import { useGetProyectoQuery } from "@/redux/features/proyectos/proyectosThunk";
import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "@/redux/features/tasks/tasksThunk";
import { useGetUsuariosQuery } from "@/redux/features/usuarios/usuariosThunks";
import { taskStatusTypes } from "@/types";
import { Avatar, DatePicker, Dropdown, Form, Image, Input, Menu, MenuProps, message, Popconfirm, Popover, Select, Table, Tooltip } from "antd"
import { DefaultOptionType } from "antd/es/select";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { BsFillCalendarFill, BsThreeDots } from "react-icons/bs";
import { FaEdit, FaPlus, FaTrash, FaUser } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";

interface TablaHitosProps {
    hito: HitosProps;
    setSelectedTask: (task: TaskProps) => void
    selectedTask: TaskProps | null
}

const taskeableType = "HITO"

export const TablaTask = ({ hito, selectedTask, setSelectedTask }: TablaHitosProps) => {

    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
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
    const [selectedRecord, setSelectedRecord] = useState(null);

    const handleUpdateTask = async (e: React.FocusEvent<HTMLInputElement, Element>, task: TaskProps) => {
        if(e.target.value === task.nombre) return
        if(e.target.value === '') return e.currentTarget.focus()
        if(!e.target.value) return e.currentTarget.focus        

        const query = {
            ...task,
            [e.target.name]: e.target.value
        }

        updateTask(query).unwrap().then(() => {
            message.success('Tarea Actualizada')
        }).catch((error) => {
            message.error('Error al actualizar la tarea')
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

    const handleDeleteTask = async (task: TaskProps, ) => {
        await deleteTask({taskId: task.id, hitoId: hito.id}).unwrap().then(() => {
            message.success('Tarea Eliminada')
        }).catch((error) => {
            message.error('Error al eliminar la tarea')
        })
    }

    const handleUpdateDate = (e: any, dateString: string | string[], task: TaskProps) => {
            
        if(Array.isArray(dateString)) return

        const query = {
            ...task,
            fechaFin: dateString ? dayjs(dateString, 'DD-MM-YYYY').format('YYYY-MM-DD 06:00:00') : task.fechaFin
        }
        updateTask(query).unwrap().then(() => {
            message.success('Fecha Actualizada')
        }).catch((error) => {
            message.error('Error al actualizar la fecha')
        })
    }

    const handleUpdateCreatedDate = (e: any, dateString: string | string[], task: TaskProps) => {
                
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

    const projectUsers = useMemo(() => {
        // filtrar a usuarios con los usuarios del proyecto
        if(!usuarios || !proyecto) return []
        return usuarios.filter( usuario => proyecto.usuariosProyecto.map( usuario => usuario.id).includes(usuario.id))
    }, [usuarios, proyecto])


    const defaultColumns:ColumnsType<TaskProps> = [
        {
            title: () => ( <p className='tableTitle text-center'>Creación</p>),
            dataIndex: 'created',
            key: 'created',
            fixed: 'left',
            render: (text, record, index) => (
                <div className="flex">
                <div className='border-2 rounded-full mr-2' style={{ borderColor: getColor(record.status).color }}/> 
                <div className='w-full text-devarana-graph text-center'>
                    {/* { <span className='text-devarana-graph font-light'>{dayjs(record.created).format('DD MMM YY')} </span>  } */}
                    <DatePicker
                        className='w-full'
                        format={"DD-MM-YYYY"}
                        defaultValue={ dayjs(record.created)  }
                        showNow
                        onChange={(date, dateString) => handleUpdateCreatedDate(null, dateString, record)}
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
            title: () => ( <p className='tableTitlePrincipal'>Actividad</p>),
            dataIndex: 'nombre',
            key: 'nombre',
            fixed: 'left',
            render: (text, record, index) => (
                <Tooltip title={record.nombre} >
                    <Input name="nombre" className="border-none disabled:bg-transparent" defaultValue={record.nombre} ref={inputRef} onBlur={(e) => handleUpdateTask(e, record)}
                        onFocus={(e) => { e.currentTarget.select() }} onPressEnter={ (e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.blur() }}
                    />
                </Tooltip>
            ),
            ellipsis: {
                showTitle: false,
            },
        },
        
        {
            title: () => ( <p className='tableTitle text-right'>Responsable</p>),
            key: 'usuariosTarea',
            render: (text, record, index) => (
                <div className='w-full text-devarana-graph flex justify-end'>
                    <Select
                        style={{ height: '100%' }}
                        placeholder={
                                <Avatar className="mx-auto flex" style={{backgroundColor: '#56739B', color: 'white'}} size={30} icon={<RiUserAddFill />} />
                        }
                        tagRender={tagRender}
                        showSearch
                        onChange={(value) => handleUpdateOwner(value, record)}
                        defaultValue={record.propietario?.id}
                        variant="borderless"
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        dropdownStyle={{width: '280px'}}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            projectUsers?.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                            ))
                        }
                    </Select>
                </div>
            ),
            width: 180,
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
                            projectUsers?.map(usuario => (
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
               <Popover
                    key={record.status}
                    title={ <p className='text-center text-devarana-graph'>Estatus</p> }
                    open={visiblePopoverId === record.id}
                    onOpenChange={ (newVisible) => handleVisibleChange(newVisible, record.id)}
                    content= {
                        <PopoverStatus current={record} handleUpdateStatus={handleUpdateStatus} type="proyecto" />
                    }
                    trigger={'click'}
                >
                        <div className="flex items-center justify-center gap-2 py-1 cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, ${getColor(record.status).lowColor}, ${getColor(record.status).color})`,
                            }}
                        >
                            <p className='text-center py-1 text-white'>  { taskStatusTypes[record.status] } </p>
                        </div>  

                </Popover>
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
                    format={"DD-MM-YYYY"}
                    defaultValue={ dayjs(record.fechaFin)  }
                    showNow
                    allowClear={false}
                    variant="borderless"
                    placeholder="Fecha Fin"
                    name="fechaFin"
                    suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    onChange={(date, dateString) => handleUpdateDate(null, dateString, record)}
                />
                )
            },
            width: 170
        },
        {
            title: () => ( <p className='tableTitle text-right'>Acciones</p>),
            fixed: 'right',
            render: (text, record, index) => {
                return (
                    <Popover
                        trigger={'click'}
                        className='cursor-pointer'
                        onOpenChange={ (visible) => setOpen(visible)}
                        
                        content={
                            <>
                                <div className="flex gap-5">
                                    <button onClick={ () => setSelectedTask(record) } className='flex items-center gap-2'>
                                        <FaEdit className='text-devarana-graph text-xl' />
                                    </button>
                                    <Popconfirm 
                                            title="¿Estás seguro de eliminar este task?"
                                            onConfirm={ () => handleDeleteTask(record) }
                                            okText="Si"
                                            placement="topLeft"
                                            cancelText="No"
                                            okButtonProps={{className: 'text-white bg-error-light'}} 
                                            cancelButtonProps={{className: 'text-devarana-dark-graph'}}
                                        >
                                            <button className='text-devarana-graph'>
                                                <Icon iconName='faTrash' className='text-lg pt-1'/>
                                            </button>
                                    </Popconfirm>
                                </div>
                            </>
                        }
                    >
                            <BsThreeDots className='text-devarana-graph text-xl ml-auto' />
                    </Popover>
                )
            },
            width: 100,
        }
    ]

    const FooterComp = (hito:HitosProps) => {

        const handleCreateTask = async (hito: HitosProps) => {
        
        const query = {
                ...form.getFieldsValue(),
                taskeableId: hito.id,
                taskeableType
            }

            createTask(query).unwrap().then(() => {
                message.success('Tarea Creada')
                form.resetFields()
            }).catch((error) => {
                message.error('Error al crear la tarea')
            })
           
        }

        const [form] = Form.useForm();

        return (
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
                    } className='w-60'/> 
                </Form.Item>
            </Form>
        )
    }

    const items: MenuProps['items'] = [
        {
          label: '1st menu item',
          key: '1',
        },
        {
          label: '2nd menu item',
          key: '2',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
      ];

        
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>, record: any) => {
        event.preventDefault();
        setSelectedRecord(record);
        setContextMenuPosition({ x: event.clientX, y: event.clientY });
        setContextMenuVisible(true);
    };
    const handleMenuClick = (e: any) => {
        console.log('Selected record:', selectedRecord);
        console.log('Menu item clicked:', e.key);
        setContextMenuVisible(false);
    };

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


    return (
        <div onClick={handleClickOutside}>
            <Table
                loading={isLoading}
                className='customSmallTable bg-white relative'
                scroll={{ x: 1300 }}
                bordered={false}
                size="small"
                pagination={false}
                columns={defaultColumns}
                dataSource={tasks}
                footer={ () => FooterComp(hito) }
                rowKey={(record: any) => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onContextMenu: (event) => handleContextMenu(event, record),
                    }
                }}
            />
            {contextMenuVisible && (
                <Dropdown menu={{items}} trigger={['contextMenu']} open={contextMenuVisible}  onOpenChange={(flag) => setContextMenuVisible(flag)}>
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

    )
}
