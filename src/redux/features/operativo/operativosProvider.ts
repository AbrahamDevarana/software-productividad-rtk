import { clientAxios } from "@/config/axios";
import { RootState } from "@/redux/store";


export const getOperativosProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/operativos/operativos`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
        return {
            ok: true,
            operativos: response.data
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

export const getProyectosProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/operativos/proyectos`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
        return {
            ok: true,
            proyectos: response.data
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

export const createObjetivoProvider = async (objetivo: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/objetivos`, objetivo, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            objetivo: response.data
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