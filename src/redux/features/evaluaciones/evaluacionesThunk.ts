
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";
import { EvaluacionResultadosProps, SinglePerfilProps, UsuarioProps } from "@/interfaces";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from "@/config/baseQuery";


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
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const postEvaluacionThunk = createAsyncThunk(
    'profile/postEvaluacion',
    async (props: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.post(`/evaluacion/respuestas`, props, config);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)




// RTK Query

interface EvaluacionEvalado {
    evaluacionId: number,
    evaluadorId: number,
    evaluadoId: number,
    evaluador: UsuarioProps
    status: boolean
}

interface EvaluacionUsuarioProps extends UsuarioProps {
    evaluacionesEvaluado: EvaluacionEvalado[]
    evaluacion: {
        id: number,
        nombre: string
    }
}





export const evaluacionApi = createApi({
    reducerPath: 'evaluacionApi',
    baseQuery: baseQuery,
    tagTypes: ['Gestion'],
    endpoints: (builder) => ({
        getEvaluacionUsuarios: builder.query({
            query: ({year, quarter}: {year:number, quarter:number}) => ({
                url: `evaluacion/competencias`,
                params: { year, quarter },
            }),
            providesTags: ['Gestion'],
            transformResponse: (response: {usuarios : EvaluacionUsuarioProps[]}) => {
                return response.usuarios
            }
        }),
        getEvaluacionUsuario: builder.query({
            query: ({year, quarter, usuarioId}: {year:number, quarter:number, usuarioId:string}) => ({
                url: `evaluacion/competencias/${usuarioId}`,
                params: { year, quarter },
            }),
            providesTags: ['Gestion'],
            transformResponse: (response: {usuario : EvaluacionUsuarioProps}) => {
                return response.usuario
            }
        }),
        createAsignacionEvaluacion: builder.mutation<any, { tipoEvaluacionId: number, evaluadorId: string, evaluadoId: string, year:number, quarter:number }>({
            query: (body) => ({
                url: `evaluacion/competencias`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Gestion'],
        }),
        deleteAsignacionEvaluacion: builder.mutation<any, { tipoEvaluacionId: number, evaluadorId: string, evaluadoId: string, year:number, quarter:number }>({
            query: (body) => ({
                url: `evaluacion/competencias`,
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['Gestion'],
        }),
        generateAsignacionesEvaluacion: builder.mutation<any, { year: number, quarter: number }>({
            query: (body) => ({
                url: `evaluacion/competencias/generate`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Gestion'],
        }),
    }),
})


export const { useGetEvaluacionUsuariosQuery, useGetEvaluacionUsuarioQuery, useCreateAsignacionEvaluacionMutation, useDeleteAsignacionEvaluacionMutation, useGenerateAsignacionesEvaluacionMutation } = evaluacionApi;