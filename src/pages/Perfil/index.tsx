import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetProfileQuery } from "../../redux/features/profile/profileThunk";
import { useAppSelector } from "../../redux/hooks";
import Actividad from "./actividad";
import ProfileHeader from "./header";
import Profile from "./profile";

const Perfil = () => {
    const dispatch = useDispatch()
    
    const [value, setValue] = useState('Perfil');
    const user = useAppSelector(state => state.auth)
    useEffect(() => {
    }, [])
    dispatch(useGetProfileQuery(1))
    // const {selectedUser, isLoading} = useAppSelector(state => state.users.profile)



    return ( 
        <>
            {/* <ProfileHeader selectedUser={ undefined } value={""} setValue={() => {}}  /> */}
            { value === 'Perfil' ?
                <Profile /> 
                :
                value === 'Actividad' ?
                <Actividad />
                : null
                
            
            }
        </>
    );
}
 
export default Perfil;