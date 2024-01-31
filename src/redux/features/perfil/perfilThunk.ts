
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";
import { PerfilProps, Rendimiento, SinglePerfilProps } from "@/interfaces";
import { clearProfile } from "./perfilSlice";

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from "@/config/baseQuery";



interface Props {
    usuario : PerfilProps
}


interface Respuesta {
    id: string;
    preguntaId: string;
    evaluacionId: number;
    usuarioId: string;
    rate: number;
    comentarios: string;
  }


export const getProfileThunk = createAsyncThunk(
    'profile/getProfile',
    async ({usuarioId, year, quarter}:{usuarioId: string, year: number, quarter: number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }
            const response = await clientAxios.get<Props>(`/perfiles/${usuarioId}`, config);
                    
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


export const updatePortraitThunk = createAsyncThunk(
    'profile/updatePortrait',
    async ({id, portadaPerfil}: {id:string, portadaPerfil:string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const response = await clientAxios.put(`/perfiles/portrait/${id}`, {portadaPerfil}, {
                headers: { "accessToken": `${accessToken}` }
            });

            console.log(response.data);
            
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getRendimientoThunk = createAsyncThunk(
    'profile/getRendimiento',
    async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const response = await clientAxios.get(`/rendimiento/avance/${usuarioId}`, {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            });
            return response.data
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


export const perfilApi = createApi({
    reducerPath: 'perfilApi',
    baseQuery,
    tagTypes: ['Perfil', 'Equipo'],
    endpoints: (builder) => ({
        getHistorial: builder.query({
            query: ({usuarioId, year}:{usuarioId: string, year?: number}) => ({
                url: `/rendimiento/historial/${usuarioId}`,
                params: { year },
            }),
            providesTags: ['Perfil'],
            transformResponse: (response: {rendimientos: Rendimiento[]}) => response.rendimientos
        }),
        getEquipo: builder.query({
            query: ({usuarioId}:{usuarioId: string}) => `/perfiles/get-equipo/${usuarioId}`,
            providesTags: ['Equipo'],
            transformResponse: (response: {equipo: SinglePerfilProps[]}) => response.equipo
        }),
        getColaboradores: builder.query({
            query: ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}) => ({
                url: `/perfiles/get-colaboradores/${usuarioId}`,
                params: { year, quarter },
            }),
            providesTags: ['Equipo'],
            transformResponse: (response: {colaboradores: SinglePerfilProps[]}) => response.colaboradores
        }),
        getRendimiento: builder.query({
            query: ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}) => ({
                url: `/rendimiento/avance/${usuarioId}`,
                params: { year, quarter },
            }),
            providesTags: ['Perfil'],
            transformResponse: (response: {rendimiento: Rendimiento}) => response.rendimiento,
            transformErrorResponse : (error: any) => {
                console.log(error);
                return error
            }
        }),
    }),
})

export const {
    // useGetProfileQuery,
    // useUpdateProfileMutation,
    // useUploadProfilePictureMutation,
    // useUpdateProfileConfigMutation,
    // useUpdatePortraitMutation,
    useGetRendimientoQuery,
    useGetColaboradoresQuery,
    useGetEquipoQuery,
    useGetHistorialQuery
} = perfilApi;


