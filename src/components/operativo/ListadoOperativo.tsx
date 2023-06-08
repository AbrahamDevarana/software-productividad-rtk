import { AccionesProps, OperativoProps, ResultadoClaveProps } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Collapse, Form, Input, Popconfirm, Table } from "antd";
import Loading from "../antd/Loading";
import { useEffect, useMemo, useState } from "react";
import { getResultadosThunk } from "@/redux/features/resultados/resultadosThunk";
import type { ColumnsType } from 'antd/es/table';
import { createAccionThunk, deleteAccionThunk, updateAccionThunk } from "@/redux/features/acciones/accionesThunk";
import { FaCog } from "react-icons/fa";
import CustomDropdown from "../ui/CustomDropdown";
import { TabStatus } from "../ui/TabStatus";
import { BsThreeDots } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";

interface Props {
    currentOperativo: OperativoProps,
    setVisible: (visible: boolean) => void
}

export default function ListadoOperativo({ currentOperativo, setVisible }: Props) {

    const { Panel } = Collapse;
    const dispatch = useAppDispatch()
    const { isLoading, resultadosClave } = useAppSelector(state => state.resultados)
    

    const defaultColumns: ColumnsType<any> = [
        {
            title: 'Accion',
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record, index) => ({
                children: <div className='flex'>
                    <div className={`border-2 rounded-full mr-2 ${record.status ? 'border-success' : 'border-dark-light' }`} />
                    <p className='text-devarana-graph'>{record.nombre}</p>
                </div>,
            }),
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => ({
                children: 
                 <CustomDropdown 
                    buttonChildren={ <TabStatus status={ record.status ? 'FINALIZADO' : 'SIN_INICIAR' } /> }
                    buttonClass={''}
                >

                    <div className="w-full flex flex-col">
                        <button className="hover:bg-default hover:bg-opacity-20 transition-colors duration-200" onClick={() => handleUpdateStatus(record, false)}>
                            <TabStatus status={'SIN_INICIAR'} />
                        </button>
                        <button className="hover:bg-default hover:bg-opacity-20 transition-colors duration-200" onClick={() => handleUpdateStatus(record, true)}>
                            <TabStatus status={'FINALIZADO'} />
                        </button>
                    </div>
                 </CustomDropdown>
            }),
        },
        {
            title: '',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (text, record, index) => ({
                children: 
                <div className='flex items-center group-hover:opacity-100 group-hover:z-0 -z-50 opacity-0 transition-all duration-700'>
                    <Popconfirm
                        title="¿Estas seguro de eliminar esta accion?"
                        onConfirm={ () => handleDeleteAccion(record.id)}
                        onCancel={() => console.log('cancel')}
                        okText="Si"
                        cancelText="No"
                        placement="left"
                         
                    >
                        <BiTrash className='text-default hover:text-error-light text-xl cursor-pointer' />
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


    const genExtra = () => (
        <div
            onClick={event => {
                // If you don't want click extra trigger collapse, you can prevent this:
                event.stopPropagation();
            }}
        >
            <FaCog className="text-default text-sm" />
        </div>
    );


    const handleDeleteAccion = (id: string) => {
        dispatch(deleteAccionThunk(id))
    }

    const handleUpdateStatus = (accion: AccionesProps, status: boolean) => {
        
        const query = {
            ...accion,
            status
        }

        dispatch(updateAccionThunk(query))
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
                                    <p className='text-devarana-graph font-bold'>{resultado.nombre}</p>
                                </div>
                            }
                            extra={genExtra()}
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
