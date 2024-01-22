import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearObjetivoThunk, getOperativosThunk } from '@/redux/features/operativo/operativosThunk';
import { clearResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { getProfileThunk, getRendimientoThunk, useGetColaboradoresQuery, useGetEquipoQuery } from '@/redux/features/perfil/perfilThunk';
import { FormObjetivo, CardAvance, CardDesempeno, CardEquipo, CardObjetivo, CardResumen, Administracion, CardRanking } from '@/components/operativo';
import { useObjetivo } from '@/hooks/useObjetivos';
import { Box } from '@/components/ui';
import {Drawer, FloatButton, Modal } from 'antd'
import Loading from '@/components/antd/Loading';
import { FaPlus } from 'react-icons/fa';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, FreeMode } from 'swiper';
import { SinglePerfilProps } from '@/interfaces';
import { getEvaluacionResultadosThunk, getUsuariosAEvaluarThunk } from '@/redux/features/evaluaciones/evaluacionesThunk';
import { useGetGestionPeriodosQuery } from '@/redux/features/gestion/gestionThunk';
import { calcularEtapaActual } from '@/helpers/getEtapa';




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


    const { data: periodos, isLoading: isLoadingRules } = useGetGestionPeriodosQuery({year, quarter})
    
    const etapa = calcularEtapaActual({periodos, status: perfil.rendimiento.status})

    const { rendimiento } = perfil

    
    const {data: equipo} = useGetEquipoQuery({usuarioId: userAuth?.id})
    const {data: colaboradores} = useGetColaboradoresQuery({usuarioId: userAuth?.id, year, quarter})
    
    useEffect(() => {
        setGettingProfile(true)
        const fetchData = async () => {
            await Promise.all([
                dispatch(getRendimientoThunk({year, quarter, usuarioId: userAuth?.id})),
                dispatch(getProfileThunk({usuarioId: userAuth?.id, year, quarter})),
                dispatch(getOperativosThunk({year, quarter, usuarioId: userAuth?.id})),
                dispatch(getEvaluacionResultadosThunk({usuarioId: userAuth.id, year, quarter })),
                dispatch(getUsuariosAEvaluarThunk({usuarioId: userAuth.id, year, quarter })),
            ])
            setGettingProfile(false)
        }

        (userAuth) && fetchData()
    }, [userAuth, year, quarter])
    

    const handleCancelForm = () => {
        setFormVisible(false)
        dispatch(clearObjetivoThunk())
        dispatch(clearResultadoThunk())
    }

    const { misObjetivos, objetivosCompartidos } = useObjetivo({operativos})

    if(isLoadingRules || gettingProfile) return <Loading dynamic={true}/>

    const handleOpenAdminModal = (usuario: SinglePerfilProps) => {
        setActiveUsuarioReview(usuario)
        setIsAdminModalVisible(true)
    }

    const handleCloseAdminModal = () => {
        setIsAdminModalVisible(false)
    }

    return (
        <>
            <div className="grid 2xl:grid-cols-11 lg:grid-cols-12 md:grid-cols-6 grid-cols-12 gap-5">
                <Box className='2xl:col-span-2 xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12 w-full px-5 text-devarana-graph flex flex-col'>
                    <CardResumen operativos={operativos} isPonderacionVisible={isPonderacionVisible} setPonderacionVisible={setPonderacionVisible} etapa={etapa}/>
                </Box>
                <Box className='2xl:col-span-2 xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12 w-full'>
                    <CardAvance operativos={operativos} periodos={periodos} etapa={etapa}/>
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
                            <CardEquipo title="Mi Equipo" equipo={equipo} color='primary' handleMiEquipo={handleOpenAdminModal} />
                        </SwiperSlide>
                        <SwiperSlide className='rounded-ext'>
                            <CardEquipo title="Colaboradores de Objetivos" equipo={colaboradores} color='secondary'/>
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
                                <CardObjetivo objetivo={operativo} key={index} setFormVisible={setFormVisible} etapa={etapa}/>
                            ))
                        }
                        <h1 className='col-span-12 text-primary font-medium text-[16px]'>Objetivos Compartidos</h1>
                        {
                            objetivosCompartidos && objetivosCompartidos.length > 0 && objetivosCompartidos.map((operativo, index) => (
                                <CardObjetivo objetivo={operativo} key={index} setFormVisible={setFormVisible} etapa={etapa} />
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
                rendimiento.status !== 'ABIERTO' && !etapa.isClosed &&
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
                <Administracion activeUsuario={activeUsuarioReview} isLeader={ true } />
            </Modal>

            <Modal
                // open={true}
                onCancel={() => {}}
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
                {/* <FormCopy objetivoId={'123123'} /> */}
            </Modal>
        </>
    ) 

}
