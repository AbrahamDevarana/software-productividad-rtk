import { useGetRolQuery, useUpdateRolMutation , useCreateRolMutation } from '@/redux/features/roles/rolesThunk'
import { Checkbox, Divider, Form, Input, message } from 'antd'
import { Spinner } from '../antd/Spinner'
import { Button } from '../ui'
import { FaSave } from 'react-icons/fa'
import { useGetPermisosQuery } from '@/redux/features/permisos/PermisosThunk'

export const FormRoles = ({roleId, handleClose}: { roleId: number, handleClose: () => void}) => {

    const [form] = Form.useForm()
    const { data: role, isLoading, isFetching } = useGetRolQuery(roleId)
    const { data: permisos } = useGetPermisosQuery({})
    const [updateRol, {isLoading: isUpdating}] = useUpdateRolMutation()
    const [createRol, {isLoading: isCreating}] = useCreateRolMutation()

    const initialValues = role || { nombre: '', descripcion: '' }

    if ( isFetching && isLoading ) return  <Spinner />

    const handleSubmit = async () => {
        const query = form.getFieldsValue()
        if(roleId){
            try{
                await updateRol({id: roleId, ...query}).unwrap()
                message.success('Rol actualizado correctamente')
                handleClose()
            }catch(e){
                message.error('Ocurrió un error al actualizar el rol')
            }
        }else{
            try{
                await createRol(query).unwrap()
                message.success('Rol creado correctamente')
                handleClose()
            }catch(e){
                message.error('Ocurrió un error al crear el rol')
            }
        }
    }

    return (
        <>
            <Form
                layout='vertical'
                form = {form}
                initialValues={{
                    ...initialValues,
                    permisos: role?.permisos?.map((permiso) => permiso.id)
                }}
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
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Descripción'
                    name='descripcion'
                >
                    <Input />
                </Form.Item>
                <Divider />
                
                <Form.Item
                    label='Permisos'
                    name='permisos'
                >
                    <Checkbox.Group>
                        {permisos?.map((permiso) => (
                            <Checkbox key={permiso.id} value={permiso.id} >{permiso.nombre}</Checkbox>
                        ))}
                    </Checkbox.Group>
                </Form.Item>

                <div className='py-4 flex justify-end'>
                    <Button disabled={isUpdating || isCreating} classColor="primary" classType='regular' width={'auto'} type="submit" > <FaSave /> </Button>
                </div>

            </Form>
        </>
    )
}
