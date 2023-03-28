import { clientAxios } from "../../../config/axios";
import { RootState } from "../../store";

export const getTacticosProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/tacticos`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
        return {
            ok: true,
            tacticos: response.data
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


export const getTacticoProvider = async (tacticoId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/tacticos/${tacticoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            tactico: response.data
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

export const getTacticoFromAreaProvider = async (query: { slug: string, quarter: number, year: number }, getState: () => RootState) => {

    const { slug, quarter, year } = query

    try {
        const response = await clientAxios.get(`/tacticos/area/${slug}`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: { year, quarter} });
        return {
            ok: true,
            tacticos: response.data
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
export const getTacticoFromEstrategiaProvider = async (estrategiaId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/tacticos/estrategia/${estrategiaId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            tacticos: response.data
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


export const createTacticoProvider = async (tactico: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/tacticos`, tactico, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            tactico: response.data
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

export const updateTacticoProvider = async (tactico: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/tacticos/${tactico.id}`, tactico, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            tactico: response.data
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

export const deleteTacticoProvider = async (tacticoId: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/tacticos/${tacticoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            tactico: response.data
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
