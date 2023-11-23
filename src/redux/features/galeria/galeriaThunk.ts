
import { AppDispatch, RootState } from '@/redux/store';
import { GaleriaProps } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';


interface Props {
    galeria_devarana: GaleriaProps[]
    galeria_usuarios: GaleriaProps[]
}

export const getGaleriaDevaranaThunk = createAsyncThunk(    
    'galeria/getGaleriaDevarana',
    async (filtros: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>('/galeria/devarana', config);
            return response.data.galeria_devarana
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)



export const getGaleriaUsuarioThunk = createAsyncThunk(
    'galeria/getGaleriaUsuario',
    async ({ type }: {type: 'BANNER_PERFIL'}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { type }
            }
            const response = await clientAxios.get<Props>('/galeria/usuario', config);
            return response.data.galeria_usuarios
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const uploadGaleriaUsuarioThunk = createAsyncThunk(
    'galeria/uploadGaleriaUsuario',
    async ( formData: FormData, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}`, "Content-Type": "multipart/form-data" },
            }
            const response = await clientAxios.post<Props>('/galeria/usuario', formData, config);
            return response.data.galeria_usuarios
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)