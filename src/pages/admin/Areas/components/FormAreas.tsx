import { Alert } from 'antd'
import { ErrorMessage, Formik } from 'formik'
import { Box, Button, Input } from '../../../../components/ui'
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { createAreaThunk, updateAreaThunk } from '../../../../redux/features/admin/areas/areasThunks';


export const FormAreas = () => {

    const dispatch = useAppDispatch();
    
    const { currentArea, errorMessage } = useAppSelector((state: any) => state.areas)

    const handleOnSubmit = (values: any) => {
        
        if (currentArea.id) {
            dispatch(updateAreaThunk(values))
        } else {
            dispatch(createAreaThunk(values))
            values.nombre = ''
            values.descripcion = ''
        }        
    }


    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Box className='h-fit'>
                <h1 className='pb-3'>
                    {
                        currentArea.id ? 'Editar Area' : 'Crear Area'
                    }
                </h1>
                <Formik
                    initialValues={currentArea}
                    onSubmit={ handleOnSubmit }
            
                    validationSchema={Yup.object({
                        nombre: Yup.string().required("El nombre es requerido"),
                        descripcion: Yup.string().required("La descripción es requerida"),
                    })}
                    enableReinitialize={true}

                >
                    {
                        ({ values, handleChange, handleBlur, handleSubmit, validateForm }) => (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className='flex pt-4 flex-col gap-y-10'>
                                    <div>
                                        <Input
                                            title="Nombre"
                                            inputName="nombre"
                                            value={values.nombre}
                                            fn={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage name="nombre" render={msg => <Alert type="error" message={msg} showIcon />} />
                                    </div>
                                    <div>
                                        <Input 
                                            title="Descripción"
                                            inputName="descripcion"
                                            value={values.descripcion}
                                            fn={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage name="descripcion" render={msg => <Alert type="error" message={msg} showIcon />} />
                                    </div>
                                </div>
                                <div className='py-4'>
                                    <Button btnType="secondary" fn={ () => { validateForm().then((values) => (Object.keys(values).length === 0) ?? handleSubmit() )} }  type="submit" className="mr-2"> { currentArea.id ? 'Editar' : 'Crear' } </Button>
                                </div>

                            </form>
                    )}
                </Formik>
            </Box>
        </div>
    )
}
