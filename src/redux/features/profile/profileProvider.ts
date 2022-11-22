import { clientAxios } from "../../../config/axios";
import { RootState } from "../../store";


export const setProfileProvider =  async (userId:number, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/user/${userId}`,
            { headers: { "accessToken": `${getState().auth.token}` } }
        );
        return {
            ok: true,
            profile: response.data
        }  
    } catch (error:any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}


export const updateProfileProvider =  async (profile:any, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/user/update`, profile,
            { headers: { "accessToken": `${getState().auth.token}` } }
        );
        return {
            ok: true,
            profile: response.data
        }  
    } catch (error:any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}