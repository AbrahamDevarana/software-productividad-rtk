import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccionesProps } from "@/interfaces";
import { AppDispatch, RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";

interface Props {
    accion: AccionesProps
    acciones: AccionesProps[]
}

export const getAccionesThunk = createAsyncThunk(
    'acciones/getAcciones',
    async (proyectoId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get<Props>(`/acciones/proyecto/${proyectoId}`, config);
            return response.data.acciones
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})

export const getAccionThunk = createAsyncThunk(
    'acciones/getAccion',
    async (accionId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get<Props>(`/acciones/${accionId}`, config);
            return response.data.accion
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})

export const createAccionThunk = createAsyncThunk(
    'acciones/createAccion',
    async (accion: AccionesProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>(`/acciones`, accion, config);
            return response.data.accion
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})

export const updateAccionThunk = createAsyncThunk(
    'acciones/updateAccion',
    async (accion: AccionesProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            

            const response = await clientAxios.put<Props>(`/acciones/${accion.id}`, accion, config);
            return response.data.accion
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})

export const deleteAccionThunk = createAsyncThunk(
    'acciones/deleteAccion',
    async (accionId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.delete<Props>(`/acciones/${accionId}`, config);            
            return response.data.accion

        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})
