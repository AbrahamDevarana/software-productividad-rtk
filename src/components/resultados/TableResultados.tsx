import { OperativoProps, ResultadoClaveProps, TaskProps } from '@/interfaces';
import { Avatar, Collapse, Image, Input, Tooltip, Table, Form, DatePicker, Popover, Popconfirm, message } from 'antd';
import { useMemo, useRef } from 'react'
import ResultadoClaveForm from './FormResultado';
import { ColumnsType } from 'antd/es/table';
import { getColor, getStorageUrl } from '@/helpers';
import { Link } from 'react-router-dom';
import getBrokenUser from '@/helpers/getBrokenUser';
import { createTaskThunk, deleteTaskThunk, updateTaskThunk } from '@/redux/features/tasks/tasksThunk';
import { useAppDispatch } from '@/redux/hooks';
import dayjs from "dayjs";
import { BsFillCalendarFill, BsThreeDots } from 'react-icons/bs';
import { PopoverPrioridad } from './PopoverPrioridad';
import { Prioridad, styles, taskStatusTypes } from '@/types';
import { PopoverEstado } from './PopoverEstado';
import { TaskProgress, TaskCheckbox } from '../tasks';
import { BiTrash } from 'react-icons/bi';


interface TableResultadosProps {
    resultadoClave: ResultadoClaveProps;
    isClosed: boolean;
    currentOperativo: OperativoProps;
    isLoading: boolean;
}

export const TableResultados = ({currentOperativo, resultadoClave, isClosed, isLoading}: TableResultadosProps) => {
    const dispatch = useAppDispatch()
    const { Panel } = Collapse;
    const { year, quarter } = currentOperativo
    const [messageApi, contextHolder] = message.useMessage();
    const inputRef = useRef(null);

    const defaultColumns: ColumnsType<TaskProps> = [
        {
            title: () => ( <p className='tableTitlePrincipal'>Acciones</p>),
            render: (text, record, index) => {
                return (
                    <div className='flex'>
                        <div className='border-2 rounded-full mr-2 h-10' style={{ borderColor: getColor(record.status).color }}/> 
                        <Input name="nombre" className="border-none disabled:bg-transparent" defaultValue={record.nombre} ref={inputRef} onBlur={(e) => handleOnUpdate(e, record)} onPressEnter={(e) => e.currentTarget.blur()} 
                            onFocus={(e) => { e.currentTarget.select() }} disabled={isClosed}
                        />
                    </div>
                )
            },
        },
        {
            title: () => ( <p className='tableTitle text-right'>Responsable</p>),
            render: (text, record, index) => {
                return (
                  <div className="flex justify-end">
                      <Link key={index} to={`/perfil/${record.propietario?.slug}`} className={`rounded-full`}>
                        <Tooltip title={`${record.propietario?.nombre} ${record.propietario?.apellidoPaterno}`} placement='top' key={index} >
                            <Avatar key={index} src={<Image src={`${getStorageUrl(record.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                {record.propietario?.iniciales} 
                            </Avatar>
                        </Tooltip>
                    </Link>
                  </div>
                )

            },
            width: 100,
        },
        {
            title: () => ( <p className='tableTitle text-right'>Fecha Fin</p>),
            dataIndex: 'fechaFin',
            key: 'fechaFin',
            render: (text, record, index) => {

                const disabledDate = (current: any) => {
                    const month = quarter * 3 - 2    
                    const startDate = dayjs(`${year}-${month}-01`)
                    const endDate = startDate.add(3, 'month').subtract(1, 'day')
                    return current < startDate || current > endDate;
                }
                
                return (
                <DatePicker 
                    className='w-full' 
                    format={"DD-MM-YYYY"}
                    defaultValue={ dayjs(record.fechaFin)  }
                    showToday
                    clearIcon={null}
                    disabledDate={disabledDate}
                    placeholder="Fecha Fin"
                    bordered={false}
                    name="fechaFin"
                    suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    onChange={(date, dateString) => handleUpdateDate(null, dateString, record)}
                    disabled={isClosed}
                />
            )},
            width: 170,
        },
        {
            title: () => ( <p className='tableTitle text-right'>Prioridad</p>),
            render: (text, record, index) => {
                return ( 
                    <Popover
                        title={ <p className='text-center text-devarana-graph'>Prioridad</p> }
                        trigger={"click"}
                        content={
                            <PopoverPrioridad current={record} dispatchFunction={updateTaskThunk} isClosed={isClosed}/>
                        }
                    >
                            <div
                                className="flex items-center justify-center py-1 rounded-sm cursor-pointer text-white font-medium drop-shadow-sm"
                                style={{
                                    backgroundColor: styles[record.prioridad as Prioridad]
                                }}
                            >
                                { record.prioridad }
                            </div>
                    </Popover>
            ) 
            },
            width: 120,
        },
        {
            title: () => ( <p className='tableTitle text-right'>Estatus</p>),
            render: (text, record, index) => {
                return ( 
                    <Popover
                        title={ <p className='text-center text-devarana-graph'>Estatus</p> }
                        content= {
                            <PopoverEstado current={record} dispatchFunction={updateTaskThunk} isClosed={isClosed}/>
                        }
                        trigger={'click'}
                    >
                            <div className="flex items-center justify-end gap-2 py-1 cursor-pointer">
                                <div className={`shadow`}
                                    style={{
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '25%',
                                        backgroundImage: `linear-gradient(to right, ${getColor(record.status).lowColor}, ${getColor(record.status).color})`,
                                    }}
                                >  </div>
                                <p className='text-right py-1' style={{
                                    color: getColor(record.status).color
                                }}>  { taskStatusTypes[record.status] } </p>
                            </div>  

                    </Popover>
                ) 
            },
            width: 120,
        },
        {
            title: () => ( <p className='tableTitle text-right'>Avance</p>),
            render: (text, record, index) => {
                return (
                    <div className="flex justify-end">
                        <TaskProgress record={record} disabled={isClosed}/>
                    </div>
                )
            },
            width: 200,
        },
        {
            title: () => ( <p className='tableTitle text-right'>Completado</p>),
            render: (text, record, index) => {
                return (
                    <div className="flex justify-end">
                        <TaskCheckbox record={record} disabled={isClosed}/>  
                    </div>
                )
            },
            width: 50,
        },
        {
            title: () => ( <p className='tableTitle text-right'>Acciones</p>),
            render: (text, record, index) => {
                return (
                    <Popover
                        trigger={'click'}
                        content={
                            <div className="">
                                <Popconfirm
                                    disabled={isClosed}
                                    title="¿Estas seguro de eliminar esta acción?"
                                    onConfirm={ () => handleDeleteTask(record.id)}
                                    onCancel={() => {}}
                                    okText="Si"
                                    cancelText="No"
                                    placement="left"
                                    okButtonProps={{
                                        className: 'rounded-full mr-2 bg-primary'
                                    }}
                                    cancelButtonProps={{
                                        className: 'rounded-full mr-2 bg-error-light text-white'
                                    }}
                                >
                                    <BiTrash className='text-default text-right hover:text-error-light text-xl cursor-pointer' />
                                </Popconfirm>
                            </div>
                        }
                    >
                            <BsThreeDots className='text-devarana-graph text-xl ml-auto' />
                    </Popover>
                )
            },
            width: 50,
        }
    ]

    const handleOnUpdate = (e: any, record: TaskProps) => {
        const query = {
            ...record,
            [e.target.name]: e.target.value,
        }
        
        dispatch(updateTaskThunk(query))
    }

    const handleUpdateDate = (fechaInicio: any, fechaFin: any, record: TaskProps) => {
        const query = {
            ...record,
            fechaFin: fechaFin ? dayjs(fechaFin, 'DD-MM-YYYY').format('YYYY-MM-DD 06:00:00') : record.fechaFin,
        }    
        dispatch(updateTaskThunk(query))
    }

    const handleDeleteTask = async (id: number) => {
        await dispatch(deleteTaskThunk(id)).unwrap().then(() => {
            messageApi.success('Acción eliminada.')
        }).catch((err) => {
            messageApi.error('Hubo un error al eliminar la acción.')
        })
    }

    const genHeader = (resultado: any) => (
        <div onClick={ event => event.stopPropagation() }>
            <ResultadoClaveForm resultado={resultado} isClosed={isClosed} currentOperativo={currentOperativo}/>
        </div>
    )

    const footerComponent = (resultadoClave: ResultadoClaveProps) => {

        const [form] = Form.useForm();
        const handleCreateTask = () => {
            const query = {
                ...form.getFieldsValue(),
                taskeableId: resultadoClave.id
            }
            dispatch(createTaskThunk(query))
            form.resetFields()
        }
        return (
            <Form
                initialValues={{
                    ...resultadoClave,
                    nombre: '',
                }}
                form={form}
                onBlur={handleCreateTask}
            >

                <Form.Item name="nombre" className="mb-0">
                    <Input placeholder="Crear Nueva Acción"
                        onPressEnter={
                            (e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                e.currentTarget.blur()
                            }
                        }
                        className="min-w-[350px] w-min"
                    />
                </Form.Item>
                
            </Form>
        )
    }

    const sortedTasks = useMemo(() => {
        // Función de comparación para ordenar las tareas
        const compareTasks = (a:any, b:any) => {
          // Coloca las tareas SIN_INICIAR primero
          if (a.status === 'SIN_INICIAR' && b.status !== 'SIN_INICIAR') {
            return -1;
          }
          // Coloca las tareas FINALIZADAS al final
          if (a.status === 'FINALIZADO' && b.status !== 'FINALIZADO') {
            return 1;
          }
          // Mantén el orden original en caso de que el estado sea el mismo
          return 0;
        };
    
        // Copia el arreglo original para no modificar el estado directamente
        const tasksCopy = [...resultadoClave.task];
    
        // Ordena el arreglo utilizando la función de comparación
        tasksCopy.sort(compareTasks);
    
        return tasksCopy;
    }, [resultadoClave.task]);
      

  return (
    <>
        {
            contextHolder
        }
        <Panel
            key={resultadoClave.id}
            header={genHeader(resultadoClave) }
            className="customResultadosPanel"
            collapsible="icon"
            id={`resultado-${resultadoClave.id}`}
        >
            <Table 
                loading={isLoading}
                scroll={{ x: 1000 }}
                className="customTable"
                pagination={false}
                bordered={false}
                columns={defaultColumns}
                dataSource={sortedTasks}
                rowKey={record => record.id}
                footer={() => (
                    isClosed ? null : footerComponent(resultadoClave)
                )}
                rowClassName={ (record, index) => {
                    return 'group'
                }}
            />
        </Panel>
    </>
  )
}
