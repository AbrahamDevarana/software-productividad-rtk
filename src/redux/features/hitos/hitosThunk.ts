
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { clientAxios } from '@/config/axios';
import { HitosProps } from '@/interfaces';


export const getHitosThunk = createAsyncThunk(
    'hitos/getHitos',
    async (proyectoId: string, {rejectWithValue, getState}) => {    
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const params = {
                proyectoId: proyectoId
            }

            const response = await clientAxios.get(`/hitos`, {params, ...config});
            return response.data.hitos as HitosProps[]
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateHitoThunk = createAsyncThunk(
    'hitos/updateHito',
    async (hito: HitosProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put(`/hitos/${hito.id}`, hito, config);
            return response.data.hito as HitosProps
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createHitoThunk = createAsyncThunk(
    'hitos/createHito',
    async (hito: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post(`/hitos`, hito, config);
            return response.data.hito as HitosProps
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteHitoThunk = createAsyncThunk(
    'hitos/deleteHito',
    async (hitoId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            await clientAxios.delete(`/hitos/${hitoId}`, config);
            return hitoId
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)