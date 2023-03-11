import Box from '../../components/ui/Box';
import { Icon } from '../../components/Icon';
import { Table, Progress, Avatar } from 'antd';
import { useGetColorByStatus } from '../../hooks/useGetColorByStatus';
import { DateTime } from 'luxon';


import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';

import '@/assets/css/ResizableTable.css';
import { useResizable } from '../../hooks/useResizable';

type DataType = {
    key: React.Key;
    tareas: string;
    status: number;
    progreso: number
    fechaEntrega: string;
    objetivo: string;
    responsables: {
        picture: string;
    }[]
};

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


export const EstrategíaHome = () => {

    const [columns, setColumns] = useState<ColumnsType<DataType>>([
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



    const data: DataType[] = [
        {
            key: '1',
            tareas: 'Estrategía 1',
            status: 1, 
            progreso: 0,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 1',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },
        {
            key: '2',
            tareas: 'Estrategía 2',
            status: 2, 
            progreso: 20,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 2',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },
        {
            key: '3',
            tareas: 'Estrategía 3',
            status: 3,
            progreso: 100,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 3',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },
        {
            key: '4',
            tareas: 'Estrategía 4',
            status: 4,
            progreso: 35,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 4',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },
        {
            key: '5',
            tareas: 'Estrategía 5',
            status: 5,
            progreso: 76,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 5',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },

    ]   

    const {mergeColumns, ResizableTitle} = useResizable(columns, setColumns);

    return (
        <>
            <div className='rounded-l-ext gap-x-5 flex flex-row'>
                <div className='flex shadow'>
                    <div className='bg-devarana-blue rounded-l-ext min-h-[120px] h-full flex flex-col justify-center items-center w-10'>
                        <h1 className='inline-block transform -rotate-90 text-white font-normal tracking-wider py-2'>Estrategia</h1>
                    </div>
                    <div className='bg-white flex justify-center items-center flex-col align-middle min-w-[160px]'>
                        <Icon iconName='faChartLine' className='text-devarana-graph text-5xl' />
                        <p className='text-devarana-graph'>Ver más...</p>
                    </div>
                </div>
                <div className='bg-white p-5 w-full shadow'>
                    <Table
                        size='small'
                        className='table-resizable'
                        columns={mergeColumns}
                        dataSource={data}
                        showHeader={true}
                        pagination={false}
                        components={{
                            header: {
                              cell: ResizableTitle,
                            },
                        }}
                    />
                </div>
            </div>
        </>
    )
}
