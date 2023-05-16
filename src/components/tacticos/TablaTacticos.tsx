import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import {Avatar, Drawer, Progress, Table} from 'antd';
import { TacticoProps } from '@/interfaces/tacticos';
import { TacticosView } from './TacticosView';
import { FormTactico } from './FormTacticos';
import { getColor, getFile, getStatus } from '@/helpers';
import '@/assets/css/ResizableTable.css';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCurrentTacticoThunk, getTacticoThunk } from '@/redux/features/tacticos/tacticosThunk';

interface TablaTacticosProps {
    tacticos?: TacticoProps[]
}

export const TablaTacticos = ({tacticos}:TablaTacticosProps) => {

    const { currentTactico } = useAppSelector(state => state.tacticos)
    const [showDrawer, setShowDrawer] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const [columns, setColumns] = useState<ColumnsType<TacticoProps>>([
        {
            title: 'Objetivos',
            width: 150,
            ellipsis: true,
            render: (text, record, index) => ({
                children: <div className='flex'> 
                <div className='border-2 rounded-full mr-2' style={{ borderColor: getColor(record.status).color }}/> 
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
                    color: getColor(record.status).color,
                }}>{getStatus(record.status)}</span>
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
                        from: getColor(record.status).color || '#108ee9',
                        to: getColor(record.status).lowColor || '#87d068',
                    }}
                    trailColor={getColor(record.status, .3).color} 
                />
            )
        },
        {
            title: 'Responsables',
            width: 50,
            render: (text, record, index) => (
                <Avatar.Group maxCount={3} key={index}>
                    {record.responsables?.map((responsable, index) => (
                        <span key={index} className='z-50' >
                            <Avatar src={getFile(responsable.foto)} />
                        </span>
                    ))}
                </Avatar.Group>
            ),
            onCell: (record, rowIndex) => {
                return {
                    onClick: (event) => {
                        event.stopPropagation();
                    },
                };
            },
            ellipsis: true,
        },
    ]);



    const handleViewTactico = (tactico: TacticoProps) => {
        dispatch(getTacticoThunk(tactico.id))        
        setShowDrawer(true)
    }

    const handleCancel = () => {
        setShowDrawer(false)
        setShowEdit(false)
        dispatch(clearCurrentTacticoThunk())
    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={tacticos}
                size='small'
                className='w-full '
                rowKey={(record) => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            handleViewTactico(record)
                        }
                    }}
                }
                pagination={false}
            />

            <Drawer
                open={showDrawer}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                destroyOnClose={true}
                onClose={() => handleCancel()}
                closable={false}
            >   

                {
                    currentTactico
                    ? <FormTactico setShowEdit={setShowEdit}  showEdit={showEdit}/>
                    : <TacticosView setShowEdit={setShowEdit} />
                }

            </Drawer>
        </>
    )
}
