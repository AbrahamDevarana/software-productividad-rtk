
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clientAxios } from '@/config/axios';
import { cambiarConfig } from './globalSlice';




export const changeConfigThunk = ({quarter, year}: { quarter:number, year:number }) => (dispatch: AppDispatch) => {
    dispatch(cambiarConfig({quarter, year}))
}

export const getObjetivosConfigThunk = createAsyncThunk(
    'global/getObjetivosConfig',
    async ( { quarter, year } : {quarter: number, year: number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { quarter, year }
            }

            const response = await clientAxios.get(`/global/objetivos`, config);
            return response.data.config
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getGlobalsConfigThunk = createAsyncThunk(
    'global/getGlobalsConfig',
    async ( { quarter, year } : {quarter: number, year: number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { quarter, year }
            }

            const response = await clientAxios.get(`/global`, config);
            return response.data.config
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)