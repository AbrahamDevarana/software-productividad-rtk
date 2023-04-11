import { clientAxios } from "@/config/axios";
import { RootState } from "@/redux/store";


export const getUsuariosProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/usuarios`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
        return {
            ok: true,
            usuarios: response.data
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

export const getUsuarioProvider = async (usuarioId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/usuarios/${usuarioId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            usuario: response.data
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

export const createUsuarioProvider = async (usuario: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/usuarios`, usuario, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            usuario: response.data
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

export const updateUsuarioProvider = async (usuario: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/usuarios/${usuario.id}`, usuario, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            usuario: response.data
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

export const deleteUsuarioProvider = async (usuarioId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/usuarios/${usuarioId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            usuario: response.data
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