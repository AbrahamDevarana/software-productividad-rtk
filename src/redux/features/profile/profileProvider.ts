import { clientAxios } from "../../../config/axios";
import { RootState } from "../../store";


export const getProfileProvider =  async (userId:string, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/usuarios/${userId}`,
            { headers: { "accessToken": `${getState().auth.accessToken}` } }
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
        const response = await clientAxios.put(`/usuarios/update`, profile,
            { headers: { "accessToken": `${getState().auth.accessToken}` } }
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