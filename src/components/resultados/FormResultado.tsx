import  { useMemo } from 'react';
import { Form, Input, DatePicker, Radio, Progress, Popover, Slider, InputNumber, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { BsFillCalendarFill } from 'react-icons/bs';
import { updateResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSelectUser } from '@/hooks/useSelectUser';
import { ResultadoClaveProps } from '@/interfaces';

interface Props {
    resultado: ResultadoClaveProps
}

const ResultadoClaveForm = ({ resultado }: Props ) => {

    const dispatch = useAppDispatch()
    const { usuarios } = useAppSelector(state => state.usuarios)

    const [form] = Form.useForm()

    const handleOnSubmit = () => {
        const query = {
            ...resultado,
            ...form.getFieldsValue(),
        }
        dispatch(updateResultadoThunk(query))
    }

    const isVisible = useMemo(() => {
        return resultado.tipoProgreso === 'progreso'
    }, [resultado])

    const content = (
        <>
            <Form.Item
                name="tipoProgreso"
                required
                
            >
                <Radio.Group onChange={handleOnSubmit}>
                    <Radio value="progreso">Avance Manual</Radio>
                    <Radio value="acciones">Acciones Cumplidas</Radio>
                </Radio.Group>
            </Form.Item>

            <Row>
                <Col span={16} >
                    <Form.Item
                            name="progreso"
                            hidden={!isVisible}
                        >
                            <Slider 
                                min={0} 
                                max={100} 
                                onAfterChange={handleOnSubmit}
                            />
                            
                    </Form.Item>
                </Col>
               <Col span={2}>
                <Form.Item
                        name="progreso"
                        hidden={!isVisible}
                    >
                        <InputNumber
                                min={0}
                                max={100}
                                style={{ margin: '0 16px' }}
                                value={resultado.progreso}
                                onChange={handleOnSubmit}
                            />
                    </Form.Item>
                </Col>
            </Row>
        </>
    )

    


    return (
        <Form 
            form={form}
            onBlur={handleOnSubmit}
            layout='inline'
            className='w-full'
            initialValues={{
                ...resultado,
                propietarioId: resultado.propietarioId,
                fechaInicio: dayjs(resultado.fechaInicio),
                fechaFin: dayjs(resultado.fechaFin)
            }}
        >
            <Row className='w-full items-center' gutter={10}>
                <Col span={8} order={1}>
                    <Form.Item
                        name="nombre"
                        required
                    >
                        <Input className="rs-input border-none bg-transparent hover:bg-white hover:drop-shadow-sm font-medium text-lg text-primary"  onPressEnter={ (e) => {
                            handleOnSubmit()
                            e.currentTarget.blur()
                            e.stopPropagation()
                        }} />
                    </Form.Item>
                </Col>
                <Col span={3} order={3} offset={9}>
                    <Form.Item
                        name={"fechaFin"}
                    >
                        <DatePicker
                            format={"DD-MM-YYYY"}
                            className='w-full'
                            clearIcon={false}
                            suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                        />
                    </Form.Item>
                </Col>
                <Col span={4} order={2}>
                    <Form.Item
                        className='w-full'
                    >
                        <Popover content={content} title="Tipo de Progreso" trigger="click"  className='w-full cursor-pointer'>
                            <Progress 
                                className='drop-shadow progressStyle w-full' percent={resultado.progreso} strokeWidth={20}
                                strokeColor={{
                                    '0%': '#FFD600',
                                    '100%': '#FFD600',
                                    direction: 'to top',
                                }}
                                trailColor='#E5E5E5'
                                
                            />
                        </Popover>
                    </Form.Item>
                </Col>
            </Row>

          
            
        </Form>
    );
};

export default ResultadoClaveForm;
