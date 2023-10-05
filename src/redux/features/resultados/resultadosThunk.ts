
import { AppDispatch, RootState } from "@/redux/store";
import { ResultadoClaveProps } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientAxios } from "@/config/axios";
import { clearResultadoClave, clearCreatedResultado } from "./resultadosSlice";

interface Props {
    resultadosClave: ResultadoClaveProps[]
    resultadoClave: ResultadoClaveProps
}


export const getResultadosThunk = createAsyncThunk( 
    'resultados/getResultados',
    async (operativoId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {operativoId: operativoId}
            }

            const response = await clientAxios.get<Props>(`/resultados`, config);            
            return response.data.resultadosClave
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getResultadoThunk = createAsyncThunk(
    'resultados/getResultado',
    async (resultadoId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get<Props>(`/resultados/${resultadoId}`, config);
        
            return response.data.resultadoClave
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createResultadoThunk = createAsyncThunk(
    'resultados/createResultado',
    async ( params:any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>(`/resultados`, params, config);
                        
            return response.data.resultadoClave
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const duplicateResultadoThunk = createAsyncThunk(
    'resultados/duplicateResultado',
    async ( {resultadoId}:{resultadoId:string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }


            const response = await clientAxios.post<Props>(`/resultados/duplicate`, {resultadoId}, config);
                        
            return response.data.resultadoClave
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateResultadoThunk = createAsyncThunk(
    'resultados/updateResultado',
    async (resultado: ResultadoClaveProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put<Props>(`/resultados/${resultado.id}`, resultado, config);
            return response.data.resultadoClave
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteResultadoThunk = createAsyncThunk(
    'resultados/deleteResultado',
    async (resultadoId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            await clientAxios.delete<Props>(`/resultados/${resultadoId}`, config);
            return resultadoId
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const clearResultadoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearResultadoClave())
}

export const clearCreatedResultadoThunk = () => async (dispatch: AppDispatch) => {
    dispatch(clearCreatedResultado())
}