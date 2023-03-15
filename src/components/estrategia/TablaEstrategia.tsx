import { Avatar, Drawer, Progress, Table } from 'antd';
import { useGetColorByStatus } from '@/hooks/useGetColorByStatus';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useResizable } from '@/hooks/useResizable';
import '@/assets/css/ResizableTable.css';
import { TableDataType } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getPerspectivaThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { EstrategiaDrawer } from './EstrategiaDrawer';



const status: any = {
    1 :'default',
    2 :'secondary',
    3 :'success',
    4 :'error',
    5 :'warning'
}

const statusString: any = {
    1 :'Sin Iniciar',
    2 :'En Proceso',
    3 :'Finalizado',
    4 :'Cancelado',
    5 :'Detenido'
}

export const TablaEstrategia = ({data, color}: any) => {

    const dispatch = useAppDispatch();

    const [columns, setColumns] = useState<ColumnsType<TableDataType>>([
        {
            title: 'Estategía',
            dataIndex: 'tareas',
            width: 200,
            ellipsis: true,
            render: (text, record, index) => ({
                props: {
                    className: 'border-l-primary',
                    style: { borderLeft: `5px solid ${useGetColorByStatus(status[record.status]).hex}`}
                },
                children: <div>{text}</div>,
            }),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 50,
            ellipsis: true,
            render: (text, record, index) => (
                <span style={{
                    color: useGetColorByStatus(status[record.status]).hex,
                }}>{statusString[record.status]}</span>
            ),
        },
        {
            title: 'Progreso',
            dataIndex: 'progreso',
            width: 150,
            render: (text, record, index) => (
                <Progress percent={record.progreso} strokeWidth={20} strokeColor={useGetColorByStatus(status[record.status]).hex} />
            ),
        },
        {
            title: 'Fecha de Entrega',
            dataIndex: 'fechaEntrega',
            ellipsis: true,
            width: 80,
        },
        {
            title: 'Objetivo',
            dataIndex: 'objetivo',
            width: 50,
            ellipsis: true,
        },
        {
            title: 'Responsables',
            width: 50,
            render: (text, record, index) => (
                <Avatar.Group maxCount={2}>
                    {record.responsables.map((responsable, index) => (
                        <Avatar key={index} src={responsable.picture} />
                    ))}
                </Avatar.Group>
            ),
            ellipsis: true,
        },
    ]);

    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const {mergeColumns, ResizableTitle} = useResizable(columns, setColumns);

    const handleViewEstrategia = (id:number) => {
        setShowDrawer(true)
    }
    const handleCloseDrawer = () => {
        setShowDrawer(false)
    }


    return (
        <>
            <Table
                size='small'
                className='table-resizable w-full'
                columns={mergeColumns}
                dataSource={data}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            handleViewEstrategia(record.id)                            
                        }
                    }}
                }
                pagination={false}
                components={{
                    header: {
                        cell: ResizableTitle,
                    },
                }}
            />
            <Drawer
                title={
                    <span className='text-white text-xl tracking-wider drop-shadow'>  F1 </span>
                }
                placement='right'
                closable={true}
                onClose={handleCloseDrawer}
                open={showDrawer}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                destroyOnClose={true}
                headerStyle={{
                    backgroundColor: color,
                }}
                className='rounded-2xl'
                contentWrapperStyle={{
                    borderRadius: '0 0 2rem 2rem',
                }}
            >
                <EstrategiaDrawer />
            </Drawer>
        </>
    )
}
