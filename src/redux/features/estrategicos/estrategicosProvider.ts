import { clientAxios } from "../../../config/axios";
import { RootState } from "../../store";

export const getEstrategicosProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/estrategicos`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
        return {
            ok: true,
            estrategicos: response.data
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

export const getEstrategicoProvider = async (estrategicoId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/estrategicos/${estrategicoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            estrategico: response.data
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

export const createEstrategicoProvider = async (estrategico: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/estrategicos`, estrategico, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            estrategico: response.data
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

export const updateEstrategicoProvider = async (estrategico: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/estrategicos/${estrategico.id}`, estrategico, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            estrategico: response.data
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

export const deleteEstrategicoProvider = async (estrategicoId: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/estrategicos/${estrategicoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            estrategico: response.data
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
