import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form, Alert, DatePicker, Input } from 'antd';
import { Button } from '../ui';
import { useAppDispatch } from '@/redux/hooks';
import { createEstrategicoFromPerspectivaThunk } from '../../redux/features/estrategicos/estrategicosThunk';

export const FormEstrategia = ({perspectiva, setOpen}: any) => {

    const  dispatch = useAppDispatch()
    const { TextArea } = Input;

    const handleOnSubmit = (values: any) => {
        dispatch(createEstrategicoFromPerspectivaThunk(values))
        setOpen(false)
    }

    return (
        <>
            <Formik
                initialValues={{
                    nombre: '',
                    clave: '',
                    descripcion: '',
                    perspectivaId: perspectiva.id,
                    fechaInicio: '',
                    fechaFin: '',
                }}

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
                                label="Descripción"
                            >
                                <TextArea rows={4} value={values.descripcion} onChange={handleChange} onBlur={handleBlur} name="descripcion" />
                                <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
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
