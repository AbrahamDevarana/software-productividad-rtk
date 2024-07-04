import { AppDispatch, RootState } from '@/redux/store';
import { ProyectosProps } from '@/interfaces';
import { clearProyecto, clearProyectos, getCreatedProyecto, getUpdatedProyecto } from './proyectosSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';

import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


// export const getProyectosThunk = createAsyncThunk(
//     'proyectos/getProyectos',
//     async (filtros: any, { rejectWithValue, getState }) => {
//         try {
//             const { accessToken } = (getState() as RootState).auth;
//             const config = {
//                 headers: { "accessToken": `${accessToken}` },
//                 params: filtros
//             }
//             const response = await clientAxios.get('/proyectos', config);
//             return response.data.proyectos as ProyectosProps[]
//         } catch (error: any) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const getProyectoThunk = createAsyncThunk(
//     'proyectos/getProyecto',
//     async (proyectoId: string, { rejectWithValue, getState }) => {
//        try{
//         const { accessToken } = (getState() as RootState).auth;
//         const config = {
//             headers: { "accessToken": `${accessToken}` }
//         }
//             const response = await clientAxios.get(`/proyectos/${proyectoId}`, config);
//             return response.data.proyecto as ProyectosProps
//         } catch (error: any) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const createProyectoThunk = createAsyncThunk(
//     'proyectos/createProyecto',
//     async (proyecto: FormData, { rejectWithValue, getState }) => {
 
//         try {
//             const { accessToken } = (getState() as RootState).auth;
//             const config = {
//                 headers: { "accessToken": `${accessToken}`,
//                             "Content-Type": "multipart/form-data"   
//                         }
//             }
//             const response = await clientAxios.post('/proyectos', proyecto, config);
//             return response.data.proyecto as ProyectosProps
//         } catch (error: any) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const updateProyectoThunk = createAsyncThunk(
//     'proyectos/updateProyecto',
//     async ( { proyectoId, proyecto }: { proyectoId: string, proyecto: FormData }, { rejectWithValue, getState }) => {        
//         try {
//             const { accessToken } = (getState() as RootState).auth;
//             const config = {
//                 headers: { "accessToken": `${accessToken}`,
//                             "Content-Type": "multipart/form-data"
//             }
//             }
//             const response = await clientAxios.put(`/proyectos/${proyectoId}`, proyecto, config);
//             return response.data.proyecto as ProyectosProps
//         } catch (error: any) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const deleteProyectoThunk = createAsyncThunk(
//     'proyectos/deleteProyecto',
//     async (proyectoId: string, { rejectWithValue, getState }) => {
//         try {
//             const { accessToken } = (getState() as RootState).auth;
//             const config = {
//                 headers: { "accessToken": `${accessToken}` }
//             }
//             const response = await clientAxios.delete(`/proyectos/${proyectoId}`, config);
//             return response.data.proyecto as ProyectosProps
//         } catch (error: any) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const getCreatedProyectoThunk = (proyecto: ProyectosProps) => async ( dispatch: AppDispatch ) => {
//     dispatch(getCreatedProyecto(proyecto))
// }

// export const getUpdatedProyectoThunk = (proyecto: ProyectosProps) => async ( dispatch: AppDispatch ) => {
//     dispatch(getUpdatedProyecto(proyecto))
// }

// export const clearProyectoThunk = () => async (dispatch: AppDispatch) => {
//     dispatch(clearProyecto())
// }

// export const clearProyectosThunk = () => async (dispatch: AppDispatch) => {
//     dispatch(clearProyectos())
// }

export const proyectosApi = createApi({
    reducerPath: 'proyectosApi',
    baseQuery: baseQuery,
    tagTypes: ['Proyecto'],
    endpoints: (builder) => ({
        getProyectos: builder.query<ProyectosProps[], any>({
            query: (filtros) => ({
                url: '/proyectos',
                method: 'GET',
                params: filtros
            }),
            providesTags: ['Proyecto'],
            transformResponse: (response: {proyectos: ProyectosProps[]}) => response.proyectos
        }),
        getProyecto: builder.query<ProyectosProps, {proyectoId?: string}>({
            query: ({proyectoId}) => `/proyectos/${proyectoId}`,
            providesTags: ['Proyecto'],
            transformResponse: (response: {proyecto: ProyectosProps}) => response.proyecto
        }),
        createProyecto: builder.mutation<ProyectosProps, FormData>({
            query: (proyecto) => ({
                url: '/proyectos',
                method: 'POST',
                body: proyecto,
            }),
            invalidatesTags: ['Proyecto'],
            transformResponse: (response: {proyecto: ProyectosProps}) => response.proyecto,
        }),
        updateProyecto: builder.mutation<ProyectosProps, { proyectoId: string, proyecto: FormData }>({
            query: ({ proyectoId, proyecto }) => ({
                url: `/proyectos/${proyectoId}`,
                method: 'PUT',
                body: proyecto,
            }),
            invalidatesTags: ['Proyecto']
        }),
        deleteProyecto: builder.mutation<ProyectosProps, { proyectoId: string}> ({
            query: ({proyectoId}) => ({
                url: `/proyectos/${proyectoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Proyecto']
        })
    })
})

export const {useCreateProyectoMutation, useDeleteProyectoMutation, useGetProyectoQuery, useGetProyectosQuery, useUpdateProyectoMutation} = proyectosApi

