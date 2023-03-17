import { ErrorMessage, Formik } from 'formik'
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from 'react-icons/ai'
import { Button, Input } from '@/components/ui'
import * as Yup from "yup";
import { Alert } from 'antd';

const socialSchema = Yup.object().shape({
    social_facebook: Yup.string().url('La url no es válida, ejemplo https://es-la.facebook.com/').nullable().notRequired(),
    social_instagram: Yup.string().url('La url no es válida, ejemplo https://www.instagram.com').nullable().notRequired(),
    social_linkedin: Yup.string().url('La url no es válida, ejemplo https://www.linkedin.com').nullable().notRequired(),
    social_twitter: Yup.string().url('La url no es válida, ejemplo https://twitter.com/').nullable().notRequired(),
})


interface SocialProsp {
    selectedUser: SocialInfoProps
}

interface SocialInfoProps {    
    social_facebook?: string | null
    social_instagram?: string | null
    social_linkedin?: string | null
    social_twitter?: string | null
}

export const SocialInfo = ({selectedUser}:SocialProsp) => {

    return (
        <Formik
            initialValues={selectedUser}
            onSubmit={values => console.log(values)}
            validationSchema={socialSchema}
        >
            
            {
                ({ errors, touched, handleSubmit, handleChange, handleBlur, values, ...props }) => (          
                <form className='grid grid-cols-4 gap-y-10 gap-x-5'  noValidate onSubmit={handleSubmit}>
                    <div className="col-span-4 md:col-span-2 flex flex-col">
                        <div className='inline-flex'>
                            <div className="py-auto mx-2"><AiFillLinkedin className="text-2xl"/></div>
                            <Input title="Linkedin" inputName="social_linkedin" value={values.social_linkedin || ''} fn={handleChange} onBlur={handleBlur}/> 
                        </div>
                        <ErrorMessage name="social_linkedin" render={msg => <Alert message={msg} showIcon  type="error" />} />
                    
                    </div>
                    <div className="col-span-4 md:col-span-2 flex flex-col">
                        <div className='inline-flex'>
                            <div className="py-auto mx-2"><AiFillInstagram className="text-2xl"/></div>
                            <Input title="Instagram" inputName="social_instagram" value={values.social_instagram || ''} fn={handleChange} onBlur={handleBlur}/> 
                        </div>
                        <ErrorMessage name="social_instagram" render={msg => <Alert message={msg} showIcon  type="error" />} />
                        
                    </div>
                    <div className="col-span-4 md:col-span-2 flex flex-col">
                        <div className='inline-flex'>
                            <div className="py-auto mx-2"><AiFillFacebook className="text-2xl"/></div>
                            <Input title="Facebook" inputName="social_facebook" value={values.social_facebook || ''} fn={handleChange} onBlur={handleBlur}/> 
                        </div>
                        <ErrorMessage name="social_facebook" render={msg => <Alert message={msg} showIcon  type="error" />} />
                        
                    </div>
                    <div className="col-span-4 md:col-span-2 flex flex-col">
                        <div className='inline-flex'>
                            <div className="py-auto mx-2"><AiFillTwitterSquare className="text-2xl"/></div>
                            <Input title="Twitter" inputName="social_twitter" value={values.social_twitter || ''} fn={handleChange} onBlur={handleBlur}/> 
                        </div>
                        <ErrorMessage name="social_twitter" render={msg => <Alert message={msg} showIcon  type="error" />} />
                    </div>
                    <div className="col-span-4">
                        <Button btnType="secondary-outline" className="block ml-auto" type='submit'>  Guardar Perfil </Button>
                    </div>   
                </form>  
            )
        }  
        </Formik>
    )
}
