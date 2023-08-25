import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Image } from "antd";
import { UserDropdown } from "../antd/DropDownUser";
import { SinglePerfilProps } from "@/interfaces";

interface Props {
    equipo: SinglePerfilProps[]
}

export const CardEquipo = ({ equipo }: Props) => {

    const { userAuth } = useAppSelector(state => state.auth)

    const { perfil } = useAppSelector(state => state.profile)


    return ( 
        <>
        <div className='p-5 shadow-ext rounded-ext from-primary to-primary-light bg-gradient-to-tr h-full'>
            <h1 className='font-medium text-white'>Mi Equipo</h1>
            <ul>
                {
                    equipo?.map((item, index) => (
                        <li className='flex items-center my-5 gap-x-5 w-full' key={index}>
                            <Avatar src={<Image src={`${getStorageUrl(item.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                            <p className='font-medium text-white mx-auto'>{item.nombre} {item.apellidoPaterno}</p>
                            <div className='px-2 bg-white rounded'>
                                <p className='text-devarana-blue font-medium'> 93.5% </p>
                            </div>
                        </li>
                    ))
                }
            </ul>                 
        </div>
            
        </>
     );
}
 
