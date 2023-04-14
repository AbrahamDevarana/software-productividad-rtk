import { AppDispatch, RootState } from '@/redux/store';
import { createOperativoProvider, getOperativosProvider, getProyectosProvider } from './operativosProvider';
import { checkingOperativos, clearOperativo, clearOperativos, clearStatus, createOperativo, deleteOperativo, getOperativo, getOperativos, getProyectos, setOperativosError, updateOperativo } from './operativosSlice';


export const getOperativosThunk = (filtros: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingOperativos())
    const response = await getOperativosProvider(filtros, getState)
    if (response.ok) {
        dispatch(getOperativos(response.operativos))
    } else {
        dispatch(setOperativosError(response.errorMessage))
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
