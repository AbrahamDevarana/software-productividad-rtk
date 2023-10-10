
import { Button } from '@/components/ui'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { clearCurrentAreaThunk, createAreaThunk, updateAreaThunk } from '@/redux/features/areas/areasThunks';
import { useEffect } from 'react';
import { getUsuariosThunk } from '@/redux/features/usuarios/usuariosThunks';
import { Select, Input, Form, Skeleton } from 'antd'
import { useSelectUser } from '@/hooks/useSelectUser';
import { FaSave } from 'react-icons/fa';


interface Props {
    handleClose: () => void
}

export const FormAreas = ({handleClose}: Props) => {

    const dispatch = useAppDispatch();
    
    const { currentArea, isLoadingCurrent } = useAppSelector( state => state.areas)
    const { areas } = useAppSelector( state => state.areas)
    const { usuarios } = useAppSelector( state => state.usuarios)
    
    const [form] = Form.useForm()
    const { spanUsuario } = useSelectUser(usuarios)

    const handleOnSubmit = () => {  

        const query = {
            id: currentArea.id,
            ...form.getFieldsValue()
        }

        if (currentArea.id) {
            dispatch(updateAreaThunk(query))
        }else {
            dispatch(createAreaThunk(query))
        }
        handleCancel()
    } 

    const handleCancel = () => {
        handleClose()
        dispatch(clearCurrentAreaThunk())
    }    

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])


    if (isLoadingCurrent) return <Skeleton active paragraph={{ rows: 10 }} />
    
    return (
        
            <div className='animate__animated animate__fadeIn animate__faster'>
                <h1 className='pb-3'>
                    {
                        currentArea.id !== 0 ? 'Editar Área' : 'Crear Área'
                    }
                </h1>
                <Form 
                    onFinish={handleOnSubmit}
                    layout='vertical'
                    form={form}
                    initialValues={currentArea}
                >
                    <div className='flex pt-4 flex-col gap-y-2'>
                        <Form.Item
                            label="Nombre del área"
                            name='nombre'
                            >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Lider de área"
                            name='leaderId'
                        >
                             <Select
                                size='large'
                                showSearch
                                placeholder="Selecciona una opción"
                                allowClear
                                // @ts-ignore
                                filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                            >
                                {
                                    usuarios.map((usuario) => (
                                        <Select.Option key={usuario.id} value={usuario.id} dataName={usuario.nombre + ' ' + usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno} >{ spanUsuario(usuario) }</Select.Option>
                                    ))
                                }
                                
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Área padre"
                            name='parentId'
                        >
                            <Select
                                showSearch
                                placeholder="Selecciona una opción"
                                allowClear
                                // @ts-ignore
                                filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                            >
                                {
                                    areas.map( area => (
                                        <Select.Option key={area.id} value={area.id} dataName={area.nombre}>
                                            <p className='text-devarana-graph'> {area.nombre} </p>
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='flex justify-between gap-10'>
                        <Button classColor="primary" classType='regular' width={'auto'} type="submit" > <FaSave /> </Button>
                    </div>

                </Form>


            </div>
    )
}
