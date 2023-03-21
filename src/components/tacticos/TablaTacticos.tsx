import { useState } from 'react'
import type { ColumnsType } from 'antd/es/table';
import {Progress, Table} from 'antd';
import { useGetColorByStatus } from '@/hooks/useGetColorByStatus';
import dayjs from 'dayjs';
import { status, statusString } from '@/helpers/status';
import { TacticoType } from '@/interfaces';
import '@/assets/css/ResizableTable.css';
import { useResizable } from '@/hooks/useResizable';


export const TablaTacticos = () => {

    const data:TacticoType[] = [
        {
            key: 1,
            nombre: 'Finalizar Modulo de Bitacora',
            progreso: 32,
            status: 2,
            fechaInicio: '2021-01-01',
            fechaFin: '2021-01-01',
        },
        {
            key: 2,
            nombre: 'Software Productividad',
            progreso: 0,
            status: 1,
            fechaInicio: '2021-01-01',
            fechaFin: '2021-01-01',
        },
        {
            key: 3,
            nombre: 'Sitio Web',
            progreso: 100,
            status: 3,
            fechaInicio: '2021-01-01',
            fechaFin: '2021-01-01',
        },
        {
            key: 4,
            nombre: 'Cotizador',
            progreso: 25,
            status: 4,
            fechaInicio: '2021-01-01',
            fechaFin: '2021-01-01',
        }
    ]

    const [columns, setColumns] = useState<ColumnsType<TacticoType>>([
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
                <Progress percent={record.progreso} strokeWidth={20} strokeColor={useGetColorByStatus(status[record.status]).hex} />
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
                dataSource={data}
                size='small'
                className='table-resizable w-full animate__animated animate__fadeIn'
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
