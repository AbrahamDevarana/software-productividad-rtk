import { Avatar, Drawer, Progress, Table } from 'antd';
import { useGetColorByStatus } from '@/hooks/useGetColorByStatus';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useResizable } from '@/hooks/useResizable';
import '@/assets/css/ResizableTable.css';
import { Estrategico, TableDataType } from '@/interfaces';
import { useAppDispatch } from '../../redux/hooks';
import { EstrategiaView } from './EstrategiaView';
import dayjs from 'dayjs';
import { Icon } from '../Icon';
import { Perspectiva } from '../../interfaces/perspectiva';




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

export const TablaEstrategia = ({perspectiva}: {perspectiva:Perspectiva}) => {

    const {color } = perspectiva
    
    const dispatch = useAppDispatch();

    // const [dataSource, setDataSource] = useState<TableDataType[]>();
    const [estrategico, setEstrategico] = useState<Estrategico>({
        id: '',
        clave: '',
        nombre: '',
        descripcion: '',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        progreso: 0,
        perspectivas: [],
        status: 1,
    });

    const [columns, setColumns] = useState<ColumnsType<TableDataType>>([
        {
            title: 'Estategía',
            width: 150,
            ellipsis: true,
            render: (text, record, index) => ({
                props: {
                    className: 'border-l-primary',
                    style: { borderLeft: `5px solid ${useGetColorByStatus(status[record.status]).hex}`}
                },
                children: <div>{record.nombre}</div>,
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
            render: (text, record, index) => record.fechaFin ? `${dayjs(record.fechaFin, 'YYYY-MM-DD').locale('es').format('D MMMM YYYY')}` : 'No especificado',
        },
        {
            title: 'Responsables',
            width: 50,
            render: (text, record, index) => (
                <></>
                // <Avatar.Group maxCount={2}>
                //     {record.responsables.map((responsable, index) => (
                //         <Avatar key={index} src={responsable.picture} />
                //     ))}
                // </Avatar.Group>
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
                <EstrategiaView estrategico={estrategico} perspectiva={perspectiva}/>
            </Drawer>
        </>
    )
}
