
import { AppDispatch, RootState } from '@/redux/store';
import { GaleriaDevaranaProps } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';


interface Props {
    galeria_devarana: GaleriaDevaranaProps[]
}

export const getGaleriaDevaranaThunk = createAsyncThunk(    
    'galeria/getGaleriaDevarana',
    async (filtros: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>('/galeria/devarana', config);
            return response.data.galeria_devarana
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)