import { AppDispatch, RootState } from '@/redux/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { uploadImageProvider, deleteImageProvider } from './usuariosProvider';
import { checkingUsuarios, setUsuariosError, cleanCurrentUsuario, clearUsuarios } from './usuariosSlice';
import { clientAxios } from '@/config/axios';
import { UsuarioProps } from '@/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { baseQuery } from "@/config/baseQuery";

export const getUsuariosThunk = createAsyncThunk(
    'usuarios/getUsuarios',
    async ({filtros, search} : {filtros?: any, search?: string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    ...filtros,
                    search
                }
            }
            const response = await clientAxios.get(`/usuarios`, config);
            return response.data.usuarios

        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getUsuarioThunk = createAsyncThunk(
    'usuarios/getUsuario',
    async (usuarioId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get(`/usuarios/${usuarioId}`, config);
            return response.data.usuario
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createUsuarioThunk = createAsyncThunk(
    'usuarios/createUsuario',
    async (usuario: UsuarioProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
            }

            const response = await clientAxios.post(`/usuarios`, usuario, config);
            return response.data.usuario
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateUsuarioThunk = createAsyncThunk(
    'usuarios/updateUsuario',
    async (usuario: UsuarioProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
            }
            const response = await clientAxios.put(`/usuarios/${usuario.id}`, usuario, config);
            return response.data.usuario
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteUsuarioThunk = createAsyncThunk(
    'usuarios/deleteUsuario',
    async (usuarioId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete(`/usuarios/${usuarioId}`, config);
        
            return response.data.usuario
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getResultadosThunk = createAsyncThunk(
    'usuarios/getResultados',
    async (filtros:any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }
            const response = await clientAxios.get(`/usuarios/resultados`, config);
            return response.data.usuarios
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const uploadImageThunk = (usuarioId: string, file: any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await uploadImageProvider(usuarioId, file, getState)
        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )
        // dispatch( updateUsuario(result.usuario) )
        return result
    }
}

export const deleteProfilePhotoThunk = (usuarioId: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(checkingUsuarios())
        const result = await deleteImageProvider(usuarioId, getState)
        if(!result.ok) return dispatch( setUsuariosError(result.errorMessage) )
        // dispatch( updateUsuario(result.usuario) )s        
        return result
    }
}

export const cleanCurrentUsuarioThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(cleanCurrentUsuario())
    }
}

export const clearUsuariosThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(clearUsuarios())
    }
}



// RK Query


interface UsuariosParams {
    status: status
    search?: string;
}

interface IUsuariosResponse {
    rows: UsuarioProps[];
}


type status = 'ACTIVO' | 'INACTIVO' | 'ALL';


export const usuariosApi =  createApi({
   
    reducerPath: 'usuariosApi',
    baseQuery,
    tagTypes: ['Usuarios'],
    endpoints: (builder) => ({
        getUsuarios: builder.query({
            query: ({status, search}: UsuariosParams) => ({
                url: `/usuarios`,
                method: 'GET',
                params: {
                    status,
                    search
                },
            }),
            transformResponse: (response: { usuarios: UsuarioProps[] } ) => response.usuarios,
            providesTags: ['Usuarios']
        }),
        getUsuario: builder.query({
            query: (usuarioId: string) => `/usuarios/${usuarioId}`,
            transformResponse: (response: { usuario: UsuarioProps } ) => response.usuario
        }),
        createUsuario: builder.mutation({
            query: (usuario: UsuarioProps) => ({
                url: `/usuarios`,
                method: 'POST',
                body: usuario
            }),
            invalidatesTags: ['Usuarios'],
        }),
        updateUsuario: builder.mutation({
            query: (usuario: UsuarioProps) => ({
                url: `/usuarios/${usuario.id}`,
                method: 'PUT',
                body: usuario
            }),
            invalidatesTags: ['Usuarios'],
        }),
        deleteUsuario: builder.mutation({
            query: (usuarioId: string) => ({
                url: `/usuarios/${usuarioId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Usuarios'],
        }),
        getResultados: builder.query({
            query: (filtros: any) => ({
                url: `/usuarios/resultados`,
                method: 'GET',
                params: filtros
            }),
            transformResponse: (response: { usuarios: IUsuariosResponse } ) => response.usuarios.rows
        }),
    })
  })

  export const { useGetUsuariosQuery, useCreateUsuarioMutation, useDeleteUsuarioMutation, useGetResultadosQuery, useGetUsuarioQuery, useUpdateUsuarioMutation } = usuariosApi;