import { useObjetivo } from '@/hooks/useObjetivos'
import { Divider, Modal, Progress, Tooltip } from 'antd'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useMemo, useState } from 'react'
import FormEvaluacion from './Evaluaciones/FormEvaluacion'
import { Rating } from 'react-simple-star-rating'
import GaugeChart from 'react-gauge-chart'
import 'swiper/css';
import 'swiper/css/navigation';
import dayjs from 'dayjs'

interface Props {
    operativos: OperativoProps[]
}
export const CardAvance = ( { operativos }: Props ) => {

    const { periodControls: { preEvaluationDays, postClosureDays}, currentConfig: { currentDate, quarter, year } } = useAppSelector(state => state.global)
    const { perfil } = useAppSelector(state => state.profile)
    const { ponderacionObjetivos } = useObjetivo({ operativos })
    const {perfil: { rendimiento }} = useAppSelector(state => state.profile)
    const { evaluacionLider, evaluacionPropia, evaluacionColaborador,isLoading, resultados } = useAppSelector(state => state.evaluaciones)

    const [ isEvaluacionVisible, setEvaluacionVisible ] = useState(false)

    const handleEvaluation = async () => {
        setEvaluacionVisible(!isEvaluacionVisible)
    }

    const handleCancelEvaluacion = () => {
		setEvaluacionVisible(false)
	}

    const isOpen = useMemo(() => {
        const today = dayjs()
        // Obtener ultimo mes del quarter
        const month = quarter * 3        
        //  Obtener el ultimo dia del quarter
        const lastDay = dayjs(`${year}-${month}-01`).endOf('quarter')
        // Obtener la fecha de inicio de evaluacion
        const preEvaluationDate = lastDay.subtract(preEvaluationDays, 'day')
        // Obtener la fecha de cierre de evaluacion
        const postClosureDate = lastDay.add(postClosureDays, 'day')
        // si está entree el rango de fechas devolver false
        if (today.isBetween(preEvaluationDate, postClosureDate)) {
            if(!isLoading){
                if(evaluacionLider && evaluacionPropia){
                    if(evaluacionLider.id !== '' && evaluacionPropia.id !== ''){
                        return false
                    }else{
                        return true
                    }
                }else{
                    return true
                }
            }
        } else {
            return true
        }

    }, [currentDate, postClosureDays, preEvaluationDays, evaluacionLider, evaluacionPropia])

    const calculoAvance = useMemo(() => {
        
        const {resultadoCompetencias, resultadoObjetivos}  = rendimiento     
        const total = resultadoCompetencias + resultadoObjetivos
        return total

        
    }, [ponderacionObjetivos, resultados])

    

    const calculoBono = useMemo(() => {
        const rangos: { [key: number]: number } = {
            0: 0,
            85: 0,
            86: 75,
            88: 80,
            90: 85,
            92: 90,
            94: 95,
            96: 100,
            98: 105,
            100: 110,
        };

        let puntuacion = 0;
        for (let rango in rangos) {
            if (calculoAvance >= parseInt(rango)) {                
                puntuacion = rangos[rango];
            } else {
                break;
            }
        }

        return puntuacion;
    }, [calculoAvance]);
    
    
    

    return (
        <>
            <h1 className='font-medium text-primary px-5'>Avance</h1>
            <div className='text-devarana-graph flex flex-col h-full'>
                    <div className='flex-1 flex items-center'>

                        <Swiper
                            spaceBetween={50}
                            centeredSlides={true}
                            slidesPerView={1}
                            modules={[Navigation]}
                            className='swiperAvance'
                            navigation={true}
                        >
                            <SwiperSlide>
                                <div className='relative'>
                                    <GaugeChart 
                                        percent={calculoAvance / 100}
                                        nrOfLevels={30}
                                        className='w-full'
                                        // colors={['#FF3131', '#FF914D', '#FFBD59', '#FFDE59', '#C1FF72', '#7ED957', '#00BF63', '#5CE1E6', '#0CC0DF', '#0C82DF']}
                                        colors={['#d64767', '#56739B']}
                                        textColor='#848891'
                                    />
                                    <p className='text-center text-devarana-graph font-bold'>Avance Total</p>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="relative">
                                <GaugeChart 
                                        percent={calculoBono / 100}
                                        nrOfLevels={30}
                                        className='w-full'
                                        // colors={['#FF3131', '#FF914D', '#FFBD59', '#FFDE59', '#C1FF72', '#7ED957', '#00BF63', '#5CE1E6', '#0CC0DF', '#0C82DF']}
                                        colors={['#d64767', '#56739B']}
                                        textColor='#848891'
                                    />
                                    <p className='text-center text-devarana-graph font-bold'>Bono Obtenido</p>
                                </div>
                            </SwiperSlide>
                        </Swiper>

                    </div>
                    <Divider className='my-3'/>
                    <div className='flex-1 flex flex-col'>
                        <div className='px-5 flex-1 flex flex-col items-center'>
                                <p className='text-center'>Logro Objetivos</p>
                                <Progress percent={ponderacionObjetivos} format={percent =><p className='text-devarana-graph'>{percent?.toFixed(2)}%</p>}
                                strokeColor={{
                                    '0%': 'rgba(9, 103, 201, 1)',
                                    '100%': 'rgba(9, 103, 201, .5)',
                                }}
                            />
                        </div>
                        <Divider className='my-3'/>
                        <div className='flex-1 flex flex-col items-center'>
                            <p>Competencias</p>
                            <Tooltip title={resultados} >
                                <div><Rating initialValue={Number(resultados)} readonly allowFraction transition emptyStyle={{ display: "flex" }} fillStyle={{ display: "-webkit-inline-box" }}/></div>
                            </Tooltip>
                        </div>
                        <div className='flex justify-center pb-5 pt-2 w-full'>
                            <button 
                                className='border border-secondary px-2 py-1 text-secondary text-xs rounded-ext font-light disabled:opacity-50 disabled:cursor-not-allowed disabled:border-devarana-graph disabled:text-devarana-graph' 
                                onClick={handleEvaluation}
                                disabled={ isOpen }
                            >Realizar Evaluación</button>
                        </div>
                    </div>
            </div>

            <Modal
                open={isEvaluacionVisible}
                footer={null}
                width={1000}
                closable={false}
                destroyOnClose={true}
                onCancel={handleCancelEvaluacion}
            >
                <FormEvaluacion perfil={perfil}  />
            </Modal>
            
        </>
    )
}
