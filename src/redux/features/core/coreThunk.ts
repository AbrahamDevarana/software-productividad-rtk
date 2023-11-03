
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clearCurrentTactico, clearTacticos } from './coreSlice';
import { CoreProps } from '@/interfaces';
import { clientAxios } from '@/config/axios';

interface Props {
    objetivosCore: CoreProps[]
    objetivoCore: CoreProps
}

export const getCoresThunk = createAsyncThunk(
    'core/getCoresThunk',
    async ({ year, departamentoId }: {year: number, departamentoId: string | number}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { year, departamentoId }
            }
            
            const response = await clientAxios.get<Props>('/core', config);        
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCoreThunk = createAsyncThunk(
    'core/getCoreThunk',
    async (coreId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/core/${coreId}`, config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createCoreThunk = createAsyncThunk(
    'core/createCoreThunk',
    async ({year, slug}: { year: number, slug: string }, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
            }
            const params = { year, slug  }

            const response = await clientAxios.post<Props>('/core', params, config);
            return { 
                response: response.data,
            }
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteCoreThunk = createAsyncThunk(
    'core/deleteCoreThunk',
    async (coreId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete<Props>(`/core/${coreId}`, config);
            
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateCoreThunk = createAsyncThunk(
    'core/updateCoreThunk',
    async (core: CoreProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/core/${core.id}`, core, config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const clearTacticosThunk = () => {
    return async ( dispatch : AppDispatch) => {
        dispatch( clearTacticos() )        
    }   
}
    
export const clearCurrentTacticoThunk = () => {
    return async ( dispatch : AppDispatch) => {
        dispatch( clearCurrentTactico() )        
    }   
}

