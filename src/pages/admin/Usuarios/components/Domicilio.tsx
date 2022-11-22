import { Alert } from "antd"
import { ErrorMessage, Formik } from "formik"
import { Button, Input } from "../../../../components/ui"
import * as Yup from "yup";
import { AntdSelect } from "../../../../components/antd/Select";


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
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                            <div>
                                <AntdSelect setFieldValue={setFieldValue} inputName="estado" value={values.estado} options={[{ nombre: 'Querétaro', id:1 }, { nombre: 'CDMX', id:2 }]} placeholder="Seleccionar Estado" onBlur={handleBlur}/>
                                <ErrorMessage name="estado" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <AntdSelect setFieldValue={setFieldValue} inputName="municipio" value={values.municipio} options={[{ nombre: 'Querétaro', id:1 }, { nombre: 'Corregidora', id:2 }]} placeholder="Seleccionar Municipio" onBlur={handleBlur}/>
                                <ErrorMessage name="municipio" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <Input title="Calle" inputName="calle" value={values.calle} fn={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="calle" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <Input title="Colonia" inputName="colonia" value={values.colonia} fn={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="colonia" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <Input title="Lugar de origen" inputName="lugarOrigen" value={values.lugarOrigen} fn={handleChange} onBlur={handleBlur} />
                                <ErrorMessage name="lugarOrigen" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                        </div>
                        <div className="flex justify-end mt-8">
                            <Button type="submit" btnType="secondary">Siguiente</Button>
                        </div>
                    </form>
            )}

        </Formik>
    </div>
  )
}
