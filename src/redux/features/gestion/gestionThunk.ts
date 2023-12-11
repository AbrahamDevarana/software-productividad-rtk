import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from '@/config/axios'
import { GestionObjetivo, GestionState } from '@/interfaces'

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from "@/config/baseQuery";




export const obtenerUsuariosThunk = createAsyncThunk(
    'gestion/obtenerUsuarios',
    async ({year, quarter, search, status}:{year:number, quarter:number, search: string, status: string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter,
                    search,
                    status
                }
            }
            const response = await clientAxios.get<GestionState>(`/reportes/usuarios`, config);            
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

    
export const generarReporteRendimientoThunk = createAsyncThunk(
    'gestion/generarReporteRendimiento',
    async ({year, quarter, search, status}:{year:number, quarter:number, search: string, status: string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { 
                    "accessToken": `${accessToken}`,
                },
                params: {
                    year,
                    quarter,
                    search,
                    status
                }
            }
            await clientAxios.get(`/reportes/usuarios/generar`, {...config, responseType: 'blob'}).then( (response) => {
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `ReporteRendimiento-${year}-${quarter}.xlsx`);
                document.body.appendChild(link);
                link.click();
                return response.data
            }).catch( (error) => {
                console.log('Error al generar el reporte de rendimiento', error);
                return rejectWithValue(error.response.data)
            })
        } catch (error: any) {
            console.log('Error al generar el reporte de rendimiento', error);
            
            return rejectWithValue(error.response.data)
        }
    }
)



export const gestionApi = createApi({
    reducerPath: 'gestionApi',
    baseQuery: baseQuery,
    tagTypes: ['Gestion'],
    endpoints: (builder) => ({
        getGestionObjetivos: builder.query({
            query: ({year, quarter}:{year:number, quarter:number}) => ({
                url: `/gestion-objetivos`,
                params: { year, quarter },
            }),
            transformResponse: (response: { gestionObjetivo: GestionObjetivo }) => response.gestionObjetivo,
            providesTags: ['Gestion'],
            transformErrorResponse: (error) => {
                console.log('Error al obtener la gestion de objetivos', error)
                return error
            }
        }),
        updateGestionObjetivos: builder.mutation({
            query: ({ gestionObjetivo }:{ gestionObjetivo : GestionObjetivo }) => ({
                url: `/gestion-objetivos/${gestionObjetivo.id}`,
                method: 'PUT',
                body: gestionObjetivo
            }),
            invalidatesTags: ['Gestion'],
            transformErrorResponse: (error) => {
                console.log('Error al actualizar la gestion de objetivos', error)
                return error
            }
        })
    })
})

export const { useGetGestionObjetivosQuery, useUpdateGestionObjetivosMutation } = gestionApi;