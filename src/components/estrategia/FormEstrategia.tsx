import { useEffect, useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input, Select, Slider, Radio } from 'antd';
import { Button } from '../ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createEstrategicoFromPerspectivaThunk, updateEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import dayjs from 'dayjs';
import { Perspectiva } from '@/interfaces';

interface FormEstrategiaProps {
    setOpen: (open: boolean) => void;
    estrategico?: any;
    setShowEdit?: (show: boolean) => void;
}

export const FormEstrategia = ({setOpen, estrategico, setShowEdit}: FormEstrategiaProps) => {

    const { perspectivas } = useAppSelector(state => state.perspectivas)
    

    const [initialValues, setInitialValues] = useState<any>({
        nombre: '',
        codigo: '',
        descripcion: '',
        indicador: '',
        progreso: 0,
        perspectivaId: '',
        fechaInicio: new Date(),
        fechaFin: new Date(),
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

    useEffect(() => {

        
        
        if(estrategico){
            setInitialValues({
                id: estrategico?.id,
                nombre: estrategico?.nombre,
                codigo: estrategico?.codigo,
                progreso: estrategico?.progreso,
                descripcion: estrategico?.descripcion,
                fechaInicio: estrategico?.fechaInicio,
                fechaFin: estrategico?.fechaFin,
                indicador: estrategico?.indicador,
                perspectivaId: estrategico?.pivot_persp_estr.perspectivaId,
                responsables: estrategico?.responsables.map((r: any) => r.id)
            })
    }

    }, [estrategico])


    const handleSelectPerspectiva = (id: any) => {
        setInitialValues({
            ...initialValues,
            perspectivaId: id
        })
    }
    

    return (
        <>
            <Formik
                initialValues={ initialValues }

                onSubmit={ (values) => handleOnSubmit(values) }
                validationSchema={Yup.object({
                    nombre: Yup.string().required("El nombre es requerido"),
                    codigo: Yup.string().required("La codigo es requerida"),
                    descripcion: Yup.string().required("La descripción es requerida"),
                    perspectivaId: Yup.string().required("La perspectiva es requerida")
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
                            <div className="grid grid-cols-6 gap-x-5">
                                <Form.Item
                                    label="Título del objetivo"
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
                            <Form.Item
                                label="Perspectiva"
                            >

                            <div className='grid grid-cols-4 gap-3'>
                                
                                {
                                    perspectivas && perspectivas.map((perspectiva: Perspectiva) => (
                                        <button 
                                            type='button'
                                            onClick={() => handleSelectPerspectiva(perspectiva.id)}
                                            key={perspectiva.id} 
                                            className='rounded-ext py-2'
                                            style={{
                                                backgroundColor: values.perspectivaId === perspectiva.id ? perspectiva.color : '#f0f2f5',
                                                color: values.perspectivaId === perspectiva.id ? '#fff' : '#000'
                                            }}
                                        >
                                            <span className='drop-shadow'>{ perspectiva.nombre }</span>
                                        </button>
                                    ))
                                }
                                
                            </div>
                            <ErrorMessage name="perspectivaId" render={msg => <Alert type="error" message={msg} showIcon />} />

                            </Form.Item>

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
                                label="Responsables"
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Selecciona los responsables"
                                    onChange={(value) => setFieldValue('responsables', value)}
                                    allowClear
                                    value={ values.responsables }
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
                                <Slider value={values.progreso} onChange={(value) => setFieldValue('progreso', value)} />
                            </Form.Item>
                            
                            <Form.Item
                                label="Describe la meta a alcanzar"
                            >
                                <TextArea rows={3} value={values.descripcion} onChange={handleChange} onBlur={handleBlur} name="descripcion" />
                                <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Indicador"
                            >
                                <TextArea rows={3} value={values.indicador} onChange={handleChange} onBlur={handleBlur} name="indicador" />
                                <ErrorMessage name="indicador" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                           
{/* 
                            <Form.Item
                                label="Métrica de Seguimiento"
                            >
                            
                                <Radio.Group
                                    onChange={(e) => setFieldValue('metricaSeguimiento', e.target.value)}
                                    value={values.metricaSeguimiento}
                                    defaultValue={1}
                                >
                                    <Radio value={1}>Manual</Radio>
                                    <Radio value={2}>Cumplimiento de Objetivo Táctico</Radio>
                                </Radio.Group>
                            </Form.Item> */}
                                        

                           

                            <Form.Item 
                                className='text-right'
                            >
                                <div className='flex'>
                                    {setShowEdit &&<Button fn={ () => setShowEdit(false)} btnType="primary-outline">Cancelar</Button>}
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
