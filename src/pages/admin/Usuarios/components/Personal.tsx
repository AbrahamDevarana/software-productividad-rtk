import { Divider, Form, Input, DatePicker } from 'antd'
import { Button } from "@/components/ui"
import dayjs from 'dayjs';
import { useUpdateUsuarioMutation } from '@/redux/features/usuarios/usuariosThunks';
import { toast } from 'sonner';


export const Personal: React.FC<any> = ({currentUsuario, handleCancel}) => {

    const [updateUser, {isLoading: isUpdating}] = useUpdateUsuarioMutation()
    const [form] = Form.useForm();
    const handleOnSubmit = () => {      

        const query = {
            ...currentUsuario,
            ...form.getFieldsValue(),
        }

        toast.promise( updateUser(query).unwrap(), {
            loading: 'Guardando...',
            success: 'Usuario Actualizado Correctamente.',
            error: 'Error al actualizar el usuario.',
            finally: () => {
                handleCancel()
            }
        })
    }
   

    return (
        <div className='animate__animated animate__fadeIn animate__faster'>

            <Form 
                onFinish={handleOnSubmit} 
                layout='vertical'
                form={form}
                initialValues={{
                    ...currentUsuario,
                    fechaNacimiento: dayjs(currentUsuario.fechaNacimiento),
                    fechaIngreso: dayjs(currentUsuario.fechaIngreso),
                }}
            >
                <Divider orientation="center">Perfil</Divider>
                <div className="grid grid-cols-12 w-full gap-5">
                    <Form.Item
                        label="Fecha de Nacimiento"
                        className='col-span-6'
                        name="fechaNacimiento"
                    >
                        <DatePicker format={'DD/MM/YYYY'} />
                    </Form.Item>
                    <Form.Item
                        label="Fecha de Ingreso"
                        className='col-span-6'
                        name="fechaIngreso"
                    >
                        <DatePicker format={'DD/MM/YYYY'}  />
                    </Form.Item>
                </div>
                <Divider orientation="center">Dirección</Divider>
                <div className="grid grid-cols-12 w-full gap-5">
                    <Form.Item
                        label="Calle"
                        className='col-span-8'
                        name="calle"
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Número Exterior"
                        className='col-span-2'
                        name="numeroExterior"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Número Interior"
                        className='col-span-2'
                        name="numeroInterior"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Colonia"
                        className='col-span-4'
                        name="colonia"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Código Postal"
                        className='col-span-2'
                        name="codigoPostal"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Estado"
                        className='col-span-3'
                        name="estado"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ciudad"
                        className='col-span-3'
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className="flex justify-end mt-2">
                    <Button classColor="primary" classType='regular' width={'auto'} type="submit" className="mr-2" disabled={isUpdating}> { currentUsuario.id ? 'Actualizar' : 'Crear' } </Button>
                </div>
            </Form>

        </div>
    )
}
