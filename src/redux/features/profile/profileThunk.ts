
import { useNotification } from "../../../hooks/useNotification";
import { AppDispatch, RootState } from "../../store";
import { setProfileProvider, updateProfileProvider } from "./profileProvider";
import { checkingProfile, setProfile, setProfileError, updateProfile } from "./profileSlice";

export const fetchProfileThunk = (userId:number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingProfile())
        const result = await setProfileProvider(userId, getState)        
        if(!result.ok) return dispatch( setProfileError(result.errorMessage) )
        
        dispatch( setProfile(result.profile) )
    }
}


// Update Profile
export const updateProfileThunk = (profile:any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingProfile())
        const result = await updateProfileProvider(profile, getState)        
        if(!result.ok) return dispatch( setProfileError(result.errorMessage) )

        useNotification({type: 'success', message: 'Información de perfil actualizada'})
        dispatch( updateProfile(result.profile.user) )
    }
}