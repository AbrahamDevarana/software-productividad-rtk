import { clientAxios } from "@/config/axios";
import { RootState } from "@/redux/store";



export const uploadImageProvider = async (usuarioId: string, userPicture:any ,getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/usuarios/upload/${usuarioId}`, userPicture, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            url: response.data
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


export const deleteImageProvider = async (usuarioId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/usuarios/delete-photo/${usuarioId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            url: response.data
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