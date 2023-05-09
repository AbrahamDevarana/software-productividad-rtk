import { Avatar, DatePicker, Divider, Form, Input, Select, Skeleton, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks'
import { TareasProps, UsuarioProps } from '@/interfaces'
import dayjs from 'dayjs';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/assets/scss/quill.scss'
import { createTareaThunk, updateTareaThunk } from '@/redux/features/tareas/tareasThunk'



export const FormTareas = () => {
    const dispatch = useAppDispatch()
    const [ selectedUsers, setSelectedUsers ] = useState<any[]>([]);
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { currentTarea, isLoadingCurrentTarea } = useAppSelector(state => state.tareas)
    const [enableEdit, setEnableEdit] = useState(false)

    const [form] = Form.useForm();

    useEffect(() => {
          dispatch(getUsuariosThunk({}))
        return () => {
        }
    }, [])


    const tagRender = (props: any) => {
        const { label, value, closable, onClose } = props;

        const usuario = usuarios.find((usuario) => usuario.id === value)

        return (
            <Tooltip title={label} color='white' key={value} className='relative'>
                <Avatar 
                    src={ import.meta.env.VITE_STORAGE_URL + usuario?.foto || undefined}
                    style={{
                        marginRight: -5
                    }}
                >
                    {usuario?.iniciales}
                </Avatar>
            </Tooltip>
        );
    }


    const spanUsuario = (usuario: UsuarioProps) => (

        <div className='flex items-center gap-x-2'>
            <Avatar
                src={import.meta.env.VITE_STORAGE_URL + usuario.foto}
            >
                {usuario.iniciales}
            </Avatar>
            <p className='font-light text-devarana-graph'>
                {usuario.nombre} {usuario.apellidoPaterno} 
            </p>
        </div>
    )

    if(isLoadingCurrentTarea) return ( <Skeleton active paragraph={{ rows: 10 }} /> )


    const handleSubmit = () => {
        console.log('submit')
        
        const query = {
            ...currentTarea,
            ...form.getFieldsValue(),
        } as TareasProps

        if(query.id !== '') {
            dispatch(updateTareaThunk(query))
        }
        else {
            dispatch(createTareaThunk(query))
        }

    }
    return (
        <>
            <Form
                layout='vertical'
                className='w-full'
                initialValues={{
                    nombre: currentTarea.nombre,
                    fechaInicio: dayjs(currentTarea.fechaInicio).add(6, 'hour'),
                    fechaFin: dayjs(currentTarea.fechaFin).add(6, 'hour'),
                    descripcion: currentTarea.descripcion
                }}
                form={form}
                onBlur={handleSubmit}
                
            >
                <Form.Item 
                    name='nombre'
                >
                    <Input 
                        placeholder='Ingresa el nombre de la actividad' 
                        className='customInput customInput__title'
                        bordered={false} 
                    />
                </Form.Item>

                <Form.Item
                    label='Fecha Inicio'
                    name={'fechaInicio'}
                    labelCol={{ span: 12 }}
                >
                    <DatePicker format={'D MMMM'} bordered={false} />
                </Form.Item>
                <Form.Item
                    label='Fecha Fin'
                    name={'fechaFin'}
                    labelCol={{ span: 12 }}
                >
                    <DatePicker format={'D MMMM'} bordered={false} />
                </Form.Item>

                <Form.Item
                    label='Participantes'
                    name='participantes'
                >
                    <Select mode='multiple' placeholder='Please select' bordered={false}
                        onChange={(value) => setSelectedUsers(value)} value={selectedUsers}
                        tagRender={tagRender} maxTagCount={3} style={{ width: '100%' }}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                    >
                        {
                            usuarios.map((usuario) => (
                                <Select.Option key={usuario.id} value={usuario.id}>
                                    { spanUsuario(usuario) }
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <div className='flex'>
                    <Form.Item
                        label='Descripción de Acción'
                        className='formItem'
                        name='descripcion'
                    >
                        {/* <Input.TextArea placeholder='Descripción'rows={5} /> */}
                        <ReactQuill theme="snow" value={ currentTarea.descripcion } />
                    </Form.Item>
                </div>

            </Form>
        </>
    )
}
