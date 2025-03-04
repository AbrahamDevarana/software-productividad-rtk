import { Button } from '@/components/ui'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { clearCurrentDepartamentoThunk, createDepartamentoThunk, updateDepartamentoThunk } from '@/redux/features/departamentos/departamentosThunks';
import { useGetAreasQuery } from '@/redux/features/areas/areasThunks';
import { useEffect, useState } from 'react';
import { getUsuariosThunk, useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks';
import { Select, Input, Form, Skeleton, ColorPicker, Space } from 'antd'
import { DefaultOptionType } from 'antd/es/select';
import { useSelectUser } from '@/hooks/useSelectUser';
import { FaSave } from 'react-icons/fa';



interface Props {
    handleClose: () => void
}

export const FormDepartamentos = ({handleClose} : Props ) => {

    const dispatch = useAppDispatch();
    
    const { currentDepartamento, isLoadingCurrent } = useAppSelector(state => state.departamentos)
    const { data: usuarios, isFetching } = useGetUsuariosQuery({status: 'ACTIVO'})
    const [ color, setColor ] = useState<string>('#000000')

    const { data, isLoading, isError } = useGetAreasQuery({})
    
    const [form] = Form.useForm()
    const { spanUsuario } = useSelectUser(usuarios)
        

    useEffect(() => {   
        dispatch(getUsuariosThunk({}))
    }, [])

    useEffect(() => {
        if (currentDepartamento.id !== 0) {
            setColor(currentDepartamento.color)
        }
    }, [currentDepartamento])

    const handleOnSubmit = async () => {      
        
        const query = {
            id: currentDepartamento.id,
            color,
            ...form.getFieldsValue()
        }

        if (currentDepartamento.id !== 0) {
            dispatch(updateDepartamentoThunk(query))
        }else {
            dispatch(createDepartamentoThunk(query))
        }
        handleCancel()
    } 
    useEffect(() => {
        return () => {dispatch( clearCurrentDepartamentoThunk() )}
    }, [])

    const handleCancel = () => {
        handleClose()
        dispatch(clearCurrentDepartamentoThunk())
    }

    if (isLoadingCurrent) return (<Skeleton active paragraph={{ rows: 10 }} />)

    return (

            <div className='animate__animated animate__fadeIn animate__faster'>
                <h1 className='pb-3'>
                    {
                        currentDepartamento.id !== 0 ? 'Editar Departamento' : 'Crear Departamento'
                    }
                </h1>

                <Form
                    onFinish={handleOnSubmit} 
                    layout='vertical'
                    form={form}
                    initialValues={currentDepartamento}
                >
                    <div className='flex pt-4 flex-col gap-y-2'>
                        <Form.Item 
                            label="Nombre del departamento" 
                            name="nombre"
                            rules={[{ required: true, message: 'El nombre es requerido' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="Lider Departamento" name="leaderId" rules={[{ required: true, message: 'El lider es requerido' }]}>
                            <Select
                                showSearch
                                size='large'
                                placeholder="Selecciona una opción"
                                allowClear
                                // @ts-ignore
                                filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                            >
                                {
                                    usuarios?.map((usuario) => (
                                        <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                                    ))
                                }
                                
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Área"
                            name="areaId"
                        >
                            <Select
                                showSearch
                                placeholder="Selecciona una opción"
                                allowClear
                                loading={isLoading}
                                filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                            >
                                {
                                    data?.rows.map((area) => (
                                        <Select.Option key={area.id} value={area.id} dataName={area.nombre} >
                                            <p className='text-devarana-graph'> {area.nombre} </p>
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Color Departamento"
                        >
                            <Space direction="vertical">
                                <ColorPicker showText 
                                    value={ color }
                                    onChange={(color) => {
                                        setColor(color.toHexString())
                                    }}
                                />                            
                            </Space>
                        </Form.Item>
                        <Form.Item
                        label="Reportable"
                        name="isEvaluableDepartment"
                        tooltip="¿El se muestra en los reportes?"
                    >
                        <Select>
                            <Select.Option value={true}> <p className='text-devarana-graph'>Si</p> </Select.Option>
                            <Select.Option value={false}> <p className='text-devarana-graph'>No</p> </Select.Option>
                        </Select>
                    </Form.Item>
                    </div>
                    <div className='py-4 flex justify-end'>
                        <Button classColor="primary" classType='regular' width={'auto'} type="submit" > <FaSave /> </Button>
                    </div>

                </Form>

            </div>
    )
}
