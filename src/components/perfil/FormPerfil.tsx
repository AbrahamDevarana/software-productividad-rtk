
import { DatePicker, Form, Input } from 'antd';
import { updateProfileThunk } from '@/redux/features/perfil/perfilThunk';
import { useAppDispatch } from '@/redux/hooks';
import { PerfilProps } from "@/interfaces";
import dayjs from 'dayjs';
import { Button } from '../ui';
import { toast } from 'sonner';

interface Props {
    usuarioActivo: PerfilProps
}

export const FormPerfil = ({usuarioActivo}: Props) => {

    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const handleonSubmit = async () => {

        const values = form.getFieldsValue();
        const query = {
            ...values,
            id: usuarioActivo.id,
        }

        toast.promise(
            dispatch(updateProfileThunk(query)).unwrap(),
            {
                loading: 'Guardando...',
                success: 'Perfil actualizado correctamente',
                error: 'Ocurrió un error al actualizar el perfil'
            }
        )
        
    }



  return (
                                         
        <Form 
            className='col-span-12 grid grid-cols-12 gap-5' 
            layout="vertical"
            initialValues={{
                ...usuarioActivo,
                fechaNacimiento: dayjs(usuarioActivo.fechaNacimiento).add(6, 'hour')
            }}
            onFinish={handleonSubmit}
            form={form}
            
        >
            <Form.Item 
                className="col-span-12 xl:col-span-4 md:col-span-6"
                name="nombre"
                label="Nombre"
            >
                <Input className="w-full" name="nombre" />
            </Form.Item>
            <Form.Item 
                className="col-span-12 xl:col-span-4 md:col-span-6"
                label="Apellido Paterno"
                name="apellidoPaterno"
            >
                <Input className="w-full" name="apellidoPaterno" />
            </Form.Item>
            <Form.Item 
                className="col-span-12 xl:col-span-4 md:col-span-6"
                label="Apellido Materno"
                name="apellidoMaterno"
            >
                <Input className="w-full" name="apellidoMaterno"  />
            </Form.Item>
            <Form.Item 
                className="col-span-12 xl:col-span-4 md:col-span-6"
                label="Nombre de perfil"
                name="nombreCorto"
                tooltip="Este nombre se mostrará en tu perfil a los demás usuarios"
            >
                <Input className="w-full" name="nombreCorto"  />
            </Form.Item>
            <Form.Item 
                className="col-span-12 xl:col-span-4 md:col-span-6"
                label="Fecha de nacimiento"
                name="fechaNacimiento"
            >
                <DatePicker placeholder="Fecha de nacimiento" disabled={true} className="w-full"  format={'DD/MM/YYYY'}/>
            </Form.Item>
            <Form.Item 
                className="col-span-12 xl:col-span-4 md:col-span-6"
                label="Email"
                name="email"
            >
                <Input title="Email" disabled={true} className="w-full" name="email" />
            </Form.Item>
            <Form.Item 
                className="col-span-12 xl:col-span-4 md:col-span-6"
                label="Teléfono"
                name="telefono"
                tooltip="Ingresa tu número de teléfono a 10 dígitos"
                rules={[
                    {
                        required: true,
                        pattern: new RegExp(/^[0-9]{10}$/),
                        message: 'Ingresa un número de teléfono válido'
                    }
                ]}
                >

                <Input type='tel' className="w-full" maxLength={10} name="telefono" onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    form.setFieldsValue({telefono: value})
                }} />

            </Form.Item>
            
            <Form.Item 
                className="col-span-12 relative"
                label="Sobre mi"
                name="descripcionPerfil"
            >
                <Input.TextArea className="w-full" name="descripcionPerfil" rows={7} />
            </Form.Item>  
            <div className="col-span-12 ml-auto">
                <Button classColor="dark" classType='regular' className="block ml-auto" type='submit' width={150}>  Guardar </Button>
            </div>    
        </Form>
  )
}
