import {  Switch } from 'antd'
 import { AiOutlineLink } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { Badge } from '@/components/ui/Badge'
import Box from '@/components/ui/Box'
import { ProfileInfo } from '@/components/perfil/ProfileInfo'
import { PerfilProps } from '@/interfaces'

interface Props {
    usuarioActivo: PerfilProps
}

export const EditProfile = ({usuarioActivo}:Props) => {

 


    return (
        <div className="animate__animated animate__fadeIn animate__faster">
            <div className="grid grid-cols-12 sm:gap-x-10 gap-y-10">
                <div className="xl:col-span-3 md:col-span-4 col-span-12 relative">
                    <div className="sticky top-0 w-full">
                        <Box className="flex flex-col">
                            <a href="#perfil" className="text-left py-1 my-1 px-2 text-devarana-dark-graph font-medium ">Perfil</a>
                            <a href="#social" className="text-left py-1 my-1 px-2 text-devarana-dark-graph font-medium ">Social</a>
                            <a href="#responsibilidades" className="text-left py-1 my-1 px-2 text-devarana-dark-graph font-medium">Responsabilidades</a>
                            <a href="#notificaciones" className="text-left py-1 my-1 px-2 text-devarana-dark-graph font-medium">Notificaciones</a>
                        </Box>
                    </div>
                    
                </div>
                <div className="xl:col-span-9 md:col-span-8 col-span-12 snap-y">
                    <Box className="mb-5 snap-center pt-8 pb-14" id="perfil">
                        <div className="flex pb-10">
                            <Badge badgeType="secondary">
                                <FaUser/>
                            </Badge>
                            <p className="text-lg font-bold my-auto mx-3 text-devarana-dark-graph">Información de perfil</p>
                        </div>    

                        <div className="grid grid-cols-12 sm:gap-x-10 gap-y-10">
                            <ProfileInfo usuarioActivo={usuarioActivo} />
                        </div>
                    </Box>

                    <Box className="mb-5 snap-center pt-8 pb-14" id="social">
                        <div className="flex py-10">
                            <Badge badgeType="secondary" className="bg-gradient-to-tr from-custom-blue to-custom-blue2">
                                <AiOutlineLink/>
                            </Badge>
                            <p className="text-lg font-bold my-auto mx-3 text-devarana-dark-graph">Social</p>
                        </div>  
                        
                        <div className="">
                            {/* <SocialInfo activeUser={activeUser} /> */}
                        </div> 
                    </Box>
                    <Box className="mb-5 snap-center" id="responsibilidades">
                        <p className="text-lg font-bold my-auto mx-3 text-devarana-dark-graph">Responsabilidades</p>   
                        <div>

                        </div>                     
                    </Box>
                    {/* <Box className="mb-5 snap-center" id="notificaciones">
                        <p className="pb-8 text-lg my-auto mx-3 text-devarana-dark-graph">Notificaciones</p> 
                        <table className="table-auto w-full">
                            <thead>
                                <tr className="text-left">
                                    <th className="text-xl">Activity</th>
                                    <th className="text-xl">Email</th>
                                    <th className="text-xl">Push</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border border-gray-100">
                                    <td className="py-2 px-2">Menciones</td>
                                    <td><Switch defaultChecked className="bg-gray-800" /></td>
                                    <td><Switch /></td>
                                </tr>
                                <tr className="border border-gray-100">
                                    <td className="py-2 px-2">Asignaciones</td>
                                    <td><Switch defaultChecked /></td>
                                    <td><Switch /></td>
                                </tr>
                                <tr className="border border-gray-100">
                                    <td className="py-2 px-2">Por vencer</td>
                                    <td><Switch /></td>
                                    <td><Switch defaultChecked /></td>
                                </tr>
                            
                            </tbody>
                        </table>
                    </Box> */}
                </div>
            </div>
        </div>
    )
}
