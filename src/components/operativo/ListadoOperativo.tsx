import { AccionesProps, OperativoProps, ResultadoClaveProps } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Checkbox, Collapse, DatePicker, Drawer, Form, Image, Input, MenuProps, Popconfirm, Table, Tooltip } from "antd";
import Loading from "../antd/Loading";
import { useEffect, useMemo, useRef, useState } from "react";
import { getResultadoThunk, getResultadosThunk } from "@/redux/features/resultados/resultadosThunk";
import type { ColumnsType } from 'antd/es/table';
import { createAccionThunk, deleteAccionThunk, updateAccionThunk } from "@/redux/features/acciones/accionesThunk";
import { FaCog } from "react-icons/fa";
import CustomDropdown from "../ui/CustomDropdown";
import { TabStatus } from "../ui/TabStatus";
import { BiTrash } from "react-icons/bi";
import { FormResultados } from "../resultados/FormResultados";
import { BsFillCalendarFill } from "react-icons/bs";
import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import dayjs from "dayjs";

interface Props {
    currentOperativo: OperativoProps,
    setVisible: (visible: boolean) => void
}

export default function ListadoOperativo({ currentOperativo, setVisible }: Props) {

    const { Panel } = Collapse;
    const dispatch = useAppDispatch()
    const { isLoading, resultadosClave } = useAppSelector(state => state.resultados)
    const [showDrawer, setShowDrawer] = useState(false)
    const inputRef = useRef(null);


    const handleOnUpdate = (e: any, record: AccionesProps) => {
        const query = {
            ...record,
            [e.target.name]: e.target.value,
        }

        console.log(query);
        
        dispatch(updateAccionThunk(query))
    }

    const handleUpdateDate = (fechaInicio: any, fechaFin: any, record: AccionesProps) => {
        const query = {
            ...record,
            fechaInicio: fechaInicio ? dayjs(fechaInicio, 'DD-MM-YYYY').format('YYYY-MM-DD 06:00:00') : record.fechaInicio,
            fechaFin: fechaFin ? dayjs(fechaFin, 'DD-MM-YYYY').format('YYYY-MM-DD 06:00:00') : record.fechaFin,
        }    
        dispatch(updateAccionThunk(query))
    }

    console.log(currentOperativo.fechaFin);
    


    const defaultColumns: ColumnsType<any> = [
        {
            title: () => ( <p className='tableTitlePrincipal'>Acción</p>),
            render: (text, record, index) => ({
                children: <div className='flex'>
                    <div className={`border-2 rounded-full mr-2 ${record.status ? 'border-success' : 'border-dark-light' }`} />
                    <Input name="nombre" className="border-none" defaultValue={record.nombre} ref={inputRef} onBlur={(e) => handleOnUpdate(e, record)} onPressEnter={(e) => e.currentTarget.blur()} />
                </div>,
            }),
        },
        {
            title: () => ( <p className='tableTitle'>Fecha Inicio</p>),
            render: (text, record, index) => {

                const disabledDate = (current: any): boolean => {
                    
                    
                    // Can not select days before currentOperativo.fechaInicio

                    return current && current < dayjs(currentOperativo.fechaInicio)
                }


                return ({
                    children: (
                        <DatePicker 
                            className='w-full'
                            defaultValue={ dayjs(record.fechaInicio) }
                            format={"DD-MM-YYYY"}
                            showToday
                            clearIcon={null}
                            disabledDate={disabledDate}
                            placeholder="Fecha Inicio"
                            bordered={false}
                            suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                            onChange={(date, dateString) => handleUpdateDate(dateString, null, record)}
                        />
                    ),
                })
            },
            width: 200,
        },
        {
            title: () => ( <p className='tableTitle'>Fecha Fin</p>),
            dataIndex: 'fechaFin',
            key: 'fechaFin',
            render: (text, record, index) => {

                const disabledDate = (current: any): boolean => {
                    return current && current < dayjs(record.fechaInicio)
                }
                
                return ({
                    children: (
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
                        />
                    ),
                })},
            width: 200,
        },
        {
            title: () => ( <p className='tableTitle'>Completado</p>),
            width: 20,
            render: (text, record, index) => ({
                children:
                        <Checkbox
                            defaultChecked={record.status}
                            onChange={(e) => handleUpdateStatus(record, e.target.checked ? 1 : 0)}
                        />
            }),
        },
        {
            title: () => ( <p className='tableTitle'>Acciones</p>),
            render: (text, record, index) => ({
                children: 
                <div className='flex items-center group-hover:opacity-100 group-hover:z-0 -z-50 opacity-0 transition-all duration-700'>
                    <Popconfirm
                        title="¿Estas seguro de eliminar esta accion?"
                        onConfirm={ () => handleDeleteAccion(record.id)}
                        onCancel={() => {}}
                        okText="Si"
                        cancelText="No"
                        placement="left"
                    >
                        <BiTrash className='text-default text-right hover:text-error-light text-xl cursor-pointer' />
                    </Popconfirm>
                    
                </div>,
                
            }),
            width: 20,
        }
    ]

    useEffect(() => {
        if (currentOperativo) {
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
        const handleCreateAccion = () => {
            const query = {
                ...form.getFieldsValue(),
                resultadoClaveId: resultadoClave.id
            }
            dispatch(createAccionThunk(query))
            form.resetFields()
        }
        return (
            <Form
                initialValues={{
                    ...resultadoClave,
                    nombre: '',
                }}
                form={form}
                onBlur={handleCreateAccion}
            >

                <Form.Item name="nombre" className="mb-0">
                    <Input placeholder="Nombre de la Accion"
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


    const genExtra = (id: string) => (
        <div
            className="cursor-pointer"
            onClick={event => {
                event.stopPropagation();
                handleShowOperativo(id)
            }}
        >
            <FaCog className="text-default text-sm" />
        </div>
    );


    //* FORM
    const handleDeleteAccion = (id: string) => {
        dispatch(deleteAccionThunk(id))
    }

    const handleUpdateStatus = async (accion: AccionesProps, status: number) => {
        const query = {
            ...accion,
            status
        }
        dispatch(updateAccionThunk(query))
    }

    //** FIN FORM */



    const handleCloseDrawer = () => {
        setShowDrawer(false)
    }

    const handleShowOperativo = async (id:string) => {
        await dispatch(getResultadoThunk(id))
        setShowDrawer(true)
        
    }

    if(isLoading) return ( <Loading /> )

    return (
        <>

            <Collapse 
                collapsible='header'
                defaultActiveKey={activeKey}
                ghost
            >

                {
                    resultadosClave.map((resultado: ResultadoClaveProps, index) => (
                        <Panel
                            key={index}
                            header={
                                <div className='flex justify-between items-center'>
                                    <p className='text-devarana-graph font-light font-roboto'>{resultado.nombre} {resultado.progreso}</p>
                                </div>
                            }
                            extra={genExtra(resultado.id)}
                        >
                            <Table 
                                loading={isLoading}
                                scroll={{ x: 1000 }}
                                className="customTable"
                                pagination={false}
                                bordered={false}
                                columns={defaultColumns}
                                dataSource={resultado.acciones}
                                rowKey={record => record.id}
                                footer={() => footerComponent(resultado)}
                                rowClassName={ (record, index) => {
                                    return 'group'
                                }}
                                onRow={(record: any, index: any) => {
                                    return {
                                        onClick: () => {
                                            setVisible(true)
                                        }
                                    }
                                }}
                            />
                        </Panel>
                    ))

                }
                

            </Collapse>

            <Drawer
                closable={false}
                onClose={handleCloseDrawer}
                destroyOnClose={true}
                open={showDrawer}
                width={window.innerWidth > 1200 ? 700 : '100%'}
                className='rounded-l-ext'
            >

                <FormResultados />
            </Drawer>
        </>
    )

    
};
