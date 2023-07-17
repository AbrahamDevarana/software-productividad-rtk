import { AppDispatch, RootState } from '@/redux/store';
import {clearCurrentPerspectiva, clearPerspectivas } from './perspectivasSlice';
import { PerspectivaProps } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';


interface Props {
    perspectivas: PerspectivaProps[]
    perspectiva: PerspectivaProps
}



export const getPerspectivasThunk = createAsyncThunk(
    'perspectivas/getPerspectivas',
    async (filtros: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }
            const response = await clientAxios.get<Props>('/perspectivas', config);
            return response.data.perspectivas
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
    }
})


export const getPerspectivaThunk = createAsyncThunk(
    'perspectivas/getPerspectiva',
    async (perspectivaId: number, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/perspectivas/${perspectivaId}`, config);
            return response.data.perspectiva
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const createPerspectivaThunk = createAsyncThunk(
    'perspectivas/createPerspectiva',
    async (perspectiva: PerspectivaProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.post<Props>('/perspectivas', perspectiva, config);
            return response.data.perspectiva
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deletePerspectivaThunk = createAsyncThunk(
    'perspectivas/deletePerspectiva',
    async (perspectivaId: number, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete<Props>(`/perspectivas/${perspectivaId}`, config);
            return response.data.perspectiva
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const updatePerspectivaThunk = createAsyncThunk(
    'perspectivas/updatePerspectiva',
    async (perspectiva: PerspectivaProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            
            const response = await clientAxios.put<Props>(`/perspectivas/${perspectiva.id}`, perspectiva, config);
            return response.data.perspectiva
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const clearPerspectivasThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch( clearPerspectivas() )        
    }   
}
    
export const clearCurrentPerspectivaThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch( clearCurrentPerspectiva() )        
    }   
}