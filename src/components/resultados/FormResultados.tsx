import { FC, useEffect, useState } from 'react';
import { OperativoProps, ResultadoClaveProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Button, Form, Input, Radio } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';
import dayjs from 'dayjs';
import { createResultadoThunk, getResultadoThunk, getResultadosThunk, updateResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { FaPen } from 'react-icons/fa';



interface FormResultadosProps {
    currentOperativo : OperativoProps
    handleCurrent: (current: number) => void
    current: number
}

export const FormResultados:FC<FormResultadosProps> = ({currentOperativo, handleCurrent, current}) => {

    const dispatch = useAppDispatch()
    const { errorObjetivo } = useAppSelector(state => state.operativos)
    const { currentResultadoClave } = useAppSelector(state => state.resultados)
    const [ resultadoList, setResultadoList ] = useState(currentOperativo.resultados_clave || [] )

    const [ resultado, setResultado ] = useState<ResultadoClaveProps>({
        id: '',
        nombre: '',
        tipoProgreso: "porcentaje",
        progreso: 0,
        fechaInicio: dayjs().startOf('quarter').format('YYYY-MM-DD'),
        fechaFin: dayjs().endOf('quarter').format('YYYY-MM-DD'),
        operativoId: '',
        propietarioId: ''
    })


    useEffect(() => {
        if ( currentOperativo.id === '' ) return
        dispatch( getResultadosThunk(currentOperativo.id) )
    }, [currentOperativo.id])
    
    
    
    const handleOnSubmit = async (values: ResultadoClaveProps) => {
        
        const query = {
            ...values,
            operativoId: currentOperativo.id,
            propietarioId: currentOperativo.propietarioId
        }
        
        if ( currentOperativo.id !== '' ){
            if(query.id === ''){
                await dispatch( createResultadoThunk(query) )
                if(!errorObjetivo){
                    setResultadoList( [...resultadoList, query] )
                }
            }else{
                dispatch( updateResultadoThunk(query) )
                setResultadoList( resultadoList.map( resultado => resultado.id === query.id ? query : resultado ) )
            }
           
        }
    }

    const handleEditResultado = (resultadoId: string ) => {
        dispatch( getResultadoThunk(resultadoId) )
    }

    useEffect(() => {
        setResultado(currentResultadoClave)
    }, [currentResultadoClave])




    return (
    <>

        <div className="grid grid-cols-4 gap-x-10">
            <div className='col-span-2'>
                <ul className=''>
                   {
                        resultadoList && resultadoList.map( resultado => (
                            <li key={resultado.id} className='flex gap-x-5 p-2 border last-of-type:rounded-b-ext first-of-type:rounded-t-ext'>
                                <p className='w-full'>{resultado.nombre}</p> <Button type='ghost' className='border-0' onClick={() => handleEditResultado(resultado.id)}> <FaPen className='text-devarana-midnight' /></Button>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className='col-span-2'>
                <Formik
                    initialValues={resultado}
                    onSubmit={ handleOnSubmit }
                    validationSchema={ 
                        Yup.object({
                            nombre: Yup.string().required('El nombre es requerido'),
                            tipoProgreso: Yup.string().required('El tipo de progreso es requerido'),
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
                                <Input value={values.nombre} onChange={handleChange} name="nombre" />
                                <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            <Form.Item
                                label="Tipo de progreso"
                                name="tipoProgreso"
                                className='col-span-12'
                                required
                            >
                                <Radio.Group value={values.tipoProgreso} onChange={handleChange} name="tipoProgreso">
                                    <Radio value="porcentaje">Porcentaje</Radio>
                                    <Radio value="cantidad">Cantidad</Radio>
                                </Radio.Group>
                                <ErrorMessage name="tipoProgreso" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </Form.Item>
                            {
                                resultado.id !== "" 
                                ? (
                                    <>
                                        <Form.Item
                                            label="Progreso"
                                            name="progreso"
                                            className='col-span-12'
                                            required
                                        >
                                            <Input value={values.progreso} onChange={handleChange} name="progreso" />
                                            <ErrorMessage name="progreso" render={msg => <Alert type="error" message={msg} showIcon />} />
                                        </Form.Item>
                                    </>
                                    )
                                : null
                            }
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
