import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input, Select, Radio, Divider, Checkbox } from 'antd';
import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { getEstrategicosThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { createTacticoThunk, updateTacticoThunk } from '@/redux/features/tacticos/tacticosThunk';
import { TacticoProps, UsuarioProps } from '@/interfaces';
import {  useParams } from 'react-router-dom';


interface FormTacticoProps {
    setShowEdit: (value: boolean) => void
    showEdit?: boolean
}

export const FormTactico:React.FC<FormTacticoProps> = ({showEdit, setShowEdit}) => {

    
    const {slug} = useParams<{slug:string}>()
    const  dispatch = useAppDispatch()
    const { currentTactico } = useAppSelector(state => state.tacticos)
    const { TextArea } = Input;
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { estrategicos } = useAppSelector(state => state.estrategicos)
    const { areas } = useAppSelector(state => state.areas)
    const {userAuth} = useAppSelector(state => state.auth)


    useEffect(() => {
        dispatch(getUsuariosThunk({}))
        dispatch(getAreasThunk({}))
        dispatch(getEstrategicosThunk({}))
    }, [])

    const handleOnSubmit = (values: TacticoProps) => {        
        if(currentTactico.id !== ""){
            dispatch(updateTacticoThunk(values))
        }else{
            dispatch(createTacticoThunk(values))        
        }            
    }
    return (
        <>
            <Formik
                initialValues={{
                    ...currentTactico,
                    propietarioId: userAuth.id,
                    responsablesArray: currentTactico.responsables.map((responsable) => responsable.id),
                    areasArray: [ ...currentTactico.areas.map((area) => area.id), 
                        areas.find(area => area.slug === slug )?.id || 0 ],
                    isEstrategico: currentTactico.estrategicoId ? 1 : 2
                }}

                onSubmit={ (values) => handleOnSubmit(values) }
                validationSchema={Yup.object({
                    nombre: Yup.string().required('El nombre es requerido'),
                    codigo: Yup.string().required('Clave'),
                    meta: Yup.string().required('La meta es requerida'),
                    fechaInicio: Yup.date().required('La fecha de inicio es requerida'),
                    fechaFin: Yup.date().required('La fecha de fin es requerida'),
                    indicador: Yup.string().required('El indicador es requerido'),                    
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
                            <Divider orientation="left">Objetivo </Divider>
                                {/* Objetivo */}
                                <Form.Item
                                        label="Tipo de objetivo"
                                    >
                                    <Radio.Group
                                        onChange={(e) => { 
                                            setFieldValue('isEstrategico', e.target.value)
                                            setFieldValue('estrategicoId', e.target.value === 1 ? currentTactico.estrategicoId : '') 
                                            setFieldValue('estrategico', e.target.value === 1 ? currentTactico.estrategico : '')
                                        }}
                                        value={values.isEstrategico}
                                    >
                                        <Radio value={1}>Táctico</Radio>
                                        <Radio value={2}>Core</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                
                                { values.isEstrategico === 1 && (
                                <Form.Item
                                    label="Objetivo estratégico"
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Selecciona el objetivo estratégico"
                                        onChange={(value) => {setFieldValue('estrategicoId', value ) }}
                                        value={  values.estrategicoId }
                                        disabled={estrategicos.length === 0}
                                        allowClear
                                        showSearch
                                        filterOption={(input, option) =>
                                            // @ts-ignore
                                            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }

                                    >
                                        {
                                            estrategicos.map((objetivo: any) => (
                                                <Select.Option key={objetivo.id} value={objetivo.id}>{objetivo.nombre}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                    <ErrorMessage name="estrategicoId" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            )}
                            
                            <Divider orientation="left">Áreas</Divider>

                            <Form.Item>
                                <Checkbox.Group
                                    value={values.areasArray}
                                    onChange={(value) => { setFieldValue('areasArray', value) }}
                                >
                                    {
                                        areas.map((area) => (
                                            <Checkbox key={area.id} value={area.id}> {area.nombre} </Checkbox>
                                        ))
                                    }
                                </Checkbox.Group>
                        </Form.Item>

                        <Divider />
                            <div className="grid grid-cols-6 gap-x-5">
                                <Form.Item
                                    label="Título del objetivo táctico"
                                    className='col-span-5'
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
                                    label="Clave"
                                    className='col-span-1'
                                >
                                    <Input
                                        value={values.codigo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="codigo"
                                    />
                                    <ErrorMessage name="codigo" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>

                            </div>

                            <div className='grid grid-cols-2 gap-x-10'>
                                <Form.Item
                                    label="Fecha de inicio"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaInicio', dayjs(dateString, 'DD-MM-YYYY'))}
                                        onBlur={handleBlur}
                                        value={dayjs(values.fechaInicio)} format={"DD-MM-YYYY"}
                                        defaultValue={dayjs(values.fechaInicio)}
                                        name="fechaInicio"
                                        className='w-full'
                                        clearIcon={false}
                                    />
                                    <ErrorMessage name="fechaInicio" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Fecha de fin"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaFin', dayjs(dateString, 'DD-MM-YYYY'))}
                                        onBlur={handleBlur}
                                        value={dayjs(values.fechaFin)} format={"DD-MM-YYYY"}
                                        defaultValue={dayjs(values.fechaFin)}
                                        name="fechaFin"
                                        className='w-full'
                                        clearIcon={false}
                                        
                                    />
                                    <ErrorMessage name="fechaFin" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>

                            <Form.Item
                                label="Propietario"
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona al propietario"
                                    onChange={(value) => setFieldValue('propietarioId', value)}
                                    allowClear
                                    value={ values.propietarioId }
                                >
                                    {
                                        usuarios.map((usuario: UsuarioProps) => (
                                            <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellidoPaterno} </Select.Option>
                                        ))
                                    }
                                </Select>
                                <ErrorMessage name="responsables" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Co-Responsables"
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona los responsables"
                                    onChange={(value) => setFieldValue('responsablesArray', value)}
                                    allowClear
                                    value={ values.responsablesArray }
                                >
                                    {
                                        usuarios.map((usuario: UsuarioProps) => (
                                            <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellidoPaterno}</Select.Option>
                                        ))
                                    }
                                </Select>
                                <ErrorMessage name="responsables" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                                    
                            <Form.Item
                                label="Describe la meta a alcanzar"
                            >
                                <TextArea rows={3} value={values.meta} onChange={handleChange} onBlur={handleBlur} name="meta" />
                                <ErrorMessage name="meta" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Indicador"
                            >
                                <TextArea rows={3} value={values.indicador} onChange={handleChange} onBlur={handleBlur} name="indicador" />
                                <ErrorMessage name="indicador" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                           


                                
                            <Form.Item 
                                className='text-right'
                            >
                                <div className='flex'>
                                    { showEdit && <Button fn={ () => setShowEdit(false)} btnType="primary-outline">Cancelar</Button>}
                                    <Button btnType="secondary" type='submit' className='ml-auto'>Guardar</Button>
                                </div>
                            </Form.Item>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}
