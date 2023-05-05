import { AccionesProps, AccionesProyectosProps, HitosProps, ProyectosProps, UsuarioProps } from '@/interfaces'
import { createHitoProyectoThunk, updateHitoProyectoThunk } from '@/redux/features/proyectos/proyectosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Avatar, Collapse, DatePicker, Form, FormInstance, Input, Select, SelectProps, Table, } from 'antd'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs';

import '../../assets/scss/smart.custom.scss'
import { useColor } from '@/hooks'
import { getTareaThunk } from '@/redux/features/tareas/tareasThunk'
import { Icon } from '../Icon'


type EditableTableProps = Parameters<typeof Table>[0];
type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;


interface TableProyectosProps {
    currentProyecto: ProyectosProps
    visible: boolean 
    setVisible: (visible: boolean) => void
}



export const TableProyectos = ({currentProyecto, visible, setVisible}: TableProyectosProps) => {


    const { usuarios } = useAppSelector(state => state.usuarios)
    const { currentHito } = useAppSelector(state => state.hitos)



    const [nuevoHito, setNuevoHito] = useState<HitosProps>({
        ...currentHito,
        proyectoId: currentProyecto.id,

    })
    const [form] = Form.useForm();


        
        const dispatch = useAppDispatch()
        const { Panel } = Collapse;

    const handleChangeHito = (hito: HitosProps, e: React.FocusEvent<HTMLInputElement, Element>) => {

        const { value } = e.target as HTMLInputElement

        if(value === hito.titulo) return
        if(value === '') return e.currentTarget.focus()
        if(!value) return e.currentTarget.focus()

        const query = {
            ...hito,
            titulo: value
        }


        dispatch(updateHitoProyectoThunk(query))
    };

    const handleCreateHito = (hito: HitosProps, e: React.FocusEvent<HTMLInputElement, Element>) => {    
        dispatch(createHitoProyectoThunk(hito))
        setNuevoHito({
            ...nuevoHito,
            titulo: ''
        })
    };

   

    const defaultColumns = [
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
            key: 'participantes',
            render: (participantes: UsuarioProps[]) => (
                <div className='w-full block'>
                    {/* <Avatar.Group maxCount={2}>  
                        { participantes.map((participante) => (
                                <Avatar src={participante.foto} key={participante.id} />
                        ))}
                    </Avatar.Group> */}
                </div>
            ),
            width: '20%'
        },
        {
            title: 'Avance',
            dataIndex: 'avance',
            key: 'fecha',
            inputType: 'text',
            render: (avance: number) => (
                <div className='bg-green-500 w-full text-center text-white'>
                    100%
                </div>
            ),
            width: '10%'
        },
        {
            title: 'Estatus',
            dataIndex: 'status',
            key: 'status',
            render: (status: number) => (
                <div className='w-full text-center text-white'>
                    <span className='bg-green-500 px-2 py-1 rounded-full'>
                        {/* {useColor(status).color} */}
                    </span>
                </div>

            ),
            width: '10%'
        },

    ]

    const handleView = (record:AccionesProyectosProps) => {
        dispatch(getTareaThunk(record.id))
        setVisible(true)
    }

    const handleNew = () => {
        // Asignar el hito al proyecto
        setVisible(true)
    }


    return (
        <Collapse
            collapsible='header' 
            defaultActiveKey={currentProyecto.proyectos_hitos.map((hito: HitosProps) => hito.id)}
            ghost
        >
            {
                currentProyecto && currentProyecto.proyectos_hitos.map((hito: HitosProps, index: number) => (
                    <Panel 
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
                        } key={hito.id}
                        extra={<Icon iconName='faPlus' onClick={handleNew} className='text-devarana-primary ml-2 cursor-pointer' />}
                        >
                        <Table 
                            className='customEditableTable'
                            scroll={{ x: 1000 }}
                            size='small'
                            columns={defaultColumns as ColumnTypes}
                            bordered={false}
                            dataSource={hito.tareas}
                            pagination={false}
                            rowClassName="editable-row "
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
    )
}
