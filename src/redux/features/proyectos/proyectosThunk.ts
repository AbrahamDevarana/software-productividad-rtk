import { AppDispatch, RootState } from '@/redux/store';
import { HitosProps, ProyectosProps } from '@/interfaces';
import { checkingProyectos, createProyecto, getProyectos, setProyectosError, updateProyecto, checkingProyecto, clearProyecto, clearProyectos, setProyectoError } from './proyectosSlice';
import { createProyectoProvider, deleteProyectoProvider, getProyectosProvider, updateProyectoProvider } from './proyectosProvider';
import { updateHitoProvider, createHitoProvider } from '../hitos/hitosProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';

export const getProyectosThunk = (filtros: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingProyectos())
    const response = await getProyectosProvider(filtros, getState)
    if (response.ok) {
        dispatch(getProyectos(response.proyectos))
    } else {
        dispatch(setProyectosError(response.errorMessage))
    }
}


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

export const createProyectoThunk = (proyecto: ProyectosProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await createProyectoProvider(proyecto, getState)
    if (response.ok) {
        dispatch(createProyecto(response.proyecto))
    } else {
        dispatch(setProyectosError(response.errorMessage))
    }
}

export const updateProyectoThunk = (proyecto: ProyectosProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await updateProyectoProvider(proyecto, getState)
    if (response.ok) {
        dispatch(updateProyecto(response.proyecto))
    } else {
        dispatch(setProyectosError(response.errorMessage))
    }
}

export const clearProyectoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearProyecto())
}


export const deleteProyectoThunk = (proyectoId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const response = await deleteProyectoProvider(proyectoId, getState)
    if (response.ok) {
        dispatch(clearProyecto())
    } else {
        dispatch(setProyectosError(response.errorMessage))
    }
}




//  Hitos

export const updateHitoProyectoThunk = (hito: HitosProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingProyecto())
    const response = await updateHitoProvider(hito, getState)
    if (response.ok) {
        dispatch(updateProyecto(response.hito))
    } else {
        dispatch(setProyectoError(response.errorMessage))
    }
}



//  Validar si debe existir aquí o en hitos


export const createHitoProyectoThunk = (hito: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingProyecto())
    const response = await createHitoProvider(hito, getState)
    if (response.ok) {
        dispatch(updateProyecto(response.hito))
    } else {
        dispatch(setProyectoError(response.errorMessage))
    }
}
