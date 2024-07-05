import { Icon } from "@/components/Icon";
import { PopoverEstado } from "@/components/resultados/PopoverEstado";
import { PopoverStatus } from "@/components/tasks/PopoverStatus";
import { getColor, getStatus, getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useSelectUser } from "@/hooks/useSelectUser";
import { HitosProps, TaskProps } from "@/interfaces";
import { useCreateTaskMutation, useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "@/redux/features/tasks/tasksThunk";
import { useGetUsuariosQuery } from "@/redux/features/usuarios/usuariosThunks";
import { taskStatusTypes } from "@/types";
import { Avatar, DatePicker, Form, Image, Input, message, Popconfirm, Popover, Select, Table, Tooltip } from "antd"
import { DefaultOptionType } from "antd/es/select";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { BsFillCalendarFill, BsThreeDots } from "react-icons/bs";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TablaHitosProps {
    hito: HitosProps;
    setSelectedTask: (task: TaskProps) => void
    selectedTask: TaskProps | null
}

const taskeableType = "HITO"

export const TablaTask = ({ hito, selectedTask, setSelectedTask }: TablaHitosProps) => {

    const inputRef = useRef(null);
    const popoverRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [visiblePopoverId, setVisiblePopoverId] = useState<number | null>(null);

    const { data: usuarios} = useGetUsuariosQuery({status: 'ACTIVO'})

    const { tagRender, spanUsuario } = useSelectUser(usuarios, 'default')

    const {data: tasks, isLoading} = useGetTasksQuery({taskeableId: hito.id}, {skip: !hito.id})
    const [ createTask, { isLoading: isCreatingTask, error: createTaskError } ] = useCreateTaskMutation()
    const [ updateTask, { isLoading: isUpdatingTask, error: updateTaskError } ] = useUpdateTaskMutation()
    const [ deleteTask, { isLoading: isDeletingTask, error: deleteTaskError } ] = useDeleteTaskMutation()

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

    const defaultColumns:ColumnsType<TaskProps> = [
        {
            title: () => ( <p className='tableTitle text-center'>Creación</p>),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => (
                <div className="flex">
                <div className='border-2 rounded-full mr-2' style={{ borderColor: getColor(record.status).color }}/> 
                <div className='w-full text-devarana-graph text-center'>
                    { <span className='text-devarana-graph font-light'>{dayjs(record.createdAt).format('DD MMM YY')} </span>  }
                </div>
                </div>
            ),
            width: 150,
        },
        {
            title: () => ( <p className='tableTitlePrincipal'>Actividad</p>),
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record, index) => (
                <Input name="nombre" className="border-none disabled:bg-transparent" defaultValue={record.nombre} ref={inputRef} onBlur={(e) => handleUpdateTask(e, record)}
                    onFocus={(e) => { e.currentTarget.select() }} onPressEnter={ (e) => { e.preventDefault(); e.stopPropagation(); e.currentTarget.blur() }}
                />
            ),
            width: '50%',
            ellipsis: true
        },
        
        {
            title: () => ( <p className='tableTitle text-right'>Responsable</p>),
            key: 'usuariosTarea',
            render: (text, record, index) => (
                <div className='w-full text-devarana-graph flex justify-end'>
                    <Select
                        style={{ height: '100%' }}
                        placeholder="Selecciona al propietario"
                        tagRender={tagRender}
                        showSearch
                        variant="borderless"
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                        dropdownStyle={{width: '300px'}}
                        // @ts-ignore
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios?.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                            ))
                        }
                    </Select>
                </div>
            ),
            width: 150,
        },  
        {
            title: () => ( <p className='tableTitle text-right'>Co Responsable</p>),
            key: 'usuariosTarea',
            render: (text, record, index) => (
                <div className='w-full text-devarana-graph flex justify-end'>
                    
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Selecciona los co responsables"                      
                        allowClear
                        variant="borderless"
                        tagRender={tagRender}
                        maxTagCount={3}
                        showSearch
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph bg-deva'>+{omittedValues.length}</span>
                        )}
                        // @ts-ignore
                        dropdownStyle={{width: '300px'}}
                        filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                    >
                        {
                            usuarios?.map(usuario => (
                                <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                            )).filter( usuario => usuario.key !== record.propietario?.id)
                        }
                    </Select>
                </div>
            ),
            width: 200,
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
            width: 170
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
                    placeholder="Fecha Fin"
                    variant="outlined"
                    name="fechaFin"
                    suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    onChange={(date, dateString) => handleUpdateDate(null, dateString, record)}
                />
                )
            },
            width: 200
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

    return (
        <Table
            loading={isLoading}
            className='customSmallTable'
            scroll={{ x: 1000 }}
            bordered={false}
            size="small"
            pagination={false}
            columns={defaultColumns}
            dataSource={tasks}
            footer={ () => FooterComp(hito) }
            rowKey={(record: any) => record.id}
        />
    )
}
