
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";
import { PerfilProps } from "@/interfaces";


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
