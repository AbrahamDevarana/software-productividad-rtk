
import { AppDispatch, RootState } from "@/redux/store";
import { ResultadoClaveProps } from "@/interfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientAxios } from "@/config/axios";
import { clearResultadoClave } from "./resultadosSlice";

interface Props {
    resultadosClave: ResultadoClaveProps[]
    resultadoClave: ResultadoClaveProps
}


export const getResultadosThunk = createAsyncThunk( 
    'resultados/getResultados',
    async (filtros: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
            }

            const params = {
                operativoId: filtros
            }

            const response = await clientAxios.get<Props>(`/resultados`, {...config, params});           
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
    async ( operativoId: string, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>(`/resultados`, {operativoId}, config);
                        
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