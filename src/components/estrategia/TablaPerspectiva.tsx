import { useMemo, useState } from 'react';
import { Avatar, Drawer, Image, Progress, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EstrategicoProps, PerspectivaProps } from '@/interfaces';
import { FormEstrategia } from './FormEstrategia';
import {  getColor, getStatus, getStorageUrl } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCurrentEstrategicoThunk, createEstrategicoThunk, getEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import getBrokenUser from '@/helpers/getBrokenUser';
import { FaPlus } from 'react-icons/fa';
import { hasGroupPermission } from '@/helpers/hasPermission';
import { extraerNumero } from '@/helpers/getNumberCode';
import { Icon } from '../Icon';


interface TablaEstrategiaProps{
    perspectiva: PerspectivaProps;
}


export const TablaEstrategia: React.FC<TablaEstrategiaProps> = ({perspectiva}) => {

    const { color } = perspectiva
    const dispatch = useAppDispatch()   
    const [ showEdit, setShowEdit ] = useState<boolean>(false);        
    const {permisos} = useAppSelector(state => state.auth)

    const [columns, setColumns] = useState<ColumnsType<EstrategicoProps>>([
        {
            title: () => ( 
            <div className='flex gap-3 items-center relative'>
                <p className='tableTitlePrincipal'>Objetivo</p>
                { hasGroupPermission(['crear estrategias'], permisos) &&
                    <button onClick={(e) => handleCreateEstrategia(e)} className='z-50'> <FaPlus /> </button>
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
            ellipsis: true,
        },
        {
            title: () => ( <p className='tableTitle text-right'>Tácticos</p>),
            width: 23,
            ellipsis: true,
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
            width: 50,
            render: (text, record, index) => (
                <Progress 
                    className='drop-shadow progressStyle ml-auto' percent={record.progreso} strokeWidth={20} 
                    strokeColor={{
                        '0%': getColor(record.status).lowColor,
                        '100%': getColor(record.status, .8).color,
                        direction: 'to top',
                    }}
                    trailColor={getColor(record.status, .3).color} 
                />
            ),
        },
        {
            title: () => ( <p className='tableTitle text-right'>Responsable</p>),
            width: 50,
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
    ]);

    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const handleShowEstrategia = (id: string) => {
        dispatch(getEstrategicoThunk(id))
        setShowDrawer(true)
    }

    const handleCreateEstrategia = async (e: HTMLButtonElement | any) => {
        e.stopPropagation()
        e.preventDefault()
        

        await dispatch(createEstrategicoThunk({
            perspectivaId: perspectiva.id,
        }))
    }


    const handleCloseDrawer = () => {
        setShowDrawer(false)
        setShowEdit(false)
        dispatch(clearCurrentEstrategicoThunk())
    }

    // Ordenarlos por el codigo tienen algo así A1 A2 A3 B1 B2 B3
    const objetivosOrdenados =  useMemo(() => {
      
        if(!perspectiva.objetivosEstrategicos) return []
        return perspectiva.objetivosEstrategicos.map( item => item).sort((a, b) => {            
            const aNumero = extraerNumero(a.codigo)
            const bNumero = extraerNumero(b.codigo)
            return aNumero - bNumero
        })

    }, [perspectiva.objetivosEstrategicos])

    return (
        <>
            <Table
                className='w-full customTable' 
                rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
                loading={ perspectiva.objetivosEstrategicos?.length === 0 ? true : false }
                columns={columns}
                dataSource={objetivosOrdenados}
                rowKey={(record) => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            handleShowEstrategia(record.id)                            
                        }
                    }}
                }
                pagination={false}
            />
            
            <Drawer
                closable={false}
                onClose={handleCloseDrawer}
                destroyOnClose={true}
                open={showDrawer}
                width={window.innerWidth > 1200 ? 700 : '100%'}
                headerStyle={{
                    backgroundColor: color,
                }}
                className='rounded-l-ext'
            >

                {
                    <FormEstrategia handleCloseDrawer={handleCloseDrawer} /> 
                }
            </Drawer>
        </>
    )
}
