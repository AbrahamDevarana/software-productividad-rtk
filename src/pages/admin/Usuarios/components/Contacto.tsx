import { Alert } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import * as Yup from "yup";
import { Button, Input } from '../../../../components/ui'

const usuarioSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    apellidoPaterno: Yup.string().required("El apellido paterno es requerido"),
    apellidoMaterno: Yup.string().required("El apellido materno es requerido"),
    email: Yup.string().email("El email no es válido").required("El email es requerido"),
    telefono: Yup.number().required('El teléfono es requerido').typeError('El teléfono debe ser un número').positive('No puedes poner números negativos').integer(' No puede haber decimales '),
})

export const Contacto = ({usuario, handleSteps}:any) => {
  return (
    <div className='animate__animated animate__fadeIn'>
        <Formik
            initialValues={usuario}
            onSubmit={ values => handleSteps(values) }
            validationSchema={ usuarioSchema }
        >
            {({ values, handleChange, handleBlur, handleSubmit, errors }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div>
                            <Input title="Nombre" inputName="nombre" value={values.nombre} fn={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                        </div>
                        <div>
                            <Input title="Apellido Paterno" inputName="apellidoPaterno" value={values.apellidoPaterno} fn={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name="apellidoPaterno" render={msg => <Alert type="error" message={msg} showIcon />} />
                        </div>
                        <div>
                            <Input title="Apellido Materno" inputName="apellidoMaterno" value={values.apellidoMaterno} fn={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage  name="apellidoMaterno" render={msg => <Alert type="error" message={msg} showIcon />} />
                        </div>
                        <div>
                            <Input title="Email" inputName="email" value={values.email} fn={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name="email" render={msg => <Alert type="error" message={msg} showIcon />} />
                        </div>
                        <div>
                            <Input title="Teléfono" inputName="telefono" value={values.telefono} fn={handleChange} onBlur={handleBlur}/>
                            <ErrorMessage name="telefono" render={msg => <Alert type="error" message={msg} showIcon />} />
                        </div>
                    </div>
                    <div className="flex justify-end mt-2">
                        <Button btnType="secondary" type="submit" className="mr-2">Siguiente</Button>
                    </div>
                </form>
            )}
        </Formik>
    </div>
  )
}
