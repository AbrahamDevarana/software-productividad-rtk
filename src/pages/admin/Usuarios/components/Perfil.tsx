import { Alert, Divider, Form, Input, DatePicker } from 'antd';
import { ErrorMessage, Formik } from "formik"
import { Button } from "@/components/ui"
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { updateUsuarioThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
dayjs.extend(customParseFormat)


export const Perfil = ({handleSteps, handleCancel}:any) => {

    const dispatch = useAppDispatch();
    const { currentUsuario } = useAppSelector((state: any) => state.usuarios)

    const handleOnSubmit = (values: any) => {
        console.log(values);
        
        // dispatch(updateUsuarioThunk(values))
        handleCancel()
    }

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Formik
            initialValues={currentUsuario}
            onSubmit={handleOnSubmit}

            >
                {
                    ({values, handleChange, handleSubmit, errors, setFieldValue}) => (
                        <Form onFinish={handleSubmit} noValidate onChange={handleChange} layout='vertical'>
                            <Divider orientation="center">Perfil</Divider>
                            <div className="grid grid-cols-12 w-full gap-5">
                                <Form.Item
                                    label="Fecha de Nacimiento"
                                    className='col-span-6'
                                    name="fechaNacimiento"
                                >
                                    <DatePicker defaultValue={dayjs(values.fechaNacimiento, "YYYY-MM-DD")} format={"DD-MM-YYYY"} name="fechaNacimiento" onChange={(date, dateString) => setFieldValue('fechaNacimiento', dateString)} />
                                    <ErrorMessage name="fechaNacimiento" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Fecha de Ingreso"
                                    className='col-span-6'
                                    name="fechaIngreso"
                                >
                                    <DatePicker defaultValue={dayjs(values.fechaIngreso, "YYYY-MM-DD")} format={"DD-MM-YYYY"} name="fechaIngreso" onChange={(date, dateString) => setFieldValue('fechaIngreso', dateString)} />
                                    <ErrorMessage name="fechaIngreso" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                            </div>
                            <Divider orientation="center">Dirección</Divider>
                            <div className="grid grid-cols-12 w-full gap-5">
                                <Form.Item
                                    label="Calle"
                                    className='col-span-8'
                                    name="calle"
                                >
                                    <Input value={values.direccion.calle} name="calle" />
                                    <ErrorMessage name="calle" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Número Exterior"
                                    className='col-span-2'
                                    name="numeroExterior"
                                >
                                    <Input value={values.direccion.numeroExterior} name="numeroExterior" />
                                    <ErrorMessage name="v" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Número Interior"
                                    className='col-span-2'
                                    name="numeroInterior"
                                >
                                    <Input value={values.direccion.numeroInterior} name="numeroInterior" />
                                    <ErrorMessage name="numeroInterior" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Colonia"
                                    className='col-span-4'
                                    name="colonia"
                                >
                                    <Input value={values.direccion.colonia}  name='colonia'/>
                                    <ErrorMessage name="colonia" render={msg => <Alert type="error" message={msg} showIcon />} />    
                                </Form.Item>
                                <Form.Item
                                    label="Código Postal"
                                    className='col-span-2'
                                    name="codigoPostal"
                                >
                                    <Input value={values.direccion.codigoPostal}  name="codigoPostal"/>
                                    <ErrorMessage name="codigoPostal" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Estado"
                                    className='col-span-3'
                                    name="estado"
                                >
                                    <Input value={values.direccion.estado}  name="estado"/>
                                    <ErrorMessage name="estado" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
                                <Form.Item
                                    label="Ciudad"
                                    className='col-span-3'
                                >
                                    <Input value={values.direccion.ciudad} name="ciudad" />
                                    <ErrorMessage name="ciudad" render={msg => <Alert type="error" message={msg} showIcon />} />
                                </Form.Item>
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
