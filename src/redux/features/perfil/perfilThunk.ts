
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";
import { PerfilProps } from "@/interfaces";
import { clearProfile } from "./perfilSlice";


interface Props {
    usuario : PerfilProps
}


export const getProfileThunk = createAsyncThunk(
    'profile/getProfile',
    async (userId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/usuarios/perfil/${userId}`, config);    
            console.log(response.data.usuario);
                    
            return response.data.usuario
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
        

export const updateProfileThunk = createAsyncThunk(
    'profile/updateProfile',
    async (profile: PerfilProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put<Props>(`/usuarios/perfil/${profile.id}`, profile, config);
            return response.data.usuario


        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const uploadProfilePictureThunk = createAsyncThunk(
    'profile/uploadProfilePicture',
    async ({profile, usuarioId}: {profile:FormData, usuarioId: string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { 
                    "accessToken": `${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            }
        
            const response = await clientAxios.post<Props>(`/usuarios/upload/${usuarioId}`, profile, config);
            return response.data.usuario
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const updateProfileConfigThunk = createAsyncThunk(
    'profile/updateProfileConfig',
    async (params: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/usuarios/config`, params, config);
            return response.data.usuario
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getProfileEvaluationThunk = createAsyncThunk(
    'profile/getProfileEvaluation',
    async (usuarioId:any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
            }
            const response = await clientAxios.get(`/evaluacion-usuario/${usuarioId}`, config);
            
            console.log(response.data.evaluaciones);
            
            return response.data.evaluaciones
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)




export const clearProfileThunk = () => {
    return (dispatch: any) => {
        dispatch(clearProfile());
    }
}