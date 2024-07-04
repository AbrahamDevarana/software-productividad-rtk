import { ProyectosProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const proyectosApi = createApi({
    reducerPath: 'proyectosApi',
    baseQuery: baseQuery,
    tagTypes: ['Proyecto'],
    endpoints: (builder) => ({
        getProyectos: builder.query<ProyectosProps[], any>({
            query: (filtros) => ({
                url: '/proyectos',
                method: 'GET',
                params: filtros
            }),
            providesTags: ['Proyecto'],
            transformResponse: (response: {proyectos: ProyectosProps[]}) => response.proyectos
        }),
        getProyecto: builder.query<ProyectosProps, {proyectoId?: string}>({
            query: ({proyectoId}) => `/proyectos/${proyectoId}`,
            providesTags: ['Proyecto'],
            transformResponse: (response: {proyecto: ProyectosProps}) => response.proyecto
        }),
        createProyecto: builder.mutation<ProyectosProps, FormData>({
            query: (proyecto) => ({
                url: '/proyectos',
                method: 'POST',
                body: proyecto,
            }),
            invalidatesTags: ['Proyecto'],
            transformResponse: (response: {proyecto: ProyectosProps}) => response.proyecto,
        }),
        updateProyecto: builder.mutation<ProyectosProps, { proyectoId: string, proyecto: FormData }>({
            query: ({ proyectoId, proyecto }) => ({
                url: `/proyectos/${proyectoId}`,
                method: 'PUT',
                body: proyecto,
            }),
            invalidatesTags: ['Proyecto'],
            onQueryStarted: async ({proyectoId, proyecto}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    proyectosApi.util.updateQueryData('getProyectos', {}, (draft) => {
                        const index = draft.findIndex(proyecto => proyecto.id === proyectoId);
                        if (index !== -1) {
                            Object.assign(draft[index], proyecto);
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            }

        }),
        deleteProyecto: builder.mutation<ProyectosProps, { proyectoId: string}> ({
            query: ({proyectoId}) => ({
                url: `/proyectos/${proyectoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Proyecto']
        })
    })
})

export const {useCreateProyectoMutation, useDeleteProyectoMutation, useGetProyectoQuery, useGetProyectosQuery, useUpdateProyectoMutation} = proyectosApi

