import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { createTareaThunk, getTareaThunk } from '@/redux/features/tareas/tareasThunk'
import { createHitoThunk, getHitosThunk, updateHitoThunk } from '@/redux/features/hitos/hitosThunk'
import { TareasProps, HitosProps, ProyectosProps, UsuarioProps } from '@/interfaces'
import dayjs from 'dayjs';
import Loading from '../antd/Loading'
import { FaPlus } from 'react-icons/fa'
import { Avatar, Collapse, Form, Input, Progress, Table, Tooltip, } from 'antd'
import { useColor } from '@/hooks'
import type { ColumnsType } from 'antd/es/table';


interface TableProyectosProps {
    currentProyecto: ProyectosProps
    visible: boolean 
    setVisible: (visible: boolean) => void
}


export const TableProyectos = ({currentProyecto, visible, setVisible}: TableProyectosProps) => {

    const { hitos, currentHito, isLoading} = useAppSelector(state => state.hitos)
        
    const dispatch = useAppDispatch()
    const { Panel } = Collapse;

    

    const defaultColumns:ColumnsType<any> = [
        {
            title: 'Actividad',
            dataIndex: 'nombre',
            key: 'nombre',
            render: (nombre: string) => (
                <div className='w-full text-devarana-graph font-light py-1.5'>
                    { nombre }
                </div>
            ),
            width: '30%'
        },
        {
            title: 'Fecha de Cierre',
            dataIndex: 'fechaFin',
            key: 'fecha',
            render: (fechaFin: string | Date | null) => (
                <div className='w-full text-devarana-graph'>
                    { fechaFin ? dayjs(fechaFin).format('DD/MM/YYYY') : <span className='text-devarana-graph font-light'>No Asignado</span> }
                </div>
            ),
            width: '20%'
        },
        {
            title: 'Responsables',
            key: 'usuariosTarea',
            render: (text: any, record: TareasProps ) => (
                <div className='w-full text-devarana-graph'>
                    <Avatar.Group maxCount={3}>
                        <Tooltip title={record.propietario.nombre + ' ' + record.propietario.apellidoPaterno} key={record.propietario.id} className='relative'>
                            <Avatar
                                src={import.meta.env.VITE_STORAGE_URL + record.propietario.foto}
                            >
                                {record.propietario.iniciales}
                            </Avatar>
                        </Tooltip>

                        {record.usuariosTarea.map((usuario: UsuarioProps) => (
                            <Tooltip title={usuario.nombre + ' ' + usuario.apellidoPaterno} key={usuario.id} className='relative'>
                                <Avatar
                                    src={import.meta.env.VITE_STORAGE_URL + usuario.foto}
                                >
                                    {usuario.iniciales}
                                </Avatar>
                            </Tooltip>

                        ))}
                    </Avatar.Group>
                </div>
            ),
            width: '20%',
        },  
        {
            title: 'Avance',
            dataIndex: 'avance',
            render: (text, record, index) => (
                <></>
                // <Progress 
                //     className='drop-shadow progressStyle' percent={record.progreso} strokeWidth={20} 
                //     strokeColor={{
                //         '0%': useColor(record.status).lowColor,
                //         '100%': useColor(record.status, .8).color,
                //         direction: 'to top',
                //     }}
                //     trailColor={useColor(record.status, .3).color} 
                // />
            ),
            width: '10%'
        },
        {
            title: 'Estatus',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => (
                <></>
                // <span className='font-semibold'
                //  style={{
                //     color: useColor(record.status).color,
                // }}>{useColor(record.status).nombre}</span>
            ),
            width: '10%'
        },

    ]

    useEffect(() => {        
        if(currentProyecto.id !== ''){
            dispatch(getHitosThunk(currentProyecto.id))
        }
    }, [currentProyecto])


    const handleChangeHito = (hito: HitosProps, e: React.FocusEvent<HTMLInputElement, Element>) => {

        const { value } = e.target as HTMLInputElement

        if(value === hito.titulo) return
        if(value === '') return e.currentTarget.focus()
        if(!value) return e.currentTarget.focus()

        const query = {
            ...hito,
            titulo: value
        }

        dispatch(updateHitoThunk(query))
    };

    const handleCreateHito = () => {    
        const query = {
            proyectoId: currentProyecto.id,
        }
        dispatch(createHitoThunk(query))
    };


    const handleView = (record:TareasProps) => {
        dispatch(getTareaThunk(record.id))
        setVisible(true)
    }


    
    const FooterComp = (hito:HitosProps) => {

        const handleCreateTask = (hito: HitosProps) => {
        
        const query = {
                ...form.getFieldsValue(),
                hitoId: hito.id,
            }
            dispatch(createTareaThunk(query))
            form.resetFields()
        }
        const [form] = Form.useForm();
        return (
            <Form initialValues={{
                ...hito,
                nombre: ''
            }}
            form={form}
            onBlur={ e => handleCreateTask(hito)}
            > 
                <Form.Item name='nombre' className='mb-0'>
                    <Input placeholder='Agregar Nuevo Elemento' onPressEnter={
                        (e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            e.currentTarget.blur()
                        }
                    } className='w-60'/> 
                </Form.Item>
            </Form>
        )
    }

    const activeHitos = useMemo(() => {
        return hitos.map((hito: HitosProps) => hito.id)
    }, [hitos])
    

    // if(isLoading) return ( <Loading /> )
    return (
        <>
        <Collapse
            collapsible='header' 
            defaultActiveKey={activeHitos}
            ghost
        >
            {
                hitos.map((hito: HitosProps, index: number) => (
                    <Panel 
                        className=''
                        header={
                            <Form 
                                onClick={ e => e.stopPropagation()}
                            >
                                <Input
                                    onBlur={ e => handleChangeHito(hito, e) } 
                                    defaultValue={hito.titulo} 
                                    onPressEnter={ (e) => {
                                            e.preventDefault()
                                            e.stopPropagation()
                                            e.currentTarget.blur()
                                        }
                                    }
                                    className='customInput'
                                    />
                            </Form>
                        } key={hito.id}>
                        <Table
                            loading={isLoading}
                            className='customTable'
                            scroll={{ x: 1000 }}
                            bordered={false}
                            pagination={false}
                            columns={defaultColumns}
                            dataSource={hito.tareas}
                            footer={ () => FooterComp(hito) }
                            rowKey={(record: any) => record.id}
                            onRow={(record: any, index: any) => {
                                return {
                                    onClick: () => {
                                        handleView(record)
                                    }
                                }
                            }}
                        />
                    </Panel>
                )) 
            }
        </Collapse>

        <button 
            className='border border-devarana-graph border-opacity-20 px-4 py-2 font-medium text-sm items-center flex gap-x-2
            rounded-ext hover:bg-devarana-graph hover:bg-opacity-20 text-devarana-graph'
            onClick={handleCreateHito}
        > 
            <FaPlus className='font-light' /> Agregar Nuevo Hito
        </button>
        </>
    )
}
