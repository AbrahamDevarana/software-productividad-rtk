import { useObjetivo } from '@/hooks/useObjetivos'
import { Divider, Modal, Progress, Tooltip } from 'antd'
import { OperativoProps, PerfilProps, RendimientoProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useMemo, useState } from 'react'
import FormEvaluacion from './Evaluaciones/FormEvaluacion'
import { Rating } from 'react-simple-star-rating'
import GaugeChart from 'react-gauge-chart'
import 'swiper/css';
import 'swiper/css/navigation';
import { IoIosEye } from "react-icons/io";

import { verificarPeriodo } from '@/helpers/getValidEtapa';
import useCalculoBono from '@/hooks/useBono';
import { ResultadosCompetencias } from './ResultadosCompetencias';
import { useGetEvaluacionResultadosQuery } from '@/redux/features/evaluaciones/evaluacionesThunk';

interface Props {
    perfil: PerfilProps
    rendimiento: RendimientoProps
    operativos: OperativoProps[]
    periodos: any
    etapa: {
        etapaActual: string,
        color: string,
        isClosed: boolean
    }
}
export const CardAvance = ( { operativos, periodos, perfil, rendimiento }: Props ) => {

    const { currentConfig: {year, quarter} } = useAppSelector(state => state.global)
    const { ponderacionObjetivos } = useObjetivo({ operativos })
    const { resultados } = useAppSelector(state => state.evaluaciones)
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const [ isEvaluacionVisible, setEvaluacionVisible ] = useState(false)

    const handleEvaluation = async () => {
        setEvaluacionVisible(!isEvaluacionVisible)
    }

    const handleCancelEvaluacion = () => {
		setEvaluacionVisible(false)
	}
    const isOpen = verificarPeriodo({tipoPeriodo: 'EVALUACION', etapa: periodos})
    

    const calculoAvance = useMemo(() => {

        if(!rendimiento) return 0
        const { resultadoCompetencias, resultadoObjetivos }  = rendimiento
        const total = resultadoCompetencias + resultadoObjetivos
        return total
    }, [ponderacionObjetivos, resultados, rendimiento])

    const calculoBono = useCalculoBono(calculoAvance)


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
                        <Progress percent={ponderacionObjetivos} format={percent => 
                        <p className='text-devarana-graph'>{
                            Math.trunc(percent as number * 100) / 100  
                        }%
                        </p>}
                        strokeColor={{
                            '0%': 'rgba(9, 103, 201, 1)',
                            '100%': 'rgba(9, 103, 201, .5)',
                        }}
                    />
                </div>
                <Divider className='my-3'/>
                <div className='flex-1 flex flex-col items-center'>
                    <div className='flex items-center gap-x-2 pb-2'>
                        <p>Competencias</p>
                        <Tooltip title={resultados === 0 ? 'No hay resultados' : 'Ver resultados'}>
                            <button onClick={() => setIsModalVisible(true)} disabled={resultados === 0 }>
                                <IoIosEye size={20}/>
                            </button>
                        </Tooltip>
                    </div>
                    <Tooltip title={resultados} >
                        <Rating initialValue={Number(resultados)} readonly allowFraction transition emptyStyle={{ display: "flex" }} fillStyle={{ display: "-webkit-inline-box" }}
                            fillColor='rgba(9, 103, 201, 1)'
                        />
                    </Tooltip>
                </div>
                <div className='flex justify-center pb-5 pt-2 w-full'>
                    <button 
                        className='border border-secondary px-2 py-1 text-secondary text-xs rounded-ext font-light disabled:opacity-50 disabled:cursor-not-allowed disabled:border-devarana-graph disabled:text-devarana-graph shadow' 
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


        <Modal
            title={<p className='text-devarana-dark-graph font-bold'>Mis Evaluaciones de Competencias</p>}
            open={isModalVisible}
            footer={null}
            width={1000}
            destroyOnClose={true}
            onCancel={() => setIsModalVisible(false)}
            
        >
            <ResultadosCompetencias usuarioId={perfil.id} />
        </Modal>
        
    </>
)
}
