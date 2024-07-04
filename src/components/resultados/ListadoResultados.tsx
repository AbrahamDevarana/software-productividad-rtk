import { OperativoProps, ResultadoClaveProps, TaskProps } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Avatar, Checkbox, Collapse, DatePicker, Form, Image, Input, Popconfirm, Popover, Select, Spin, Table, Tooltip, message } from "antd";
import Loading from "../antd/Loading";
import { useEffect, useMemo, useRef, useState } from "react";
import { createResultadoThunk, getResultadosThunk } from "@/redux/features/resultados/resultadosThunk";
import type { ColumnsType } from 'antd/es/table';
import { createTaskThunk, deleteTaskThunk, updateTaskThunk } from "@/redux/features/tasks/tasksThunk";
import { BiTrash } from "react-icons/bi";
import { BsFillCalendarFill, BsThreeDots } from "react-icons/bs";
import dayjs from "dayjs";
import EmptyResultado from "./EmptyResultado";
import ResultadoClaveForm from "./FormResultado";
import { Link } from "react-router-dom";
import { getColor, getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { getUsuariosThunk } from "@/redux/features/usuarios/usuariosThunks";
import { PopoverPrioridad } from "./PopoverPrioridad";
import { Prioridad, styles, taskStatusTypes } from "@/types";
import { PopoverEstado } from "./PopoverEstado";
import { TaskProgress } from "../tareas/TaskProgressBar";
import { TaskCheckbox } from "../tareas/TaskCheckbox";


interface Props {
    currentOperativo: OperativoProps,
    isClosed: boolean
}

const taskeableType = "RESULTADO_CLAVE"

export default function ListadoResultados({ currentOperativo, isClosed }: Props) {

    const { Panel } = Collapse;
    const dispatch = useAppDispatch()
    const { isLoading, resultadosClave, isCreatingResultado } = useAppSelector(state => state.resultados)
    const inputRef = useRef(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [ sort, setSort ] = useState<string>('default')
    const [ filter, setFilter ] = useState<string>('')
    const { year, quarter, status } = currentOperativo


    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])

    const handleNuevoResultado = async () => {
        await dispatch(createResultadoThunk({operativoId: currentOperativo.id})).unwrap().then((data) => {
            message.success('Resultado creado correctamente')
            const element = document.getElementById(`resultado-${data.id}`)
            element?.classList.add('ant-collapse-item-active')
            element?.scrollIntoView({behavior: 'smooth'})
        
        }).catch((err) => {
            message.error('Hubo un error al crear el resultado')
        })
    }

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

    useEffect(() => {
        if (currentOperativo.id !== '') {
            dispatch(getResultadosThunk(currentOperativo.id))
        }
    }, [currentOperativo])
    

    const activeKey = useMemo(() => {
        if (resultadosClave.length > 0) {
            return resultadosClave.map((resultado: ResultadoClaveProps, index) => index)
        }
        return []
    }, [resultadosClave])


    const footerComponent = (resultadoClave: ResultadoClaveProps) => {

        const [form] = Form.useForm();
        const handleCreateTask = () => {
            const query = {
                ...form.getFieldsValue(),
                taskeableId: resultadoClave.id,
                taskeableType
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

    const genHeader = (resultado: any) => (
        <div onClick={ event => event.stopPropagation() }>
            <ResultadoClaveForm resultado={resultado} isClosed={isClosed} currentOperativo={currentOperativo}/>
        </div>
    )

    const handleDeleteTask = async (id: number) => {
        await dispatch(deleteTaskThunk(id)).unwrap().then(() => {
            messageApi.success('Acción eliminada.')
        }).catch((err) => {
            messageApi.error('Hubo un error al eliminar la acción.')
        })
    }
    

    const handleUpdateStatus = async (task: TaskProps, status: any) => {
        const query = {
            ...task,
            status
        }
        dispatch(updateTaskThunk(query))
    }

    const sortedTasks = (resultado: ResultadoClaveProps) => {
        // Función de comparación para ordenar las tareas
           const compareTasks = (a:any, b:any) => {
               // Coloca las tareas SIN_INICIAR primero
               if (a.status === 'SIN_INICIAR' && b.status !== 'SIN_INICIAR') {
               return -1;
               }
               if (a.status === 'EN_PROCESO' && b.status === 'EN_PROCESO') {
                return b.progreso - a.progreso;
              }
               // Coloca las tareas FINALIZADAS al final
               if (a.status === 'FINALIZADO' && b.status !== 'FINALIZADO') {
                return 1;
               }
               if (a.status === 'CANCELADO' && b.status !== 'CANCELADO') {
                return 1;
              }
               // Mantén el orden original en caso de que el estado sea el mismo
               return 0;
           };
           // Copia el arreglo original para no modificar el estado directamente
           const tasksCopy = [...resultado.task];
           // Ordena el arreglo utilizando la función de comparación
           tasksCopy.sort(compareTasks);
           return tasksCopy;
   }

   const normalizeString = (str: string) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    const filteredAndSortedResultados = useMemo(() => {
        let resultados = [...resultadosClave];

        if (filter) {
            const normalizedSearchTerm = normalizeString(filter.toLowerCase());
            resultados = resultados.filter(resultado =>
                normalizeString(resultado.nombre.toLowerCase()).includes(normalizedSearchTerm)
            );
        }

        if (sort) {
            resultados.sort((a, b) => {
                if (sort === 'alphabetic-asc') {
                    return a.nombre.localeCompare(b.nombre);
                }else if (sort === 'alphabetic-desc') {
                    return b.nombre.localeCompare(a.nombre);
                }
                return 0;
            });
        }

        return resultados;
    }, [resultadosClave, filter, sort]);

    if(isLoading) return ( <Loading /> )
    if(resultadosClave.length === 0) return ( <EmptyResultado handleCreate={handleNuevoResultado} /> )

    return (
        <>
            <div className="flex gap-x-5 max-w-5xl w-full ml-auto justify-end">
                <Select placeholder="Ordenar por" className="w-[200px] text-devarana-graph" onChange={(value) => setSort(value)} value={sort}>
                    <Select.Option value="default"> <p className="text-devarana-graph"> Sin Ordenar </p></Select.Option>
                    <Select.Option value="alphabetic-asc"> <p className="text-devarana-graph"> Nombre: Ascendente </p></Select.Option>
                    <Select.Option value="alphabetic-desc"> <p className="text-devarana-graph"> Nombre: Descendente </p></Select.Option>
                </Select>
                <Input allowClear placeholder="Buscar Resultado Clave"   className="w-[300px]" onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <Collapse 
                defaultActiveKey={activeKey}
                ghost
            >

                {
                    filteredAndSortedResultados.map((resultado: ResultadoClaveProps, index) => {

                        const tasks = sortedTasks(resultado)
                        return (
                            <Panel
                                key={resultado.id}
                                header={genHeader(resultado) }
                                className="customResultadosPanel"
                                collapsible="icon"
                                id={`resultado-${resultado.id}`}
                            >
                                
                                <Table 
                                    loading={isLoading}
                                    scroll={{ x: 1000 }}
                                    className="customTable"
                                    pagination={false}
                                    bordered={false}
                                    columns={defaultColumns}
                                    dataSource={tasks}
                                    rowKey={record => record.id}
                                    footer={() => (
                                        isClosed ? null : footerComponent(resultado)
                                    )}
                                    rowClassName={ (record, index) => {
                                        return 'group'
                                    }}
                                />
                            </Panel>
                        )
                    })

                }
                

            </Collapse>
            {
                contextHolder
            }
            {
                isCreatingResultado && <div className="h-56 w-full relative flex items-center justify-center"><Spin size="large" /></div>
            }
        </>
    )

    
};
