import { useMemo, useState } from 'react';
import { Avatar, Drawer, Image, message, Progress, Skeleton, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EstrategicoProps, PerspectivaProps } from '@/interfaces';
import { FormEstrategia } from './';
import {  getColor, getStatus, getStorageUrl } from '@/helpers';
import { useAppSelector } from '@/redux/hooks';
import { useCreateEstrategicoMutation, useGetEstrategicosQuery } from '@/redux/features/estrategicos/estrategicosThunk';
import getBrokenUser from '@/helpers/getBrokenUser';
import { FaPlus } from 'react-icons/fa';
import { hasGroupPermission } from '@/helpers/hasPermission';
import { extraerNumero } from '@/helpers/getNumberCode';

interface TablaEstrategiaProps{
    perspectiva: PerspectivaProps;
    year: number;
}


export const TablaEstrategia = ({ perspectiva , year}: TablaEstrategiaProps) => {

    const { color } = perspectiva
    const { permisos } = useAppSelector(state => state.auth)
    const { data: objetivosEstrategicos, isLoading: isLoadingObjetivos} = useGetEstrategicosQuery({ perspectivaId: perspectiva.id, year })

    const [ createEstrategicoMutation, { data, isLoading: isCreating }] = useCreateEstrategicoMutation()
    const [selectedRow, setSelectedRow] = useState<string>('')
    
    const columns: ColumnsType<EstrategicoProps> = useMemo(() => 
            [
                {
                    title: () => ( 
                    <div className='flex gap-3 items-center relative'>
                        <p className='tableTitlePrincipal'>Objetivo</p>
                        {/* { hasGroupPermission(['crear estrategias'], permisos) && userAuth?.id === perspectiva.propietarioId && */}
                        { hasGroupPermission(['crear estrategias'], permisos) &&
                            <button 
                                onClick={(e) => handleCreateEstrategia(e)} 
                                className={`z-50 p-1 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed`}
                                disabled={isCreating}
                                style={{
                                    backgroundColor: color,
                                }}
                            > <FaPlus /> </button>
                        }
                    </div>
                    ),
                    width: 150,
                    ellipsis: true,
                    render: (text, record, index) => ({
                        children: 
                        <div className='flex items-center'> 
                            <div className='border-2 rounded-full mr-2 h-10' style={{ borderColor: getColor(record.status).color }}/> 
                            <p className='text-devarana-graph'>{record.nombre}</p>
                        </div>,
                    }),
                },
                {
                    title: () => ( <p className='tableTitle text-right'>Código</p>),
                    render: (text, record, index) => ( <p className='text-default text-right'> { record.codigo } </p>   ),
                    width: 20,
                    responsive: ['md'],
                    ellipsis: true,
                },
                {
                    title: () => ( <p className='tableTitle text-right'>Tácticos</p>),
                    width: 23,
                    ellipsis: true,
                    responsive: ['md'],
                    render: (text, record, index) => ( <p className='text-default text-right'> { record.tacticos?.length } </p>   ),
                },
                {
                    title: () => ( <p className='tableTitle text-right'>Estatus</p>),
                    dataIndex: 'status',
                    width: 40,
                    ellipsis: true,
                    render: (text, record, index) => (
                        <p className='font-medium text-right'
                        style={{
                            color: getColor(record.status).color,
                        }}>{getStatus(record.status)}</p>
                    ),
                },
                
                {
                    title: () => ( <p className='tableTitle text-right'>Progreso</p>),
                    dataIndex: 'progreso',
                    width: 60,
                    render: (text, record, index) => (
                    <div className=''>
                        <Progress 
                            className='drop-shadow progressStyle w-full' percent={record.progreso} strokeWidth={20} 
                            strokeColor={{
                                '0%': getColor(record.status).lowColor,
                                '100%': getColor(record.status, .8).color,
                                direction: 'to top',
                            }}
                            trailColor={getColor(record.status, .3).color} 
                        />
                    </div>
                    ),
                },
                {
                    title: () => ( <p className='tableTitle text-right'>Responsable</p>),
                    width: 40,
                    render: (text, record, index) => (
                        <div className='flex justify-end'>
                            <Avatar.Group maxCount={3} key={index} className='z-50'
                                maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
                            >
                                <Tooltip title={`${record.propietario?.nombre} ${record.propietario?.apellidoPaterno}`}>
                                    <Avatar 
                                        src={<Image src={`${getStorageUrl(record.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                        className=''
                                    >
                                        {record.propietario?.iniciales}
                                    </Avatar>
                                </Tooltip>
                                {
                                    record.responsables?.map((responsable, index) => (
                                        <Tooltip key={index} title={`${responsable.nombreCorto || '' }`}>
                                            <Avatar src={<Image src={`${getStorageUrl(responsable.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                                {responsable.iniciales}
                                            </Avatar>
                                        </Tooltip>
                                    ))
                                }
                            </Avatar.Group>
                        </div>
                    ),
                    ellipsis: true,
                },
            ]
    , [perspectiva, year]);

    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const handleShowEstrategia = (id: string) => {
        setSelectedRow(id)
        setShowDrawer(true)
    }

    const handleCreateEstrategia = async (e: HTMLButtonElement | any) => {
        e.stopPropagation()
        e.preventDefault()

        
        createEstrategicoMutation({
            perspectivaId: perspectiva.id,
            year

        }).unwrap().then(() => {
            message.success('Estrategia creada correctamente')
        }).catch(() => {
            message.error('Error al crear la estrategia')
        })
    }

    const handleCloseDrawer = () => {
        setShowDrawer(false)
    }

    // Ordenarlos por el codigo tienen algo así A1 A2 A3 B1 B2 B3
    const objetivosOrdenados =  useMemo(() => {
      
        if(!objetivosEstrategicos) return []
        return objetivosEstrategicos.map( item => item).sort((a, b) => {            
            const aNumero = extraerNumero(a.codigo)
            const bNumero = extraerNumero(b.codigo)
            return aNumero - bNumero
        })

    }, [objetivosEstrategicos])
    
    

    return (
        <>
            <Table
                className='w-full customTable' 
                rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
                columns={columns}
                loading={isLoadingObjetivos}
                dataSource={objetivosOrdenados}
                rowKey={(record) => record.id}
                scroll={{ x: 1000 }}
                pagination={false}
                onRow={(record) => {
                    return {
                        onClick: event => {
                            hasGroupPermission(['ver estrategias'], permisos) &&
                            handleShowEstrategia(record.id)                            
                        }
                    }}
                }
            />
            
            <Drawer
                width={window.innerWidth > 1200 ? 700 : '100%'}
                closable={false}
                onClose={handleCloseDrawer}
                destroyOnClose={true}
                open={showDrawer}
                headerStyle={{
                    backgroundColor: color,
                }}
                className='rounded-l-ext'
            >

                {
                    <FormEstrategia handleCloseDrawer={handleCloseDrawer} estrategicoId={selectedRow} /> 
                }
            </Drawer>
        </>
    )
}
