
import { AppDispatch, RootState } from "@/redux/store";
import { createResultadoProvider, getResultadoProvider, getResultadosProvider, updateResultadoProvider } from "./resultadosProvider";
import { checkingResultados, cleanCurrentResultadoClave, createResultadoClave, deleteResultadoClave, getResultadoClave, getResultadosClave, setResultadoClaveError, updateResultadoClave } from "./resultadosSlice";
import { ResultadoClaveProps } from "@/interfaces";

export const getResultadosThunk = (filtros: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await getResultadosProvider(filtros, getState)
    if (response.ok) {
        dispatch(getResultadosClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}

export const createResultadoThunk = (resultado: ResultadoClaveProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await createResultadoProvider(resultado, getState)
    if (response.ok) {
        dispatch(createResultadoClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}

export const updateResultadoThunk = (resultado: ResultadoClaveProps) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await updateResultadoProvider(resultado, getState)
    if (response.ok) {
        dispatch(updateResultadoClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}

export const getResultadoThunk = (resultadoId: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await getResultadoProvider(resultadoId, getState)
    if (response.ok) {
        dispatch(getResultadoClave(response.resultado))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}

export const deleteResultadoThunk = (id: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(checkingResultados())
    const response = await getResultadosProvider({ id }, getState)
    if (response.ok) {
        dispatch(deleteResultadoClave(response))
    } else {
        dispatch(setResultadoClaveError(response.errorMessage))
    }
}


export const clearResultadoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(cleanCurrentResultadoClave())
}