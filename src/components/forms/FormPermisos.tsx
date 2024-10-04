import { useCreatePermisoMutation, useGetPermisoQuery, useUpdatePermisoMutation } from '@/redux/features/permisos/PermisosThunk'
import { Form, Input } from 'antd'
import { Spinner } from '../antd/Spinner'
import { FaSave } from 'react-icons/fa'
import { Button } from '../ui'
import { toast } from 'sonner'

export const FormPermisos = ({permisoId, handleClose}: { permisoId:number, handleClose: () => void }) => {

    const [form] = Form.useForm()
    const { data: permiso, isLoading, isFetching } = useGetPermisoQuery(permisoId)
    const [updatePermiso, {isLoading: isUpdating}] = useUpdatePermisoMutation()
    const [createPermiso, {isLoading: isCreating}] = useCreatePermisoMutation()

    const initialValues = permiso || { nombre: '', permisos: '' }

    if ( isFetching && isLoading ) return  <Spinner />

    const handleSubmit = async () => {
        const query = form.getFieldsValue()
        if(permisoId){
            toast.promise(updatePermiso({id: permisoId, ...query}).unwrap(), {
                loading: 'Guardando...',
                success: () => {
                    handleClose()
                    return 'Permiso actualizado correctamente'
                },
                error: 'Ocurrió un error al actualizar el permiso'
            })
        }else{

            toast.promise(createPermiso(query).unwrap(), {
                loading: 'Guardando...',
                success: () => {
                    handleClose()
                    return 'Permiso creado correctamente'
                },
                error: 'Ocurrió un error al crear el permiso'
            })
        }
    }

  return (
    <Form
        layout='vertical'
        form = {form}
        initialValues={initialValues}
        onFinish={handleSubmit}
    >
            <Form.Item
                label='Nombre'
                name='nombre'
                rules={[
                    {
                        required: true,
                        message: 'Este campo es requerido'
                    }
                ]}
            >
                <Input onChange={
                    (e) => {
                        form.setFieldsValue({
                            permisos: e.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                        })
                    }
                } />
            </Form.Item>
    
            <Form.Item
                label='Permiso'
                name='permisos'
            >
                <Input readOnly/>
            </Form.Item>
    
            <Form.Item>
                <Button disabled={isUpdating || isCreating} classColor="primary" classType='regular' width={'auto'} type="submit" > <FaSave /> </Button>
            </Form.Item>
        </Form>
  )
}
