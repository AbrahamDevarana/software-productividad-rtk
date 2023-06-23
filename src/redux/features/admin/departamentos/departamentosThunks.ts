import { DepartamentoProps } from '@/interfaces';
import { AppDispatch, RootState } from '../../../store';
import { clearDepartamentos, clearCurrentDepartamento } from './departamentosSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';



interface Props {
    departamento: DepartamentoProps
    departamentos: {
        rows: DepartamentoProps[]
        totalItem: number
        totalPages: number
        currentPage: number
    }
    lideres: any[]
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