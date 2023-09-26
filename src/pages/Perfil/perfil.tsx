import { BiTargetLock } from "react-icons/bi";
import { ImStatsBars2 } from 'react-icons/im'
import { GiPodiumWinner } from 'react-icons/gi'
import Box from "@/components/ui/Box";
import { Button } from "@/components/ui/Button";
import { FaLink, FaProjectDiagram } from "react-icons/fa";
import { Badge } from "@/components/ui/Badge";
import { PerfilProps } from "@/interfaces";
import DOMPurify from "dompurify";

import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Avatar, Tooltip } from "antd";
import { Proximamente } from '@/components/ui';
import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { getOperativosThunk } from "@/redux/features/operativo/operativosThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useObjetivo } from "@/hooks/useObjetivos";
import { Objetivos } from "@/components/perfil/Objetivos";

interface Props {
    usuarioActivo: PerfilProps
    visitante: boolean
}

const Profile = ({usuarioActivo, visitante}: Props) => {

    const { operativos } = useAppSelector(state => state.operativos)
    const { ponderacionObjetivos } = useObjetivo({operativos})

    return ( 
    <div className="animate__animated animate__fadeIn animate__faster">
        <div className="grid grid-cols-4 gap-10 pt-10">
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex justify-between items-center flex-wrap lg:gap-x-0 gap-x-5">
                    <Badge badgeType="dark" className="lg:-mt-10">
                        <ImStatsBars2/>
                    </Badge>
                    <div className="text-right sm:py-0">
                        <p className="text-devarana-dark-graph font-medium text-lg">Avance Trimestral</p>
                        <p className="font-light text-devarana-graph">{ ponderacionObjetivos.toFixed(2) } %</p>
                    </div>
                </div>
            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex justify-between items-center flex-wrap lg:gap-x-0 gap-x-5">
                    <Badge badgeType="secondary" className="lg:-mt-10">
                        <BiTargetLock/>
                    </Badge>
                    <div className="text-right sm:py-0">
                        <p className="text-devarana-dark-graph font-medium text-lg">Objetivos</p>
                        <p className="font-light text-devarana-graph"> {operativos.length } </p>
                    </div>
                </div>
            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex justify-between items-center flex-wrap lg:gap-x-0 gap-x-5">
                    <Badge badgeType="info" className="lg:-mt-10">
                        <GiPodiumWinner/>
                    </Badge>
                        <div className="text-right sm:py-0">
                            <p className="text-devarana-dark-graph font-medium text-lg">Proyectos</p>
                            <p className="font-light text-devarana-graph">{ usuarioActivo.proyectos.length }</p>
                        </div>
                </div>
            </Box>
            <Box className="xl:col-span-1 sm:col-span-2 col-span-4">
                <div className="flex justify-between items-center flex-wrap lg:gap-x-0 gap-x-5">
                    <Badge badgeType="primary" className="lg:-mt-10">
                        <FaProjectDiagram/>
                    </Badge>
                    <div className="text-right sm:py-0">
                        <p className="text-devarana-dark-graph font-medium text-lg">Comités</p>
                        <p className="font-light text-devarana-graph">0</p>
                    </div>
                </div>
            </Box>
        </div>

        <div className="grid grid-cols-3 gap-10 pt-10">
            <Box className="xl:col-span-1 col-span-3">
                <p className="py-2 text-lg font-medium text-devarana-dark-graph">Acerca de mí</p>

                <div className="py-4 font-light">
                    <div className="max-h-[170px] overflow-y-auto">
                        <p className="font-light text-devarana-graph">
                            { usuarioActivo.descripcionPerfil }
                        </p>
                    </div>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph">
                        Nombre: 
                        <span className="font-light text-devarana-graph"> {`${usuarioActivo.nombre} ${usuarioActivo.apellidoPaterno} ${usuarioActivo.apellidoMaterno} ` } </span>
                    </p>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph">
                        Teléfono: 
                        <span className="font-light text-devarana-graph">
                             {
                                    usuarioActivo.telefono && usuarioActivo.telefono.toString()?.length === 10
                                    ? ` ${usuarioActivo.telefono.toString().substring(0,3)}-${usuarioActivo.telefono.toString().substring(3,6)}-${usuarioActivo.telefono.toString().substring(6,10)}`
                                    : usuarioActivo.telefono

                             }
                             
                        </span>
                    </p>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph"> Email: 
                    <span className="font-light text-devarana-graph"> {usuarioActivo.email } </span></p>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph"> Fecha de Ingreso:
                    <span className="font-light text-devarana-graph"> { dayjs( usuarioActivo.fechaIngreso ).format('DD MMMM YYYY') || 'No definida' } </span>  </p>
                </div>
                <div>
                    <p className="font-medium py-2 text-devarana-dark-graph"> Fecha de Nacimiento:
                    <span className="font-light text-devarana-graph"> { dayjs( usuarioActivo.fechaNacimiento ).format('DD MMMM YYYY') || 'No definida' } </span>  </p>
                </div>

                {
                    usuarioActivo.social && (
                        <>
                            <p className="font-medium py-2 text-devarana-dark-graph block"> Redes: </p>
                            <div className="flex gap-2 items-center">
                            {
                                usuarioActivo.social.linkedin?.url && (
                                    <Tooltip title="Linkedin">
                                        <a href={`https://${usuarioActivo.social.linkedin?.url}`} target="_blank" rel="noreferrer">                                    
                                            <AiFillLinkedin className="text-blue-500 w-6 h-5" />
                                        </a>
                                    </Tooltip>
                                )
                            }
                            {
                                usuarioActivo.social.facebook?.url && (
                                    <Tooltip title="Facebook">
                                        <a href={`https://${usuarioActivo.social.facebook?.url}`} target="_blank" rel="noreferrer">
                                            <AiFillFacebook className="text-blue-500 w-6 h-5" />
                                        </a>
                                    </Tooltip>
                                )
                            }
                            {
                                usuarioActivo.social.instagram?.url && (
                                    <Tooltip title="Instagram">
                                        <a href={`https://${usuarioActivo.social.instagram?.url}`} target="_blank" rel="noreferrer">
                                            <AiFillInstagram className="text-blue-500 w-6 h-5" />
                                        </a>
                                    </Tooltip>
                                )                        
                            }
                            {
                                usuarioActivo.social.otros?.url && (
                                    <Tooltip title={usuarioActivo.social.otros.nombre}>
                                        <a href={`https://${usuarioActivo.social.otros?.url}`} target="_blank" rel="noreferrer">
                                            <FaLink className="text-blue-500 w-6 h-4" />
                                        </a>
                                    </Tooltip>
                                )
                            }
                            </div>
                        </>
                    )
                }
            </Box>
            <Box className="xl:col-span-1 col-span-3">
                <p className="text-lg font-medium py-2 text-devarana-dark-graph">Responsabilidades</p>
                <div className="max-h-[385px] overflow-y-auto text-devarana-graph">
                    <div className="richText font-light text-devarana-graph" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(usuarioActivo.responsabilidades)}}>
                    </div>
                </div>
                    
            </Box>
            <Box className="xl:col-span-1 col-span-3 flex flex-col">
                <p className="text-lg font-medium py-2 text-devarana-dark-graph ">Logros</p>
                {/* <Logros /> */}
                <div className="flex h-full items-center">
                    <Proximamente avance={25} size="small" />
                </div>
            </Box>
        </div>

        <h2 className="py-10 px-2 text-lg font-medium">Objetivos</h2>
        <div className="gap-10 py-5 overflow-x-auto w-full flex">
            {
                operativos.map( objetivo => (
                    <Objetivos objetivo={objetivo} key={objetivo.id} visitante={visitante} />
                ))
            }
        </div>
    </div> );
}
 
export default Profile;