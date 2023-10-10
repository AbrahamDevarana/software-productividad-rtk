
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";
import { EvaluacionResultadosProps, SinglePerfilProps } from "@/interfaces";


interface Props {
    ok: boolean;
    evaluacionLider: SinglePerfilProps;
    evaluacionPropia: SinglePerfilProps;
    evaluacionColaborador: SinglePerfilProps[];
    evaluacionResultados: EvaluacionResultadosProps[];
    evaluacionResultadosColaboradores: EvaluacionResultadosProps[];

}

export const getUsuariosAEvaluarThunk = createAsyncThunk(
    'evaluaciones/getUsuariosAEvaluarThunk',
    async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }
            const response = await clientAxios.get<Props>(`/evaluacion/usuarios/${usuarioId}`, config);
            
            return response.data


        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getEvaluacionThunk = createAsyncThunk(
    'evaluaciones/getEvaluacion',
    async ({usuarioId, year, quarter, evaluadoId}:{usuarioId: string, year:number, quarter:number, evaluadoId:string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter,
                    evaluadoId
                }
            }
            const response = await clientAxios.get(`/evaluacion/${usuarioId}`, config);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getEvaluacionResultadosThunk = createAsyncThunk(
    'evaluaciones/getEvaluacionResultados',
    async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }

            const response = await clientAxios.get(`/evaluacion/resultados/${usuarioId}`, config);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getEvaluacionResultadosLiderThunk = createAsyncThunk(
    'evaluaciones/getEvaluacionResultadosLider',
    async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }

            const response = await clientAxios.get<Props>(`/evaluacion/resultados/lider/${usuarioId}`, config);
            console.log(response.data);
            
                   
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)