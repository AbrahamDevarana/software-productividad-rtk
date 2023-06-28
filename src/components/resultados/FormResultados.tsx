import { updateResultadoThunk } from '@/redux/features/resultados/resultadosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Button, Form, Input, Radio } from 'antd'



export const FormResultados = () => {

    const dispatch = useAppDispatch()
    const { currentResultadoClave  } = useAppSelector(state => state.resultados)
    const [form] = Form.useForm()

    const handleOnSubmit = () => {

        const query = {
            ...currentResultadoClave,
            ...form.getFieldsValue(),
        }
        dispatch(updateResultadoThunk(query))
    }    


    return (
    <>
        <Form 
            form={form}
            onBlur={handleOnSubmit}
            layout='vertical' 
            className='grid grid-cols-12 md:gap-x-10 w-full'
            initialValues={currentResultadoClave}
        >
            <Form.Item
                label="Nombre"
                name="nombre"
                className='col-span-12'
                required
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Tipo de progreso"
                name="tipoProgreso"
                className='col-span-12'
                required
                onMetaChange={handleOnSubmit}
            >
                <Radio.Group>
                    <Radio value="progreso">Progreso</Radio>
                    <Radio value="acciones">Acciones</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item
                    label="Progreso"
                    name="progreso"
                    className='col-span-12'
                    hidden={form.getFieldValue('tipoProgreso') === 'acciones'}
                >
                    <Input/>
            </Form.Item>
        </Form>
    
    </>
  )
}
