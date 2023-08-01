import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, Image } from "antd";
import { useEffect } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";

const CardEquipo = () => {

    const { userAuth } = useAppSelector(state => state.auth)


    useEffect(() => {
        // Obtener Equipo
    }, [])

    

    return ( 
        <div className='w-[25%] p-5 shadow-ext rounded-ext from-primary to-primary-light bg-gradient-to-tr'>
            <h1 className='text-white'>Mi Equipo</h1>
            <ul>
                <li className='flex items-center my-5 gap-x-5 w-full'>
                    <Avatar src={<Image src={`${getStorageUrl(userAuth.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                    <p className='font-medium text-white mx-auto'>{userAuth.nombre}</p>
                    <div className='px-2 bg-white rounded'>
                        <p className='text-devarana-blue font-medium'> 93.5% </p>
                    </div>
                    <div className='rounded'>
                        <AiOutlineEllipsis className='text-white text-2xl' />
                    </div>
                </li>
                <li className='flex items-center my-5 gap-x-5 w-full'>
                    <Avatar src={<Image src={`${getStorageUrl(userAuth.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                    <p className='font-medium text-white mx-auto'>{userAuth.nombre}</p>
                    <div className='px-2 bg-white rounded'>
                        <p className='text-devarana-blue font-medium'> 93.5% </p>
                    </div>
                    <div className='rounded'>
                        <AiOutlineEllipsis className='text-white text-2xl' />
                    </div>
                </li>
            </ul>                 
        </div>
     );
}
 
export default CardEquipo;