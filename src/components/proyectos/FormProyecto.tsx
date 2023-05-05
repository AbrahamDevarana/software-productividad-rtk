import { ProyectosProps } from '@/interfaces'
import { createProyectoThunk, updateProyectoThunk } from '@/redux/features/proyectos/proyectosThunk';
import { useAppDispatch } from '@/redux/hooks';
import { Alert, Button, DatePicker, Form, Input, Modal, Skeleton, Upload } from 'antd'
import dayjs from 'dayjs';

interface FormProyectoProps {
    currentProyecto: ProyectosProps
    handleCancel: () => void
    isLoadingProyecto: boolean
}

export const FormProyecto = ({currentProyecto, handleCancel, isLoadingProyecto}: FormProyectoProps) => { 

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


    if (isLoadingProyecto) return <Skeleton active paragraph={{  rows: 10 }} />

    return (
        <Form 
            onFinish={handleSubmit} 
            form={form} 
            layout='vertical'
            initialValues={{
                titulo: currentProyecto.titulo,
                descripcion: currentProyecto.descripcion,
                fechaInicio: dayjs(currentProyecto.fechaInicio).add(6, 'hour'),
                fechaFin: dayjs(currentProyecto.fechaFin).add(6, 'hour'),
            }}
        >
            <Form.Item label="Titulo" name="titulo" required>
                <Input />
            </Form.Item>
            <Form.Item label="Descripcion" name="descripcion">
                <TextArea rows={5} />
            </Form.Item>
            <Form.Item label="Fecha de inicio" name="fechaInicio" className='inline-block'>
                <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>
            <Form.Item label="Fecha de fin" name="fechaFin" className='inline-block'>
                <DatePicker format={'DD/MM/YYYY'} />
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
