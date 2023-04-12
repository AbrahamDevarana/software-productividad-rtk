import { FC, useEffect } from 'react'
import { OperativoProps } from '@/interfaces'
import { getTacticosThunk } from '@/redux/features/tacticos/tacticosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Alert, Button, DatePicker, Form, Input, Select } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from 'yup';
import dayjs, {Dayjs} from 'dayjs';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks'
import { createOperativoThunk } from '@/redux/features/operativo/operativosThunk'




interface FormObjetivoProps {
    currentOperativo : OperativoProps
}

export const FormObjetivo:FC<FormObjetivoProps> = ({currentOperativo}) => {

    const { RangePicker } = DatePicker;
    const dispatch = useAppDispatch()
    const { tacticos } = useAppSelector(state => state.tacticos)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const { userAuth } = useAppSelector(state => state.auth)

    useEffect(() => {
        dispatch(getTacticosThunk({}))
        dispatch(getUsuariosThunk({}))
    }, [])

    const handleOnSubmit = (values: OperativoProps) => {
        const query =  {
            ...values,
            propietarioId: userAuth?.id,
        }
        
        dispatch(createOperativoThunk(query))
    }

    const disabledDate = ( current: Dayjs ) => {
        return (
            current && (
            current.endOf('quarter') > dayjs().endOf('quarter') ||
            current.startOf('quarter') < dayjs().startOf('quarter')
            )
        );
    };


    return (
    <>

        <Formik
            initialValues={currentOperativo}
            onSubmit={ handleOnSubmit }
            validationSchema={ 
                Yup.object({
                    nombre: Yup.string().required("El nombre es requerido"),
                    meta: Yup.string().required("La meta es requerida"),
                    indicador: Yup.string().required("El indicador es requerido"),
                    tacticoId: Yup.string().required("El objetivo tactico es requerido"),
                })
             }
            enableReinitialize={true}
        >
            {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                <Form onFinish={handleSubmit} noValidate layout='vertical' className='grid grid-cols-12 md:gap-x-10'>
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
                        label="Meta"
                        name="meta"
                        className='col-span-12'
                        required
                    >
                        <Input.TextArea value={values.meta} onChange={handleChange} onBlur={handleBlur} name="meta" />
                        <ErrorMessage name="meta" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>
                    <Form.Item
                        label="Indicador"
                        name="indicador"
                        className='col-span-12'
                        required
                    >
                        <Input.TextArea value={values.indicador} onChange={handleChange} onBlur={handleBlur} name="indicador" />
                        <ErrorMessage name="indicador" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>
                    <Form.Item
                        label="Fecha"
                        className='col-span-6'
                        name="fecha"
                        required
                    >
                        <RangePicker 
                            disabledDate={disabledDate}
                            className='w-full' 
                            defaultValue={[dayjs(values.fechaInicio), dayjs(values.fechaFin)]}        
                            onChange={ (dates, dateStrings) => {
                                setFieldValue('fechaInicio', dateStrings[0])
                                setFieldValue('fechaFin', dateStrings[1])
                            }}
                        
                        />
                        <ErrorMessage name="fecha" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>
                    <Form.Item
                        className=' col-span-6'
                        label="Objetivo Tactico"
                        name="tacticoId"
                        required
                    >

                        <Select 
                            value={values.tacticoId}
                            onBlur={handleBlur}
                            onChange={ (value) => setFieldValue('tacticoId', value)}
                        >
                            {
                                tacticos.map(tactico => (
                                    <Select.Option key={tactico.id} value={tactico.id}>{tactico.nombre}</Select.Option>
                                ))
                            }
                        </Select>
                        <ErrorMessage name="tacticoId" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>

                    <Form.Item
                        className=' col-span-6'
                        label="Participantes"
                        name="participantesIds"
                    >
                        <Select
                            mode="multiple"
                            value={values.responsables_op?.map( usuario => usuario.id)}
                            onBlur={handleBlur}
                            onChange={
                                // push into values.responsables_op
                                (value) => {
                                    const participantes = usuarios.filter( usuario => value.includes(usuario.id))
                                    setFieldValue('responsables_op', participantes)
                                }
                            }
                        >
                            {
                                usuarios.map(usuario => (
                                    <Select.Option key={usuario.id} value={usuario.id}>{usuario.nombre}</Select.Option>
                                )).filter( usuario => usuario.key !== userAuth?.id)
                            }
                        </Select>
                        <ErrorMessage name="participantesIds" render={msg => <Alert type="error" message={msg} showIcon />} />
                    </Form.Item>

                    <Form.Item className='col-span-12'>
                        <Button htmlType='submit' className='btn-primary'>Guardar</Button>
                    </Form.Item>
                </Form>
            )}
        </Formik>
    
    </>
  )
}
