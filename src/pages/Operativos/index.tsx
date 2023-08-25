import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearObjetivoThunk, getOperativosThunk } from '@/redux/features/operativo/operativosThunk';
import { clearResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { getColaboradoresThunk, getEquipoThunk, getProfileThunk } from '@/redux/features/perfil/perfilThunk';
import { FormObjetivo, CardAvance, CardDesempeno, CardEquipo, CardObjetivo, CardResumen, FormPonderacion } from '@/components/operativo';
import { useObjetivo } from '@/hooks/useObjetivos';
import { Box, Button } from '@/components/ui';
import {FloatButton, Modal } from 'antd'
import dayjs from 'dayjs';
import Loading from '@/components/antd/Loading';

import { FaPlus } from 'react-icons/fa';

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { PiStrategyBold } from 'react-icons/pi';
import { getUsuariosByDepartamentoThunk } from '@/redux/features/departamentos/departamentosThunks';

export const Objetivos : React.FC = () => {

    const dispatch = useAppDispatch()    

    const { operativos, isLoading } = useAppSelector(state => state.operativos)
    const { userAuth } = useAppSelector(state => state.auth)
    const { perfil } = useAppSelector(state => state.profile)
    const [ year, setYear] = useState(dayjs().year())
    const [ quarter, setQuarter ] = useState(dayjs().quarter())
    const [ isFormVisible, setFormVisible ] = useState(false)
    const [ isPonderacionVisible, setPonderacionVisible ] = useState(false)

    const [ gettingProfile, setGettingProfile ] = useState(false)
    
    
    const {id} = useParams<{id: string}>()

        const handleDateChange = (date: any, dateString: string) => {
        setYear(dayjs(date).year())
        setQuarter(dayjs(date).quarter())
    }


    useEffect(() => {

        setGettingProfile(true)

        const fetchData = async () => {

            await dispatch(getProfileThunk(id || userAuth?.id))
            await dispatch(getEquipoThunk(userAuth.id))
            await dispatch(getColaboradoresThunk({year, quarter, usuarioId: id || userAuth?.id}))
            await dispatch(getOperativosThunk({year, quarter, usuarioId: id || userAuth?.id}))

            setGettingProfile(false)
        }

        fetchData()


    }, [userAuth, id, year, quarter])
    

    useEffect(() => {
        // dispatch(getUsuariosByDepartamentoThunk({usuarioId: id || userAuth?.id}))
    }, [])

    const handleCancelForm = () => {
        setFormVisible(false)
        dispatch(clearObjetivoThunk())
        dispatch(clearResultadoThunk())
    }

    const handleCancelPonderacion = () => {
        setPonderacionVisible(false)
    }


    const { misObjetivos, objetivosCompartidos, scoreLeft } = useObjetivo({operativos})

    if(gettingProfile) return <Loading dynamic={true}/>

    return (
        <>
            <div className="flex gap-5">
                <Box className='w-[20%] px-5 text-devarana-graph flex flex-col'>
                    <CardResumen operativos={operativos} handleDateChange={handleDateChange} quarter={quarter} year={year} />
                </Box>
                <Box className='w-[20%] flex justify-center'>
                    <CardAvance operativos={operativos} />
                </Box>
                <Box className='w-[35%] flex justify-center'>
                    <CardDesempeno quarter={quarter} year={year}/>
                </Box>
                <div className='w-[25%] relative'>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className='mySwiper h-[100%] px-5'
                        loop={true}
                    >
                        <SwiperSlide className='rounded-ext'>
                            <CardEquipo equipo={perfil.equipo} />
                        </SwiperSlide>
                        <SwiperSlide className='rounded-ext'>
                            <CardEquipo equipo={perfil.colaboradores}/>
                        </SwiperSlide>

                    </Swiper>
                    {/* Mi Equipo */}
                    {/* // Favoritos */}
                    {/* Circuito de evaluacion */}
                    {/* <CardEquipo equipo={perfil.equipo} /> */}
                </div>
            </div>



            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 py-5 grid grid-cols-12 gap-5'>
                    {
                        isLoading && operativos.length === 0 ? 
                            <div className='col-span-12'>
                                <Loading  />
                            </div>
                        : 

                        <>
                        <div className='col-span-12 flex justify-between'>
                            <h1>Mis Objetivos</h1>
                            <Button width={70} classColor='primary' classType='regular' onClick={() => setPonderacionVisible(true)}>
                                <PiStrategyBold className='text-xl'/>
                            </Button>
                        </div>
                        {
                            misObjetivos && misObjetivos.length > 0 && misObjetivos.map((operativo, index) => (
                                <CardObjetivo objetivo={operativo} key={index} setFormVisible={setFormVisible} year={year} quarter={quarter} />
                            ))
                        }
                        <h1 className='col-span-12'>Objetivos Compartidos</h1>
                        {
                            objetivosCompartidos && objetivosCompartidos.length > 0 && objetivosCompartidos.map((operativo, index) => (
                                <CardObjetivo objetivo={operativo} key={index} setFormVisible={setFormVisible} year={year} quarter={quarter} />
                            ))
                        }
                        </>
                    }
                </div>

                <Box className='col-span-3 row-span-2 my-5'>
                    <h1 className='text-primary font-medium'>Ranking Devarana</h1>
                </Box>
            </div>


            <Modal 
                open={isFormVisible}
                footer={null}
                onCancel={handleCancelForm}
                width={1000}
                closable={false}
                destroyOnClose={true}
            >
                <FormObjetivo year={year} quarter={quarter} scoreLeft={scoreLeft} handleCancel={handleCancelForm} />
            </Modal>
            


            <Modal
                open={isPonderacionVisible}
                footer={null}
                width={1000}
                closable={false}
                destroyOnClose={true}
                onCancel={handleCancelPonderacion}
            >
                <FormPonderacion />
            </Modal>

          
            <FloatButton
                shape="circle"
                icon={<FaPlus />}
                onClick={() => setFormVisible(true)}
            />

            
        </>
    ) 

}
