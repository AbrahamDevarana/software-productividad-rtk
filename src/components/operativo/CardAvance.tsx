import { useObjetivo } from '@/hooks/useObjetivos'
// import { GaugeChart } from '../complexUI/Gauge'
import { Divider, Modal, Progress, Rate } from 'antd'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useState } from 'react'
import { getUsuariosAEvaluarThunk } from '@/redux/features/perfil/perfilThunk'
import FormEvaluacion from './Evaluaciones/FormEvaluacion'

import GaugeChart from 'react-gauge-chart'


interface Props {
    operativos: OperativoProps[]
}
export const CardAvance = ( { operativos }: Props ) => {

    const { perfil } = useAppSelector(state => state.profile)
    const { ponderacionObjetivos } = useObjetivo({operativos})
    const {perfil: {evaluaciones: {resultados}}} = useAppSelector(state => state.profile)
    const { year, quarter } = useAppSelector(state => state.global.currentConfig)
    const [ isEvaluacionVisible, setEvaluacionVisible ] = useState(false)

    const dispatch = useAppDispatch()

    const handleEvaluation = async () => {
		dispatch(getUsuariosAEvaluarThunk({usuarioId: perfil.id, year, quarter }))
        setEvaluacionVisible(!isEvaluacionVisible)
    }

    const handleCancelEvaluacion = () => {
		setEvaluacionVisible(false)
	}

    return (
        <>
            <h1 className='font-medium text-primary px-5'>Avance</h1>
            <div className='px-5 text-devarana-graph w-full flex justify-center items-center flex-col'>
                    <div className='relative w-full py-5'>

                        <Swiper
                            spaceBetween={50}
                            centeredSlides={true}
                            slidesPerView={1}
                            modules={[Navigation]}
                            className='mySwiper'
                        >
                            <SwiperSlide>
                                <div className='relative'>
                                    <GaugeChart 
                                        percent={ponderacionObjetivos / 100}
                                        nrOfLevels={10}
                                        className='w-full'
                                        colors={['#FF3131', '#FF914D', '#FFBD59', '#FFDE59', '#C1FF72', '#7ED957', '#00BF63', '#5CE1E6', '#0CC0DF', '#0C82DF']}
                                        textColor='#848891'
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="relative">
                                <GaugeChart 
                                        percent={(ponderacionObjetivos + resultados) / 100}
                                        nrOfLevels={10}
                                        className='w-full'
                                        colors={['#FF3131', '#FF914D', '#FFBD59', '#FFDE59', '#C1FF72', '#7ED957', '#00BF63', '#5CE1E6', '#0CC0DF', '#0C82DF']}
                                        textColor='#848891'
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>

                    </div>
                    <Divider className='my-2'/>
                    <div className='flex flex-col items-center align-middle'>
                        <div className='w-full'>
                            <Progress percent={ponderacionObjetivos} format={percent =><p className='text-devarana-graph'>{percent?.toFixed(2)}%</p>}
                            strokeColor={{
                                '0%': 'rgba(9, 103, 201, 1)',
                                '100%': 'rgba(9, 103, 201, .5)',
                            }}
                            />
                            <p className='text-center'>Logro Objetivos</p>
                        </div>
                        <Divider className='my-2'/>
                    <div className='flex flex-col items-end'>
                            <div className='flex items-center gap-5 align-middle'>
                                <Rate value={resultados} allowHalf disabled className='text-primary' />
                                <p> {`${ resultados.toFixed(2) || 0 } / 5` } </p>
                            </div>
                            <p>Evaluación de Competencias</p>
                    </div>

                    <div className='flex justify-between text-bold pt-5 w-full'>
                            <p>Mi Evaluacion</p>
                            |
                            <p className='cursor-pointer' onClick={handleEvaluation}>Evaluar</p>
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
