
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
            const response = await clientAxios.get<Props>(`/perfiles/${userId}`, config);
                    
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

            const response = await clientAxios.put<Props>(`/perfiles/${profile.id}`, profile, config);
            return response.data.usuario


        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

// TODO:Revisar
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

// TODO:Revisar
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

// TODO:Revisar
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


export const getEquipoThunk = createAsyncThunk(
    'profile/getEquipo',
    async (usuarioId:string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
            }
            const response = await clientAxios.get(`/perfiles/get-equipo/${usuarioId}`, config);
            
            return response.data.equipo
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getColaboradoresThunk = createAsyncThunk(
    'profile/getColaboradores',
    async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }
            const response = await clientAxios.get(`/perfiles/get-colaboradores/${usuarioId}`, config);
            return response.data.colaboradores
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getUsuariosAEvaluarThunk = createAsyncThunk(
    'profile/getUsuariosAEvaluar',
    async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }
            const response = await clientAxios.get(`/evaluacion/usuarios/${usuarioId}`, config);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getEvaluacionThunk = createAsyncThunk(
    'profile/getEvaluacion',
    async ({usuarioId, year, quarter, asignadorId}:{usuarioId: string, year:number, quarter:number, asignadorId:string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter,
                    asignadorId
                }
            }
            const response = await clientAxios.get(`/evaluacion/${usuarioId}`, config);
            return response.data.evaluacion
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