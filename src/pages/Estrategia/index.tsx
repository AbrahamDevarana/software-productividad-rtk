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
    status: string;
    progreso: React.ReactNode;
    fechaEntrega: string;
    objetivo: string;
    responsables: React.ReactNode;
};


export const EstrategíaHome = () => {

    const [columns, setColumns] = useState<ColumnsType<DataType>>([
        {
            title: 'Tareas',
            dataIndex: 'tareas',
            width: 80,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            width: 150,
        },
        {
            title: 'Progreso',
            dataIndex: 'progreso',
            width: 150,
        },
        {
            title: 'Fecha de Entrega',
            dataIndex: 'fechaEntrega',
            width: 150,
        },
        {
            title: 'Objetivo',
            dataIndex: 'objetivo',
            width: 150,
        },
        {
            title: 'Responsables',
            dataIndex: 'responsables',
            width: 150,
        },
    ]);

    const data: DataType[] = [
        {
            key: '1',
            tareas: 'Tarea 1',
            status: 'En Progreso',
            progreso: <Progress percent={30}  strokeColor={`${ useGetColorByStatus('success', 1).rgba }`} strokeWidth={15} trailColor={`${ useGetColorByStatus('success', .5).rgba }`} />,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 1',
            responsables: <Avatar.Group maxCount={2}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Avatar.Group>,
        },
        {
            key: '2',
            tareas: 'Tarea 2',
            status: 'En Progreso',
            progreso: <Progress percent={30}  strokeColor={`${ useGetColorByStatus('success', 1).rgba }`} strokeWidth={15} trailColor={`${ useGetColorByStatus('success', .5).rgba }`} />,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 2',
            responsables: <Avatar.Group maxCount={2}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />   
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Avatar.Group>,
        },
        {
            key: '3',
            tareas: 'Tarea 3',
            status: 'En Progreso',
            progreso: <Progress percent={30}  strokeColor={`${ useGetColorByStatus('success', 1).rgba }`} strokeWidth={15} trailColor={`${ useGetColorByStatus('success', .5).rgba }`} />,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 3',
            responsables: <Avatar.Group maxCount={2}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        </Avatar.Group>,
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
                        className='table-resizable'
                        columns={mergeColumns}
                        dataSource={data}
                        pagination={false}
                        components={{
                            header: {
                              cell: ResizableTitle,
                            },
                        }}
                    />
                </div>
            </div>
            <div className='rounded-l-ext gap-x-5 mt-5 flex flex-row'>
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
                        className='table-resizable'
                        columns={mergeColumns}
                        dataSource={data}
                        pagination={false}
                        components={{
                            header: {
                              cell: ResizableTitle,
                            },
                        }}
                    />
                </div>
            </div>
            <div className='rounded-l-ext gap-x-5 mt-5 flex flex-row'>
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
                        className='table-resizable'
                        columns={mergeColumns}
                        dataSource={data}
                        pagination={false}
                        components={{
                            header: {
                              cell: ResizableTitle,
                            },
                        }}
                    />
                </div>
            </div>
            <div className='rounded-l-ext gap-x-5 mt-5 flex flex-row'>
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
                        className='table-resizable'
                        columns={mergeColumns}
                        dataSource={data}
                        pagination={false}
                        components={{
                            header: {
                              cell: ResizableTitle,
                            },
                        }}
                    />
                </div>
            </div>
            <div className='rounded-l-ext gap-x-5 mt-5 flex flex-row'>
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
                        className='table-resizable'
                        columns={mergeColumns}
                        dataSource={data}
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
