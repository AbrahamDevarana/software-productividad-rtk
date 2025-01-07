
import { Link } from 'react-router-dom';
import { Box } from '../../components/ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect} from 'react';
import { getUsuariosThunk } from '@/redux/features/usuarios/usuariosThunks';
import { FaLeaf, FaMedal } from 'react-icons/fa';
import { PiFlowerLotusDuotone } from 'react-icons/pi';
import { RiMentalHealthLine } from 'react-icons/ri';
import { Avatar, Collapse, Image } from 'antd';
import { Adn, Amor, Apasionados, Extraordinario, Incluyentes, Innovacion, Triunfador } from '@/components/svg/devarana';
import { getStorageUrl } from '@/helpers';

import '@/assets/scss/devarana.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper';
import 'swiper/css';
import "swiper/css/effect-fade";
import 'swiper/css/navigation';
import getBrokenUser from '@/helpers/getBrokenUser';

export const Devarana: React.FC = () => {

    const usuarios = useAppSelector(state => state.usuarios.usuarios)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsuariosThunk({ filtros: {status : 'ACTIVO'}}))
    }, [])




  return (
    <div className="animate__animated animate__fadeIn animate__faster">
        <div>
            <Box className="h-80 bg-[url('https://devarana-storage.sfo3.cdn.digitaloceanspaces.com/devaranapp/portadas/DEV-FON-2.jpg')] py-20 relative flex items-center justify-center">
                
                <div className='bg-black bg-opacity-50 w-full h-full absolute rounded-ext'>

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

        <div className="grid grid-cols-12 md:gap-10 gap-y-10">
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
            <Box className="col-span-12 md:col-span-4 bg-w-proposito bg-no-repeat bg-right">
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Propósito</p>
                <p className="pb-2 text-[16px] font-medium text-devarana-graph">¿Qué hacemos?</p>
                <p className='text-[16px] font-light text-devarana-graph'>Creamos espacios extraordinarios que evocan la alegría y el placer del buen vivir.</p>
            </Box>
            <Box className="col-span-12 md:col-span-4 bg-w-mision bg-no-repeat bg-right"> 
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Misión</p>
                <p className="pb-2 text-[16px] font-medium text-devarana-graph">¿Para qué?</p>
                <p className='text-[16px] font-light text-devarana-graph'>
                    Inspiramos al mundo creando espacios únicos con amor y pasión, cuidando nuestro entorno, la rentabilidad y el bienestar de nuestros clientes.
                </p>
            </Box>
            <Box className="col-span-12 md:col-span-4 bg-w-vision bg-no-repeat bg-right">
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Futuro</p>
                <p className="pb-2 text-[16px] font-medium text-devarana-graph">¿Cómo queremos ser?</p>
                <p className='text-[16px] font-light text-devarana-graph'>Inspiramos al mundo creando espacios únicos con amor y pasión, cuidando nuestro entorno, la rentabilidad y el bienestar de nuestros clientes.</p>
            </Box>
            <Box className="col-span-12 md:col-span-6">
                <p className='text-devarana-dark-graph text-xl font-bold pb-5'>
                    Valores
                </p>
                <p className='pb-2 text-[16px] font-medium text-devarana-graph'>¿Cómo lo hacemos?</p>
                <Collapse 
                    ghost
                    defaultActiveKey={['extraordinario']}
                    accordion
                    expandIconPosition='right'
                    items={[
                        {
                        key: 'extraordinario',
                        label: (
                        <div className='flex gap-x-2 items-center'>
                            <Extraordinario className='fill-devarana-pink w-10' />
                            <h3 className='text-base font-bold text-devarana-pink font-mulish'>LO EXTRAORDINARIO ES PRIMERO</h3>
                        </div>),
                        children: (
                            <div className='flex gap-x-6 items-center'>
                                <p className='text-[15px] font-light text-devarana-graph'>La atención en los detalles, nuestro servicio legendario y esfuerzo por la satisfacción total, son parte de nuestra esencia.</p>
                            </div>
                        )
                        },
                        {
                        key: 'apasionados',
                        label: (
                            <div className='flex gap-x-2 items-center'>
                                <Apasionados className='fill-devarana-pink w-10' />
                                <h3 className='text-base font-bold text-devarana-pink font-mulish'>SOMOS APASIONADOS</h3>
                            </div>
                        ),
                        children: (
                            <div className='flex gap-x-6 items-center'>
                                <p className='text-[15px] font-light text-devarana-graph'>Buscamos nuestra esencia para dedicarnos a lo que amamos y hacer nuestro trabajo siempre con pasión. ¡Nos levantamos cada día con entusiasmo para enfrentar los retos que encontramos en nuestro camino!</p>
                            </div>
                        )
                        },
                        {
                        key: 'adn',
                        label: (
                            <div className='flex gap-x-2 items-center'>
                                <Adn className='fill-devarana-pink w-10' />
                                <h3 className='text-base font-bold text-devarana-pink font-mulish'>LA EXCELENCIA ESTÁ EN NUESTRO ADN</h3>
                            </div>
                        ),
                        children: (
                            <div className='flex gap-x-6 items-center'>
                                <p className='text-[15px] font-light text-devarana-graph'>Buscamos la excelencia en todo lo que hacemos y damos todos los días lo mejor de nosotros mismos para vivir plenamente y sentirnos felices.</p>
                            </div>
                        )
                        },
                        {
                        key: 'incluyentes',
                        label: (
                            <div className='flex gap-x-2 items-center'>
                                <Incluyentes className='fill-devarana-pink w-10' />
                                <h3 className='text-base font-bold text-devarana-pink font-mulish'>SOMOS INCLUYENTES</h3>
                            </div>
                            
                        ),
                        children: (
                            <div className='flex gap-x-6 items-center'>
                                <p className='text-[15px] font-light text-devarana-graph'>Vamos más allá de la tolerancia y hacemos siempre un esfuerzo por incluir a todos. El respeto a la diversidad nos hace una empresa incluyente.</p>
                            </div>
                        )
                        },
                        {
                        key: 'innovacion',
                        label: (
                            <div className='flex gap-x-2 items-center'>
                                <Innovacion className='fill-devarana-pink w-10' />
                                <h3 className='text-base font-bold text-devarana-pink font-mulish'>LA INNOVACIÓN NOS DISTINGUE</h3>
                            </div>
                            
                        ),
                        children: (
                            <div className='flex gap-x-6 items-center'>
                                <p className='text-[15px] font-light text-devarana-graph'>¡Creemos firmemente en la constante innovación! Nos ilusionan los retos y buscamos siempre estar a la vanguardia.</p>
                            </div>
                        )
                        },
                        {
                        key: 'amor',
                        label: (
                            <div className='flex gap-x-2 items-center'>
                                <Amor className='fill-devarana-pink w-10' />
                                <h3 className='text-base font-bold text-devarana-pink font-mulish'>INSPIRAMOS CON AMOR</h3>
                            </div>
                            
                        ),
                        children: (
                            <div className='flex gap-x-6 items-center'>
                                <p className='text-[15px] font-light text-devarana-graph'>El amor verdadero es preeminente en esta vida y nos motiva a hacer el bien en todo lo que emprendemos. Con nuestras acciones tratamos de hacer de este mundo un lugar mejor.</p>
                            </div>
                        )
                        },
                        {
                        key: 'triunfador',
                        label: (
                            <div className='flex gap-x-2 items-center'>
                                <Triunfador className='fill-devarana-pink w-10' />
                                <h3 className='text-base font-bold text-devarana-pink font-mulish'>ESPÍRITU TRIUNFADOR</h3>
                            </div>
                            
                        ),
                        children: (
                            <div className='flex gap-x-6 items-center'>
                                <p className='text-[15px] font-light text-devarana-graph'>¡Somos optimistas, nos enfocamos en lo positivo y ante cualquier situación nos acompaña nuestro espíritu triunfador!</p>
                            </div>
                        )
                        }
                    ]}
                />
            </Box>
            {/* <Box className="col-span-12 md:col-span-6 relative">
                <p className='text-devarana-dark-graph text-xl font-bold pb-5'>
                    Competencias
                </p>
                <div className='px-10 grid grid-cols-1 items-center' style={{
                    height: 'calc(100% - 100px)'
                }}>
                    <div className="relative">
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            effect='fade'
                            modules={[EffectFade, Autoplay, Navigation]}
                            autoplay={{
                                delay: 3000,
                            }}
                            loop={true}
                            navigation={true}
                            className='my-auto swiperCompetencias px-10'                    
                            draggable={false}
                        >
                            <SwiperSlide className='bg-white'>
                                <Image src={`https://devarana-storage.sfo3.cdn.digitaloceanspaces.com/devaranapp/devarana-perfil/CompetenciasLider.png`} preview={false} />
                            </SwiperSlide>
                            <SwiperSlide className='bg-white'>
                                <Image src={`https://devarana-storage.sfo3.cdn.digitaloceanspaces.com/devaranapp/devarana-perfil/CompetenciasColaborador.png`} preview={false} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>

            </Box> */}
            <Box className="col-span-12 md:col-span-6 relative p-0 flex items-center"> 
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    effect='fade'
                    modules={[EffectFade, Autoplay, Navigation]}
                    autoplay={{
                        delay: 3000,
                    }}
                    loop={true}
                    navigation={true}
                    className='my-auto swiperCompetencias'                    
                    draggable={false}
                >
                    <SwiperSlide className='bg-white flex'>
                        {/* Bg 50% azul de fondo detras de image*/}
                        <div className='absolute w-1/2 right-0 top-0 bottom-0 bg-devarana-babyblue -z-10 rounded-ext'></div>
                        <div className='rotate-90 absolute top-1/2 -right-36 z-10 transform -translate-y-1/2'>
                            <div className='flex items-center align-top gap-x-5'>
                                <p className='text-devarana-dark-graph text-xl uppercase'>Competencias Líder</p>
                                <div className='w-32 h-1 bg-devarana-blue'></div>
                            </div>
                        </div>
                        <div className='mx-auto'>
                            <Image src={`https://devarana-storage.sfo3.cdn.digitaloceanspaces.com/devaranapp/devarana-perfil/CompetenciasLider.png`} preview={false}/>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='bg-white flex'>
                        <div className='absolute w-1/2 left-0 top-0 bottom-0 bg-devarana-salmon -z-10 rounded-ext'></div>
                        <div className='rotate-90 absolute top-1/2 -left-44 z-10 transform -translate-y-1/2'>
                            <div className='flex items-center align-top gap-x-5'>
                                <p className='text-devarana-dark-graph text-xl uppercase'>Competencias Colaborador</p>
                                <div className='w-32 h-1 bg-devarana-pink'></div>
                            </div>
                        </div>
                        <div className='mx-auto'>
                            <Image src={`https://devarana-storage.sfo3.cdn.digitaloceanspaces.com/devaranapp/devarana-perfil/CompetenciasColaborador.png`} preview={false} />
                        </div>
                    </SwiperSlide>
                </Swiper>

            </Box>
            <Box className="col-span-12 bg-w-legendario bg-no-repeat bg-right">
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Política de Responsabilidad</p>
                <p className='text-[16px] font-light text-devarana-graph pb-1'>
                    En DEVARANA como creadores, diseñadores y arquitectos de lo extrordinario nos comprometemos a implementar y mantener un Sistema Integral de Gestión que abarque aspectos de Calidad, el Cuidado del Medio Ambiente, Responsabilidad Social, Salud y la Seguridad Ocupacional. Nuestro principal objetivo es ofrecer desarrollos inmobiliarios del más alto nivel y asegurar la satisfacción de nuestros colaboradores, clientes y demás partes interesadas. 
                </p>
                <p className='text-[16px] font-light text-devarana-graph pb-10'>
                    Esta política se basa en los siguientes principios y estará disponible para todas las partes interesadas y será comunicada y entendida dentro de la organización. Revisaremos periódicamente nuestro Sistema Integral de Gestión para garantizar su efectividad y su alineación con los cambios en las necesidades y expectativas de nuestros clientes, la legislación aplicable y los avances en las mejores prácticas en nuestro sector.
                </p>
            </Box>
        </div>

        <div className='grid grid-cols-12 md:gap-10 gap-y-10 pt-5'>
            <Box className="col-span-12 md:col-span-3 relative group h-[250px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-pink transition-all duration-500 ease-in-out group-hover:transform group-hover:scale-105 group-hover:opacity-0">  
                    <FaMedal className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Calidad</p>
                </div>
                <div className='absolute py-5 pl-9 pr-3 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <ul className='list-outside list-disc'>
                        <li className='text-devarana-graph text-[16px] font-light pb-2'>
                            Mantenemos un enfoque constante en la mejora continua de los procesos, buscando un alto nivel en el diseño, construcción y atención a clientes. 
                        </li>
                        <li className='text-devarana-graph text-[16px] font-light'>
                            Nuestra meta es  alcanzar la excelencia en cada etapa de nuestros desarrollos, cumpliendo rigurosamente con los más altos estándares de calidad, superando las expectativas de nuestros clientes y socios de negocios. 
                        </li>
                    </ul>
                </div>
            </Box>
            <Box className="col-span-12 md:col-span-3 relative group h-[250px] overflow-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-blue transition-all duration-500 ease-in-out group-hover:transform group-hover:scale-105 group-hover:opacity-0">  
                    <FaLeaf className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Responsabilidad Social</p>
                </div>
                <div className='absolute py-5 pl-9 pr-3 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <ul className='list-outside list-disc'>
                        <li className='text-devarana-graph text-[16px] font-light pb-2'>
                            Nuestro compromiso es reducir al mínimo el impacto ambiental mediante la promoción de prácticas sostenibles en todas las etapas de los proyectos. 
                        </li>
                        <li className='text-devarana-graph text-[16px] font-light'>
                            Prometemos llevar a cabo nuestras actividades de manera ética y responsable, promoviendo la diversidad, la inclusión y generando un impacto positivo en nuestro entorno.
                        </li>
                    </ul>
                </div>
            </Box>
            <Box className="col-span-12 md:col-span-3 relative group h-[250px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-salmon transition-all duration-500 ease-in-out group-hover:transform group-hover:scale-105 group-hover:opacity-0">
                    <RiMentalHealthLine className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Seguridad y Salud Ocupacional</p>
                </div>
                <div className='absolute py-5 pl-9 pr-3 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <ul className='list-outside list-disc'>
                        <li className='text-devarana-graph text-[16px] font-light pb-2'>
                            Cumplimos en todo momento con las regulaciones y normativas en materia de seguridad y salud ocupacional. 
                        </li>
                        <li className='text-devarana-graph text-[16px] font-light'>
                            Velamos por la seguridad y bienestar de nuestros colaboradores brindando un entorno laboral seguro y promoviendo la cultura de prevención
                        </li>
                    </ul>
                </div>
            </Box>
            <Box className="col-span-12 md:col-span-3 relative group h-[250px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-babyblue transition-all duration-500 ease-in-out group-hover:transform group-hover:scale-105 group-hover:opacity-0">
                    <PiFlowerLotusDuotone className='text-2xl'/>
                    <p className="text-[16px] font-light text-white">Bienestar</p>
                </div>
                <div className='absolute py-5 pl-9 pr-3 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <ul className='list-outside list-disc'>
                        <li className='text-devarana-graph text-[16px] font-light pb-2'>
                            Valoramos a nuestros colaboradores como el recurso más importante de la organización por lo que buscamos crear un entorno laboral saludable, respetuoso y motivador.
                        </li>
                        <li className='text-devarana-graph text-[16px] font-light'>
                            Fomentamos el bienestar y la productividad de nuestro capital humano, brindando oportunidades de crecimiento, capacitación continua y reconocimiento por su desempeño.
                        </li>
                    </ul>
                </div>
            </Box>
            
        </div>
    </div>
  )
}
