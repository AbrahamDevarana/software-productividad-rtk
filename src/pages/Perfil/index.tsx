import { useEffect, useState } from "react";
import { fetchProfileThunk } from "@/redux/features/profile/profileThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Actividad from "./actividad";
import ProfileHeader from "./profileHeader";
import Profile from "./profile";
import { EditProfile } from "./editProfile";
import Loading from "@/components/antd/Loading";


const Perfil: React.FC = () => {
    const dispatch = useAppDispatch();
    
    const [value, setValue] = useState('Perfil');
    const { userAuth } = useAppSelector(state => state.auth)
    const { usuario, isLoading } = useAppSelector(state => state.profile)

    useEffect(() => {
        if(userAuth){   
            dispatch(fetchProfileThunk(userAuth.id))
        }
    }, [userAuth])    
    
    
    if(isLoading) return <Loading />

    return ( 
        <div className="animate__animated animate__fadeIn animate__faster">
            <ProfileHeader activeUser={ usuario } value={value} setValue={setValue}  />
            { value === 'Perfil' ?
                <Profile activeUser={ usuario } /> 
                :
                value === 'Actividad' ?
                <Actividad />
                :
                value === 'Configuración' ? 
                <EditProfile activeUser={ usuario } /> : null 
            }
        </div>
    );
}
 
export default Perfil;