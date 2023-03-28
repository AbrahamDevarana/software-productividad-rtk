import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import {Progress, Table} from 'antd';
import { useGetColorByStatus } from '@/hooks/useGetColorByStatus';
import dayjs from 'dayjs';
import { status, statusString } from '@/helpers/status';
import '@/assets/css/ResizableTable.css';
import { useResizable } from '@/hooks/useResizable';
import { TacticoProps } from '@/interfaces/tacticos';

interface TablaTacticosProps {
    tacticos?: TacticoProps[]
}

export const TablaTacticos = ({tacticos}:TablaTacticosProps) => {

    

    const [columns, setColumns] = useState<ColumnsType<TacticoProps>>([
        {
            title: 'Nombre',
            render: (text, record, index) => ({
                props: {
                    className: 'border-l-primary',
                    style: { borderLeft: `5px solid ${useGetColorByStatus(status[record.status]).hex}`}
                },
                children: <div>{record.nombre}</div>,
            }),
        },
        {
            title: 'Progreso',
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
            title: 'Estatus',
            render: (text, record, index) => (
                <span style={{
                    color: useGetColorByStatus(status[record.status]).hex,
                }}>{statusString[record.status]}</span>
            ),
        },
        {
            title: 'Fecha Inicio',
            render: (text, record, index) => record.fechaFin ? `${dayjs(record.fechaFin, 'YYYY-MM-DD').locale('es').format('D MMMM YYYY')}` : 'No especificado',
        },
        {
            title: 'Fecha Fin',
            render: (text, record, index) => record.fechaFin ? `${dayjs(record.fechaFin, 'YYYY-MM-DD').locale('es').format('D MMMM YYYY')}` : 'No especificado',
        },
    ])

    const {mergeColumns, ResizableTitle} = useResizable(columns, setColumns);

    return (
        <>
            <Table
                columns={mergeColumns}
                dataSource={tacticos}
                size='small'
                className='table-resizable w-full'
                rowKey={(record) => record.key}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            
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
        </>
    )
}
