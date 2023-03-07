import { Formik, ErrorMessage,Field } from 'formik'
import { Button } from '../../../components/ui/'
import { Input } from '../../../components/ui'
import * as Yup from "yup";
import { Alert, DatePicker } from 'antd';
import moment from 'moment';
import { updateProfileThunk } from '../../../redux/features/profile/profileThunk';
import { useAppDispatch } from '../../../redux/hooks';


const profileSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es requerido'),
    apellidPaterno: Yup.string().required('El apellido es requerido'),
    apellidoMaterno: Yup.string().required('El apellido es requerido'),
    fechaNacimiento: Yup.date().required('La fecha de nacimiento es requerida'),
    email: Yup.string().email('El correo no es válido').required('El correo es requerido'),
    telefono: Yup.number().required('El teléfono es requerido').typeError('El teléfono debe ser un número').positive('No puedes poner números negativos').integer(' No puede haber decimales '),
})

export const ProfileInfo = ({activeUser}: any) => {

    const dispatch = useAppDispatch();

  return (
    <Formik
        initialValues={activeUser}
        onSubmit={values => dispatch(updateProfileThunk( values ))}
        validationSchema={profileSchema}
    >
   {
        ({ errors, handleSubmit, handleChange, handleBlur, values }) => (                                            
            <form className='col-span-12 grid grid-cols-12 sm:gap-x-10 gap-y-10' noValidate onSubmit={handleSubmit}>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Nombre" className="w-full" inputName="nombre" value={activeUser.nombre} fn={handleChange} onBlur={handleBlur}/>
                    <ErrorMessage name="nombre" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Apellidos Paterno" className="w-full" inputName="apellidoPaterno" value={activeUser.apellidoPaterno} fn={handleChange} onBlur={handleBlur}/>
                    <ErrorMessage name="apellidoPaterno" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Apellidos Materno" className="w-full" inputName="apellidoMaterno" value={activeUser.apellidoMaterno} fn={handleChange} onBlur={handleBlur} />
                    <ErrorMessage name="apellidoMaterno" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Nombre a mostrar" className="w-full" inputName="nombreCorto" value={activeUser.nombreCorto} fn={handleChange} onBlur={handleBlur} />
                    <ErrorMessage name="nombreCorto" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <DatePicker inputReadOnly format={"DD - MM - YYYY"} placeholder="Fecha de nacimiento" name="fechaNacimiento" className="w-full border-0 border-b" />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Email" disabled={true} className="w-full" inputName="email" value={activeUser.email} fn={handleChange} onBlur={handleBlur}/>
                    <ErrorMessage name="email" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input type='tel' title="Teléfono" className="w-full" inputName="telefono" value={activeUser.telefono} fn={handleChange} onBlur={handleBlur}/>
                    <ErrorMessage name="telefono" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                
                <div className="col-span-12 relative">
                    {/* <textarea title="Sobre mi" className="w-full" inputName="profile_description" fn={handleChange} onBlur={handleBlur} /> */}
                </div>  
                <div className="col-span-12 ml-auto">
                    <Button btnType="secondary-outline" className="block ml-auto" type='submit'>  Guardar Perfil </Button>
                </div>    
            </form>
        )
   }
</Formik>     
  )
}
