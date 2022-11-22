import { Alert, Checkbox, DatePicker } from "antd";
import { ErrorMessage, Formik } from "formik"
import { AntdSelect } from "../../../../components/antd/Select";
import * as Yup from "yup";
import { Button } from "../../../../components/ui";
import moment from "moment";

const usuarioSchema = Yup.object().shape({
    area:  Yup.number().required("El area es requerido").positive('El area es requerido'),
    departamento: Yup.number().required("El departamento es requerido").positive('El departamento es requerido'),
    rol: Yup.number().required("El rol es requerido").positive('El rol es requerido'),
    puesto: Yup.number().required("El puesto es requerido").positive('El puesto es requerido'),
    titulo: Yup.number().required("El departamento es requerido").positive('El departamento es requerido'),
    fechaIngreso: Yup.string().required("La fecha de ingreso es requerida"),
})


export const Profesional = ({usuario, handleSteps}:any) => {

    const clientFormat = 'DD/MM/YYYY';

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Formik 
                initialValues={usuario}
                onSubmit={values => {
                    handleSteps(values)
                }}
                validationSchema={ usuarioSchema }
            >
                {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2'>
                            <div>
                                <AntdSelect setFieldValue={setFieldValue} inputName="area" value={values.area} options={[{ nombre: 'Finanzas', id:1 }, { nombre: 'Staff', id:2 }]} placeholder="Seleccionar Área" onBlur={handleBlur}/>
                                <ErrorMessage name="area" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <AntdSelect setFieldValue={setFieldValue} inputName="departamento" value={values.departamento} options={[{ nombre: 'Titulación', id:1 }, { nombre: 'Compras', id:2 }]} placeholder="Seleccionar Departamento" onBlur={handleBlur}/>
                                <ErrorMessage name="departamento" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <AntdSelect setFieldValue={setFieldValue} inputName="rol" value={values.rol} options={[{ nombre: 'Presidente', id:1 }, { nombre: 'Directivo', id:2 }]} placeholder="Seleccionar Rol" onBlur={handleBlur}/>
                                <ErrorMessage name="rol" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <AntdSelect setFieldValue={setFieldValue} inputName="puesto" value={values.puesto} options={[{ nombre: 'Abogada', id:1 }, { nombre: 'Contadora', id:2 }]} placeholder="Seleccionar Puesto" onBlur={handleBlur}/>
                                <ErrorMessage name="puesto" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <Checkbox checked={values.lider} onChange={e => setFieldValue('lider', e.target.checked)}>Lider</Checkbox>
                                <ErrorMessage name="lider" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <AntdSelect setFieldValue={setFieldValue} inputName="titulo" value={values.titulo} options={[{ nombre: 'Abogada', id: 1 }, { nombre: 'Contadora', id: 2 }]} placeholder="Seleccionar Titulo" onBlur={handleBlur}/>
                                <ErrorMessage name="titulo" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>
                            <div>
                                <DatePicker className="w-full" onChange={(date, dateString) => setFieldValue('fechaIngreso', dateString)} placeholder="Seleccionar Fecha de Ingreso"
                                    format={clientFormat} defaultValue={ values.fechaIngreso ? moment(values.fechaIngreso, clientFormat) : undefined }/>
                                <ErrorMessage name="fechaIngreso" render={msg => <Alert type="error" message={msg} showIcon />} />
                            </div>

                            <div className="flex justify-end mt-8">
                                <Button type="submit" btnType="secondary">Siguiente</Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )}
