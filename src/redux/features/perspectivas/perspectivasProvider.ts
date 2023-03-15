import { clientAxios } from "../../../config/axios";
import { RootState } from "../../store";

export const getPerspectivasProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/perspectivas`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
        return {
            ok: true,
            perspectivas: response.data
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

export const getPerspectivaProvider = async (perspectivaId: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/perspectivas/${perspectivaId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            perspectiva: response.data
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

export const createPerspectivaProvider = async (perspectiva: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/perspectivas`, perspectiva, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            perspectiva: response.data
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

export const updatePerspectivaProvider = async (perspectiva: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/perspectivas/${perspectiva.id}`, perspectiva, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            perspectiva: response.data
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

export const deletePerspectivaProvider = async (perspectivaId: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/perspectivas/${perspectivaId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            perspectiva: response.data
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
