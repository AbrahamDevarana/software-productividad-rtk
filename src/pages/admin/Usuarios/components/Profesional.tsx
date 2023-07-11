import { Select, Form, Input, Space, Skeleton } from 'antd';
import { Button } from "@/components/ui";
import { useAppSelector } from "@/redux/hooks";
import { useEffect, useMemo, useState } from 'react';
import { getAreasThunk } from '@/redux/features/admin/areas/areasThunks';
import { useAppDispatch } from '@/redux/hooks';
import { clearLideresThunk, getDepartamentosThunk, getLideresDepartamentoThunk } from '@/redux/features/admin/departamentos/departamentosThunks';
import { updateUsuarioThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { useSelectUser } from '@/hooks/useSelectUser';
import { FaArrowRight, FaSave } from 'react-icons/fa';

export const Profesional: React.FC<any> = ({handleSteps, handleCancel}) => {

    const dispatch = useAppDispatch();
    const { currentUsuario, isLoadingCurrentUsuario  } = useAppSelector(state => state.usuarios)
    const { areas, isLoading:isLoadingArea } = useAppSelector(state => state.areas)
    const { departamentos, lideres } = useAppSelector(state => state.departamentos)
    const [selectedArea, setSelectedArea] = useState<number | undefined>(undefined)

    const [form] = Form.useForm();

    const { spanUsuario } = useSelectUser(lideres as any)
    
    useEffect(() => {
        dispatch(getAreasThunk({}))
        setSelectedArea(currentUsuario.departamentos[0]?.areaId)

        return () => {
            dispatch(clearLideresThunk())
        }
    }, [])

    useEffect(() => {
        if(currentUsuario.departamentos.length > 0 && currentUsuario.departamentos[0]?.areaId)
        {
            dispatch(getDepartamentosThunk({areaId: currentUsuario.departamentos[0]?.areaId}))
        }        
    }, [currentUsuario.departamentos])

    useEffect(() => {
        if (currentUsuario.departamentos[0]){ 
            dispatch(getLideresDepartamentoThunk(currentUsuario.departamentos[0].id))
        }
    }, [currentUsuario.departamentoId])

    const handleChangeArea = (value: number) => {
        setSelectedArea(value)
        dispatch(getDepartamentosThunk({areaId: value}))

        form.setFieldsValue({
            despartamentos: undefined,
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
        handleCancel()
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
                initialValues={{
                    ...currentUsuario,
                    despartamentos: currentUsuario.departamentos?.map((departamento) => departamento.id)
                }}
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
                        name='despartamentos'
                    >
                        <Select
                            showSearch
                            placeholder="Selecciona una opción"
                            allowClear
                            mode="multiple"
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
                    <div className="flex justify-end mt-2 gap-x-2">
                        <Button classColor="primary" classType='regular' width={'auto'} type="submit" className="mr-2"> <FaSave /> </Button>
                        <Button classColor="dark" classType='regular' width={'auto'} type="button" onClick={() => handleSteps(2)} className="mr-2"> <FaArrowRight /> </Button>
                    </div>
            </Form>
        </div>
    )}
