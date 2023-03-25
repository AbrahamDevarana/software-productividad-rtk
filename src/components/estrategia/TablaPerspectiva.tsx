import { Avatar, Drawer, Progress, Table } from 'antd';
import { useGetColorByStatus } from '@/hooks/useGetColorByStatus';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useResizable } from '@/hooks/useResizable';
import '@/assets/css/ResizableTable.css';
import { Estrategico, Perspectiva } from '@/interfaces';
import { EstrategiaView } from './EstrategiaView';
import dayjs from 'dayjs';
import { Icon } from '../Icon';
import { status, statusString } from '@/helpers/status';
import { ProgressBar } from '../ui/Progress';



export const TablaEstrategia = ({perspectiva}: {perspectiva:Perspectiva}) => {

    const {color } = perspectiva

    console.log(perspectiva);
    
    
    const [estrategico, setEstrategico] = useState<Estrategico>({
        id: '',
        clave: '',
        nombre: '',
        descripcion: '',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        progreso: 0,
        perspectivas: [],
        responsables: [],
        status: 1,
    });

    const [columns, setColumns] = useState<ColumnsType<Estrategico>>([
        {
            title: 'Objetivos',
            width: 150,
            ellipsis: true,
            render: (text, record, index) => ({
                children: <div className='flex'> 
                <div className='border-2 rounded-full mr-2' style={{ borderColor: useGetColorByStatus(status[record.status]).rgba }}/> 
                    <p className='text-default'>{record.nombre}</p>
                </div>,
            }),
        },
        {
            title: 'Tácticos',
            width: 40,
            ellipsis: true,
            render: (text, record, index) => ( <p className='text-default'> 0 </p>   ),
        },
        {
            title: 'Estatus',
            dataIndex: 'status',
            width: 50,
            ellipsis: true,
            render: (text, record, index) => (
                <span className='font-semibold'
                 style={{
                    color: useGetColorByStatus(status[record.status]).hex,
                }}>{statusString[record.status]}</span>
            ),
        },
        {
            title: 'Progreso',
            dataIndex: 'progreso',
            width: 100,
            render: (text, record, index) => (
                <Progress 
                    className='drop-shadow progressStyle' percent={record.progreso} strokeWidth={20} 
                    strokeColor={{
                        from: useGetColorByStatus(status[record.status]).hex,
                        to: useGetColorByStatus(status[record.status]).hexLow,
                    }}
                    trailColor={useGetColorByStatus(status[record.status], .3).rgba} 
                />
            ),
        },
        {
            title: 'Responsables',
            width: 50,
            render: (text, record, index) => (
                <Avatar.Group maxCount={3} key={index}>
                    {record.responsables?.map((responsable, index) => (
                        <span key={index} className='z-50' >
                            <Avatar src={`https://i.pravatar.cc/300`}   onClick={
                                (e) => {
                                    e?.stopPropagation();
                                }
                            } />
                        </span>
                    ))}
                </Avatar.Group>
            ),
            ellipsis: true,
        },
    ]);

    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const {mergeColumns, ResizableTitle} = useResizable(columns, setColumns);

    const handleViewEstrategia = (record:Estrategico) => {
        setEstrategico(record)
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
                loading={ perspectiva.objetivo_estr?.length === 0 ? true : false }
                columns={mergeColumns}
                dataSource={perspectiva.objetivo_estr}
                rowKey={(record) => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            handleViewEstrategia(record)                            
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
                    <span className='text-white text-xl tracking-wider drop-shadow'>  {estrategico?.clave} </span>
                }
                placement='right'
                closable={true}
                closeIcon={
                    <Icon iconName="faAngleLeft" className='text-white' />
                }
                onClose={handleCloseDrawer}
                open={showDrawer}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                destroyOnClose={true}
                headerStyle={{
                    backgroundColor: color,
                }}
                className='rounded-l-ext'
            >
                <EstrategiaView estrategico={estrategico} perspectiva={perspectiva} edit={true} view={true} setShowDrawer={setShowDrawer}/>
            </Drawer>
        </>
    )
}
