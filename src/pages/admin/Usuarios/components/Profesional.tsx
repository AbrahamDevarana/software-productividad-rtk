import { Select, Form, Input, Space, Skeleton } from 'antd';
import { Formik } from "formik"
import { Button } from "@/components/ui";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useMemo, useState } from 'react';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { useAppDispatch } from '@/redux/hooks';
import { getDepartamentosThunk, getLideresDepartamentoThunk } from '@/redux/features/admin/departamentos/departamentosThunks';
import { updateUsuarioThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { useSelectUser } from '@/hooks/useSelectUser';

export const Profesional: React.FC<any> = ({handleSteps}) => {

    const dispatch = useAppDispatch();
    const { currentUsuario, isLoadingCurrentUsuario  } = useAppSelector(state => state.usuarios)
    const { areas, isLoading:isLoadingArea } = useAppSelector(state => state.areas)
    const { departamentos, lideres } = useAppSelector(state => state.departamentos)
    const [selectedArea, setSelectedArea] = useState<number | undefined>(undefined)

    const [form] = Form.useForm();

    const { spanUsuario } = useSelectUser(lideres as any)
    
    useEffect(() => {
        dispatch(getAreasThunk({}))
        setSelectedArea(currentUsuario.departamento?.areaId)

    }, [])

    useEffect(() => {
        if(currentUsuario.departamento && currentUsuario.departamento.areaId)
        {
            dispatch(getDepartamentosThunk({areaId: currentUsuario.departamento.areaId}))
        }        
    }, [currentUsuario.departamento])

    useEffect(() => {
        if (currentUsuario.departamentoId){ 
            dispatch(getLideresDepartamentoThunk(currentUsuario.departamentoId)) 
        }
    }, [currentUsuario.departamentoId])

    const handleChangeArea = (value: number) => {
        setSelectedArea(value)
        dispatch(getDepartamentosThunk({areaId: value}))

        form.setFieldsValue({
            departamentoId: undefined,
            leaderId: undefined
        })
    }

    const handleChangeDepartamento = (value: number) => {
        dispatch(getLideresDepartamentoThunk(value))
    }

    const handleOnSubmit = () => {
        const query = {
            ...form.getFieldsValue(),
            id: currentUsuario.id
        }
        dispatch(updateUsuarioThunk(query))              
        handleSteps(2)
    }

    const lidersList = useMemo(() => {
        
        return lideres.filter((obj, index, self) => {
            return index === self.findIndex((o) => o.id === obj.id);
        })

        
    }, [lideres])


    if(currentUsuario.id === '') return null;

    if (isLoadingArea  || isLoadingCurrentUsuario) return <Skeleton active paragraph={{ rows: 4 }} />
  

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>
            <Form 
                layout='vertical' 
                onFinish={handleOnSubmit}
                form={form}
                initialValues={currentUsuario}
            >
                  <Space wrap className='grid grid-cols-2 gap-5'>
                    <Form.Item
                            label="Area"
                            className='col-span-1'
                        >
                        <Select
                            showSearch
                            placeholder="Selecciona una opción"
                            allowClear
                            onChange={handleChangeArea}
                            value={selectedArea}
                        >
                            {
                                areas.map((area) => (
                                    <Select.Option key={area.id} value={area.id}><p className='text-devarana-graph'> {area.nombre} </p></Select.Option>
                                ))
                            }                                        
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Departamento"
                        className='col-span-1'
                        name='departamentoId'
                    >
                        <Select
                            showSearch
                            placeholder="Selecciona una opción"
                            allowClear
                            disabled={departamentos.length === 0}
                            onChange={handleChangeDepartamento}
                        >
                            {
                                departamentos.map((departamento) => (
                                    <Select.Option key={departamento.id} value={departamento.id}><p className='text-devarana-graph'> {departamento.nombre} </p></Select.Option>
                                    
                                ))
                            }
                        </Select>
                    </Form.Item>

                  </Space>
                    <Form.Item
                        label="Puesto"
                        className='col-span-1'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Jefe Directo"
                        className='col-span-1'
                        name='leaderId'
                    >
                        <Select 
                            showSearch
                            placeholder="Selecciona una opción"
                            allowClear
                            disabled={lidersList.length === 0}
                        >
                            {
                                lidersList && lidersList.map((lider) => (
                                    <Select.Option key={lider.id} value={lider.id}>{ spanUsuario(lider as any) }</Select.Option>
                                ))
                            }
                        </Select>

                    </Form.Item>                                
                    <div className="flex justify-end mt-2">
                        <Button classType='regular' classColor="primary" width={'auto'} type="submit" className="mr-2"> { currentUsuario.id ? 'Actualizar' : 'Crear' } </Button>
                    </div>
            </Form>
        </div>
    )}
