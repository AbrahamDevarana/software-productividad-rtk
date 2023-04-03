import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import {Avatar, Drawer, Progress, Table} from 'antd';
import { useGetColor } from '@/hooks/useGetColor';
import {  statusString } from '@/helpers/status';
import '@/assets/css/ResizableTable.css';
import { useResizable } from '@/hooks/useResizable';
import { TacticoProps } from '@/interfaces/tacticos';
import { TacticosView } from './TacticosView';
import { FormTactico } from './FormTacticos';

interface TablaTacticosProps {
    tacticos?: TacticoProps[]
}

export const TablaTacticos = ({tacticos}:TablaTacticosProps) => {

    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [currentTactico, setCurrentTactico] = useState<TacticoProps | null>(null);

    const [columns, setColumns] = useState<ColumnsType<TacticoProps>>([
        {
            title: 'Objetivos',
            width: 150,
            ellipsis: true,
            render: (text, record, index) => ({
                children: <div className='flex'> 
                <div className='border-2 rounded-full mr-2' style={{ borderColor: useGetColor(record.status)?.rgba }}/> 
                    <p className='text-default'>{record.nombre}</p>
                </div>,
            }),
        },
        {
            title: 'Resultados Clave',
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
                    color: useGetColor(record.status)?.hex,
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
                        from: useGetColor(record.status)?.hex || '#108ee9',
                        to: useGetColor(record.status)?.hexLow || '#87d068',
                    }}
                    trailColor={useGetColor(record.status, .3)?.rgba} 
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

    const {mergeColumns, ResizableTitle} = useResizable(columns, setColumns);

    const handleViewTactico = (tactico: TacticoProps) => {
        setCurrentTactico (tactico);
        setShowDrawer(true)
    }

    return (
        <>
            <Table
                columns={mergeColumns}
                dataSource={tacticos}
                size='small'
                className='table-resizable w-full '
                rowKey={(record) => record.key}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            handleViewTactico(record)
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
                open={showDrawer}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                destroyOnClose={true}
                onClose={() => {
                    setShowDrawer(false)
                    setShowEdit(false)
                }}
                closable={false}
            >   

                {
                    showEdit 
                    ? <FormTactico currentTactico={currentTactico} setShowEdit={setShowEdit}  showEdit={showEdit}/>
                    : <TacticosView currentTactico={currentTactico} setShowEdit={setShowEdit} />
                }

            </Drawer>
        </>
    )
}
