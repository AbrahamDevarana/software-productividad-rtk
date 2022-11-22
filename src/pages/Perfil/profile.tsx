import { AiFillFacebook, AiFillInstagram, AiFillLinkedin, AiFillTwitterSquare } from "react-icons/ai";
import { BiTargetLock } from "react-icons/bi";
import { ImStatsBars2 } from 'react-icons/im'
import {   GiPodiumWinner } from 'react-icons/gi'
import Box from "../../components/ui/Box";
import moment from "moment";
import { Button } from "../../components/ui/Button";
import AvatarProfile from "../../components/ui/Avatar";
import { FaProjectDiagram } from "react-icons/fa";
import { Badge } from "../../components/ui/Badge";
import { ProfileProps } from "../../interfaces";



const Profile = ({selectedUser}: any) => {

    return ( 
    <div className="animate__animated animate__fadeIn animate__faster">
     <div className="grid grid-cols-4 gap-10 pt-10">
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
            <div className="flex sm:justify-between justify-center flex-wrap">
                <Badge badgeType="secondary" className="-mt-10">
                    <ImStatsBars2/>
                </Badge>
                <div className="sm:text-right text-center sm:py-0 pt-">
                    <p className="text-custom-dark2 font-light">Progreso General</p>
                    <h1 className="text-2xl text-custom-dark">15 %</h1>
                </div>
            </div>
            {/* <div className="divider-2"></div>
            <p className="font-light sm:text-left text-center"> No sé que poner aquí </p> */}
            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex sm:justify-between justify-center flex-wrap">
                    <Badge className="-mt-10" badgeType="pink">
                        <BiTargetLock/>
                    </Badge>
                    <div className="sm:text-right text-center sm:py-0 pt-">
                        <p className="text-custom-dark2 font-light">Objetivos</p>
                        <h1 className="text-2xl text-custom-dark">5</h1>
                    </div>
                </div>
            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex sm:justify-between justify-center flex-wrap">
                    <Badge className="-mt-10" badgeType="orange">
                        <GiPodiumWinner/>
                    </Badge>
                        <div className="sm:text-right text-center sm:py-0 pt-">
                            <p className="text-custom-dark2 font-light">Resultados Claves</p>
                            <h1 className="text-2xl text-custom-dark">14</h1>
                        </div>
                </div>
                {/* <div className="divider-2"></div>
                <p className="font-light sm:text-left text-center"> No sé que poner aquí </p> */}
            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex sm:justify-between justify-center flex-wrap">
                    <Badge className="-mt-10" badgeType="primary">
                        <FaProjectDiagram/>
                    </Badge>
                    <div className="sm:text-right text-center sm:py-0 pt-4">
                        <p className=" font-light text-custom-dark2">Proyectos</p>
                        <h1 className="text-2xl text-custom-dark">45</h1>
                    </div>
                </div>
                {/* <div className="divider-2"></div>
                <p className="font-light sm:text-left text-center"> No sé que poner aquí </p> */}
            </Box>
        </div>

        <div className="grid grid-cols-3 gap-10 pt-10">
            <Box className="xl:col-span-1 col-span-3">
                <h1 className="py-2 text-2xl">Sobre Mí</h1>

                <div className="py-4 font-light">
                    <p>
                        { selectedUser.profile_description }
                    </p>
                </div>
                <div>
                    <p className="font-bold py-2 text-custom-dark2">
                        Nombre: 
                        <span className="font-light"> {`${selectedUser.name} ${selectedUser.lastName} ${selectedUser.secondLastName} ` } </span>
                    </p>
                </div>
                <div>
                    <p className="font-bold py-2 text-custom-dark2">
                        Teléfono: 
                        <span className="font-light"> {selectedUser.phone  } </span>
                    </p>
                </div>
                <div>
                    <p className="font-bold py-2 text-custom-dark2">Email: 
                    <span className="font-light"> {selectedUser.email } </span></p>
                </div>
                <div>
                    <p className="font-bold py-2 text-custom-dark2">
                        Fecha de Ingreso: 
                        <span className="font-light"> { selectedUser.admission_date ? moment(selectedUser.admission_date).format("LL") : 'No se ha asignado fecha' } </span>
                    </p>
                </div>
                <div>
                    <p className="font-bold py-2 text-custom-dark2 flex">Social: </p>
                    <div className="flex px-2">
                        { selectedUser.social_linkedin? <AiFillLinkedin className="text-2xl" /> : null }
                        { selectedUser.social_facebook? < AiFillFacebook className="text-2xl" /> : null }
                        { selectedUser.social_instagram? <AiFillInstagram className="text-2xl"  /> : null }
                        { selectedUser.social_twitter? <AiFillTwitterSquare className="text-2xl" /> : null  }

                    </div>
                    {/* <span className="font-light"> No registradas </span> */}
                </div>
                <div>
                   <p className="font-bold py-2 text-custom-dark2"> Originario: 
                    <span className="font-light"> Toluca </span></p>
                </div>
            </Box>
            <Box className="xl:col-span-1 col-span-3">
                <h1 className="text-2xl py-2">Responsabilidades</h1>
            </Box>
            <Box className="xl:col-span-1 col-span-3">
                <h1 className="text-2xl py-2">Logros</h1>
            </Box>
        </div>

        <h2 className="py-10 px-2 text-2xl">Objetivos</h2>
        <div className="grid grid-cols-4 gap-10 pt-5">
            <Box className="2xl:col-span-1 lg:col-span-2 col-span-4">
                <div className="p-5 shadow rounded gradient-black flex gap-x-10 -mt-12">
                    <div>
                        {/* <DoughnutChart/> */}
                    </div>
                    <div className="text-white my-auto text-center">
                        <p>3 <span className="font-light text-sm">Resultados Clave</span> </p>
                        <p>18 <span className="font-light text-sm">Tareas</span></p>
                    </div>
                </div>
                <div className="pt-5">
                    <h2 className="py-3">Desarrollo Web</h2>
                    <p className="font-light">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>

                    <div className="py-3 grid grid-cols-2 gap-x-5">
                        <Button btnType="primary-outline"> Ver Proyecto </Button>
                        <div className="flex justify-center my-auto">
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                        </div>
                    </div>
                </div>
            </Box>
            <Box className="2xl:col-span-1 lg:col-span-2 col-span-4">
                <div className="p-5 shadow rounded gradient-black flex gap-x-10 -mt-12">
                    <div>
                        {/* <DoughnutChart/> */}
                    </div>
                    <div className="text-white my-auto text-center">
                        <p>3 <span className="font-light text-sm">Resultados Clave</span> </p>
                        <p>18 <span className="font-light text-sm">Tareas</span></p>
                    </div>
                </div>
                <div className="pt-5">
                    <h2 className="py-3">Desarrollo Web</h2>
                    <p className="font-light">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
                    <div className="py-3 grid grid-cols-2 gap-x-5">
                        <Button btnType="primary-outline"> Ver Proyecto </Button>
                        <div className="flex justify-center my-auto">
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                        </div>
                    </div>
                </div>
            </Box>
            <Box className="2xl:col-span-1 lg:col-span-2 col-span-4">
                <div className="p-5 shadow rounded gradient-black flex gap-x-10 -mt-12">
                    <div>
                        {/* <DoughnutChart/> */}
                    </div>
                    <div className="text-white my-auto text-center">
                        <p>3 <span className="font-light text-sm">Resultados Clave</span> </p>
                        <p>18 <span className="font-light text-sm">Tareas</span></p>
                    </div>
                </div>
                <div className="pt-5">
                    <h2 className="py-3">Desarrollo Web</h2>
                    <p className="font-light">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
                    <div className="py-3 grid grid-cols-2 gap-x-5">
                        <Button btnType="primary-outline"> Ver Proyecto </Button>
                        <div className="flex justify-center my-auto">
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                        </div>
                    </div>
                </div>
            </Box>
            <Box className="2xl:col-span-1 lg:col-span-2 col-span-4">
                <div className="p-5 shadow rounded gradient-black flex gap-x-10 -mt-12">
                    <div>
                        {/* <DoughnutChart/> */}
                    </div>
                    <div className="text-white my-auto text-center">
                        <p>3 <span className="font-light text-sm">Resultados Clave</span> </p>
                        <p>18 <span className="font-light text-sm">Tareas</span></p>
                        
                    </div>
                </div>

                <div className="pt-5">
                    <h2 className="py-3">Desarrollo Web</h2>
                    <p className="font-light">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.</p>
                    <div className="py-3 grid grid-cols-2 gap-x-5">
                        <Button btnType="primary-outline"> Ver Proyecto </Button>
                        <div className="flex justify-center my-auto">
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                            <AvatarProfile className="w-7 h-7 -mx-1"/>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    </div> );
}
 
export default Profile;