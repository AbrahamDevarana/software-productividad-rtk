import { AppDispatch, RootState } from '@/redux/store';
import { ProyectosProps } from '@/interfaces';
import { clearProyecto, clearProyectos } from './proyectosSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';


export const getProyectosThunk = createAsyncThunk(
    'proyectos/getProyectos',
    async (filtros: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }
            const response = await clientAxios.get('/proyectos', config);
            return response.data.proyectos as ProyectosProps[]
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getProyectoThunk = createAsyncThunk(
    'proyectos/getProyecto',
    async (proyectoId: string, { rejectWithValue, getState }) => {
       try{
        const { accessToken } = (getState() as RootState).auth;
        const config = {
            headers: { "accessToken": `${accessToken}` }
        }
            const response = await clientAxios.get(`/proyectos/${proyectoId}`, config);
            return response.data.proyecto as ProyectosProps
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createProyectoThunk = createAsyncThunk(
    'proyectos/createProyecto',
    async (proyecto: ProyectosProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.post('/proyectos', proyecto, config);
            return response.data.proyecto as ProyectosProps
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateProyectoThunk = createAsyncThunk(
    'proyectos/updateProyecto',
    async (proyecto: ProyectosProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);
            return response.data.proyecto as ProyectosProps
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteProyectoThunk = createAsyncThunk(
    'proyectos/deleteProyecto',
    async (proyectoId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete(`/proyectos/${proyectoId}`, config);
            return response.data.proyecto as ProyectosProps
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const clearProyectoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearProyecto())
}

export const clearProyectosThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearProyectos())
}



// //  Hitos

// export const updateHitoProyectoThunk = (hito: HitosProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
//     dispatch(checkingProyecto())
//     const response = await updateHitoProvider(hito, getState)
//     if (response.ok) {
//         dispatch(updateProyecto(response.hito))
//     } else {
//         dispatch(setProyectoError(response.errorMessage))
//     }
// }



// //  Validar si debe existir aquí o en hitos


// export const createHitoProyectoThunk = (hito: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
//     dispatch(checkingProyecto())
//     const response = await createHitoProvider(hito, getState)
//     if (response.ok) {
//         dispatch(updateProyecto(response.hito))
//     } else {
//         dispatch(setProyectoError(response.errorMessage))
//     }
// }
