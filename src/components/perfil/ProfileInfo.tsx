
import { DatePicker, Form, Input } from 'antd';
import { updateProfileProvider } from '@/redux/features/profile/profileThunk';
import { useAppDispatch } from '@/redux/hooks';
import { PerfilProps } from "@/interfaces";
import { Button } from "../ui";
import dayjs from 'dayjs';

interface Props {
    usuarioActivo: PerfilProps
}

export const ProfileInfo = ({usuarioActivo}: Props) => {

    const [form] = Form.useForm();
    const dispatch = useAppDispatch();    

    const handleonSubmit = () => {

        const values = form.getFieldsValue();
        console.log(values)
        // dispatch(updateProfileProvider(values))
    }

  return (
                                         
        <Form 
            className='col-span-12 grid grid-cols-12 gap-5' 
            layout="vertical"
            initialValues={{
                ...usuarioActivo,
                fechaNacimiento: dayjs(usuarioActivo.fechaNacimiento)
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
                label="Nombre a mostrar"
                name="nombreCorto"
            >
                <Input className="w-full" name="nombreCorto"  />
            </Form.Item>
            <Form.Item 
                className="col-span-12 xl:col-span-4 md:col-span-6"
                label="Fecha de nacimiento"
                name="fechaNacimiento"
            >
                <DatePicker placeholder="Fecha de nacimiento" disabled={true}  name="fechaNacimiento" className="w-full" />
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
                >
                <Input type='tel' title="Teléfono" className="w-full" name="telefono" />
            </Form.Item>
            
            <Form.Item 
                className="col-span-12 relative"
                label="Sobre mi"
                name="descripcionPerfil"
            >
                <Input.TextArea title="Sobre mi" className="w-full" name="descripcionPerfil"  />
            </Form.Item>  
            <Form.Item className="col-span-12 ml-auto">
                <Button classColor="secondary" classType='outline' className="block ml-auto" type='submit'>  Guardar Perfil </Button>
            </Form.Item>    
        </Form>
  )
}
