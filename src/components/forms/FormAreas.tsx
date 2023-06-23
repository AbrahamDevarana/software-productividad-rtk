
import { Button } from '@/components/ui'
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { clearCurrentAreaThunk, createAreaThunk, updateAreaThunk } from '@/redux/features/admin/areas/areasThunks';
import { useEffect, useState } from 'react';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { Select, Input, Form, Skeleton } from 'antd'
import { useSelectUser } from '@/hooks/useSelectUser';
import Swal from 'sweetalert2';


interface Props {
    handleClose: () => void
}

export const FormAreas = ({handleClose}: Props) => {

    const dispatch = useAppDispatch();
    
    const { currentArea, isLoadingCurrent } = useAppSelector( state => state.areas)
    const { areas } = useAppSelector( state => state.areas)
    const { usuarios } = useAppSelector( state => state.usuarios)
    const [cancel, setCancel] = useState(false)

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


    const handleDelete = () => {
        Swal.fire({
            customClass: {
                confirmButton: 'bg-devarana-error',
                cancelButton: 'bg-devarana-success'
            },
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                'Eliminado!',
                'El registro ha sido eliminado.',
                'success'
                )
            }
        })
    }


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
                                showSearch
                                placeholder="Selecciona una opción"
                                allowClear
                                // @ts-ignore
                                filterOption={(input, option) => (option as DefaultOptionType)?.children!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                            >
                                {
                                    usuarios.map((usuario) => (
                                       <Select.Option key={usuario.id} value={usuario.id}>{ spanUsuario(usuario) }</Select.Option>
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
                                filterOption={(input, option) => (option as DefaultOptionType)?.children!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
                            >
                                {
                                    areas.map( area => (
                                        <Select.Option key={area.id} value={area.id}>
                                            <p className='text-devarana-graph'> {area.nombre} </p>
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='flex justify-between gap-10'>
                        <Button classType='regular' width={150} classColor='error' onClick={handleDelete}> Eliminar </Button>
                        <Button classType='regular' width={150} classColor='primary' type="submit" className="mr-2"> { currentArea.id !== 0 ? 'Editar' : 'Crear' } </Button>
                    </div>

                </Form>


            </div>
    )
}
