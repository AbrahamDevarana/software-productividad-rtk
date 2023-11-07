import { useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import {Avatar, Image, Pagination, Progress, Table, Tooltip} from 'antd';
import { TacticoProps } from '@/interfaces/tacticos';
import { getColor, getStatus, getStorageUrl } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTacticoThunk } from '@/redux/features/tacticos/tacticosThunk';
import getBrokenUser from '@/helpers/getBrokenUser';
import { FaPlus } from 'react-icons/fa';
import dayjs from 'dayjs';
import { hasGroupPermission } from '@/helpers/hasPermission';
import { CoreProps } from '@/interfaces';


interface TablaTacticosProps {
    objetivos: TacticoProps[] | CoreProps[]
    handleCreateObjetivo: () => void
    handleShowObjetivo: (objetivo: TacticoProps | CoreProps) => void
    isLoading?: boolean
}

export const TablaTacticos = ({objetivos, handleCreateObjetivo, handleShowObjetivo, isLoading}: TablaTacticosProps) => {

    const { permisos } = useAppSelector(state => state.auth)
    const [ fullContent, setFullContent ] = useState<boolean>(false)
        
    const columns: ColumnsType<TacticoProps | CoreProps> = useMemo(() => [
            {
                title: () => ( 
                    <div className='flex gap-3 items-center relative'>
                        <p className='tableTitlePrincipal'>Objetivo</p>
                        {
                            hasGroupPermission(['crear tacticos', 'editar tacticos', 'eliminar tacticos'], permisos) && (
                                <Tooltip title='Crear Objetivo Táctico'>
                                    <button onClick={() => handleCreateObjetivo()} className={`z-50 p-1 text-white rounded-full bg-primary`}> <FaPlus /> </button>
                                </Tooltip>
                            )
                        }
                        
                    </div>
                ),
                width: 150,
                ellipsis: {
                    showTitle: false,
                },
                render: (text, record, index) => (
                <Tooltip placement='top' title={record.nombre}>
                    <div className='flex items-center'> 
                        <div className='border-2 rounded-full mr-2 h-10' style={{ borderColor:  getColor(record.status).color   }}></div>
                        <p className='text-default'>{record.nombre}</p>
                    </div>
                </Tooltip>
                )
            },
            {
                title: () => ( <p className='tableTitle text-right'>Código</p>),
                width: 50,
                ellipsis: true,
                render: (text, record, index) => (
                    <p className='text-default text-right'>{record.codigo}</p>
                ),
                responsive: ['md'],
            },
            {
                title: () => ( <p className='tableTitle text-right'>Estatus</p>),
                dataIndex: 'status',
                width: 50,
                ellipsis: true,
                render: (text, record, index) => (
                    <p className='font-semibold text-right'
                     style={{
                        color: getColor(record.status).color,
                    }}>{getStatus(record.status)}</p>
                ),
            },
            {
                title: () => ( <p className='tableTitle text-right'>Progreso</p>),
                dataIndex: 'progreso',
                width: 80,
                render: (text, record, index) => (
                    <div className='pl-5'>
                        <Progress 
                        className='drop-shadow progressStyle' percent={record.progreso} strokeWidth={20} 
                        strokeColor={{
                            from: getColor(record.status).color || '#108ee9',
                            to: getColor(record.status).lowColor || '#87d068',
                        }}
                        format={(percent, successPercent) => <p className='text-white text-[11px]'>{percent}%</p>}
                        trailColor={getColor(record.status, .3).color} 
                    />
                    </div>
                )
            },
            {
                title: () => ( <p className='tableTitle text-right'>Proyección</p>),
                dataIndex: 'periodos',
                width: 120,
                responsive: ['md'],
                ellipsis: true,
                render: (text, record, index) => {
    
                    // Obtener el trimestre inicial de fecha de inicio con dayjs
                    const quarterInicial = dayjs(record.fechaInicio).quarter();
                    const quarterFinal = dayjs(record.fechaFin).quarter();                
    
                    return (
                        <div className='flex gap-x-1 justify-end'> 
                            {
                                [0, 1, 2, 3].map((index) => {
                                    const isQuarterInRange = index + 1 >= quarterInicial && index + 1 <= quarterFinal;
                                    const colorStyle = isQuarterInRange ? 'rgb(64, 143, 227, .5)' : 'rgba(243, 244, 246, 1)';
                                    const textColor = isQuarterInRange ? '#FFFFFF' : '#6B7280';
    
                    
                                    return (
                                        <span key={index} 
                                            className={`px-4 text-[11px] font-medium rounded-full`}
                                            style={{
                                                backgroundColor: colorStyle,
                                                color: textColor
                                            }}
                                        >
                                            Q{index + 1}
                                        </span>
                                    );
                                })
                            }
                        </div>
                    );
                },
            },
            {
                title: () => ( <p className='tableTitle text-right'>Responsables</p>),
                width: 70,
                render: (text, record, index) => (
                    <div className='flex justify-end'>
                        <Avatar.Group maxCount={3} key={index} className='z-50'
                            maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
                        >
                            {
                                record.propietario && (
                                    <Tooltip title={`${record.propietario.nombreCorto || record.propietario.nombre + ' ' + record.propietario.apellidoPaterno}`}>
                                        <Avatar
                                            src={ <Image src={`${getStorageUrl(record.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} /> }
                                            style={{borderColor: '#F472B6'}}
                                        >
                                            {record.propietario?.iniciales}
                                        </Avatar>
                                    </Tooltip>
                                )
                            }
                            { record.responsables?.map((responsable, index) => (
                                <Tooltip title={`${responsable.nombreCorto || responsable.nombre + ' ' + responsable.apellidoPaterno}`} key={index}>
                                    <Avatar 
                                        src={<Image src={`${getStorageUrl(responsable?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                    >
                                        {responsable?.iniciales}
                                    </Avatar>
                                </Tooltip>
                            )) }
                        </Avatar.Group>
                    </div>
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
        ]
    ,[permisos, handleCreateObjetivo]);

    const orderedObjetivos = useMemo(() => {
        if (!objetivos || objetivos.length === 0) {
            return [];
        }
    
        const regex = /\D/g;

        const ordered = [...objetivos].sort((a, b) => {
            const getCodeNumber = (code?: string) => {
                const match = code?.match(/\d+/);
                return match ? Number(match[0]) : Infinity;
            };
    
            const [aCodigo = '', aOT = '', aNumero = ''] = (a.codigo || '-').split('-');
            const [bCodigo = '', bOT = '', bNumero = ''] = (b.codigo || '-').split('-');
    
            const aCodigoNumber = getCodeNumber(aCodigo);
            const bCodigoNumber = getCodeNumber(bCodigo);
            const aOTNumber = Number(aOT.replace(regex, ''));
            const bOTNumber = Number(bOT.replace(regex, ''));
            const aNumeroNumber = Number(aNumero.replace(regex, ''));
            const bNumeroNumber = Number(bNumero.replace(regex, ''));
    
            // Primero ordena por CDX, luego por OT y finalmente por y.
            if (aCodigoNumber !== bCodigoNumber) {
                return aCodigoNumber - bCodigoNumber;
            } else if (aOTNumber !== bOTNumber) {
                return aOTNumber - bOTNumber;
            } else {
                return aNumeroNumber - bNumeroNumber;
            }
        });

        if(!fullContent){
            return ordered.slice(0, 5)
        }
    
        return ordered;
    }, [objetivos, fullContent]);
    
    return (
        <>
            <Table
                columns={ columns }
                dataSource={ orderedObjetivos }
                loading={ isLoading }
                scroll={{ x: 800 }}
                className='w-full customTable' 
                rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
                rowKey={(record) => record.id}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            hasGroupPermission(['ver tacticos'], permisos) && (
                                handleShowObjetivo(record)
                            )
                        },
                    }}
                }
                pagination={false}

                footer={() => objetivos.length > 5 && (
                    <div className='flex justify-end'>
                        <button onClick={() =>  setFullContent(!fullContent) }><span className='text-devarana-graph text-sm'> Ver { fullContent ? 'menos' : 'más'}</span></button>
                    </div>
                )}
            />
        </>
    )
}
