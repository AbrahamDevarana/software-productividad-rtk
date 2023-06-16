import { AiOutlineLink } from 'react-icons/ai'
import { FaTasks, FaUser} from 'react-icons/fa'
import { Badge } from '@/components/ui/Badge'
import Box from '@/components/ui/Box'
import { FormPerfil } from '@/components/perfil/FormPerfil'
import { PerfilProps } from '@/interfaces'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateProfileThunk } from '@/redux/features/profile/profileThunk'
import { useAppDispatch } from '@/redux/hooks'
import { useState } from 'react'
import { Button } from '@/components/ui'
import { SocialInfo } from '@/components/perfil/SocialInfo'
import { HiIdentification } from 'react-icons/hi'
import { FotoPerfil } from '@/components/perfil/FotoPerfil'

interface Props {
    usuarioActivo: PerfilProps
    visitante?: boolean
}

export const EditarPerfil = ({usuarioActivo, visitante}:Props) => {

    const dispatch = useAppDispatch();
    const [responsabilidad, setResponsabilidad] = useState(usuarioActivo.responsabilidades)

    const handleChange = (value: string) => {
        setResponsabilidad(value)
    }

    const handleonSubmit = () => {
        const query = {
            ...usuarioActivo,
            responsabilidades: responsabilidad
        }
        dispatch(updateProfileThunk(query))
    }


    return (

        <div className="grid grid-cols-12 sm:gap-x-10 gap-10 relative">
            <div className="xl:col-span-3 md:col-span-4 col-span-12 sticky top-[500px]">
                <Box className="mb-5 snap-center py-10">
                    <div className="flex pb-10">
                        <Badge badgeType="info">
                            <FaUser />
                        </Badge>
                        <p className="text-lg font-bold my-auto mx-3 text-devarana-dark-graph">Foto Perfil</p>
                    </div>

                    <div className='flex justify-center'>
                        <FotoPerfil usuarioActivo={usuarioActivo} />
                    </div>
                </Box>
            </div>
            <div className="xl:col-span-9 md:col-span-8 col-span-12 grid gap-10">
                <Box className="mb-5 snap-center py-10" id="perfil">
                    <div className="flex pb-10">
                        <Badge badgeType="primary">
                            <HiIdentification />
                        </Badge>
                        <p className="text-lg font-bold my-auto mx-3 text-devarana-dark-graph">Información de perfil</p>
                    </div>    

                    <div className="grid grid-cols-12 sm:gap-x-10 gap-y-10">
                        <FormPerfil usuarioActivo={usuarioActivo} />
                    </div>
                </Box>

                <Box className="mb-5 snap-center py-10" id="social">
                    <div className="flex pb-10">
                        <Badge badgeType="secondary">
                            <AiOutlineLink/>
                        </Badge>
                        <p className="text-lg font-bold my-auto mx-3 text-devarana-dark-graph">Social</p>
                    </div>  
                    <SocialInfo usuarioActivo={usuarioActivo} />
                </Box>

                <Box className="mb-5 snap-center" id="responsibilidades">
                    <div className="flex pb-10">
                        <Badge badgeType="primary">
                            <FaTasks />
                        </Badge>
                        <p className="text-lg font-bold my-auto mx-3 text-devarana-dark-graph">Responsabilidades</p>
                    </div>  
                    <ReactQuill
                        theme="snow"
                        value={responsabilidad}
                        onChange={handleChange}
                        scrollingContainer={'.snap-center'}
                        style={{minHeight: '200px', overflowY: 'scroll'}}
                    />
                    <div className='mt-5 flex justify-end'>
                        <Button 
                            classColor='dark' 
                            classType='regular' 
                            width={150} 
                            onClick={handleonSubmit}
                        >Guardar</Button>
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

    )
}
