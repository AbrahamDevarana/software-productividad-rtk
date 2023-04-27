import { clientAxios } from "@/config/axios";
import { ProyectosProps } from "@/interfaces";
import { RootState } from "@/redux/store";


export const getProyectosProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/proyectos`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
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

export const getProyectoProvider = async (proyectoId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/proyectos/${proyectoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            proyecto: response.data
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

export const createProyectoProvider = async (proyecto: ProyectosProps, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/proyectos`, proyecto, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            proyecto: response.data
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

export const updateProyectoProvider = async (proyecto: ProyectosProps, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/proyectos/${proyecto.id}`, proyecto, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            proyecto: response.data
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

export const deleteProyectoProvider = async (proyectoId: string, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/proyectos/${proyectoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            proyecto: response.data
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

