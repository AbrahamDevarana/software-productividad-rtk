import { useState } from 'react';
import { Avatar, Drawer, Progress, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import '@/assets/css/ResizableTable.css';
import { EstrategicoProps, Perspectiva } from '@/interfaces';
import { EstrategiaView } from './EstrategiaView'
import { FormEstrategia } from './FormEstrategia';
import { useLocation, useNavigate } from 'react-router-dom';
import { useColor, useResizable } from '@/hooks';
import { returnImage } from '@/helpers/returnImage';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearCurrentEstrategicoThunk, getEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';


interface TablaEstrategiaProps{
    perspectiva: Perspectiva;
    setOpen: (open: boolean) => void;
}


export const TablaEstrategia: React.FC<TablaEstrategiaProps> = ({perspectiva, setOpen}) => {

    const { color } = perspectiva
    const dispatch = useAppDispatch()   
    const [showEdit, setShowEdit] = useState<boolean>(false);        

    const [columns, setColumns] = useState<ColumnsType<EstrategicoProps>>([
        {
            title: 'Objetivos',
            width: 150,
            ellipsis: true,
            render: (text, record, index) => ({
                children: <div className='flex'> 
                <div className='border-2 rounded-full mr-2' style={{ borderColor: useColor(record.status).color }}/> 
                    <p className='text-default'>{record.nombre}</p>
                </div>,
            }),
        },
        {
            title: 'Código',
            render: (text, record, index) => ( <p className='text-default'> { record.codigo } </p>   ),
            width: 50,
            ellipsis: true,
        },
        {
            title: 'Tácticos',
            width: 40,
            ellipsis: true,
            render: (text, record, index) => ( <p className='text-default'> { record.tacticos_count } </p>   ),
        },
        {
            title: 'Estatus',
            dataIndex: 'status',
            width: 50,
            ellipsis: true,
            render: (text, record, index) => (
                <span className='font-semibold'
                 style={{
                    color: useColor(record.status).color,
                }}>{useColor(record.status).nombre}</span>
            ),
        },
        
        {
            title: 'Progreso',
            dataIndex: 'progreso',
            width: 60,
            render: (text, record, index) => (
                <Progress 
                    className='drop-shadow progressStyle' percent={record.progreso} strokeWidth={20} 
                    strokeColor={{
                        '0%': useColor(record.status).lowColor,
                        '100%': useColor(record.status, .8).color,
                        direction: 'to top',
                    }}
                    trailColor={useColor(record.status, .3).color} 
                />
            ),
        },
        {
            title: 'Responsables',
            width: 50,
            render: (text, record, index) => (
                <Avatar 
                    src={returnImage(record.propietario?.foto)}
                >
                    {record.propietario?.iniciales}
                </Avatar>
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
                size='small'
                className=' w-full'
                loading={ perspectiva.objetivo_estr?.length === 0 ? true : false }
                columns={columns}
                dataSource={perspectiva.objetivo_estr}
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


                    // showEdit
                    // ? <FormEstrategia currentTactico={ estrategico } setOpen={setOpen} setShowEdit={setShowEdit}/> 
                    // : <EstrategiaView estrategico={ estrategico } perspectiva={perspectiva} edit={true} view={true} setShowEdit={setShowEdit}/>
                }
            </Drawer>
        </>
    )
}
