import  { useMemo} from 'react';
import { Form, Input, DatePicker, Radio, Progress, Popover, Slider, InputNumber, Row, Col, Tooltip, Avatar, Image, ColorPicker, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { BsThreeDots } from 'react-icons/bs';
import { useDeleteResultadoMutation, useDuplicateResultadoMutation, useUpdateResultadoMutation } from '@/redux/features/resultados/resultadosThunk';
import { useAppDispatch } from '@/redux/hooks';
import { OperativoProps, ResultadoClaveProps } from '@/interfaces';
import { Link } from 'react-router-dom';
import { getColor, getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';
import { BiTrash } from 'react-icons/bi';
import { FaCopy } from 'react-icons/fa';
import CountUp from 'react-countup';
import { toast } from 'sonner';


interface Props {
    resultado: ResultadoClaveProps
    isClosed?: boolean
    currentOperativo: OperativoProps
}

const ResultadoClaveForm = ({ resultado, isClosed, currentOperativo }: Props ) => {

    const { year, quarter } = currentOperativo

    const [updateResultado, {isLoading}] = useUpdateResultadoMutation()
    const [deleteResultado, {isLoading: isDeleting}] = useDeleteResultadoMutation()
    const [duplicateResultado, {isLoading: isDuplicating}] = useDuplicateResultadoMutation()

    const [form] = Form.useForm()
    const { RangePicker } = DatePicker

    const isVisible = useMemo(() => {
        return resultado.tipoProgreso === 'porcentaje'
    }, [resultado])

    const disabledDate = (current: any) => {
        const month = quarter * 3 - 2    
        const startDate = dayjs(`${year}-${month}-01`)
        const endDate = startDate.add(3, 'month').subtract(1, 'day')
        return current < startDate || current > endDate;
    }


    const content = (
        <>
            <Form
                form={form}
                layout='vertical'
                initialValues={{
                    tipoProgreso: resultado.tipoProgreso
                }}
                className='w-[350px]'
                disabled={isClosed}
            >

                <Form.Item
                    name="tipoProgreso"
                    className='mb-0'
                >
                    <Radio.Group onChange={(e) => handleChangeTipoProgreso(e.target.value)} disabled={isClosed}>
                        <Radio value="porcentaje">Manual</Radio>
                        <Radio value="acciones">Acciones</Radio>
                    </Radio.Group>

                </Form.Item>


                <Row gutter={20}>
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
                                disabled={isClosed}
                            />   
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="progreso"
                            className={`w-full ${isVisible ? 'block' : 'hidden'}`}
                            rules={[
                                {
                                    type: 'number',
                                    min: 0,
                                    max: 100,
                                },
                            ]}
                        >
                            <InputNumber 
                                min={0} 
                                max={100} 
                                onChange={(value) => handleUpdateProgress(value)} 
                                className={`w-full ${isVisible ? 'block' : 'hidden'}`}
                                defaultValue={resultado.progreso}
                                disabled={isClosed}
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

        toast.promise(updateResultado(query).unwrap(),
            {
                loading: 'Actualizando...',
                success: 'Resultado actualizado',
                error: 'Error al actualizar el resultado'
            }
        )
    }

    const handleUpdateDate = (date: any, dateString: any) => {
        const query = {
            ...resultado,
            fechaInicio: dayjs(dateString[0], 'DD-MM-YYYY').format('YYYY-MM-DD'),
            fechaFin: dayjs(dateString[1], 'DD-MM-YYYY').format('YYYY-MM-DD')
        }
        toast.promise(updateResultado(query).unwrap(),
            {
                loading: 'Actualizando...',
                success: 'Resultado actualizado',
                error: 'Error al actualizar el resultado'
            }
        )
    }

    const handleUpdateProgress = (value: any) => {
        const query = {
            ...resultado,
            progreso: Math.max(0, value)
        }
        toast.promise(updateResultado(query).unwrap(),
            {
                loading: 'Actualizando...',
                success: 'Resultado actualizado',
                error: 'Error al actualizar el resultado'
            }
        )
    }

    const handleChangeTipoProgreso = (value: any) => {
        const query = {
            ...resultado,
            tipoProgreso: value
        }
        toast.promise(updateResultado(query).unwrap(),
            {
                loading: 'Actualizando...',
                success: 'Resultado actualizado',
                error: 'Error al actualizar el resultado'
            }
        )
    }

    const handleChangeColor = (value: any) => {        
        const query = {
            ...resultado,
            color: value
        }
        
        toast.promise(updateResultado(query).unwrap(),
            {
                loading: 'Actualizando...',
                success: 'Resultado actualizado',
                error: 'Error al actualizar el resultado'
            }
        )
    }

    const handleDeleteResultado = (resultado: ResultadoClaveProps) => {
        toast.promise(deleteResultado(resultado).unwrap(),
            {
                loading: 'Eliminando...',
                success: 'Resultado eliminado',
                error: 'Error al eliminar el resultado'
            }
        )
    }

    const handleDupliateResultado = async (resultado: ResultadoClaveProps) => {

        toast.promise(duplicateResultado(resultado).unwrap(),
            {
                loading: 'Duplicando...',
                success: 'Resultado duplicado',
                error: 'Error al duplicar el resultado'
            }
        )
    }


    return (
        <>
        <div className='flex items-center gap-x-5'>
            <div className='flex flex-col w-full'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Resultado Clave</p>
                <Input className="rs-input border-none bg-transparent hover:bg-white hover:drop-shadow-sm font-medium text-lg disabled:bg-transparent"
                    onBlur={ (e) => { handleUpdateResultado( e.currentTarget.value ) } }
                    onFocus={ (e) => { e.currentTarget.select() } }
                    onPressEnter={ (e) => {    
                        e.currentTarget.blur()
                        e.stopPropagation()
                    }}
                    style={{
                        color: resultado.color
                    }}
                    defaultValue={resultado.nombre}
                    disabled={isClosed}
                />
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Responsable</p>
                <Link to={`/perfil/${resultado.propietario?.slug}`} className={`rounded-full`} >
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
                        style={{
                            width: '150px'
                        }}
                        className='drop-shadow progressStyle' strokeWidth={15} percent={Number(resultado?.progreso?.toFixed(2))}
                        strokeColor={{
                            '0%': getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO').lowColor,
                            '100%': getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO').color,
                            direction: 'to top',
                        }}
                        trailColor={ getColor(resultado.progreso === 0 ? 'SIN_INICIAR' : resultado.progreso === 100 ? 'FINALIZADO' : 'EN_PROCESO', .5).color}      
                        format={() => <CountUp style={{
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: '#fff'
                        }} end={resultado.progreso} duration={1} suffix='%' decimals={2} decimal='.' />}                                 
                    />
                </Popover>
            </div>
            <div className='flex flex-col items-center'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Fecha</p>
                <div className='relative flex gap-x-2'>
                    <RangePicker

                        defaultValue={[dayjs(resultado.fechaInicio), dayjs(resultado.fechaFin)]}
                        disabledDate={disabledDate}
                        disabled={isClosed}
                        onChange={handleUpdateDate}
                        allowClear={false}
                        className='w-[220px] text-center text-devarana-graph cursor-pointer bg-white border rounded font-roboto font-light'
                        format={`DD-MM-YYYY`}
                    />
                    {
                        // day counter
                        dayjs(resultado.fechaFin).diff(dayjs(resultado.fechaInicio), 'day') > 0 && (
                            <div className='flex items-center gap-x-1'>
                                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>{dayjs(resultado.fechaFin).diff(dayjs(resultado.fechaInicio), 'day')}</p>
                                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Días</p>
                            </div>
                        )
                    }
                </div>

            </div>
            <div className='flex flex-col items-center'>
                <p className='text-devarana-graph text-[10px] font-mulish m-0 leading-0'>Color</p>
                <ColorPicker defaultValue={resultado.color} onChange={(color) => handleChangeColor(color.toHexString())} />
            </div>
            <div className='flex flex-col items-center'>
                <div></div>
                <Popover
                    trigger="click"
                    content={<div className='flex gap-x-5'>
                        <Tooltip title="Duplicar Resultado Clave">
                            <Popconfirm
                                disabled={isClosed}
                                title="¿Estas seguro de duplicar este resultado clave?"
                                onConfirm={ () => handleDupliateResultado( resultado )}
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
                                <FaCopy className='text-default text-right hover:text-dark-light text-lg cursor-pointer' />
                            </Popconfirm>
                        </Tooltip>
                        <Tooltip title="Eliminar Resultado Clave">
                            <Popconfirm
                                    disabled={isClosed}
                                    title="¿Estas seguro de eliminar este resultado clave?"
                                    onConfirm={ () => handleDeleteResultado( resultado )}
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
                            </Tooltip> 
                    </div>}
                >
                    <BsThreeDots className='text-devarana-babyblue text-2xl cursor-pointer' />
                </Popover>
            </div>
                
        </div>
        </>
    )
};

export default ResultadoClaveForm;
