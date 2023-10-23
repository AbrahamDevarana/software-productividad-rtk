
import { AppDispatch, RootState } from '@/redux/store';
import { checkingEstrategicos, clearCurrentEstrategico, clearEstrategicos } from './estrategicosSlice';
import { EstrategicoProps } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';



interface Props {
    objetivoEstrategico: EstrategicoProps
    objetivosEstrategicos: EstrategicoProps[]
    // objetivosEstrategicos: {
    //     rows: EstrategicoProps[]
    //     totalItem: number
    //     totalPages: number
    //     currentPage: number
    // }
}

export const getEstrategicosThunk = createAsyncThunk(
    'estrategicos/getEstrategicos',
    async (filtros: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }
            const response = await clientAxios.get('/estrategicos', config);
            return response.data.objetivosEstrategicos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getEstrategicoThunk = createAsyncThunk(
    'estrategicos/getEstrategico',
    async (estrategicosId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/estrategicos/${estrategicosId}`, config);            
            return response.data.objetivoEstrategico
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const createEstrategicoThunk = createAsyncThunk(
    'estrategicos/createEstrategico',
    async (estrategico: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>('/estrategicos', estrategico, config);
            return response.data.objetivoEstrategico
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const deleteEstrategicoThunk = createAsyncThunk(
    'estrategicos/deleteEstrategico',
    async (estrategicosId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete<Props>(`/estrategicos/${estrategicosId}`, config);
            return response.data.objetivoEstrategico
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateEstrategicoThunk = createAsyncThunk(
    'estrategicos/updateEstrategico',
    async (estrategico: EstrategicoProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/estrategicos/${estrategico.id}`, estrategico, config);   
            return response.data.objetivoEstrategico
            
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getEstrategicosByAreaThunk = createAsyncThunk(
    'estrategicos/getEstrategicosByArea',
    async ({year, slug}: {year: number, slug: string}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { year, slug }
            }
            
            const response = await clientAxios.get('/estrategicos/byArea', config);            
            return response.data.objetivosEstrategicos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const clearEstrategicosThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch( checkingEstrategicos() )
        dispatch( clearEstrategicos() )
    }   
}
    
export const clearCurrentEstrategicoThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch( checkingEstrategicos() )
        dispatch( clearCurrentEstrategico() )        
    }   
}