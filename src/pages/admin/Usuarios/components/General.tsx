
import { Alert, Input, Form } from 'antd';
import { ErrorMessage, Formik } from 'formik'
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Button } from '@/components/ui';
import { createUsuarioThunk, updateUsuarioThunk } from '@/redux/features/admin/usuarios/usuariosThunks';


const usuarioSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es requerido"),
    apellidoPaterno: Yup.string().required("El apellido paterno es requerido"),
    apellidoMaterno: Yup.string().required("El apellido materno es requerido"),
    email: Yup.string().email("El email no es válido").required("El email es requerido"),
    telefono: Yup.number().required('El teléfono es requerido').typeError('El teléfono debe ser un número').positive('No puedes poner números negativos').integer(' No puede haber decimales '),
})

export const General = ({handleSteps}:any) => {

    const dispatch = useAppDispatch();

    const { currentUsuario } = useAppSelector((state: any) => state.usuarios)


    const handleOnSubmit = async (values: any) => {
        if(currentUsuario.id) {
            dispatch(updateUsuarioThunk(values))
        }else {
            dispatch(createUsuarioThunk(values))
        }
        handleSteps(1)
        
    }
    
    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Formik
                initialValues={ currentUsuario}
                onSubmit={ handleOnSubmit }
                validationSchema={ usuarioSchema }
                enableReinitialize={true}
            >
                {({ values, handleChange, handleSubmit, errors }) => (
                    <Form onFinish={handleSubmit} noValidate onChange={handleChange} layout='vertical'>
                        <div className="grid grid-cols-4 gap-x-4">
                            <div className='col-span-1'>
                            
                            </div>

                            <div className='col-span-3 grid grid-cols-2 gap-10'>
                                <Form.Item
                                    label="Nombre"
                                    required
                                >
                                    <Input value={values.nombre} name="nombre"/>
                                    <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Apellido Paterno"
                                    required
                                >
                                    <Input  value={values.apellidoPaterno} name="apellidoPaterno"/>
                                    <ErrorMessage name="apellidoPaterno" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Apellido Materno"
                                    required
                                >
                                    <Input  value={values.apellidoMaterno} name="apellidoMaterno"/>
                                    <ErrorMessage  name="apellidoMaterno" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    required
                                >
                                    <Input type='email' value={values.email} name="email"/>
                                    <ErrorMessage name="email" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Teléfono"
                                    required
                                >
                                    <Input name="telefono" value={values.telefono}/>
                                    <ErrorMessage name="telefono" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="flex justify-end mt-2">
                            <Button btnType="secondary" type="submit" className="mr-2"> { currentUsuario.id ? 'Actualizar' : 'Crear' } </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
