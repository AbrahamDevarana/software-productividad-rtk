import { getColor, getStatus, getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { HitosProps, TaskProps } from "@/interfaces";
import { useCreateTaskMutation, useGetTasksQuery } from "@/redux/features/tasks/tasksThunk";
import { Avatar, Form, Image, Input, message, Popover, Table, Tooltip } from "antd"
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

interface TablaHitosProps {
    hito: HitosProps;
}

const taskeableType = "HITO"

export const TablaTask = ({ hito }: TablaHitosProps) => {

    const [open, setOpen] = useState(false);
    const [selectedHito, setSelectedHito] = useState<HitosProps | null>(null)
    const {data: tasks, isLoading} = useGetTasksQuery({taskeableId: hito.id}, {skip: !hito.id})
    const [ createTask, { isLoading: isCreatingTask, error: createTaskError } ] = useCreateTaskMutation()

    const handleView = (record: TaskProps) => {
        console.log(record)
    }


    const defaultColumns:ColumnsType<TaskProps> = [
        {
            title: () => ( <p className='tableTitlePrincipal'>Actividad</p>),
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record, index) => ({
                children: <div className='flex'> 
                <div className='border-2 rounded-full mr-2' style={{ borderColor: getColor(record.status).color }}/> 
                    <p className='text-devarana-graph'>{record.nombre}</p>
                </div>,
            }),
        },
        {
            title: () => ( <p className='tableTitle text-right'>Creado</p>),
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text, record, index) => (
                <div className='w-full text-devarana-graph'>
                    { <span className='text-devarana-graph font-light'>{dayjs(record.createdAt).format('DD MMM YY')} </span>  }
                </div>
            ),
            width: 100
        },
        
        {
            title: () => ( <p className='tableTitle text-right'>Responsable</p>),
            key: 'usuariosTarea',
            render: (text, record, index) => (
                <div className='w-full text-devarana-graph'>
                    <Avatar.Group maxCount={3}>
                        <Tooltip title={record.propietario?.nombre + ' ' + record.propietario?.apellidoPaterno} key={record.propietario?.id} className='relative'>
                             <Avatar key={record.id} src={<Image src={`${getStorageUrl(record.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                {record.propietario?.iniciales} 
                            </Avatar>
                        </Tooltip>
                    </Avatar.Group>
                </div>
            ),
            width: 100,
        },  
        {
            title: () => ( <p className='tableTitle text-right'>Estatus</p>),
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <div className='w-full' style={{
                    color: getColor(status).color,
                }}>
                    { getStatus(status) }
                </div>
            ),
            width: 120
        },
        {
            title: () => ( <p className='tableTitle text-right'>Fecha Cierre</p>),
            dataIndex: 'fechaFin',
            key: 'fecha',
            render: (fechaFin: string | Date | null) => (
                <div className='w-full text-devarana-graph'>
                    { 
                        fechaFin 
                        ? <span className='text-devarana-graph font-light'>{dayjs(fechaFin).format('DD MMM YY')} </span> 
                        : <span className='text-devarana-graph font-light'>No Asignado</span> 
                    }
                </div>
            ),
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
                        open={open}
                        content={
                            <>
                                <div>
                                    <button onClick={ () => handleView(record) } className='flex items-center text-devarana-graph'>
                                        <FaEdit className='text-devarana-graph text-xl' />
                                    </button>
                                </div>
                            </>
                        }
                    >
                            <BsThreeDots className='text-devarana-graph text-xl ml-auto' />
                    </Popover>
                )
            },
            width: 50,
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
