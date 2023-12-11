import { useAppSelector } from '@/redux/hooks'
import { Box } from '../../components/ui'
import { Calendar, DatePicker, Form } from 'antd'
import dayjs from 'dayjs'
import { useGetGestionObjetivosQuery, useUpdateGestionObjetivosMutation } from '@/redux/features/gestion/gestionThunk'
import Loading from '../../components/antd/Loading'
import { useEffect } from 'react'


export const Objetivos = () => {

    const { currentConfig: { quarter, year }} = useAppSelector(state => state.global)
    const { RangePicker } = DatePicker
    const { isLoading, isFetching, isSuccess , data: gestionObjetivo } = useGetGestionObjetivosQuery({quarter, year})
    const [updateGestionObjetivos, {isLoading: isUpdating}] = useUpdateGestionObjetivosMutation()

    const [form] = Form.useForm();

    const calcularDuracion = (fechaInicio: string, fechaFin:string) => {
        const inicio = dayjs(fechaInicio);
        const fin = dayjs(fechaFin);
      
        const unidades = [
          { unidad: 'mes', valor: fin.diff(inicio, 'month') },
          { unidad: 'día', valor: fin.diff(inicio, 'day') },
          { unidad: 'hora', valor: fin.diff(inicio, 'hour') }
        ];
      
        const partesNoCero = unidades
          .filter(({ valor }) => valor !== 0)
          .map(({ valor, unidad }) => `${valor} ${unidad}${valor !== 1 ? 's' : ''}`);
      
        return {
            partesNoCero,
            días: fin.diff(inicio, 'day'),
            horas: fin.diff(inicio, 'hour'),
            minutos: fin.diff(inicio, 'minute'),
            segundos: fin.diff(inicio, 'second')
            };
    };

    const handleSubmit = async () => {
        const query = {
            ...gestionObjetivo,
            id: gestionObjetivo?.id || 0,
            year: year,
            quarter: quarter,
            periodoDefinicionInicio: dayjs(form.getFieldValue('periodoDefinicion')[0]).format('YYYY-MM-DD'),
            periodoDefinicionFin: dayjs(form.getFieldValue('periodoDefinicion')[1]).format('YYYY-MM-DD'),
            ejecucionInicio: dayjs(form.getFieldValue('ejecucion')[0]).format('YYYY-MM-DD'),
            ejecucionFin: dayjs(form.getFieldValue('ejecucion')[1]).format('YYYY-MM-DD'),
            revisionIntermediaInicio: dayjs(form.getFieldValue('revisionIntermedia')[0]).format('YYYY-MM-DD'),
            revisionIntermediaFin: dayjs(form.getFieldValue('revisionIntermedia')[1]).format('YYYY-MM-DD'),
            cierreObjetivosInicio: dayjs(form.getFieldValue('cierreObjetivos')[0]).format('YYYY-MM-DD'),
            cierreObjetivosFin: dayjs(form.getFieldValue('cierreObjetivos')[1]).format('YYYY-MM-DD'),
            cierreEvaluacionCompetenciasInicio: dayjs(form.getFieldValue('cierreEvaluacionCompetencias')[0]).format('YYYY-MM-DD'),
            cierreEvaluacionCompetenciasFin: dayjs(form.getFieldValue('cierreEvaluacionCompetencias')[1]).format('YYYY-MM-DD'),
        }

        await updateGestionObjetivos({gestionObjetivo: query}).unwrap()
    }

    useEffect(() => {
        form.setFieldsValue({
            periodoDefinicion: [dayjs(gestionObjetivo?.periodoDefinicionInicio), dayjs(gestionObjetivo?.periodoDefinicionFin)],
            ejecucion: [dayjs(gestionObjetivo?.ejecucionInicio), dayjs(gestionObjetivo?.ejecucionFin)],
            revisionIntermedia: [dayjs(gestionObjetivo?.revisionIntermediaInicio), dayjs(gestionObjetivo?.revisionIntermediaFin)],
            cierreObjetivos: [dayjs(gestionObjetivo?.cierreObjetivosInicio), dayjs(gestionObjetivo?.cierreObjetivosFin)],
            cierreEvaluacionCompetencias: [dayjs(gestionObjetivo?.cierreEvaluacionCompetenciasInicio), dayjs(gestionObjetivo?.cierreEvaluacionCompetenciasFin)],
        })
    }, [gestionObjetivo])

    if ( (isLoading || isFetching) && !isSuccess ) return <Loading />

    return (
        <>
            <div className='grid grid-cols-12 gap-5 py-2'>
                <Box className='col-span-8'>
                    <h1> Configración de Periodos de Objetivos </h1>
                    <p className='text-default'> Trimestre: {quarter} </p>
                    <p className='text-default'> Año: {year} </p>
                </Box>
                <Box className='col-span-4'>
                    <>
                    </>
                </Box>

                {
                    isSuccess && (
                        <Form 
                        className="grid grid-cols-12 gap-5 py-2 col-span-12"
                        form={form}
                        disabled={isUpdating}
                        layout='vertical'
                        initialValues={{
                            periodoDefinicion: [dayjs(gestionObjetivo?.periodoDefinicionInicio), dayjs(gestionObjetivo?.periodoDefinicionFin)],
                            ejecucion: [dayjs(gestionObjetivo?.ejecucionInicio), dayjs(gestionObjetivo?.ejecucionFin)],
                            revisionIntermedia: [dayjs(gestionObjetivo?.revisionIntermediaInicio), dayjs(gestionObjetivo?.revisionIntermediaFin)],
                            cierreObjetivos: [dayjs(gestionObjetivo?.cierreObjetivosInicio), dayjs(gestionObjetivo?.cierreObjetivosFin)],
                            cierreEvaluacionCompetencias: [dayjs(gestionObjetivo?.cierreEvaluacionCompetenciasInicio), dayjs(gestionObjetivo?.cierreEvaluacionCompetenciasFin)],
                        }}
                        
                    >
                       
                        <Box className='col-span-4'>
                            <h2> Definición de Objetivos </h2>
                            <div className='grid grid-cols-12 gap-5 items-center'>
                                <div className='col-span-9'>
                                    <Form.Item
                                        label="Periodo"
                                        name="periodoDefinicion"
                                    >
                                        <RangePicker onChange={handleSubmit} format={'DD MMMM YYYY'} className='w-full' />
                                    </Form.Item>
                                </div>
                                <div className='col-span-3 items text-center'>
                                    <p className='text-default'> Duración: </p>
                                    <p className='text-default'> { calcularDuracion(gestionObjetivo!.periodoDefinicionInicio, gestionObjetivo!.periodoDefinicionFin).días} Días </p>
                                </div>
                            </div>
                        </Box>
    
                        <Box className='col-span-4'>
                            <h2> Ejecución de Objetivos </h2>
                            <div className='grid grid-cols-12 gap-2 items-center'>
                                <div className='col-span-9'>
                                    <Form.Item
                                        label="Periodo"
                                        name="ejecucion"
                                    >
                                        <RangePicker onChange={handleSubmit} format={'DD MMMM YYYY'} className='w-full'/>
                                    </Form.Item>
                                </div>
                                <div className='col-span-3 items text-center'>
                                    <p className='text-default'> Duración: </p>
                                    <p className='text-default'> { calcularDuracion(gestionObjetivo!.ejecucionInicio, gestionObjetivo!.ejecucionFin).días} Días </p>
                                </div>
                            </div>
                        </Box>
    
                        <Box className='col-span-4'>
                            <h2> Revisión Intermedia </h2>
                            <div className='grid grid-cols-12 gap-2 items-center'>
                                <div className='col-span-9'>
                                     <Form.Item
                                        label="Periodo"
                                        name="revisionIntermedia"
                                    >
                                        <RangePicker onChange={handleSubmit} format={'DD MMMM YYYY'} className='w-full'/>
                                    </Form.Item>
                                </div>
                                <div className='col-span-3 items text-center'>
                                    <p className='text-default'> Duración: </p>
                                    <p className='text-default'> { calcularDuracion(gestionObjetivo!.revisionIntermediaInicio, gestionObjetivo!.revisionIntermediaFin).días} Días </p>
                                </div>
                            </div>
                        </Box>
    
                        <Box className='col-span-4'>
                            <h2> Cierre de Objetivos </h2>
                            <div className='grid grid-cols-12 gap-2 items-center'>
                                <div className='col-span-9'>
                                     <Form.Item
                                        label="Periodo"
                                        name="cierreObjetivos"
                                    >
                                        <RangePicker onChange={handleSubmit} format={'DD MMMM YYYY'} className='w-full'/>
                                    </Form.Item>
                                </div>
                                <div className='col-span-3 items text-center'>
                                    <p className='text-default'> Duración: </p>
                                    <p className='text-default'> { calcularDuracion(gestionObjetivo!.cierreObjetivosInicio, gestionObjetivo!.cierreObjetivosFin).días} Días </p>
                                </div>
                            </div>
                        </Box>
    
                        <Box className='col-span-4'>
                            <h2> Cierre de Evaluación de Competencias </h2>
                            <div className='grid grid-cols-12 gap-2 items-center'>
                                <div className='col-span-9'>
                                     <Form.Item
                                        label="Periodo"
                                        name="cierreEvaluacionCompetencias"
                                    >
                                        <RangePicker onChange={handleSubmit} format={'DD MMMM YYYY'} className='w-full'/>
                                    </Form.Item>
                                </div>
                                <div className='col-span-3 items text-center'>
                                    <p className='text-default'> Duración: </p>
                                    <p className='text-default'> { calcularDuracion(gestionObjetivo!.cierreEvaluacionCompetenciasInicio, gestionObjetivo!.cierreEvaluacionCompetenciasFin).días} Días </p>
                                </div>
                            </div>
                        </Box>
                    </Form>
                    )
                }
               

            </div>
        </>
    )
}
