import { clientAxios } from '@/config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clearObjetivo, clearObjetivos } from './operativosSlice';
import { OperativoProps } from '@/interfaces';


interface Props {
    operativos: OperativoProps[]
    operativo: OperativoProps
}

interface PonderacionesResponseProps {  
    usuarioId: string
    ponderaciones: PonderacionesProps[]
}

interface PonderacionesProps {
    objetivoId: string
    progresoAsignado: number,
    nombreObjetivo: string
}

interface Filtros {
    usuarioId?: string
    year: number
    quarter: number
}


export const getOperativosThunk = createAsyncThunk(
    'operativos/getOperativos',
    async (filtros: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }


            const response = await clientAxios.get<Props>(`/operativos`, config);
            return response.data.operativos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
// Obtener los objetivos de un usuario
export const getOperativosUsuarioThunk = createAsyncThunk(
    'operativos/getOperativosUsuario',
    async (filtros: Filtros, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }
                
            const response = await clientAxios.get<Props>(`/operativos`, config);
            return response.data.operativos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getOperativoThunk = createAsyncThunk(
    'operativos/getObjetivo',
    async (operativoId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/operativos/${operativoId}`, config);            
            return response.data.operativo
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
        
export const createOperativoThunk = createAsyncThunk(
    'operativos/createObjetivo',
    async (operativo: OperativoProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>(`/operativos`, operativo, config);

            console.log(response.data.operativo);
            

            return response.data.operativo
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateOperativoThunk = createAsyncThunk(
    'operativos/updateObjetivo',
    async (operativo: OperativoProps, {rejectWithValue, getState}) => {
        try {   
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/operativos/${operativo.id}`, operativo, config);            
            return response.data.operativo
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const setPonderacionesThunk = createAsyncThunk(
    'operativos/setPonderaciones',
    async ({usuarioId, ponderaciones}:{usuarioId: string, ponderaciones: object[]}, {rejectWithValue, getState}) => {
        try {   
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<PonderacionesResponseProps>(`/operativos/set-ponderaciones/${usuarioId}`, {ponderaciones}, config);          
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteOperativoThunk = createAsyncThunk(
    'operativos/deleteObjetivo',
    async (operativoId: string, {rejectWithValue, getState}) => {
        try {   
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            await clientAxios.delete<Props>(`/operativos/${operativoId}`, config);            
            return operativoId
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const clearObjetivoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearObjetivo())
}

export const clearOperativosThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearObjetivos())
}

