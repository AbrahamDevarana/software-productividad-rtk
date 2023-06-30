
import { Link } from 'react-router-dom';
import { Box } from '../../components/ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { FaLeaf, FaMedal, FaTree } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { Avatar, Image } from 'antd';
import { Adn, Amor, Apasionados, Colaborador, Extraordinario, Incluyentes, Innovacion, Triunfador, Lider } from '@/components/svg/devarana';
import { getStorageUrl } from '@/helpers';

import '@/assets/scss/devarana.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import { EffectFade } from 'swiper';
import 'swiper/css';
import "swiper/css/effect-fade";
import getBrokenUser from '@/helpers/getBrokenUser';

export const Devarana: React.FC = () => {

    const usuarios = useAppSelector(state => state.usuarios.usuarios)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsuariosThunk({}))
    }, [])

  return (
    <div className="animate__animated animate__fadeIn animate__faster">
        <div>
            <Box className="h-80 bg-[url('https://devarana-storage.sfo3.cdn.digitaloceanspaces.com/devaranapp/portadas/DEV-FON-2.jpg')] py-20 relative flex items-center justify-center">
                
                <div className='bg-black bg-opacity-50 w-full h-full absolute'>

                </div>
                <div className="flex justify-center z-50 items-end">
                    <p className="pr-4 font-playfair lg:text-7xl sm:text-base text-sm text-white">
                        ¡ Somos... 
                    </p>
                    <div className="lg:h-[48px] h-[30px] overflow-hidden ">
                        <p className="pb-2 text-white listEffect_item font-mulish lg:text-5xl sm:text-base text-sm">creadores !</p>
                        <p className="pb-2 text-white listEffect_item font-mulish lg:text-5xl sm:text-base text-sm">arquitectos !</p>
                        <p className="pb-2 text-white listEffect_item font-mulish lg:text-5xl sm:text-base text-sm">diseñadores de lo extraordinario !</p>
                        {/* <p className="pb-2 text-white listEffect_item font-mulish lg:text-5xl sm:text-base text-sm"></p> */}
                    </div>
                </div>
            </Box>
            <Box className="-my-10 py-2 mx-5 mb-10 glassMorph  overflow-hidden">
                <div className="scroller-container">
                    <div className='scroller'>
                        { 
                            usuarios.map( (item, i) => (
                                <div className="scroller-item" key={i}>
                                        <Link key={i} to={`/perfil/${item.slug}`}>
                                            <Avatar shape='circle' rootClassName='' className="border-devarana-pink border-2 w-16 h-16 mx-3" src={<Image src={`${getStorageUrl(item.foto)}`} preview={false} fallback={getBrokenUser()} />}>{item.iniciales}</Avatar> 
                                        </Link>
                                    </div>
                            ))
                        }
                    </div>
                    <div className='scroller'>
                        { 
                            usuarios.map( (item, i) => (
                                <div className="scroller-item" key={i}>
                                        <Link key={i} to={`/perfil/${item.slug}`}>
                                            <Avatar shape='circle' className="border-devarana-pink border-2 w-16 h-16 mx-3" src={<Image src={`${getStorageUrl(item.foto)}`} preview={false} fallback={getBrokenUser()} />}>{item.iniciales}</Avatar> 
                                        </Link>
                                    </div>
                            ))
                        }
                    </div>
                </div>
            </Box>
        </div>

        <div className="grid grid-cols-12 gap-10">
            <Box className="col-span-12 md:col-span-6 bg-w-logotipo bg-auto bg-no-repeat bg-right">
                <div className="flex">
                    <p className="text-devarana-dark-graph text-xl font-bold pb-5">Logotipo</p>
                </div>
                <p className='text-[16px] font-light text-devarana-graph'>
                    Buscamos crear un entorno de paz y armonía, es por ello la selección del nombre de nuestra empresa, que significa <span className='text-devarana-dark-graph font-bold'>“JARDÍN CELESTIAL”</span> o <span className='text-devarana-dark-graph font-bold'>“EDÉN”</span> en el antiguo idioma sánscrito.
                </p>
                
            </Box>
            <Box className="col-span-12 md:col-span-6 bg-w-isotipo bg-no-repeat bg-right">
                <div className="flex">
                    <p className="text-devarana-dark-graph text-xl font-bold pb-5">Isotipo</p>
                </div>
                <p className='text-[16px] font-light text-devarana-graph'>
                    El isotipo que nos identifica es un ave que representa la fusión de tres especies, conjuntando la cabeza de un gorrión, cola de golondrina y alas de colibrí, que simboliza la diversidad entre nuestros clientes.
                </p>
            </Box>
            <Box className="col-span-6 md:col-span-4 bg-w-proposito bg-no-repeat bg-right">
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Propósito</p>
                <p className="pb-2 text-[16px] font-medium text-devarana-graph">¿Qué hacemos?</p>
                <p className='text-[16px] font-light text-devarana-graph'>Creamos espacios extraordinarios que evocan la alegría y el placer del buen vivir.</p>
            </Box>
            <Box className="col-span-6 md:col-span-4 bg-w-mision bg-no-repeat bg-right"> 
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Misión</p>
                <p className="pb-2 text-[16px] font-medium text-devarana-graph">¿Para qué?</p>
                <p className='text-[16px] font-light text-devarana-graph'>
                    Inspiramos al mundo creando espacios únicos con amor y pasión, cuidando nuestro entorno, la rentabilidad y el bienestar de nuestros clientes.
                </p>
            </Box>
            <Box className="col-span-6 md:col-span-4 bg-w-vision bg-no-repeat bg-right">
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Futuro</p>
                <p className="pb-2 text-[16px] font-medium text-devarana-graph">¿Cómo queremos ser?</p>
                <p className='text-[16px] font-light text-devarana-graph'>Inspiramos al mundo creando espacios únicos con amor y pasión, cuidando nuestro entorno, la rentabilidad y el bienestar de nuestros clientes.</p>
            </Box>
            <Box className="col-span-12 md:col-span-6">
                <p className='text-devarana-dark-graph text-xl font-bold pb-5'>
                    Valores
                </p>
                <p className='pb-2 text-[16px] font-medium text-devarana-graph'>¿Cómo lo hacemos?</p>
                <div className='flex gap-x-6 items-center py-5'>
                    <Extraordinario className='fill-devarana-pink text-3xl' />
                    <div>
                        <h3 className='text-base font-medium text-devarana-pink'>LO EXTRAORDINARIO ES PRIMERO</h3>
                        <p className='text-[16px] font-light text-devarana-graph'>La atención en los detalles, nuestro servicio legendario y esfuerzo por la satisfacción total, son parte de nuestra esencia.</p>
                    </div>
                </div>
                <div className='flex gap-x-6 items-center pb-5'>
                    <div className='text-right'>
                        <h3 className='text-base font-medium text-devarana-pink'>SOMOS APASIONADOS</h3>
                        <p className='text-[16px] font-light text-devarana-graph'>Buscamos nuestra esencia para dedicarnos a lo que amamos y hacer nuestro trabajo siempre con pasión. ¡Nos levantamos cada día con entusiasmo para enfrentar los retos que encontramos en nuestro camino!</p>
                    </div>
                    <Apasionados className='fill-devarana-pink text-3xl' />
                </div>
               
                <div className='flex gap-x-6 items-center py-5'>
                    <Adn className='fill-devarana-pink text-3xl' />
                    <div>
                        <h3 className='text-base font-medium text-devarana-pink'>LA EXCELENCIA ESTÁ EN NUESTRO ADN</h3>
                        <p className='text-[16px] font-light text-devarana-graph'>Buscamos la excelencia en todo lo que hacemos y damos todos los días lo mejor de nosotros mismos para vivir plenamente y sentirnos felices.</p>
                    </div>
                </div>
                <div className='flex gap-x-6 items-center pb-5'>
                    <div className='text-right'>
                        <h3 className='text-base font-medium text-devarana-pink'>SOMOS INCLUYENTES</h3>
                        <p className='text-[16px] font-light text-devarana-graph'>Vamos más allá de la tolerancia y hacemos siempre un esfuerzo por incluir a todos. El respeto a la diversidad nos hace una empresa incluyente.</p>
                    </div>
                    <Incluyentes className='fill-devarana-pink text-3xl' />
                </div>
               
                <div className='flex gap-x-6 items-center py-5'>
                    <Innovacion className='fill-devarana-pink text-3xl' />
                    <div>
                        <h3 className='text-base font-medium text-devarana-pink'>LA INNOVACIÓN NOS DISTINGUE</h3>
                        <p className='text-[16px] font-light text-devarana-graph'>¡Creemos firmemente en la constante innovación! Nos ilusionan los retos y buscamos siempre estar a la vanguardia.</p>
                    </div>
                </div>
                <div className='flex gap-x-6 items-center pb-5'>
                    <div className='text-right'>
                        <h3 className='text-base font-medium text-devarana-pink'>INSPIRAMOS CON AMOR</h3>
                        <p className='text-[16px] font-light text-devarana-graph'>El amor verdadero es preeminente en esta vida y nos motiva a hacer el bien en todo lo que emprendemos. Con nuestras acciones tratamos de hacer de este mundo un lugar mejor.</p>
                    </div>
                    <Amor className='fill-devarana-pink text-3xl' />
                </div>
               
                <div className='flex gap-x-6 items-center py-5'>
                    <Triunfador className='fill-devarana-pink text-3xl' />
                    <div>
                        <h3 className='text-base font-medium text-devarana-pink'>ESPÍRITU TRIUNFADOR</h3>
                        <p className='text-[16px] font-light text-devarana-graph'>¡Somos optimistas, nos enfocamos en lo positivo y ante cualquier situación nos acompaña nuestro espíritu triunfador!</p>
                    </div>
                </div>
            </Box>
            <Box className="col-span-12 md:col-span-6">
                <p className='text-devarana-dark-graph text-xl font-bold pb-5'>
                    Competencias
                </p>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    effect='fade'
                    modules={[EffectFade]}
                    autoplay={{
                        delay: 5000,
                    }}
                    loop={true}
                >
                    <SwiperSlide className='bg-white'>
                        <Lider />
                    </SwiperSlide>
                    <SwiperSlide className='bg-white'>
                        <Colaborador />
                    </SwiperSlide>
                </Swiper>

            </Box>
            <Box className="col-span-12 bg-w-legendario bg-no-repeat bg-right">
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Política de Responsabilidad</p>
                <p className='text-[16px] font-light text-devarana-graph pb-10'>
                    En DEVARANA como creadores, diseñadores y arquitectos de lo extrordinario nos comprometemos a implementar y mantener un Sistema Integral de gestión que abarque aspectos de calidad, el cuidado del medio ambiente, la salud y la seguridad ocupacional así como la responsabilidad social. Nuestro principal objetivo es ofrecer desarrollos inmobiliarios del más alto nivel y asegurar la satisfacción de nuestros colaboradores, clientes y demás partes interesadas. Esta política se basa en los siguientes principios:
                </p>
            </Box>
        </div>

        <div className='grid grid-cols-12 gap-10 pt-5'>
            <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-salmon transition-all duration-500 ease-in-out group-hover:transform group-hover:scale-105 group-hover:opacity-0">  
                    <FaLeaf className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Medio Ambiente</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <p className='text-devarana-graph text-[16px] font-light'>
                        Nuestro propósito es alcanzar la excelencia en el diseño, construcción y comercialización de desarrollos inmobiliarios premium, cumpliendo con los más altos estándares de calidad, superando las expectativas de nuestros clientes y manteniendo un enfoque de mejora continua
                    </p>
                </div>
            </Box>
            <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-pink transition-all duration-500 ease-in-out group-hover:transform group-hover:scale-105 group-hover:opacity-0">  
                    <FaMedal className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Calidad</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <p className='text-devarana-graph text-[16px] font-light'>
                        Nos comprometemos a minimizar el impacto ambiental promoviendo prácticas sostenibles en el diseño, construcción y operación de los proyectos.
                    </p>
                </div>
            </Box>
            <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-babyblue transition-all duration-500 ease-in-out group-hover:transform group-hover:scale-105 group-hover:opacity-0">
                    <FaTree className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Bienestar</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <p className='text-devarana-graph text-[16px] font-light'>
                        Velamos por la seguridad y bienestar de nuestros colaboradores brindando un entorno laboral seguro y promoviendo la cultura de prevención.
                    </p>
                    <p className='text-devarana-graph text-[16px] font-light'>
                     Cumplimos con las regulaciones y normativas en materia de seguridad y salud ocupacional.
                    </p>
                </div>
            </Box>
            {/* <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-blue transition-all duration-500 ease-in-out group-hover:transform group-hover:scale-105 group-hover:opacity-0">
                    <BiWorld className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Seguridad</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <p className='text-devarana-graph text-[16px] font-light'>
                    Fomentamos el desarrollo personal y profesional de nuestros colaboradores, brindándoles oportunidades de crecimiento, capacitación continua y reconocimiento por su desempeño.
                    </p>
                </div>
            </Box> */}
            <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-blue transition-all duration-500 ease-in-out 
                    group-hover:transform group-hover:scale-50 group-hover:translate-x-1/2">
                    <BiWorld className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Seguridad</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out overflow-x-visible group-hover:overflow-y-auto group-hover:w-3/4'>
                    <p className='text-devarana-graph text-[16px] font-light'>
                        Fomentamos el desarrollo personal y profesional de nuestros colaboradores, brindándoles oportunidades de crecimiento, capacitación continua y reconocimiento por su desempeño.
                    </p>
                </div>
            </Box>
        </div>
    </div>
  )
}
