import { clientAxios } from '@/config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clearObjetivo, } from './operativosSlice';
import { OperativoProps } from '@/interfaces';


interface Props {
    operativos: OperativoProps[]
    operativo: OperativoProps
}


export const getOperativosThunk = createAsyncThunk(
    'operativos/getOperativos',
    async (filtros: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
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



export const clearObjetivoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearObjetivo())
}

