import { clientAxios } from "@/config/axios";
import { RootState } from "@/redux/store";


export const getResultadosProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/resultados`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
        return {
            ok: true,
            resultados: response.data
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

export const createResultadoProvider = async (resultado: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/resultados`, resultado, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            resultado: response.data
        }
    }
    catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const updateResultadoProvider = async (resultado: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/resultados/${resultado.id}`, resultado, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            resultado: response.data
        }
    }
    catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}


export const deleteResultadoProvider = async (id: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/resultados/${id}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            resultado: response.data
        }
    }
    catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}
