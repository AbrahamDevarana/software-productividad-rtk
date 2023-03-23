import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input, Slider } from 'antd';
import { Button } from '../ui';
import { useAppDispatch } from '@/redux/hooks';

export const FormTactico = () => {

    const  dispatch = useAppDispatch()
    const { TextArea } = Input;

    const handleOnSubmit = (values: any) => {
        
    }

    return (
        <>
            <Formik
                initialValues={{
                    nombre: '',
                    codigo: '',
                    meta: '',
                    indicador: '',
                    fechaInicio: '',
                    fechaFin: '',
                }}

                onSubmit={ (values) => handleOnSubmit(values) }
                validationSchema={Yup.object({
                    
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
                                label="Nombre de la estrategia"
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
                                label="Código"
                            >
                                <Input
                                    value={values.codigo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="clave"
                                />
                                <ErrorMessage name="clave" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Meta"
                            >
                                <TextArea 
                                rows={4} 
                                value={values.meta} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                name="descripcion" />
                                <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Indicador"
                            >
                                <TextArea 
                                rows={4} 
                                value={values.indicador} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                                name="descripcion" />
                                <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Progreso"
                            >
                                <Slider />
                            </Form.Item>
                            <div className='grid grid-cols-2 gap-x-10'>
                                <Form.Item
                                    label="Fecha de inicio"
                                    className='col-span-1'
                                >
                                    <DatePicker
                                        onChange={(date, dateString) => setFieldValue('fechaInicio', dateString)}
                                        onBlur={handleBlur}
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
                                        name="fechaFin"
                                        className='w-full'
                                    />
                                    <ErrorMessage name="fechaFin" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>
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
