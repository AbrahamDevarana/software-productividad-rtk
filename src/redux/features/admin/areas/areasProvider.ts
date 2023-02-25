import { clientAxios } from "../../../../config/axios";
import { RootState } from "../../../store"; 


export const getAreasProvider = async (getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/area`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            areas: response.data
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

export const getAreaProvider = async (areaId: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/area/${areaId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            area: response.data
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

export const createAreaProvider = async (area: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/area`, area, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            area: response.data
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

export const updateAreaProvider = async (area: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/area/${area.id}`, area, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            area: response.data
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

export const deleteAreaProvider = async (areaId: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/area/${areaId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            areaId: response.data
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
