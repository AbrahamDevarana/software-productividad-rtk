import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ProyectosProps } from '@/interfaces'
import { createProyectoThunk, updateProyectoThunk } from '@/redux/features/proyectos/proyectosThunk';
import dayjs from 'dayjs';
import { Button, DatePicker, Form, Input, Select, Skeleton } from 'antd'
import { useSelectUser } from '@/hooks/useSelectUser';

interface FormProyectoProps {
    currentProyecto: ProyectosProps
    handleCancel: () => void
    isLoadingProyecto: boolean
}

export const FormProyecto = ({currentProyecto, handleCancel, isLoadingProyecto}: FormProyectoProps) => { 

    const { usuarios } = useAppSelector(state => state.usuarios)

    const { TextArea } = Input;

    const [form] = Form.useForm();
    const dispatch = useAppDispatch()

    const handleSubmit = () => {

        const query = {
            ...currentProyecto,
            ...form.getFieldsValue(),
        }

        if(currentProyecto.id !== '') {
            dispatch(updateProyectoThunk(query))
        }
        else {
            dispatch(createProyectoThunk(query))
        }

        handleCancel()
        
    }

    const { tagRender, spanUsuario, selectedUsers, setSelectedUsers } = useSelectUser(usuarios)

    
    

    if (isLoadingProyecto) return <Skeleton active paragraph={{  rows: 10 }} />

    return (
        <Form 
            onFinish={handleSubmit} 
            form={form} 
            className='grid grid-cols-12 gap-x-10'
            layout='vertical'
            initialValues={{
                titulo: currentProyecto.titulo,
                descripcion: currentProyecto.descripcion,
                fechaInicio: dayjs(currentProyecto.fechaInicio).add(6, 'hour'),
                fechaFin: dayjs(currentProyecto.fechaFin).add(6, 'hour'),
                participantes: currentProyecto.usuariosProyecto.map((usuario) => usuario.id)
            }}
        >
            <Form.Item label="Titulo" name="titulo" required className='col-span-12'>
                <Input />
            </Form.Item>
            <Form.Item label="Descripcion" name="descripcion" className='col-span-12'>
                <TextArea rows={5} />
            </Form.Item>
            <Form.Item label="Participantes" name="participantes" className='col-span-12'>
                <Select mode='multiple' placeholder='Please select' bordered={false}
                        onChange={(value) => setSelectedUsers(value)} value={selectedUsers}
                        tagRender={tagRender} maxTagCount={3} style={{ width: '100%' }}
                        maxTagPlaceholder={(omittedValues) => (
                            <span className='text-devarana-graph'>+{omittedValues.length}</span>
                        )}
                    >
                        {
                            usuarios.map((usuario) => (
                                <Select.Option key={usuario.id} value={usuario.id}>
                                    { spanUsuario(usuario) }
                                </Select.Option>
                            ))
                        }
                    </Select>
            </Form.Item>
            <Form.Item label="Fecha de inicio" name="fechaInicio" className='col-span-6'>
                <DatePicker format={'DD/MM/YYYY'} className='w-full'/>
            </Form.Item>
            <Form.Item label="Fecha de fin" name="fechaFin" className='col-span-6'>
                <DatePicker format={'DD/MM/YYYY'} className='w-full' />
            </Form.Item>

            <Form.Item shouldUpdate>
                {() => (
                    <Button
                        type="default" 
                        className='btn-primary' 
                        htmlType="submit"
                        disabled={
                            !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
                            form.getFieldsValue().titulo === '' ||
                            form.getFieldsValue().descripcion === ''
                        }
                    >
                        Guardar
                    </Button>
                )}
            </Form.Item>

        </Form>
        
    )
}
