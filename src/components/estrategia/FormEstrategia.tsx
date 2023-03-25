import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input, Select, Slider } from 'antd';
import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createEstrategicoFromPerspectivaThunk, updateEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { useEffect, useState, useMemo } from 'react';

import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import dayjs from 'dayjs';

export const FormEstrategia = ({perspectiva, setOpen, estrategico}: any) => {
    

    const [initialValues, setInitialValues] = useState<any>({
        nombre: '',
        clave: '',
        descripcion: '',
        indicador: '',
        progreso: 0,
        perspectivaId: perspectiva.id,
        fechaInicio: '01/01/2023',
        fechaFin: '01/01/2023',
        responsables: []
    })
    

    const  dispatch = useAppDispatch()
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { TextArea } = Input;

    const handleOnSubmit = (values: any) => {

        if(values.id){
            dispatch(updateEstrategicoThunk(values))
            setOpen(false)
            return
        }
        dispatch(createEstrategicoFromPerspectivaThunk(values))
        setOpen(false)        
    }

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])

    useMemo(() => {;

        setInitialValues({
            id: estrategico?.id,
            nombre: estrategico?.nombre,
            clave: estrategico?.clave,
            progreso: estrategico?.progreso,
            descripcion: estrategico?.descripcion,
            perspectivaId: perspectiva.id,
            fechaInicio: estrategico?.fechaInicio,
            fechaFin: estrategico?.fechaFin,
            responsables: estrategico?.responsables.map((r: any) => r.id)
        })

    }, [estrategico])

    return (
        <>
            <Formik
                initialValues={ initialValues }

                onSubmit={ (values) => handleOnSubmit(values) }
                validationSchema={Yup.object({
                    nombre: Yup.string().required("El nombre es requerido"),
                    clave: Yup.string().required("La clave es requerida"),
                    descripcion: Yup.string().required("La descripción es requerida"),
                    fechaInicio: Yup.date().required("La fecha de inicio es requerida"),
                    fechaFin: Yup.date().required("La fecha de fin es requerida"),
                })}
                enableReinitialize={true}
            >
                {
                    ({ values, handleChange, handleBlur, handleSubmit, validateForm, setFieldValue }) => (
                        <Form
                            onFinish={handleSubmit}
                            noValidate
                            layout='vertical'
                        >
                            <Form.Item
                                label="Título del objetivo"
                            >
                                <Input
                                    value={values.nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="nombre"
                                />
                                <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>

                            <Form.Item
                                label="Perspectiva"
                            >
                            </Form.Item>

                            <div className='grid grid-cols-2 gap-x-10'>
                                <Form.Item
                                    label="Fecha de inicio"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaInicio', dateString)}
                                        onBlur={handleBlur}
                                        defaultValue={dayjs(values.fechaInicio, "YYYY-MM-DD")} 
                                        format={"DD-MM-YYYY"}
                                        name="fechaInicio"
                                        className='w-full'
                                    />
                                    <ErrorMessage name="fechaInicio" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Fecha de fin"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaFin', dateString)}
                                        onBlur={handleBlur}
                                        defaultValue={dayjs(values.fechaFin, "YYYY-MM-DD")} format={"DD-MM-YYYY"}
                                        name="fechaFin"
                                        className='w-full'
                                    />
                                    <ErrorMessage name="fechaFin" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Responsables"
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona los responsables"
                                    onChange={(value) => setFieldValue('responsables', value)}
                                    allowClear
                                    defaultValue={ values.responsables }
                                >
                                    {
                                        usuarios.map((usuario: any) => (
                                            <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre}</Select.Option>
                                        ))
                                    }
                                </Select>
                                <ErrorMessage name="responsables" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>

                            <Form.Item
                                label="Progreso"
                            >
                                <Slider defaultValue={values.progreso} onChange={(value) => setFieldValue('progreso', value)} />
                            </Form.Item>
                            <Form.Item
                                label="Clave"
                            >
                                <Input
                                    value={values.clave}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="clave"
                                />
                                <ErrorMessage name="clave" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Describe la meta a alcanzar"
                            >
                                <TextArea rows={4} value={values.descripcion} onChange={handleChange} onBlur={handleBlur} name="descripcion" />
                                <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Indicador"
                            >
                                <TextArea rows={4} value={values.indicador} onChange={handleChange} onBlur={handleBlur} name="indicador" />
                                <ErrorMessage name="indicador" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                           
                            
                            <Form.Item 
                                className='text-right'
                            >
                                <Button btnType="secondary" type='submit'>Guardar</Button>
                            </Form.Item>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
