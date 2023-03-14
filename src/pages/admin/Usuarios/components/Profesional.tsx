import { Alert, Checkbox, DatePicker, Select, Form, Input } from 'antd';
import { ErrorMessage, Formik } from "formik"
import * as Yup from "yup";
import { Button } from "@/components/ui";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from 'react';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { useAppDispatch } from '@/redux/hooks';
import { getDepartamentosThunk } from '../../../../redux/features/admin/departamentos/departamentosThunks';

const usuarioSchema = Yup.object().shape({
    area:  Yup.number().required("El area es requerido").positive('El area es requerido'),
    departamento: Yup.number().required("El departamento es requerido").positive('El departamento es requerido'),
    rol: Yup.number().required("El rol es requerido").positive('El rol es requerido'),
    puesto: Yup.number().required("El puesto es requerido").positive('El puesto es requerido'),
    titulo: Yup.number().required("El departamento es requerido").positive('El departamento es requerido'),
    fechaIngreso: Yup.string().required("La fecha de ingreso es requerida"),
})


export const Profesional = ({handleSteps}:any) => {

    const dispatch = useAppDispatch();
    const { currentUsuario } = useAppSelector((state: any) => state.usuarios)
    const { areas } = useAppSelector((state: any) => state.areas)
    const { departamentos } = useAppSelector((state: any) => state.departamentos)
    
    useEffect(() => {
        dispatch(getAreasThunk({}))
    }, [])

    const handleChangeArea = (value: number) => {
        dispatch(getDepartamentosThunk({areaId: value}))
    }


    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Formik 
                initialValues={currentUsuario}
                onSubmit={values => {
                    handleSteps(values)
                }}
                validationSchema={ usuarioSchema }
                enableReinitialize={true}
            >
                {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                    <Form layout='vertical'>
                        <div className='grid grid-cols-2 gap-5'>
                            <Form.Item
                                label="Area"
                                className='col-span-1'
                            >
                                <Select
                                    onChange={(values) => { handleChangeArea(values); setFieldValue('departamentoId', null)}}
                                >
                                    {
                                        areas.map((area:any) => (
                                            <Select.Option value={area.id}>{area.nombre}</Select.Option>
                                        ))
                                    }                                        
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Departamento"
                                className='col-span-1'
                            >
                                <Select
                                    onChange={(value: number) => setFieldValue('departamentoId', value)}
                                    value={values.departamentoId}
                                    disabled={departamentos.length === 0}
                                >
                                    {
                                        departamentos.map((departamento:any) => (
                                            <Select.Option value={departamento.id}>{departamento.nombre}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Puesto"
                                className='col-span-1'
                            >
                                <Input name='puesto' value={values.puesto} />
                            </Form.Item>
                            <Form.Item
                                label="Jefe Directo"
                                className='col-span-1'
                            >
                                <Select 
                                    onChange={(value: number) => setFieldValue('leaderId', value)}
                                    value={values.leaderId}
                                    disabled={departamentos.length === 0}
                                >
                                </Select>

                            </Form.Item>                                
                        </div>
                        <div className="flex justify-end mt-2">
                            <Button btnType="secondary" type="submit" className="mr-2"> { currentUsuario.id ? 'Actualizar' : 'Crear' } </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )}
