import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from '@/config/axios'
import { GestionObjetivo, GestionState, UsuarioGestion } from '@/interfaces'

import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from "@/config/baseQuery";




    
export const generarReporteRendimientoThunk = createAsyncThunk(
    'gestion/generarReporteRendimiento',
    async ({year, quarter, search, status, statusUsuario = 'ALL'}:{year:number, quarter:number, search: string, status: string, statusUsuario?: string}, {rejectWithValue, getState}) => {
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
                    status,
                    statusUsuario
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
    tagTypes: ['GestionPeriodos', 'GestionObjetivos'],
    endpoints: (builder) => ({
        getGestionPeriodos: builder.query({
            query: ({year, quarter}:{year:number, quarter:number}) => ({
                url: `/gestion-objetivos`,
                params: { year, quarter },
            }),
            transformResponse: (response: { gestionObjetivo: GestionObjetivo }) => response.gestionObjetivo,
            providesTags: ['GestionPeriodos'],
            transformErrorResponse: (error) => {
                console.log('Error al obtener la gestion de objetivos', error)
                return error
            }
        }),
        updateGestionPeriodos: builder.mutation({
            query: ({ gestionObjetivo }:{ gestionObjetivo : GestionObjetivo }) => ({
                url: `/gestion-objetivos/${gestionObjetivo.id}`,
                method: 'PUT',
                body: gestionObjetivo
            }),
            invalidatesTags: ['GestionPeriodos'],
            transformErrorResponse: (error) => {
                console.log('Error al actualizar la gestion de objetivos', error)
                return error
            }
        }),
        getGestionObjetivos: builder.query({
            query: ({year, quarter, search, status, statusUsuario}:{year:number, quarter:number, search: string, status: string, statusUsuario: string}) => ({
                url: `/reportes/usuarios`,
                params: { year, quarter, search, status, statusUsuario },
            }),
            transformResponse: (response: { usuarios: UsuarioGestion[] }) => response.usuarios,
            providesTags: ['GestionObjetivos'],
            transformErrorResponse: (error) => {
                console.log('Error al obtener la gestion de objetivos', error)
                return error
            }
        }),

    })
})

export const { useGetGestionPeriodosQuery, useUpdateGestionPeriodosMutation, useGetGestionObjetivosQuery } = gestionApi;