import { Select, Form, Input } from 'antd';
import { Formik } from "formik"
import { Button } from "@/components/ui";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from 'react';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { useAppDispatch } from '@/redux/hooks';
import { getDepartamentosThunk, getLideresDepartamentoThunk } from '@/redux/features/admin/departamentos/departamentosThunks';
import { updateUsuarioThunk } from '@/redux/features/admin/usuarios/usuariosThunks';

export const Profesional = ({handleSteps}:any) => {

    const dispatch = useAppDispatch();
    const { currentUsuario } = useAppSelector((state: any) => state.usuarios)
    const { areas } = useAppSelector((state: any) => state.areas)
    const { departamentos, lideres } = useAppSelector((state: any) => state.departamentos)    
    
    useEffect(() => {
        dispatch(getAreasThunk({}))
    }, [])

    useEffect(() => {
        if(currentUsuario.departamento && currentUsuario.departamento.areaId)
        {
            dispatch(getDepartamentosThunk({areaId: currentUsuario.departamento.areaId}))
        }        
    }, [currentUsuario.departamento])

    useEffect(() => {
        dispatch(getLideresDepartamentoThunk(currentUsuario.departamentoId))
    }, [currentUsuario.departamentoId])

    const handleChangeArea = (value: number) => {
        dispatch(getDepartamentosThunk({areaId: value}))
    }

    const handleChangeDepartamento = (value: number) => {
        dispatch(getLideresDepartamentoThunk(value))
    }

    const handleOnSubmit = (values: any) => {
        dispatch(updateUsuarioThunk(values))  
        console.log(currentUsuario);
              
        handleSteps(2)
    }

    if(currentUsuario.id === 0) return null;
  

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Formik 
                initialValues={currentUsuario}
                onSubmit={handleOnSubmit}
                enableReinitialize={true}
            >
                {({values, handleChange, handleBlur, handleSubmit, setFieldValue}) => (
                    <Form layout='vertical' onFinish={handleSubmit}>
                        <div className='grid grid-cols-2 gap-5'>
                            <Form.Item
                                label="Area"
                                className='col-span-1'
                            >
                                <Select
                                    showSearch
                                    onChange={ (value) => { 
                                        handleChange({target: {name: 'areaId', value}}), 
                                        handleChangeArea(value), 
                                        setFieldValue('departamentoId', null), 
                                        setFieldValue('leaderId', null) 
                                    }}
                                    value={values.departamento?.areaId}
                                    placeholder="Selecciona una opción"
                                    allowClear
                                    
                                    
                                >
                                    {
                                        areas.map((area:any) => (
                                            <Select.Option key={area.id} value={area.id}>{area.nombre}</Select.Option>
                                        ))
                                    }                                        
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Departamento"
                                className='col-span-1'
                            >
                                <Select
                                    showSearch
                                    onChange={ (value) => {
                                        handleChange({target: {name: 'departamentoId', value}}), 
                                        handleChangeDepartamento(value), 
                                        setFieldValue('leaderId', null) 
                                    }}
                                    value={values.departamentoId}
                                    placeholder="Selecciona una opción"
                                    allowClear
                                    disabled={departamentos.length === 0}
                                >
                                    {
                                        departamentos.map((departamento:any) => (
                                            <Select.Option key={departamento.id} value={departamento.id}>{departamento.nombre}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Puesto"
                                className='col-span-1'
                            >
                                <Input name='puesto' onChange={handleChange} value={values.puesto} />
                            </Form.Item>
                            <Form.Item
                                label="Jefe Directo"
                                className='col-span-1'
                            >
                                <Select 
                                    showSearch
                                    onChange={ (value) => handleChange({target: {name: 'leaderId', value}}) }
                                    value={values.leaderId}
                                    placeholder="Selecciona una opción"
                                    allowClear
                                    disabled={lideres.length === 0}
                                >
                                    {
                                        lideres && lideres.map((lider:any) => (
                                            <Select.Option key={lider.id} value={lider.id}>{lider.nombre}</Select.Option>
                                        ))
                                    }
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
