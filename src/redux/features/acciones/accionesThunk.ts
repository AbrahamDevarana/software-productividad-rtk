import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccionesProps } from "@/interfaces";
import { AppDispatch, RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";



export const getAccionesThunk = createAsyncThunk(
    'acciones/getAcciones',
    async (proyectoId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get(`/acciones/proyecto/${proyectoId}`, config);
            return response.data.acciones as AccionesProps[]
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

            const response = await clientAxios.get(`/acciones/${accionId}`, config);
            return response.data.accion as AccionesProps
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

            const response = await clientAxios.post(`/acciones`, accion, config);
            return response.data.accion as AccionesProps
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

            const response = await clientAxios.put(`/acciones/${accion.id}`, accion, config);
            return response.data.accion as AccionesProps
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

            await clientAxios.delete(`/acciones/${accionId}`, config);
            return accionId
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})
