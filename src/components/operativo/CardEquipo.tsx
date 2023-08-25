import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Dropdown, Image } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import ModalEvaluacion from "./ModalEvaluacion";
import { getDepartamentoThunk } from "@/redux/features/departamentos/departamentosThunks";
import { UserDropdown } from "../antd/DropDownUser";

export const CardEquipo = () => {

    const { userAuth } = useAppSelector(state => state.auth)


    const dispatch = useAppDispatch()

    useEffect(() => {
        // Obtener Equipo
        // dispatch(getDepartamentoThunk({}))
    }, [])    

    


    return ( 
        <>
        <div className='p-5 shadow-ext rounded-ext from-primary to-primary-light bg-gradient-to-tr h-full'>
            <h1 className='font-medium text-white'>Mi Equipo</h1>
            <ul>
                <li className='flex items-center my-5 gap-x-5 w-full'>
                    <Avatar src={<Image src={`${getStorageUrl(userAuth.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                    <p className='font-medium text-white mx-auto'>{userAuth.nombre}</p>
                    <div className='px-2 bg-white rounded'>
                        <p className='text-devarana-blue font-medium'> 93.5% </p>
                    </div>
                    <div className='rounded'>
                        <UserDropdown userId={userAuth.id} slug={userAuth.iniciales} onClick={()=>{}}/>
                    </div>
                </li>
                <li className='flex items-center my-5 gap-x-5 w-full'>
                    <Avatar src={<Image src={`${getStorageUrl(userAuth.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                    <p className='font-medium text-white mx-auto'>{userAuth.nombre}</p>
                    <div className='px-2 bg-white rounded'>
                        <p className='text-devarana-blue font-medium'> 93.5% </p>
                    </div>
                    <div className='rounded'>
                        <UserDropdown userId={userAuth.id} slug={userAuth.iniciales} onClick={()=>{}} />
                    </div>
                </li>
            </ul>                 
        </div>
            
        </>
     );
}
 
