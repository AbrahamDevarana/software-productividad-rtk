import { AppDispatch, RootState } from '@/redux/store';
import { ProyectosProps } from '@/interfaces';
import { checkingProyectos, createProyecto, getProyecto, getProyectos, setProyectosError, updateProyecto, checkingProyecto, clearProyecto, clearProyectos, setProyectoError } from './proyectosSlice';
import { createProyectoProvider, deleteProyectoProvider, getProyectoProvider, getProyectosProvider, updateProyectoProvider } from './proyectosProvider';

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
    dispatch(checkingProyectos())
    const response = await getProyectoProvider(proyectoId, getState)
    if (response.ok) {
        dispatch(getProyecto(response.proyecto))
    } else {
        dispatch(setProyectosError(response.errorMessage))
    }
}

export const createProyectoThunk = (proyecto: ProyectosProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingProyectos())
    const response = await createProyectoProvider(proyecto, getState)
    if (response.ok) {
        dispatch(createProyecto(response.proyecto))
    } else {
        dispatch(setProyectosError(response.errorMessage))
    }
}

export const updateProyectoThunk = (proyecto: ProyectosProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingProyectos())
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


