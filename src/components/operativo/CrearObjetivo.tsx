import { Form } from 'antd'
import { Formik } from 'formik'
import { FC } from 'react'

interface CrearObjetivoProps {
}

export const CrearObjetivo:FC<CrearObjetivoProps> = () => {
  return (
    <>
        <Formik
            initialValues={{
                nombre: '',
            }}
            onSubmit={ () => {} }
            validationSchema={ () => {} }
        >
            {({values, handleChange, handleBlur, handleSubmit}) => (
                <Form onFinish={handleSubmit} noValidate layout='vertical'>

                </Form>
            )}
        </Formik>
    
    </>
  )
}
