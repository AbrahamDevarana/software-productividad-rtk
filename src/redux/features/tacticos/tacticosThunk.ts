
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clearCurrentTactico, clearTacticos } from './tacticosSlice';
import { TacticoProps } from '@/interfaces';
import { clientAxios } from '@/config/axios';

interface Props {
    objetivosTacticos: {
        tacticos: TacticoProps[]
        tacticos_core: TacticoProps[]
    }
    objetivoTactico: TacticoProps
}

export const getTacticosThunk = createAsyncThunk(
    'tacticos/getTacticosThunk',
    async (filtros: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const configo = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }
            
            const response = await clientAxios.get<Props>('/tacticos', configo);
            return response.data.objetivosTacticos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTacticoThunk = createAsyncThunk(
    'tacticos/getTacticoThunk',
    async (tacticosId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/tacticos/${tacticosId}`, config);
            return response.data.objetivoTactico
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createTacticoThunk = createAsyncThunk(
    'tacticos/createTacticoThunk',
    async (tactico: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.post<Props>('/tacticos', tactico, config);
            return response.data.objetivoTactico
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteTacticoThunk = createAsyncThunk(
    'tacticos/deleteTacticoThunk',
    async (tacticosId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete<Props>(`/tacticos/${tacticosId}`, config);
            return response.data.objetivoTactico
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateTacticoThunk = createAsyncThunk(
    'tacticos/updateTacticoThunk',
    async (tactico: TacticoProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/tacticos/${tactico.id}`, tactico, config);
            return response.data.objetivoTactico
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTacticoFromAreaThunk = createAsyncThunk(
    'tacticos/getTacticoFromAreaThunk',
    async ({slug, quarter, year}: {slug: string, quarter:number, year:number}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {quarter, year}
            }

            console.log('config', config.params);
            

            const response = await clientAxios.get<Props>(`/tacticos/area/${slug}`, config);  
                                  
            return response.data.objetivosTacticos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTacticoFromEstrategiaThunk = createAsyncThunk(
    'tacticos/getTacticoFromEstrategiaThunk',
    async (estrategiaId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/tacticos/estrategia/${estrategiaId}`, config);
            return response.data.objetivosTacticos
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