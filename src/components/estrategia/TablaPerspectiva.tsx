import { useState } from 'react';
import { Avatar, Drawer, Image, Progress, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '@/assets/css/ResizableTable.css';
import { EstrategicoProps, PerspectivaProps } from '@/interfaces';
import { FormEstrategia } from './FormEstrategia';
import {  getColor, getFile, getStatus } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCurrentEstrategicoThunk, getEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import getBrokenUser from '@/helpers/getBrokenUser';


interface TablaEstrategiaProps{
    perspectiva: PerspectivaProps;
    setOpen: (open: boolean) => void;
}


export const TablaEstrategia: React.FC<TablaEstrategiaProps> = ({perspectiva, setOpen}) => {

    const { color } = perspectiva
    const dispatch = useAppDispatch()   
    const [showEdit, setShowEdit] = useState<boolean>(false);        

    const [columns, setColumns] = useState<ColumnsType<EstrategicoProps>>([
        {
            title: () => ( <p className='tableTitlePrincipal'>Objetivo</p>),
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
            title: () => ( <p className='tableTitle'>Código</p>),
            render: (text, record, index) => ( <p className='text-default'> { record.codigo } </p>   ),
            width: 20,
            ellipsis: true,
        },
        {
            title: () => ( <p className='tableTitle'>Tácticos</p>),
            width: 23,
            ellipsis: true,
            render: (text, record, index) => ( <p className='text-default'> { record.tacticos?.length } </p>   ),
        },
        {
            title: () => ( <p className='tableTitle'>Estatus</p>),
            dataIndex: 'status',
            width: 40,
            ellipsis: true,
            render: (text, record, index) => (
                <p className='font-medium'
                 style={{
                    color: getColor(record.status).color,
                }}>{getStatus(record.status)}</p>
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
                        '0%': getColor(record.status).lowColor,
                        '100%': getColor(record.status, .8).color,
                        direction: 'to top',
                    }}
                    trailColor={getColor(record.status, .3).color} 
                />
            ),
        },
        {
            title: () => ( <p className='tableTitle'>Responsables</p>),
            width: 50,
            render: (text, record, index) => (
                <Tooltip title={`${record.propietario?.nombre} ${record.propietario?.apellidoPaterno}`}>
                    <Avatar 
                        src={<Image src={`${ getFile(record.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                    >
                        {record.propietario?.iniciales}
                    </Avatar>
                </Tooltip>
            ),
            ellipsis: true,
        },
    ]);

    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const handleViewEstrategia = (id: string) => {
        dispatch(getEstrategicoThunk(id))
        setShowDrawer(true)
    }
    const handleCloseDrawer = () => {
        setShowDrawer(false)
        setShowEdit(false)
        dispatch(clearCurrentEstrategicoThunk())
    }


    return (
        <>
            <Table
                className='w-full customTable' 
                rowClassName={() => 'cursor-pointer hover:bg-gray-50 transition duration-200'}
                loading={ perspectiva.objetivos_estrategicos?.length === 0 ? true : false }
                columns={columns}
                dataSource={perspectiva.objetivos_estrategicos}
                rowKey={(record) => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            handleViewEstrategia(record.id)                            
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
                    <FormEstrategia setOpen={setOpen} setShowEdit={setShowEdit}/> 
                }
            </Drawer>
        </>
    )
}
