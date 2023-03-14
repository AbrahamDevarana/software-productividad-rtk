import { Alert, Form } from 'antd';
import { ErrorMessage, Formik } from "formik"
import { Button } from "@/components/ui"
import * as Yup from "yup";


const usuarioSchema = Yup.object().shape({
    estado: Yup.number().required("El estado es requerido").positive('El estado es requerido'),
    municipio: Yup.number().required("El municipio es requerido").positive('El estado es requerido'),
    calle: Yup.string().required("La calle es requerida"),
    colonia: Yup.string().required("La colonia es requerida"),
    lugarOrigen: Yup.string().required("El lugar de origen es requerido"),
})

export const Domicilio = ({usuario, handleSteps}:any) => {
  return (
    <div className='animate__animated animate__fadeIn animate__faster'>
        <Formik
        initialValues={usuario}
        onSubmit={(values) =>  handleSteps(values)}
        validationSchema={ usuarioSchema }

        >
            {
                ({values, handleChange, handleSubmit, handleBlur, errors, setFieldValue}) => (
                    <Form onFinish={handleSubmit} noValidate>
                        <Form.Item>
                            
                        </Form.Item>
                    </Form>
            )}

        </Formik>
    </div>
  )
}
