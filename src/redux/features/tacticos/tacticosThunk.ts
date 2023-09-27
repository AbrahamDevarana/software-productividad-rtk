
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
    tacticosGeneral: TacticoProps[]
}

export const getTacticosThunk = createAsyncThunk(
    'tacticos/getTacticosThunk',
    async (filtros: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }
            
            const response = await clientAxios.get<Props>('/tacticos', config);        
            return response.data.tacticosGeneral
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
    async ({slug, year, estrategico}: {slug?: string, year: number, estrategico: boolean}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params:  slug, year, estrategico 
            }
            const response = await clientAxios.post<Props>('/tacticos', config);
            return { 
                response: response.data.objetivoTactico,
                isCore: estrategico
            }
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

export const updateQuartersThunk = createAsyncThunk(
    'tacticos/updateQuartersThunk',
    async (tactico: TacticoProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/tacticos/quarters/${tactico.id}`, tactico, config);            
            return response.data.objetivoTactico
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTacticoFromEquiposThunk = createAsyncThunk(
    'tacticos/getTacticoFromEquiposThunk',
    async ({slug, year, filter}: {slug: string, year:number, filter: object}, { rejectWithValue, getState }) => {

        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { ...filter }
            }
            const response = await clientAxios.get<Props>(`/tacticos/equipo?slug=${slug}&year=${year}`, config);
            return response.data.objetivosTacticos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTacticoFromObjetivoIdThunk = createAsyncThunk(
    'tacticos/getTacticoFromObjetivoIdThunk',
    async ({id, year, slug}: {id: string | undefined, year: number, slug?: string}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { year, id, slug}
            }
            const response = await clientAxios.get(`/tacticos/objetivo/${id}`, config);            
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




// TODO: No esta funcionando
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
export const getTacticoFromAreaThunk = createAsyncThunk(
    'tacticos/getTacticoFromAreaThunk',
    async ({slug, year, filter}: {slug: string, year:number, filter: object}, { rejectWithValue, getState }) => {

        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { year, ...filter }
            }
            
            const response = await clientAxios.get<Props>(`/tacticos/area/${slug}`, config);  
            return response.data.objetivosTacticos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
