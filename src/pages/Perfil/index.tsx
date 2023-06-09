import { useEffect, useState } from "react";
import { getProfileThunk } from "@/redux/features/profile/profileThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Actividad from "./actividad";
import Header from "../../components/perfil/Header";
import Profile from "./perfil";
import { EditProfile } from "./editProfile";
import Loading from "@/components/antd/Loading";


const Perfil: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const [ segment, setSegment ] = useState('Perfil');
    const { userAuth } = useAppSelector(state => state.auth)
    const { perfil } = useAppSelector(state => state.profile)

    useEffect(() => {
        if(userAuth){   
            dispatch(getProfileThunk(userAuth.id))
        }
    }, [userAuth])    
    


    return ( 
        <div className="animate__animated animate__fadeIn animate__faster">
            <Header usuarioActivo={ perfil } segment={segment} setSegment={setSegment}  />
            { segment === 'Perfil' ?
                <Profile usuarioActivo={ perfil } /> 
                :
                segment === 'Actividad' ?
                <Actividad />
                :
                segment === 'Configuración' ? 
                <EditProfile usuarioActivo={ perfil } /> : null 
            }
        </div>
    );
}
 
export default Perfil;