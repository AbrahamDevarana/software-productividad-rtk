import { ProyectosProps } from '@/interfaces'
import { Alert, Button, DatePicker, Form, Input } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/redux/hooks';
import { createProyectoThunk, updateProyectoThunk } from '@/redux/features/proyectos/proyectosThunk';

interface FormProyectoProps {
    currentProyecto: ProyectosProps
    handleCancel: () => void
}

export const FormProyecto = ({currentProyecto, handleCancel}: FormProyectoProps) => {

    const { RangePicker } = DatePicker;
    const { TextArea } = Input;

    const dispatch = useAppDispatch()


    const handleSubmit = (values: ProyectosProps) => {
        if(currentProyecto.id !== '') {
            dispatch(updateProyectoThunk(values))
        }
        else {
            dispatch(createProyectoThunk(values))
        }
        handleCancel()
    }

    return (
        <Formik
            initialValues={currentProyecto}
            onSubmit={(values) => {
                handleSubmit(values)
            }}
            enableReinitialize
            validationSchema={ 
                Yup.object({
                    titulo: Yup.string().required('El titulo es requerido'),
                })
            }

        >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                <Form onFinish={handleSubmit} noValidate layout='vertical' className='grid grid-cols-12 md:gap-x-10'>
                    <Form.Item
                        label="Titulo"
                        name="titulo"
                        className='col-span-12'
                        required
                    >
                        <Input value={values.titulo} onChange={handleChange} onBlur={handleBlur} name="titulo" />
                        <ErrorMessage name="titulo" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>

                    <Form.Item
                        label="Descripcion"
                        name="descripcion"
                        className='col-span-12'
                    >
                        <TextArea value={values.descripcion} onChange={handleChange} onBlur={handleBlur} name="descripcion" rows={5} />
                        <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>

                    <Form.Item
                        label="Fecha"
                        className='col-span-12'
                    >
                        <RangePicker className='w-full' defaultValue={[dayjs(values.fechaInicio), dayjs(values.fechaFin)]}  onCalendarChange={
                            (value, valueString) => {
                                setFieldValue('fechaInicio', valueString[0])
                                setFieldValue('fechaFin', valueString[1])
                            }
                        }/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" className='btn-primary' htmlType="submit" > Guardar </Button>
                    </Form.Item>

                </Form>
            )}
        </Formik>
        
    )
}
