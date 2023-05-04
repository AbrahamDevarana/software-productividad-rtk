import { Avatar, DatePicker, Divider, Form, Input, Select, Tooltip } from 'antd'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks'
import { UsuarioProps } from '@/interfaces'
import { Formik } from 'formik'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '@/assets/scss/quill.scss'


export const FormAccionesProyecto = () => {
    const { RangePicker } = DatePicker
    const dispatch = useAppDispatch()
    const [selectedUsers, setSelectedUsers] = React.useState<any[]>([]);

    const { usuarios } = useAppSelector(state => state.usuarios)
    // const { currentAccionesProyecto } = useAppSelector(state => state.accionesProyecto)

    

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

    return (
        <>
            <h1 className='text-2xl pb-5'></h1>


            <Formik
                initialValues={{
                    nombre: '',
                    descripcion: '',
                }}
                onSubmit={(values) => {
                    console.log(values)
                }}
            >

                <Form>
                    <Form.Item>
                        <Input placeholder='Ingresa el nombre de la actividad' className='customInput' value={'Task Change Old Design'} bordered={false} />
                    </Form.Item>

                    <Form.Item
                        label='Fecha'
                    >
                        <RangePicker format={'D MMMM'} bordered={false} />
                    </Form.Item>

                    <Form.Item
                        label='Participantes'
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
                    <Form.Item
                        label='Descripción de Acción'
                        labelCol={{ span: 24 }}
                        className='formItem'
                    >
                        <Input.TextArea placeholder='Descripción' value={'Task Change Old Design'} rows={5} />
                        {/* <ReactQuill theme="snow" value={'Task Change Old Design'} /> */}
                    </Form.Item>

                </Form>
            </Formik>

            <Divider />
        </>
    )
}
