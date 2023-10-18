import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearObjetivoThunk, clearOperativosThunk, getOperativosThunk } from '@/redux/features/operativo/operativosThunk';
import { clearResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { clearProfileThunk, getColaboradoresThunk, getEquipoThunk, getHistorialRendimientoThunk, getProfileThunk, getRendimientoThunk } from '@/redux/features/perfil/perfilThunk';
import { FormObjetivo, CardAvance, CardDesempeno, CardEquipo, CardObjetivo, CardResumen, Administracion, CardRanking } from '@/components/operativo';
import { useObjetivo } from '@/hooks/useObjetivos';
import { Box } from '@/components/ui';
import {Drawer, FloatButton, Modal } from 'antd'
import Loading from '@/components/antd/Loading';
import dayjs from 'dayjs';
import { FaPlus } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, FreeMode } from 'swiper';
import { SinglePerfilProps } from '@/interfaces';
import { getRankingsThunk } from '@/redux/features/ranking/rankingThunk';
import { getEvaluacionResultadosThunk, getUsuariosAEvaluarThunk } from '@/redux/features/evaluaciones/evaluacionesThunk';

export const Objetivos : React.FC = () => {

    const dispatch = useAppDispatch()    

    const { operativos, isLoading } = useAppSelector(state => state.operativos)
    const { userAuth } = useAppSelector(state => state.auth)
    const { perfil }  = useAppSelector(state => state.profile)
    const [ isFormVisible, setFormVisible ] = useState(false)
    const [ isAdminModalVisible, setIsAdminModalVisible ] = useState(false)
	const [ isPonderacionVisible, setPonderacionVisible ] = useState(false)
    const [ activeUsuarioReview, setActiveUsuarioReview ] = useState<any>(null)
    const { currentConfig: {year, quarter} } = useAppSelector(state => state.global)
    const [ gettingProfile, setGettingProfile ] = useState(false)
     
    const {id} = useParams<{id: string}>()

    const { rendimiento } = perfil

    useEffect(() => {
        setGettingProfile(true)
        const fetchData = async () => {
            await dispatch(getRendimientoThunk({year, quarter, usuarioId: id || userAuth?.id}))
            await dispatch(getProfileThunk({userId: id || userAuth?.id, year, quarter}))
            await dispatch(getEquipoThunk({ usuarioId: id || userAuth?.id }))
            await dispatch(getColaboradoresThunk({year, quarter, usuarioId: id || userAuth?.id}))
            await dispatch(getOperativosThunk({year, quarter, usuarioId: id || userAuth?.id}))
            await dispatch(getEvaluacionResultadosThunk({usuarioId: id || userAuth.id, year, quarter }))
            await dispatch(getUsuariosAEvaluarThunk({usuarioId: id || userAuth.id, year, quarter }))
            await dispatch(getHistorialRendimientoThunk({year, usuarioId: id || userAuth?.id}))
            await dispatch(getRankingsThunk({year, quarter}))
            setGettingProfile(false)
        }
        fetchData()

        // return () => {
        //     dispatch(clearOperativosThunk())
        //     dispatch(clearProfileThunk())
        // }
    }, [userAuth, id, year, quarter])
    

    const handleCancelForm = () => {
        setFormVisible(false)
        dispatch(clearObjetivoThunk())
        dispatch(clearResultadoThunk())
    }

    const { misObjetivos, objetivosCompartidos } = useObjetivo({operativos})

    if(gettingProfile) return <Loading dynamic={true}/>

    const handleOpenAdminModal = (usuario: SinglePerfilProps) => {
        setActiveUsuarioReview(usuario)
        setIsAdminModalVisible(true)
    }

    const handleCloseAdminModal = () => {
        setIsAdminModalVisible(false)
    }

    return (
        <>
            {/* <div className="flex lg:flex-nowrap flex-wrap gap-5">
                <Box className='lg:w-[20%] sm:w-[45%] w-full px-5 text-devarana-graph flex flex-col'>
                    <CardResumen operativos={operativos} isPonderacionVisible={isPonderacionVisible} setPonderacionVisible={setPonderacionVisible} />
                </Box>
                <Box className='lg:w-[20%] sm:w-[45%] w-full'>
                    <CardAvance operativos={operativos} />
                </Box>
                <Box className='lg:w-[35%] sm:w-[49%] w-full flex justify-center'>
                    <CardDesempeno />
                </Box>
                <div className='lg:w-[25%] sm:w-[49%] w-full relative'>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards, FreeMode]}
                        className='mySwiper h-[100%] px-5'
                        loop={true}
                        
                        
                    >
                        <SwiperSlide className='rounded-ext'>
                            <CardEquipo title="Mi Equipo" equipo={perfil.equipo} color='primary' handleMiEquipo={handleOpenAdminModal} />
                        </SwiperSlide>
                        <SwiperSlide className='rounded-ext'>
                            <CardEquipo title="Colaboradores de objetivos" equipo={perfil.colaboradores} color='secondary'/>
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div> */}
            <div className="grid 2xl:grid-cols-11 lg:grid-cols-12 md:grid-cols-6 grid-cols-12 gap-5">
                <Box className='2xl:col-span-2 xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12 w-full px-5 text-devarana-graph flex flex-col'>
                    <CardResumen operativos={operativos} isPonderacionVisible={isPonderacionVisible} setPonderacionVisible={setPonderacionVisible} />
                </Box>
                <Box className='2xl:col-span-2 xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12 w-full'>
                    <CardAvance operativos={operativos} />
                </Box>
                <Box className='2xl:col-span-4 xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12 w-full flex justify-center'>
                    <CardDesempeno />
                </Box>
                <div className='2xl:col-span-3 xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12 w-full relative'>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards, FreeMode]}
                        className='mySwiper h-[100%] px-5'
                        loop={true}
                        
                        
                    >
                        <SwiperSlide className='rounded-ext'>
                            <CardEquipo title="Mi Equipo" equipo={perfil.equipo} color='primary' handleMiEquipo={handleOpenAdminModal} />
                        </SwiperSlide>
                        <SwiperSlide className='rounded-ext'>
                            <CardEquipo title="Colaboradores de objetivos" equipo={perfil.colaboradores} color='secondary'/>
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>

            <div className='grid grid-cols-12 gap-5'>
                <div className='xl:col-span-9 lg:col-span-8 col-span-12 py-5 grid grid-cols-12 gap-5'>
                    {
                        isLoading && operativos.length === 0 ? 
                            <div className='col-span-12'>
                                <Loading  />
                            </div>
                        : 

                        <>
                        <div className='col-span-12 flex justify-between h-10 items-center'>
                            <h1 className='text-primary font-medium text-[16px]'>Mis Objetivos</h1>
                            
                        </div>
                        {
                            misObjetivos && misObjetivos.length > 0 && misObjetivos.map((operativo, index) => (
                                <CardObjetivo objetivo={operativo} key={index} setFormVisible={setFormVisible} />
                            ))
                        }
                        <h1 className='col-span-12 text-primary font-medium text-[16px]'>Objetivos Compartidos</h1>
                        {
                            objetivosCompartidos && objetivosCompartidos.length > 0 && objetivosCompartidos.map((operativo, index) => (
                                <CardObjetivo objetivo={operativo} key={index} setFormVisible={setFormVisible} />
                            ))
                        }
                        </>
                    }
                </div>

                <div className='xl:col-span-3 lg:col-span-4 col-span-12 row-span-2 my-5'>
                    <div className='h-10'>

                    </div>
                        <Box className='mt-5 min-h-[500px]'>
                            <CardRanking />
                        </Box>
                </div>
            </div>

            <Drawer 
                open={isFormVisible}
                footer={null}
                onClose={handleCancelForm}
                width={window.innerWidth > 1200 ? 700 : '100%'}
                destroyOnClose={true}
                closable={false}
                className='rounded-l-ext'
            >

                <FormObjetivo handleCancel={handleCancelForm} setPonderacionVisible={setPonderacionVisible} />

            </Drawer>
            
           {
                rendimiento.status === 'ABIERTO' &&
                (<FloatButton
                    shape="circle"
                    icon={<FaPlus />}
                    onClick={() => setFormVisible(true)}
                    type='primary'
                />)
           }

            <Modal
                open={isAdminModalVisible}
                onCancel={handleCloseAdminModal}
                footer={null}
                width={window.innerWidth > 1200 ? 'calc(95% - 80px)' : '100%' }
                style={{
					top: 50,
					left: 35,
					bottom: 0,
					height: 'calc(100% - 150px)',
					overflowY: 'hidden',
					borderRadius: '10px'
				}}
                destroyOnClose={true}
            >
                <Administracion activeUsuario={activeUsuarioReview}/>
            </Modal>
        </>
    ) 

}
