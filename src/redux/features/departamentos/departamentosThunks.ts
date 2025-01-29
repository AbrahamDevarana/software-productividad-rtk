import { DepartamentoProps } from '@/interfaces';
import { AppDispatch, RootState } from '@/redux/store';
import { clearDepartamentos, clearCurrentDepartamento, clearLideres } from './departamentosSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';

import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


interface Props {
    departamento: DepartamentoProps
    departamentos: DepartamentoData
    lideres: any[]
}



interface DepartamentoData {
    rows: DepartamentoProps[];
    totalItem: number;
    totalPages: number;
    currentPage: number;
  }




export const getDepartamentosThunk = createAsyncThunk(
    'departamentos/getDepartamentos',
    async (filtros: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }

            const response = await clientAxios.get<Props>(`/departamentos`, config);
            return response.data.departamentos
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getDepartamentoThunk = createAsyncThunk(
    'departamentos/getDepartamento',
    async (departamentoId: number, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get<Props>(`/departamentos/${departamentoId}`, config);
            return response.data.departamento
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createDepartamentoThunk = createAsyncThunk(
    'departamentos/createDepartamento',
    async (departamento: DepartamentoProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>(`/departamentos`, departamento, config);
            return response.data.departamento
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteDepartamentoThunk = createAsyncThunk(
    'departamentos/deleteDepartamento',
    async (departamentoId: number, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.delete<Props>(`/departamentos/${departamentoId}`, config);
            return response.data.departamento
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateDepartamentoThunk = createAsyncThunk(
    'departamentos/updateDepartamento',
    async (departamento: DepartamentoProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put<Props>(`/departamentos/${departamento.id}`, departamento, config);
            return response.data.departamento
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getLideresDepartamentoThunk = createAsyncThunk(
    'departamentos/getLideresDepartamento',
    async (departamentoId: number, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get<Props>(`/departamentos/getLeader/${departamentoId}`, config);
            return response.data.lideres
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
  
export const getUsuariosByDepartamentoThunk = createAsyncThunk(
    'departamentos/getUsuariosByDepartamento',
    async ({usuarioId}: {usuarioId: string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get<Props>(`/departamentos/getUsuarios/${usuarioId}`, config);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


//  Clean Departamento
export const cleanDepartamentoThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearDepartamentos() )
    }
}

export const clearCurrentDepartamentoThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearCurrentDepartamento() )
    }
}

export const clearLideresThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearLideres() )
    }
}



export const departamentosApi = createApi({
    reducerPath: 'departamentosApi',
    baseQuery: baseQuery,
    tagTypes: ['Departamentos'],
    endpoints: (builder) => ({
        getDepartamentos: builder.query<DepartamentoData, {areaId?: number}>({
            query: (filtros) => ({
                url: `/departamentos`,
                params: filtros
            }),
            providesTags: ['Departamentos'],
            transformResponse: (response: { departamentos: DepartamentoData }) => response.departamentos
        }),
    })
})


export const { useGetDepartamentosQuery } = departamentosApi;