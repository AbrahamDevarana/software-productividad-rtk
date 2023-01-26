import { useEffect, useState } from "react";
import { fetchProfileThunk } from "../../redux/features/profile/profileThunk";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Actividad from "./actividad";
import ProfileHeader from "./profileHeader";
import Profile from "./profile";
import { EditProfile } from "./editProfile";
import { useNotification } from "../../hooks/useNotification";


const Perfil = () => {
    const dispatch = useAppDispatch();
    
    const [value, setValue] = useState('Perfil');
    const { userAuth } = useAppSelector(state => state.auth)
    const profile = useAppSelector(state => state.profile)

    useEffect(() => {
        if(userAuth){   
            dispatch(fetchProfileThunk(userAuth.id))
        }
    }, [userAuth])


    return ( 
        <div className="animate__animated animate__fadeIn animate__faster">
            <ProfileHeader selectedUser={ profile } value={value} setValue={setValue}  />
            { value === 'Perfil' ?
                <Profile selectedUser={ profile } /> 
                :
                value === 'Actividad' ?
                <Actividad />
                :
                value === 'Configuración' ? 
                <EditProfile selectedUser={ profile } /> : null 
            }
        </div>
    );
}
 
export default Perfil;