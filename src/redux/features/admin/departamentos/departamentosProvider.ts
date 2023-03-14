import { clientAxios } from "../../../../config/axios";
import { RootState } from "../../../store"; 


export const getDepartamentosProvider = async (filtros: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/departamentos`, { headers: { "accessToken": `${getState().auth.accessToken}` }, params: filtros });
        return {
            ok: true,
            departamentos: response.data
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

export const getDepartamentoProvider = async (departamentoId: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.get(`/departamentos/${departamentoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            departamento: response.data
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

export const createDepartamentoProvider = async (departamento: any, getState: () => RootState) => {
    try {

        console.log(departamento);
        
        const response = await clientAxios.post(`/departamentos`, departamento, { headers: { "accessToken": `${getState().auth.accessToken}` } });

        console.log(response);
        
        return {
            ok: true,
            departamento: response.data
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

export const updateDepartamentoProvider = async (departamento: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.put(`/departamentos/${departamento.id}`, departamento, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            departamento: response.data
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

export const deleteDepartamentoProvider = async (departamentoId: number, getState: () => RootState) => {
    try {
        const response = await clientAxios.delete(`/departamentos/${departamentoId}`, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            departamentoId: response.data
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
