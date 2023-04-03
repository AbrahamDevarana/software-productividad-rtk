import { Avatar, Drawer, Progress, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useResizable } from '@/hooks/useResizable';
import '@/assets/css/ResizableTable.css';
import { EstrategicoProps, Perspectiva } from '@/interfaces';
import { EstrategiaView } from './EstrategiaView'
import { status, statusString } from '@/helpers/status';
import { FormEstrategia } from './FormEstrategia';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetColor } from '@/hooks/useGetColor';
import { CustomDrawer } from '../ui/Drawer';


interface TablaEstrategiaProps{
    perspectiva: Perspectiva;
    setOpen: (open: boolean) => void;
}


export const TablaEstrategia: React.FC<TablaEstrategiaProps> = ({perspectiva, setOpen}) => {

    const { color } = perspectiva

    const {state} = useLocation()
    const navigate = useNavigate()
   
    const [showEdit, setShowEdit] = useState<boolean>(false);
    
    const [estrategico, setEstrategico] = useState<EstrategicoProps>({
        id: '',
        codigo: '',
        nombre: '',
        descripcion: '',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        progreso: 0,
        indicador: '',
        perspectivas: [],
        responsables: [],
        status: 1,
        tacticos_count: 0,
        
    });
    

    const [columns, setColumns] = useState<ColumnsType<EstrategicoProps>>([
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
            title: 'Código',
            dataIndex: 'codigo',
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
                    color: useGetColor(record.status)?.hex,
                }}>{statusString[record.status]}</span>
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

    const [showDrawer, setShowDrawer] = useState<boolean>(false);

    const {mergeColumns, ResizableTitle} = useResizable(columns, setColumns);

    const handleViewEstrategia = (record:EstrategicoProps) => {
        setEstrategico(record)
        setShowDrawer(true)
    }
    const handleCloseDrawer = () => {
        setShowDrawer(false)
        setShowEdit(false)
    }


    return (
        <>
            <Table
                size='small'
                className='table-resizable w-full'
                loading={ perspectiva.objetivo_estr?.length === 0 ? true : false }
                columns={mergeColumns}
                dataSource={perspectiva.objetivo_estr}
                rowKey={(record) => record.id}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            handleViewEstrategia(record)                            
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
                closable={false}
                onClose={handleCloseDrawer}
                open={showDrawer}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                headerStyle={{
                    backgroundColor: color,
                }}
                className='rounded-l-ext'
            >

                {
                    showEdit
                    ? <FormEstrategia currentTactico={ estrategico } setOpen={setOpen} setShowEdit={setShowEdit}/> 
                    : <EstrategiaView estrategico={ estrategico } perspectiva={perspectiva} edit={true} view={true} setShowEdit={setShowEdit}/>
                }
            </Drawer>
        </>
    )
}
