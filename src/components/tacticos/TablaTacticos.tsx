import { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import {Avatar, Image, Progress, Table, Tooltip} from 'antd';
import { TacticoProps } from '@/interfaces/tacticos';
import { getColor, getStatus, getStorageUrl } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTacticoThunk } from '@/redux/features/tacticos/tacticosThunk';
import getBrokenUser from '@/helpers/getBrokenUser';
import { FaPlus } from 'react-icons/fa';

interface TablaTacticosProps {
    tacticos?: TacticoProps[]
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void
    estrategico: boolean
    setShowDrawer: (showDrawer: boolean) => void
}

export const TablaTacticos = ({tacticos, handleCreateTactico, estrategico = false, setShowDrawer}:TablaTacticosProps) => {

    const { currentTactico } = useAppSelector(state => state.tacticos)

    const dispatch = useAppDispatch()

    

    const [columns, setColumns] = useState<ColumnsType<TacticoProps>>([
        {
            title: () => ( 
                <div className='flex gap-3 items-center relative'>
                    <p className='tableTitlePrincipal'>Objetivo</p>
                    <button onClick={(e) => handleCreateTactico(e, estrategico)} className='z-50'> <FaPlus /> </button>
                    
                </div>
            ),
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
            title: () => ( <p className='tableTitle'>Código</p>),
            width: 50,
            ellipsis: true,
            render: (text, record, index) => (
                <span className='text-default'>{record.codigo}</span>
            ),
        },
        {
            title: () => ( <p className='tableTitle'>Estatus</p>),
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
            title: () => ( <p className='tableTitle'>Progreso</p>),
            dataIndex: 'progreso',
            width: 60,
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
            title: () => ( <p className='tableTitle'>Duración</p>),
            dataIndex: 'periodos',
            width: 80,
            ellipsis: true,
            render: (text, record, index) => (
                <div className='flex gap-x-1 items-center align-middle'>
                    {/* record.cuatrimestres */}
                    {
                        record.trimestres.map((trimestre, index) => (
                            <span key={index} className={`px-4 text-[11px] font-medium rounded-full ${trimestre.pivot_tactico_trimestre.activo ? 'bg-devarana-babyblue text-white' : 'bg-gray-100 text-devarana-dark-graph'}`}>T{index+1}</span>
                        ))
                    }
                    
                </div>
            ),
        },
        {
            title: () => ( <p className='tableTitle'>Responsables</p>),
            width: 80,
            render: (text, record, index) => (
                <Avatar.Group maxCount={3} key={index} className='z-50'>
                    { record.responsables?.map((responsable, index) => (
                        <Tooltip title={`${responsable.telefono || responsable.nombre + ' ' + responsable.apellidoPaterno}`} key={index}>
                            <Avatar 
                                src={<Image src={`${getStorageUrl(responsable?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                            >
                                {responsable?.iniciales}
                            </Avatar>
                        </Tooltip>
                    )) }
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



    const handleShowTactico = (tactico: TacticoProps) => {
        dispatch(getTacticoThunk(tactico.id))        
        setShowDrawer(true)
    }


    return (
        <>
            <Table
                columns={columns}
                dataSource={tacticos}
                className='w-full customTable' 
                rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
                rowKey={(record) => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            handleShowTactico(record)
                        }
                    }}
                }
                pagination={false}
            />

            
        </>
    )
}
