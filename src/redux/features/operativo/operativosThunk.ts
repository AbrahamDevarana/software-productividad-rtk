import { clientAxios } from '@/config/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clearObjetivo, clearObjetivos } from './operativosSlice';
import { OperativoProps } from '@/interfaces';


import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { get } from 'http';


interface Props {
    operativos: OperativoProps[]
    operativo: OperativoProps
}

interface PonderacionesResponseProps {  
    usuarioId: string
    ponderaciones: PonderacionesProps[]
}

interface PonderacionesProps {
    objetivoId: string
    progresoAsignado: number,
    nombreObjetivo: string
}

interface Filtros {
    usuarioId?: string
    year: number
    quarter: number
}

interface CierreProps {
   objetivo: OperativoProps
}


export const getOperativosThunk = createAsyncThunk(
    'operativos/getOperativos',
    async (filtros: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }


            const response = await clientAxios.get<Props>(`/operativos`, config);
            return response.data.operativos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getOperativoThunk = createAsyncThunk(
    'operativos/getObjetivo',
    async (operativoId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/operativos/${operativoId}`, config);                
            
            return response.data.operativo
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
        
export const createOperativoThunk = createAsyncThunk(
    'operativos/createObjetivo',
    async (operativo: OperativoProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>(`/operativos`, operativo, config);            

            return response.data.operativo
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateOperativoThunk = createAsyncThunk(
    'operativos/updateObjetivo',
    async (operativo: OperativoProps, {rejectWithValue, getState}) => {
        try {   
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/operativos/${operativo.id}`, operativo, config);            
            return response.data.operativo
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const setPonderacionesThunk = createAsyncThunk(
    'operativos/setPonderaciones',
    async ({usuarioId, ponderaciones}:{usuarioId: string, ponderaciones: object[]}, {rejectWithValue, getState}) => {
        try {   
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<PonderacionesResponseProps>(`/operativos/set-ponderaciones/${usuarioId}`, {ponderaciones}, config);          
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteOperativoThunk = createAsyncThunk(
    'operativos/deleteObjetivo',
    async (operativoId: string, {rejectWithValue, getState}) => {
        try {   
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            await clientAxios.delete<Props>(`/operativos/${operativoId}`, config);            
            return operativoId
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const cambioEstatusObjetivoThunk = createAsyncThunk(
    'operativos/cambioEstatusObjetivo',
    async ({operativoId, checked} : { operativoId: string, checked: boolean }, {rejectWithValue, getState}) => {
        try {   
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const result = await clientAxios.post<CierreProps>(`/operativos/cierre`, {operativoId, checked} , config);
            
            return result.data.objetivo
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const cierreObjetivoLiderThunk = createAsyncThunk(
    'operativos/cierreObjetivoLider',
    async ( { usuarioId, objetivoId, checked }:{usuarioId: string, objetivoId:string, checked:boolean}, {rejectWithValue, getState}) => {
        try {   
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const result = await clientAxios.post(`/operativos/cierre-objetivo-lider`, {usuarioId, objetivoId, checked}, config);
            
            return result.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const clearObjetivoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearObjetivo())
}

export const clearOperativosThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearObjetivos())
}




export const operativosApi = createApi({
    reducerPath: 'operativosApi',
    baseQuery: baseQuery,
    tagTypes: ['Operativos'],
    endpoints: (builder) => ({
        getOperativo: builder.query({
            query: ({objetivoId}: {objetivoId: string}) => `/operativos/${objetivoId}`,
            providesTags: ['Operativos'],
            transformResponse: (response: { operativo: OperativoProps }) => response.operativo
        }),
        copyOperativo: builder.mutation({
            query: (params) => ({
                url: `/operativos/copy`,
                method: 'POST',
                body: params
            }),
            invalidatesTags: ['Operativos'],
            transformResponse: (response: { operativo: OperativoProps }) => response.operativo
        }),
        getOperativos: builder.query({
            query: ({ year, quarter, usuarioId }: { year: number, quarter: number, usuarioId: string }) => ({
                url: '/operativos',
                params: { year, quarter, usuarioId }
            }),
            providesTags: ['Operativos'],
            transformResponse: (response: { operativos: OperativoProps[] }) => response.operativos
        }),
        cierreCiclo: builder.mutation({
            query: ({ usuarioId, year, quarter, objetivosId }: { usuarioId: string, year: number, quarter: number, objetivosId: string[] }) => ({
                url: '/operativos/cierre-ciclo',
                method: 'POST',
                body: { usuarioId, year, quarter, objetivosId }
            }),
            invalidatesTags: ['Operativos'],
            transformResponse: (response: { ok: boolean, objetivos: OperativoProps[] }) => response.objetivos,
            onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
                const { data } = await queryFulfilled;
                dispatch(operativosApi.util.updateQueryData('getOperativos', { year: body.year, quarter: body.quarter, usuarioId: body.usuarioId }, (draft) => {
                    draft = data;
                }))
            }
        }),
        getOperativosUsuario: builder.query({
            query: ({ year, quarter, usuarioId }: Filtros) => ({
                url: '/operativos',
                params: { year, quarter, usuarioId }
            }),
            providesTags: ['Operativos'],
            transformResponse: (response: { operativos: OperativoProps[] }) => response.operativos
        }),
    })
})

export const { useGetOperativoQuery, useCopyOperativoMutation, useGetOperativosQuery, useCierreCicloMutation, useGetOperativosUsuarioQuery } = operativosApi;