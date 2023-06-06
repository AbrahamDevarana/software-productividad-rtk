import { OperativoProps, ResultadoClaveProps } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Collapse, Form, Input, Table } from "antd";
import Loading from "../antd/Loading";
import { useEffect, useMemo } from "react";
import { getResultadosThunk } from "@/redux/features/resultados/resultadosThunk";
import type { ColumnsType } from 'antd/es/table';
import { createAccionThunk } from "@/redux/features/acciones/accionesThunk";
import { FaCog } from "react-icons/fa";

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
                    <div className={`border-2 rounded-full mr-2 ${record.status ? 'border-success' : 'border-error-light' }`} />
                    <p className='text-devarana-graph'>{record.nombre}</p>
                </div>,
            }),
        },{
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => ({
                children: <div className='flex'>
                    <div className={`rounded-full border mr-2 h-2 w-2 self-center ${record.status ? 'bg-success' : 'bg-error-light' }`} />
                    <p className='text-devarana-graph'>{record.status ? 'Completado' : 'Pendiente'}</p>
                </div>,
            }),
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
                        className="w-60"
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
