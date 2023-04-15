import { AppDispatch, RootState } from '@/redux/store';
import { createOperativoProvider, getOperativosProvider, getProyectosProvider, getObjetivoProvider } from './operativosProvider';
import { checkingObjetivo, checkingOperativos, clearOperativo, clearOperativos, clearStatus, createOperativo, deleteOperativo, getObjetivo, getOperativos, getProyectos, setOperativosError, updateOperativo, setObjetivoError } from './operativosSlice';


export const getOperativosThunk = (filtros: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingOperativos())
    const response = await getOperativosProvider(filtros, getState)
    if (response.ok) {
        dispatch(getOperativos(response.operativos))
    } else {
        dispatch(setOperativosError(response.errorMessage))
    }
}

export const getObjetivoThunk = (operativoId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingObjetivo())
    const response = await getObjetivoProvider(operativoId, getState)
    if (response.ok) {
        dispatch(getObjetivo(response.objetivo))
    } else {
        dispatch(setObjetivoError(response.errorMessage))
    }
}


export const getProyectosThunk = (filtros: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingOperativos())
    const response = await getProyectosProvider(filtros, getState)
    if (response.ok) {
        dispatch(getProyectos(response.proyectos))
    } else {
        dispatch(setOperativosError(response.errorMessage))
    }
}


export const createOperativoThunk = (operativo: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingOperativos())
    const response = await createOperativoProvider(operativo, getState)
    if (response.ok) {
        dispatch(createOperativo(response.operativo))
    } else {
        dispatch(setOperativosError(response.errorMessage))
    }
}

export const clearObjetivoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearOperativo())
}

