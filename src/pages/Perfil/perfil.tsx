import { BiTargetLock } from "react-icons/bi";
import { ImStatsBars2 } from 'react-icons/im'
import { GiPodiumWinner } from 'react-icons/gi'
import Box from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import { FaProjectDiagram } from "react-icons/fa";
import { Badge } from "@/components/ui/Badge";
import { PerfilProps } from "@/interfaces";


interface Props {
    usuarioActivo: PerfilProps
}

const Profile = ({usuarioActivo}: Props) => {
    

    return ( 
    <div className="animate__animated animate__fadeIn animate__faster">
        <div className="grid grid-cols-4 gap-10 pt-10">
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
            <div className="flex sm:justify-between justify-center flex-wrap">
                <Badge badgeType="dark" className="-mt-10">
                    <ImStatsBars2/>
                </Badge>
                <div className="sm:text-right text-center sm:py-0 pt-">
                    <p className="text-devarana-dark-graph font-light">Progreso General</p>
                    <h1 className="text-2xl text-devarana-graph">15 %</h1>
                </div>
            </div>

            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex sm:justify-between justify-center flex-wrap">
                    <Badge className="-mt-10" badgeType="secondary">
                        <BiTargetLock/>
                    </Badge>
                    <div className="sm:text-right text-center sm:py-0 pt-">
                        <p className="text-devarana-dark-graph font-light">Objetivos</p>
                        <h1 className="text-2xl text-devarana-graph">0</h1>
                    </div>
                </div>
            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex sm:justify-between justify-center flex-wrap">
                    <Badge className="-mt-10" badgeType="info">
                        <GiPodiumWinner/>
                    </Badge>
                        <div className="sm:text-right text-center sm:py-0 pt-">
                            <p className="text-devarana-dark-graph font-light">Resultados Claves</p>
                            <h1 className="text-2xl text-devarana-graph">0</h1>
                        </div>
                </div>
            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex sm:justify-between justify-center flex-wrap">
                    <Badge className="-mt-10" badgeType="primary">
                        <FaProjectDiagram/>
                    </Badge>
                    <div className="sm:text-right text-center sm:py-0 pt-4">
                        <p className=" font-light text-devarana-dark-graph">Comites</p>
                        <h1 className="text-2xl text-devarana-graph">0</h1>
                    </div>
                </div>
            </Box>
        </div>

        <div className="grid grid-cols-3 gap-10 pt-10">
            <Box className="xl:col-span-1 col-span-3">
                <h1 className="py-2 text-2xl">Sobre Mí</h1>

                <div className="py-4 font-light">
                    <p>
                        { usuarioActivo.descripcionPerfil }
                    </p>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph">
                        Nombre: 
                        <span className="font-light"> {`${usuarioActivo.nombre} ${usuarioActivo.apellidoPaterno} ${usuarioActivo.apellidoMaterno} ` } </span>
                    </p>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph">
                        Teléfono: 
                        <span className="font-light"> {usuarioActivo.telefono  } </span>
                    </p>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph">Email: 
                    <span className="font-light"> {usuarioActivo.email } </span></p>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph">
                        Fecha de Ingreso: 
                        
                    </p>
                </div>
            </Box>
            <Box className="xl:col-span-1 col-span-3">
                <h1 className="text-2xl py-2">Responsabilidades</h1>
            </Box>
            <Box className="xl:col-span-1 col-span-3">
                <h1 className="text-2xl py-2"></h1>
            </Box>
        </div>

        <h2 className="py-10 px-2 text-2xl">Objetivos</h2>
        <div className="grid grid-cols-4 gap-10 pt-5">
            {
                usuarioActivo.objetivosOperativos.map( objetivo => (
                    <Box className="2xl:col-span-1 lg:col-span-2 col-span-4" key={objetivo.id}>
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
                            <h2 className="py-3">{ objetivo.nombre }</h2>
                            <p className="font-light">{objetivo.meta}</p>

                            <div className="py-3 grid grid-cols-2 gap-x-5">
                                <Button classColor="primary" classType='outline'> Ver Objetivo </Button>
                                <div className="flex justify-center my-auto">
                                </div>
                            </div>
                        </div>
                    </Box>
                ))
            }

        </div>
    </div> );
}
 
export default Profile;