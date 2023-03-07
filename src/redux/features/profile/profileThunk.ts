
import { useNotification } from "../../../hooks/useNotification";
import { AppDispatch, RootState } from "../../store";
import { getProfileProvider, updateProfileProvider } from "./profileProvider";
import { checkingProfile, getProfile, getProfileError, updateProfile } from "./profileSlice";

export const fetchProfileThunk = (userId:number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingProfile())
        const result = await getProfileProvider(userId, getState)        
        if(!result.ok) return dispatch( getProfileError(result.errorMessage) )
        
        dispatch( getProfile(result.profile) )
    }
}


// Update Profile
export const updateProfileThunk = (profile:any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingProfile())
        const result = await updateProfileProvider(profile, getState)        
        if(!result.ok) return dispatch( getProfileError(result.errorMessage) )

        useNotification({type: 'success', message: 'Información de perfil actualizada'})
        dispatch( updateProfile(result.profile.user) )
    }
}