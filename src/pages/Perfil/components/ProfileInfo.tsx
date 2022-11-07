import { Formik, ErrorMessage,Field } from 'formik'
import { Button } from '../../../components/ui/'
import { Input } from '../../../components/ui'
import * as Yup from "yup";
import { Alert, DatePicker } from 'antd';
import moment from 'moment';


const profileSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    lastName: Yup.string().required('El apellido es requerido'),
    secondLastName: Yup.string().required('El apellido es requerido'),
    birth_date : Yup.date().required('La fecha de nacimiento es requerida'),
    email: Yup.string().email('El correo no es válido').required('El correo es requerido'),
    phone: Yup.number().required('El teléfono es requerido').typeError('El teléfono debe ser un número').positive('No puedes poner números negativos').integer(' No puede haber decimales '),
})

export const ProfileInfo = ({selectedUser}: any) => {
  return (
    <Formik
        initialValues={selectedUser}
        onSubmit={values => console.log(values)}
        validationSchema={profileSchema}
    >
   {
        ({ errors, touched, handleSubmit, handleChange, handleBlur, values, ...props }) => (                                            
            <form className='col-span-12 grid grid-cols-12 sm:gap-x-10 gap-y-10' noValidate onSubmit={handleSubmit}>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Nombre" className="w-full" inputName="name" fn={handleChange} value={values.name || ''} onBlur={handleBlur}/>
                    <ErrorMessage name="name" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Apellidos Paterno" className="w-full" inputName="lastName" fn={handleChange} value={values.lastName || ''} onBlur={handleBlur}/>
                    <ErrorMessage name="lastName" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Apellidos Materno" className="w-full" inputName="secondLastName" fn={handleChange} value={values.secondLastName || ''} onBlur={handleBlur} />
                    <ErrorMessage name="secondLastName" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Nombre a mostrar" className="w-full" inputName="nick_name" fn={handleChange} value={values.nick_name || ''} onBlur={handleBlur} />
                    <ErrorMessage name="nick_name" render={msg => <Alert message={msg} showIcon  type="error" />} />
                    
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <DatePicker inputReadOnly format={"DD - MM - YYYY"} placeholder="Fecha de nacimiento" name="birth_date" value={moment(values.birth_date)} className="w-full border-0 border-b" />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input title="Email" disabled={true} className="w-full" inputName="email" fn={handleChange} value={values.email || ''} onBlur={handleBlur}/>
                    <ErrorMessage name="email" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                <div className="col-span-12 xl:col-span-4 md:col-span-6">
                    <Input type='tel' title="Teléfono" className="w-full" inputName="phone" fn={handleChange} value={values.phone || ''} onBlur={handleBlur}/>
                    <ErrorMessage name="phone" render={msg => <Alert message={msg} showIcon  type="error" />} />
                </div>
                
                <div className="col-span-12 relative">
                    {/* <textarea title="Sobre mi" className="w-full" inputName="profile_description" fn={handleChange} value={profile_description} />                             */}
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
