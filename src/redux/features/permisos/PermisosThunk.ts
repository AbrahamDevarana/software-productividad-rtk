
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clientAxios } from '@/config/axios';
import { PermisoProps } from '@/interfaces';



interface Props {
    permiso: PermisoProps
    permisos: PermisoProps[]
}

export const getPermisosThunk = createAsyncThunk(
    'permisos/getPermisos',
    async (arg, { rejectWithValue, getState }) => {
        
        const { accessToken } = (getState() as RootState).auth;

        const config = {
            headers: { "accessToken": `${accessToken}` }
        }
        try {
            const response = await clientAxios.get<Props>(`/permisos`, config);
            
            return response.data.permisos
        }

        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
