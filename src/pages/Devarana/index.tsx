
import { Link } from 'react-router-dom';
import { Box } from '../../components/ui';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { FaEye, FaLeaf, FaMedal, FaTree } from 'react-icons/fa';
import { BiWorld } from 'react-icons/bi';
import { Avatar } from 'antd';
import { Adn, Amor, Apasionados, Extraordinario, Incluyentes, Innovacion, Triunfador } from '@/components/svg/devarana';
import { Chart } from '@/components/svg/devarana/Chart';
import { getStorageUrl } from '@/helpers';

import '@/assets/scss/devarana.scss'
import {Swiper, SwiperSlide} from 'swiper/react';
import { EffectFade } from 'swiper';
import 'swiper/css';
import "swiper/css/effect-fade";

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
                        <p className="pb-2 text-white listEffect_item font-mulish lg:text-5xl sm:text-base text-sm">diseñadores !</p>
                        <p className="pb-2 text-white listEffect_item font-mulish lg:text-5xl sm:text-base text-sm">de lo extraordinario !</p>
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
                                            <Avatar shape='circle' rootClassName='' className="border-devarana-pink border-2 w-16 h-16 mx-3" src={`${getStorageUrl('profile-picture/'+ item.foto)}`}>{item.iniciales}</Avatar> 
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
                                            <Avatar shape='circle' className="border-devarana-pink border-2 w-16 h-16 mx-3" src={`${getStorageUrl('profile-picture/'+ item.foto)}`}>{item.iniciales}</Avatar> 
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
                                            <Avatar shape='circle' className="border-devarana-pink border-2 w-16 h-16 mx-3" src={`${getStorageUrl('profile-picture/'+ item.foto)}`}>{item.iniciales}</Avatar> 
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
                                            <Avatar shape='circle' className="border-devarana-pink border-2 w-16 h-16 mx-3" src={`${getStorageUrl('profile-picture/'+ item.foto)}`}>{item.iniciales}</Avatar> 
                                        </Link>
                                    </div>
                            ))
                        }
                    </div>
                </div>
            </Box>
        </div>

        <div className="grid grid-cols-12 gap-5">
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
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    effect='fade'
                    modules={[EffectFade]}
                >
                    <SwiperSlide>
                        <Chart />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Chart />
                    </SwiperSlide>
                </Swiper>

            </Box>
            <Box className="col-span-12 bg-w-legendario bg-no-repeat bg-right">
                <p className="text-devarana-dark-graph text-xl font-bold pb-5">Política de Responsabilidad</p>
                
                <p className='text-[16px] font-light text-devarana-graph pb-5'>
                    En DEVARANA hemos asumido el compromiso de implementar un modelo de Gestión de la Calidad, basado en la norma ISO 9001-2015, que nos proporcione un marco de referencia integral para el establecimiento de objetivos específicos de calidad y con la finalidad de, a través de la mejora continua, conseguir la satisfacción total de nuestros colaboradores, clientes y socios de negocios, convirtiéndonos en un referente en el sector de desarrollo inmobiliario, por los estándares de calidad que empleamos en el servicio que ofrecemos y los productos que desarrollamos.
                </p>
                <p className='text-[16px] font-light text-devarana-graph pb-3'>
                    En un mercado en continua expansión, DEVARANA se mantiene como líder del sector inmobiliario, al tener siempre presente que nuestro éxito es consecuencia de honrar los siguientes principios de calidad:
                </p>

                <ul className='list-disc text-devarana-graph font-light list-inside pl-10 '>
                    <li className='text-[16px]'>Lograr la plena satisfacción de nuestros clientes internos y externos.</li>
                    <li className='text-[16px]'>Conseguir la excelencia empresarial a través de potenciar a nuestro capital humano.</li>
                    <li className='text-[16px]'>Integrar en todo momento a nuestros socios de negocio en el compromiso con la calidad.</li>
                    <li className='text-[16px]'>Mantener un alto nivel de innovación en el desarrollo de nuestros productos.</li>
                    <li className='text-[16px]'>Cumplir la normatividad legal y los requisitos aplicables.</li>
                    <li className='text-[16px]'>Identificar y evaluar todos los riesgos y oportunidades en cada uno de los procesos que contempla nuestro sistema de calidad.</li>
                    <li className='text-[16px]'>Asegurar la integridad y seguridad de nuestro Sistema de Gestión de Calidad.</li>
                </ul>
            </Box>


            
            <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-salmon group-hover:opacity-0 transition-all duration-500 ease-in-out">  
                    <FaLeaf className='text-2xl'/>
                    <p className="font-lg">Medio Ambiente</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <p className='text-devarana-graph'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar odio a leo pulvinar, nec blandit arcu consectetur. Aliquam erat volutpat. Cras fringilla placerat varius. Integer mattis arcu vestibulum lacus tincidunt mollis. Suspendisse nec orci ac lorem molestie accumsan. Nunc rutrum mi eget dolor lobortis fringilla. In fringilla et erat ut fermentum. In lectus arcu, maximus vulputate nisi sit amet, vehicula dapibus est. Praesent pulvinar velit at fermentum pretium.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar odio a leo pulvinar, nec blandit arcu consectetur. Aliquam erat volutpat. Cras fringilla placerat varius. Integer mattis arcu vestibulum lacus tincidunt mollis. Suspendisse nec orci ac lorem molestie accumsan. Nunc rutrum mi eget dolor lobortis fringilla. In fringilla et erat ut fermentum. In lectus arcu, maximus vulputate nisi sit amet, vehicula dapibus est. Praesent pulvinar velit at fermentum pretium.
                    </p>
                </div>
            </Box>
            <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-pink group-hover:opacity-0 transition-all duration-500 ease-in-out">  
                    <FaMedal className='text-2xl'/>
                    <p className="font-lg">Calidad</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <p className='text-devarana-graph'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar odio a leo pulvinar, nec blandit arcu consectetur. Aliquam erat volutpat. Cras fringilla placerat varius. Integer mattis arcu vestibulum lacus tincidunt mollis. Suspendisse nec orci ac lorem molestie accumsan. Nunc rutrum mi eget dolor lobortis fringilla. In fringilla et erat ut fermentum. In lectus arcu, maximus vulputate nisi sit amet, vehicula dapibus est. Praesent pulvinar velit at fermentum pretium.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar odio a leo pulvinar, nec blandit arcu consectetur. Aliquam erat volutpat. Cras fringilla placerat varius. Integer mattis arcu vestibulum lacus tincidunt mollis. Suspendisse nec orci ac lorem molestie accumsan. Nunc rutrum mi eget dolor lobortis fringilla. In fringilla et erat ut fermentum. In lectus arcu, maximus vulputate nisi sit amet, vehicula dapibus est. Praesent pulvinar velit at fermentum pretium.
                    </p>
                </div>
            </Box>
            <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-babyblue group-hover:opacity-0 transition-all duration-500 ease-in-out">
                    <FaTree className='text-2xl'/>
                    <p className="font-lg">Bienestar</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <p className='text-devarana-graph'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar odio a leo pulvinar, nec blandit arcu consectetur. Aliquam erat volutpat. Cras fringilla placerat varius. Integer mattis arcu vestibulum lacus tincidunt mollis. Suspendisse nec orci ac lorem molestie accumsan. Nunc rutrum mi eget dolor lobortis fringilla. In fringilla et erat ut fermentum. In lectus arcu, maximus vulputate nisi sit amet, vehicula dapibus est. Praesent pulvinar velit at fermentum pretium.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar odio a leo pulvinar, nec blandit arcu consectetur. Aliquam erat volutpat. Cras fringilla placerat varius. Integer mattis arcu vestibulum lacus tincidunt mollis. Suspendisse nec orci ac lorem molestie accumsan. Nunc rutrum mi eget dolor lobortis fringilla. In fringilla et erat ut fermentum. In lectus arcu, maximus vulputate nisi sit amet, vehicula dapibus est. Praesent pulvinar velit at fermentum pretium.
                    </p>
                </div>
            </Box>
            <Box className="col-span-6 md:col-span-3 relative group h-[200px] overflow-y-hidden">
                <div className="flex flex-col gap-y-2 h-full justify-center items-center align-middle text-white p-5 rounded-ext bg-devarana-blue group-hover:opacity-0 transition-all duration-500 ease-in-out">
                    <BiWorld className='text-2xl'/>
                    <p className="font-lg">Seguridad</p>
                </div>
                <div className='absolute p-5 inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:overflow-y-auto'>
                    <p className='text-devarana-graph'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar odio a leo pulvinar, nec blandit arcu consectetur. Aliquam erat volutpat. Cras fringilla placerat varius. Integer mattis arcu vestibulum lacus tincidunt mollis. Suspendisse nec orci ac lorem molestie accumsan. Nunc rutrum mi eget dolor lobortis fringilla. In fringilla et erat ut fermentum. In lectus arcu, maximus vulputate nisi sit amet, vehicula dapibus est. Praesent pulvinar velit at fermentum pretium.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar odio a leo pulvinar, nec blandit arcu consectetur. Aliquam erat volutpat. Cras fringilla placerat varius. Integer mattis arcu vestibulum lacus tincidunt mollis. Suspendisse nec orci ac lorem molestie accumsan. Nunc rutrum mi eget dolor lobortis fringilla. In fringilla et erat ut fermentum. In lectus arcu, maximus vulputate nisi sit amet, vehicula dapibus est. Praesent pulvinar velit at fermentum pretium.
                    </p>
                </div>
            </Box>
        </div>
    </div>
  )
}
