import { clientAxios } from "@/config/axios";
import { OperativoProps } from "@/interfaces";
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

export const getObjetivoProvider = async (operativoId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/operativos/${operativoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
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

export const createObjetivoProvider = async (operativo: OperativoProps, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/operativos`, operativo, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            operativo: response.data
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

export const updateObjetivoProvider = async (operativo: OperativoProps, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/operativos/${operativo.id}`, operativo, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            operativo: response.data
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

export const deleteObjetivoProvider = async (operativoId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/operativos/${operativoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            operativo: response.data
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
