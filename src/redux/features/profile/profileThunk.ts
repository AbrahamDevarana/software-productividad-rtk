
import { AppDispatch, RootState } from "../../store";
import { setProfileProvider } from "./profileProvider";
import { checkingProfile, setProfile, setProfileError } from "./profileSlice";

    


export const fetchProfile = (userId:number) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingProfile())
        const result = await setProfileProvider(userId, getState)        
        if(!result.ok) return dispatch( setProfileError(result.errorMessage) )
        
        dispatch( setProfile(result.profile) )
    }
}