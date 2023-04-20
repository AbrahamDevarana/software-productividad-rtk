import { AppDispatch, RootState } from '@/redux/store';
import { createObjetivoProvider, getOperativosProvider, getProyectosProvider, getObjetivoProvider, deleteObjetivoProvider, updateObjetivoProvider} from './operativosProvider';
import { checkingObjetivo, checkingOperativos, clearOperativo, clearOperativos, clearStatus, createObjetivo, deleteObjetivo, getObjetivo, getOperativos, getProyectos, setOperativosError, updateObjetivo, setObjetivoError } from './operativosSlice';
import { OperativoProps } from '@/interfaces';


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


export const createObjetivoThunk = (operativo: OperativoProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingOperativos())
    const response = await createObjetivoProvider(operativo, getState)
    if (response.ok) {
        dispatch(createObjetivo(response.operativo))
    } else {
        dispatch(setOperativosError(response.errorMessage))
    }
}

export const updateObjetivoThunk = (operativo: OperativoProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingOperativos())
    
    const response = await updateObjetivoProvider(operativo, getState)
    if (response.ok) {
        dispatch(updateObjetivo(response.operativo))
    }else {
        dispatch(setOperativosError(response.errorMessage))
    }   
}

export const clearObjetivoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearOperativo())
}

