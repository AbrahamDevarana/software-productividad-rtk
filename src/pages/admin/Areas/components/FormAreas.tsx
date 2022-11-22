import { Alert } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import { Box, Button, Input } from '../../../../components/ui'
import * as Yup from "yup";


export const FormAreas = () => {
  return (
    <div className='animate__animated animate__fadeIn animate__faster'>
        <Box className='h-fit'>
            <h1>Nuevo / Editar Areas</h1>
            <Formik
                initialValues={{
                    nombre: '',
                }}
                onSubmit={ (values, { setSubmitting }) => console.log( setSubmitting )}
                validationSchema={Yup.object({
                    nombre: Yup.string().required("El nombre es requerido"),
                })}

            >
                {
                    ({ values, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}  noValidate>
                            <div className='py-4'>
                                <Input
                                    title="Nombre"
                                    inputName="nombre"
                                    value={values.nombre}
                                    fn={handleChange}
                                    onBlur={handleBlur}
                                />
                                <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div className='py-4'>
                                <Button btnType="secondary" type="submit" className="mr-2">Crear</Button>
                            </div>

                        </form>
                )}
            </Formik>
        </Box>
    </div>
  )
}
