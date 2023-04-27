import { AppDispatch, RootState } from '@/redux/store';
import { HitosProps, ProyectosProps } from '@/interfaces';
import { checkingProyectos, createProyecto, getProyecto, getProyectos, setProyectosError, updateProyecto, checkingProyecto, clearProyecto, clearProyectos, setProyectoError } from './proyectosSlice';
import { createProyectoProvider, deleteProyectoProvider, getProyectoProvider, getProyectosProvider, updateProyectoProvider } from './proyectosProvider';
import { updateHitoProvider, createHitoProvider } from '../hitos/hitosProvider';

export const getProyectosThunk = (filtros: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingProyectos())
    const response = await getProyectosProvider(filtros, getState)
    if (response.ok) {
        dispatch(getProyectos(response.proyectos))
    } else {
        dispatch(setProyectosError(response.errorMessage))
    }
}

export const getProyectoThunk = (proyectoId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingProyecto())
    const response = await getProyectoProvider(proyectoId, getState)
    if (response.ok) {
        dispatch(getProyecto(response.proyecto))
    } else {
        dispatch(setProyectosError(response.errorMessage))
    }
}

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

export const createHitoProyectoThunk = (hito: HitosProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingProyecto())
    const response = await createHitoProvider(hito, getState)
    if (response.ok) {
        dispatch(updateProyecto(response.hito))
    } else {
        dispatch(setProyectoError(response.errorMessage))
    }
}