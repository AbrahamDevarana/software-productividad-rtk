import { useObjetivo } from '@/hooks/useObjetivos'
import { GaugeChart } from '../complexUI/Gauge'
import { Divider, Modal, Progress, Rate } from 'antd'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useState } from 'react'
import { getUsuariosAEvaluarThunk } from '@/redux/features/perfil/perfilThunk'
import FormEvaluacion from './Evaluaciones/FormEvaluacion'


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
            <div className='px-5 text-devarana-graph w-full'>
                <h1 className='font-medium text-primary'>Avance</h1>
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
                                <GaugeChart value={ponderacionObjetivos} label='Avance'/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative">
                                <GaugeChart value={ponderacionObjetivos} label='Bono' />
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>
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
