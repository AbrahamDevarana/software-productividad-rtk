
import { AppDispatch, RootState } from "@/redux/store";
import { createResultadoProvider, getResultadosProvider, updateResultadoProvider } from "./resultadosProvider";
import { checkingResultados, cleanCurrentResultadoClave, cleanResultadosClave, createResultadoClave, deleteResultadoClave, getResultadoClave, getResultadosClave, setResultadoClaveError, updateResultadoClave } from "./resultadosSlice";

export const getResultados = (filtros: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await getResultadosProvider(filtros, getState)
    if (response.ok) {
        dispatch(getResultadosClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}

export const createResultado = (resultado: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await createResultadoProvider(resultado, getState)
    if (response.ok) {
        dispatch(createResultadoClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}

export const updateResultado = (resultado: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await updateResultadoProvider(resultado, getState)
    if (response.ok) {
        dispatch(updateResultadoClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}

export const getResultado = (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await getResultadosProvider({ id }, getState)
    if (response.ok) {
        dispatch(getResultadoClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}

export const deleteResultado = (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await getResultadosProvider({ id }, getState)
    if (response.ok) {
        dispatch(deleteResultadoClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}
