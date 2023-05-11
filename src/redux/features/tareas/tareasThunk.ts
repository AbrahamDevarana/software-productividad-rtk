
import {createAsyncThunk} from '@reduxjs/toolkit';
import { TareasProps } from '@/interfaces';
import { RootState } from '@/redux/store';
import { clientAxios } from '@/config/axios';


export const getTareaThunk = createAsyncThunk(
    'tareas/getTarea',
    async (tareaId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get(`/tareas/${tareaId}`, config);
            return response.data.tarea as TareasProps
            
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createTareaThunk = createAsyncThunk(
    'tareas/createTarea',
    async (tarea: TareasProps, {rejectWithValue, getState}) => {    
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post(`/tareas`, tarea, config);
            return response.data.tarea as TareasProps
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateTareaThunk = createAsyncThunk(
    'tareas/updateTarea',
    async (tarea: TareasProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put(`/tareas/${tarea.id}`, tarea, config);
            return response.data.tarea as TareasProps
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)