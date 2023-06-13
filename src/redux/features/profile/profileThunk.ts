
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";
import { PerfilProps } from "@/interfaces";
import { clearProfile } from "./profileSlice";


interface Props {
    usuario : PerfilProps
}

interface Sociales {    
    nombre: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'otro'
    url: string | undefined
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


export const updateProfileSocialThunk = createAsyncThunk(
    'profile/updateProfileSocial',
    async (sociales: Sociales, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put<Props>(`/social`, sociales, config);
            return response.data.usuario
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const clearProfileThunk = () => {
    return (dispatch: any) => {
        dispatch(clearProfile());
    }
}