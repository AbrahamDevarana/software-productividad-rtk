import { OperativoProps, ResultadoClaveProps } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Collapse, Table } from "antd";
import Loading from "../antd/Loading";
import { useEffect, useMemo } from "react";
import { getResultadosThunk } from "@/redux/features/resultados/resultadosThunk";
import type { ColumnsType } from 'antd/es/table';

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
                    <div className='border-2 rounded-full mr-2' style={{ borderColor: 'red' }} />
                    <p className='text-devarana-graph'>{record.nombre}</p>
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
