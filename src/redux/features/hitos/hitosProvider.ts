import { clientAxios } from "@/config/axios";
import { HitosProps} from "@/interfaces";
import { RootState } from "@/redux/store";



export const updateHitoProvider = async (hito: HitosProps, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/hitos/${hito.id}`, hito, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            hito: response.data
        }
    } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const createHitoProvider = async (hito: HitosProps, getState: () => RootState) => {
    console.log(hito);
    
    try {
        const response = await clientAxios.post(`/hitos`, hito, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            hito: response.data
        }
    } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}