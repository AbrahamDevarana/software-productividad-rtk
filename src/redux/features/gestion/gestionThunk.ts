import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from '@/config/axios'
import { GestionState } from '@/interfaces'





export const obtenerUsuariosThunk = createAsyncThunk(
    'gestion/obtenerUsuarios',
    async ({year, quarter}:{year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }
            const response = await clientAxios.get<GestionState>(`/reportes/usuarios`, config);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

    
