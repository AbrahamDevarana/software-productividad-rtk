import { ProyectosProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const proyectosApi = createApi({
    reducerPath: 'proyectosApi',
    baseQuery: baseQuery,
    tagTypes: ['Proyecto'],
    endpoints: (builder) => ({
        getProyectos: builder.query<ProyectosProps[], {categoriaId?: string}>({
            query: ({categoriaId}) => ({
                url: '/proyectos',
                method: 'GET',
                params: {categoriaId}
            }),
            providesTags: ['Proyecto'],
            transformResponse: (response: {proyectos: ProyectosProps[]}) => response.proyectos
        }),
        getProyecto: builder.query<ProyectosProps, {proyectoId?: string}>({
            query: ({proyectoId}) => `/proyectos/${proyectoId}`,
            providesTags: ['Proyecto'],
            transformResponse: (response: {proyecto: ProyectosProps}) => response.proyecto
        }),
        createProyecto: builder.mutation<Partial<ProyectosProps>, FormData>({
            query: (proyecto) => ({
                url: '/proyectos',
                method: 'POST',
                body: proyecto,
            }),
            invalidatesTags: ['Proyecto'],
            transformResponse: (response: {proyecto: ProyectosProps}) => response.proyecto,
            onQueryStarted: async (proyecto, {dispatch, queryFulfilled}) => {

            const temporaryId = 'temporary-id-' + Math.random().toString(36).substr(2, 9);

            // to object of entries
            
            const entries = Object.fromEntries(proyecto.entries())      

            const patchResult = dispatch(
                proyectosApi.util.updateQueryData('getProyectos', {}, (draft) => {
                    draft.push({ 
                        id: temporaryId,
                       ...entries
                    } as ProyectosProps)
                })
            )

            const patchResultProyecto = dispatch(
                proyectosApi.util.updateQueryData('getProyecto', {proyectoId: temporaryId}, (draft) => {
                    draft = { 
                        id: temporaryId,
                        ...entries
                    } as ProyectosProps
                })
            )

            try {
                const {data: proyecto} = await queryFulfilled

                dispatch (
                    proyectosApi.util.updateQueryData('getProyectos', {}, (draft) => {
                        const index = draft.findIndex( proyecto => proyecto.id === temporaryId )
                        if( index !== -1){
                            draft[index] = proyecto as ProyectosProps
                        }
                    })
                )

                dispatch (
                    proyectosApi.util.updateQueryData('getProyecto', {proyectoId: temporaryId}, (draft) => {
                        draft = proyecto as ProyectosProps
                    })
                )
            } catch (error) {
                patchResult.undo()
                patchResultProyecto.undo()
            }}
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
            invalidatesTags: ['Proyecto'],
            onQueryStarted: async ({proyectoId}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    proyectosApi.util.updateQueryData('getProyectos', {}, (draft) => {
                        const index = draft.findIndex(proyecto => proyecto.id === proyectoId);
                        if (index !== -1) {
                            draft.splice(index, 1);
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            }
        })
    })
})

export const {useCreateProyectoMutation, useDeleteProyectoMutation, useGetProyectoQuery, useGetProyectosQuery, useUpdateProyectoMutation} = proyectosApi

