import { FC, useEffect, useState } from 'react';
import { OperativoProps, ResultadoClaveProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Button, DatePicker, Form, Input, Radio, Select } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';
import dayjs, {Dayjs} from 'dayjs';



interface FormResultadosProps {
    currentOperativo : OperativoProps
}

export const FormResultados:FC<FormResultadosProps> = ({currentOperativo}) => {

    const dispatch = useAppDispatch()

    const [ resultado, setResultado ] = useState<ResultadoClaveProps>({
        id: '',
        nombre: '',
        tipoProgreso: "porcentaje",
        progreso: 0,
        fechaInicio: dayjs().startOf('quarter').format('YYYY-MM-DD'),
        fechaFin: dayjs().endOf('quarter').format('YYYY-MM-DD'),
        operativoId: currentOperativo.id,
    })
    

    const handleOnSubmit = (values: ResultadoClaveProps) => {
        console.log(values)
    }


    return (
    <>

        <div className="grid grid-cols-4 gap-x-10">

            <div className='col-span-2'>

                <ul>
                    <li className='border p-2 rounded mb-2'>Resultado 1</li>
                    <li className='border p-2 rounded mb-2'>Resultado 2</li>
                    <li className='border p-2 rounded mb-2'>Resultado 3</li>
                    <li className='border p-2 rounded mb-2'>Resultado 4</li>

                </ul>

            </div>

            <div className='col-span-2'>
                <Formik
                    initialValues={resultado}
                    onSubmit={ handleOnSubmit }
                    validationSchema={ 
                        Yup.object({
                        
                        })
                    }
                    enableReinitialize={true}
                >
                    {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                        <Form onFinish={handleSubmit} noValidate layout='vertical' className='grid grid-cols-12 md:gap-x-10 w-full'>
                            <Form.Item
                                label="Nombre"
                                name="nombre"
                                className='col-span-12'
                                required
                            >
                                <Input value={values.nombre} onChange={handleChange} onBlur={handleBlur} name="nombre" />
                                <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Tipo de progreso"
                                name="tipoProgreso"
                                className='col-span-12'
                                required
                            >
                                <Radio.Group value={values.tipoProgreso} onChange={handleChange} onBlur={handleBlur} name="tipoProgreso">
                                    <Radio value="porcentaje">Porcentaje</Radio>
                                    <Radio value="cantidad">Cantidad</Radio>
                                </Radio.Group>
                                <ErrorMessage name="tipoProgreso" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                        

                            <Form.Item className='col-span-12'>
                                <Button htmlType='submit' className='btn-primary'>Guardar</Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    
    </>
  )
}
