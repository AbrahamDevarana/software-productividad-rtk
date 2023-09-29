import  { useMemo } from 'react';
import { Form, Input, DatePicker, Radio, Progress, Popover, Slider, InputNumber, Row, Col, Tooltip, Avatar, Image, ColorPicker, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { BsFillCalendarFill, BsThreeDots } from 'react-icons/bs';
import { deleteResultadoThunk, updateResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useSelectUser } from '@/hooks/useSelectUser';
import { ResultadoClaveProps } from '@/interfaces';
import { Link } from 'react-router-dom';
import { getColor, getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';
import { BiTrash } from 'react-icons/bi';

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
        return resultado.tipoProgreso === 'porcentaje'
    }, [resultado])

    const content = (
        <>
            <Form
                form={form}
                layout='vertical'
                initialValues={{
                    tipoProgreso: resultado.tipoProgreso
                }}
                className='w-[350px]'

            >

                <Form.Item
                    name="tipoProgreso"
                    className='mb-0'
                >
                    <Radio.Group onChange={(e) => handleChangeTipoProgreso(e.target.value)}>
                        <Radio value="porcentaje">Manual</Radio>
                        <Radio value="acciones">Acciones</Radio>
                    </Radio.Group>

                </Form.Item>


                <Row gutter={ 10}>
                    <Col span={16}>
                        <Form.Item
                            name="progreso"
                            className={`w-full ${isVisible ? 'block' : 'hidden'}`}
                        >
                            <Slider 
                                min={0} 
                                max={100} 
                                onAfterChange={(value) => handleUpdateProgress(value)} 
                                className={`w-full ${isVisible ? 'block' : 'hidden'}`}
                                value={resultado.progreso}

                            />   
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="progreso"
                            className={`w-full ${isVisible ? 'block' : 'hidden'}`}
                        >
                            <InputNumber 
                                min={0} 
                                max={100} 
                                onChange={(value) => handleUpdateProgress(value)} 
                                className={`w-full ${isVisible ? 'block' : 'hidden'}`}
                                value={resultado.progreso}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            
        </>
    )

    const handleUpdateResultado = (value: any) => {
        const query = {
            ...resultado,
            nombre: value
        }
        dispatch(updateResultadoThunk(query))
    }

    const handleUpdateDate = (fechaFin: any) => {
        const query = {
            ...resultado,
            fechaFin: dayjs(fechaFin, 'DD-MM-YYYY').format('YYYY-MM-DD 06:00:00')
        }
        dispatch(updateResultadoThunk(query))
    }

    const handleUpdateProgress = (value: any) => {
        const query = {
            ...resultado,
            progreso: value
        }
        dispatch(updateResultadoThunk(query))
    }

    const handleChangeTipoProgreso = (value: any) => {
        const query = {
            ...resultado,
            tipoProgreso: value
        }
        dispatch(updateResultadoThunk(query))
    }

    const handleChangeColor = (value: any) => {

        console.log(value);
        
        const query = {
            ...resultado,
            color: value
        }
        dispatch(updateResultadoThunk(query))
    }

    const handleDeleteResultado = (id: string) => {
        dispatch(deleteResultadoThunk(id))
    }

    return (
        <div className='flex items-center gap-x-5'>
            <div className='flex flex-col w-full'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Resultado Clave</p>
                <Input className="rs-input border-none bg-transparent hover:bg-white hover:drop-shadow-sm font-medium text-lg"
                    onBlur={ (e) => { handleUpdateResultado( e.currentTarget.value ) } }
                    onPressEnter={ (e) => {    
                        e.currentTarget.blur()
                        e.stopPropagation()
                    }}
                    style={{
                        color: resultado.color
                    }}
                    defaultValue={resultado.nombre}
                />
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Responsable</p>
                <Link to={`/perfil/${resultado.propietario?.slug}`} className={`rounded-full`}>
                    <Tooltip title={`${resultado.propietario?.nombre} ${resultado.propietario?.apellidoPaterno}`} placement='top' >
                        <Avatar src={<Image src={`${getStorageUrl(resultado.propietario?.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                            {resultado.propietario?.iniciales} 
                        </Avatar>
                    </Tooltip>
                </Link>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Progreso</p>
                <Popover content={content} title={ <p className='text-devarana-graph'>Tipo de Progreso</p> } trigger="click"  className='w-full cursor-pointer'>
                    <Progress
                        className='drop-shadow progressStyle w-[150px]' strokeWidth={15} percent={Number(resultado.progreso.toFixed(2))}
                        strokeColor={{
                            '0%': getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO').lowColor,
                            '100%': getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO').color,
                            direction: 'to top',
                        }}
                        trailColor={ getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO', .5).color}                                       
                    />
                </Popover>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Fecha Fin</p>
                <DatePicker
                    format={"DD-MM-YYYY"}
                    defaultValue={ dayjs(resultado.fechaFin)  }
                    placeholder={ `${dayjs(resultado.fechaFin)}`}
                    showToday
                    clearIcon={null}
                    bordered={false}
                    suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />}
                    onChange={(date, dateString) => handleUpdateDate(dateString)}
                    className='w-[130px]'
                />
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Color</p>
                <ColorPicker defaultValue={resultado.color} onChange={(color) => handleChangeColor(color.toHexString())} />
            </div>
            <div className='flex flex-col items-center'>
                <div></div>
                <Popover
                    content={<>
                        <Popconfirm
                            title="¿Estas seguro de eliminar esta acción?"
                            onConfirm={ () => handleDeleteResultado( resultado.id )}
                            onCancel={() => {}}
                            okText="Si"
                            cancelText="No"
                            placement="left"
                            okButtonProps={{
                                className: 'rounded-full mr-2 bg-primary'
                            }}
                            cancelButtonProps={{
                                className: 'rounded-full mr-2 bg-error-light text-white'
                            }}
                        >
                            <BiTrash className='text-default text-right hover:text-error-light text-xl cursor-pointer' />
                        </Popconfirm>
                    </>}
                >
                    <BsThreeDots className='text-devarana-babyblue text-2xl cursor-pointer' />
                </Popover>
            </div>
                
        </div>
    )
};

export default ResultadoClaveForm;
