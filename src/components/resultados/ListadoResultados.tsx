import { AccionesProps, OperativoProps, ResultadoClaveProps } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Checkbox, Collapse, DatePicker, Drawer, Form, Image, Input, Popconfirm, Spin, Table, Tooltip } from "antd";
import Loading from "../antd/Loading";
import { useEffect, useMemo, useRef, useState } from "react";
import { createResultadoThunk, getResultadoThunk, getResultadosThunk } from "@/redux/features/resultados/resultadosThunk";
import type { ColumnsType } from 'antd/es/table';
import { createAccionThunk, deleteAccionThunk, updateAccionThunk } from "@/redux/features/acciones/accionesThunk";
import { FaCog } from "react-icons/fa";
import { BiTrash } from "react-icons/bi";
import { BsFillCalendarFill } from "react-icons/bs";
import dayjs from "dayjs";
import EmptyResultado from "./EmptyResultado";
import ResultadoClaveForm from "./NewFormResultados";
import { Link } from "react-router-dom";
import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { getUsuariosThunk } from "@/redux/features/usuarios/usuariosThunks";

interface Props {
    currentOperativo: OperativoProps,
    setVisible: (visible: boolean) => void
}

export default function ListadoResultados({ currentOperativo, setVisible }: Props) {

    const { Panel } = Collapse;
    const dispatch = useAppDispatch()
    const { isLoading, resultadosClave, isCreatingResultado } = useAppSelector(state => state.resultados)
    const inputRef = useRef(null);

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])

    const handleNuevoResultado = () => {
        dispatch(createResultadoThunk({operativoId: currentOperativo.id}))
    }

    const handleOnUpdate = (e: any, record: AccionesProps) => {
        const query = {
            ...record,
            [e.target.name]: e.target.value,
        }
        
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

    const defaultColumns: ColumnsType<AccionesProps> = [
        {
            title: () => ( <p className='tableTitlePrincipal'>Acciones</p>),
            render: (text, record, index) => ({
                children: <div className='flex'>
                    <div className={`border-2 rounded-full mr-2 ${record.status ? 'border-success' : 'border-dark-light' }`} />
                    <Input name="nombre" className="border-none" defaultValue={record.nombre} ref={inputRef} onBlur={(e) => handleOnUpdate(e, record)} onPressEnter={(e) => e.currentTarget.blur()} />
                </div>,
            }),
            width: 250,
        },
        {
            title: () => ( <p className='tableTitle'>Responsable</p>),
            render: (text, record, index) => {
                return <Link key={index} to={`/perfil/${record.propietario?.slug}`} className={`border-2 rounded-full`}>
                    <Tooltip title={`${record.propietario?.nombre} ${record.propietario?.apellidoPaterno}`} placement='top' key={index} >
                        <Avatar key={index} src={<Image src={`${getStorageUrl(record.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                            {record.propietario?.iniciales} 
                        </Avatar>
                    </Tooltip>
                </Link>

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
                            defaultChecked={record.status ===  1 ? true : false} 
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

    const genHeader = (resultado: any) => (
        <div onClick={ event => event.stopPropagation() }>
            <ResultadoClaveForm resultado={resultado} /> 
        </div>
    )

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


    if(isLoading) return ( <Loading /> )

    if(resultadosClave.length === 0) return ( <EmptyResultado handleCreate={handleNuevoResultado} /> )

    return (
        <>
        {
            isCreatingResultado && <div className="h-56 w-full relative flex items-center justify-center"><Spin size="large" /></div>
        }
            <Collapse 
                defaultActiveKey={activeKey}
                ghost
                // expandIcon={({ isActive }) => <div className="flex items-center justify-center"><FaCog className={`text-default text-sm ${isActive ? 'rotate-90' : ''}`} /></div>}
            >

                {
                    resultadosClave.map((resultado: ResultadoClaveProps, index) => (
                        <Panel
                            key={index}
                            header={genHeader(resultado) }
                            className="customResultadosPanel cursor-default"
                            collapsible="icon"
                            
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
        </>
    )

    
};
