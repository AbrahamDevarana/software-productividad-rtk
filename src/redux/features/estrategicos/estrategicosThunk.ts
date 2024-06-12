
import { EstrategicoProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const estategicosApi = createApi({
    reducerPath: 'estategicosApi',
    baseQuery: baseQuery,
    tagTypes: ['Estrategia'],
    endpoints: (builder) => ({
        getEstrategicos: builder.query<EstrategicoProps[], any>({
            query: (filtros) => ({
                url: `/estrategicos`,
                params: filtros
            }),
            providesTags: (result) => result  ? [...result.map(({ id, perspectivaId }) => ({ type: 'Estrategia' as const, id, perspectivaId })), { type: 'Estrategia', id: 'LIST' }]
            : [{ type: 'Estrategia', id: 'LIST' }],
            transformResponse: (response: {objetivosEstrategicos: EstrategicoProps[]}) => response.objetivosEstrategicos 

        }),
        getEstrategico: builder.query<EstrategicoProps, string>({
            query: (estrategicoId) => `/estrategicos/${estrategicoId}`,
            transformResponse: (response: {objetivoEstrategico: EstrategicoProps}) => response.objetivoEstrategico,
            providesTags: (result, error, id) => [{ type: 'Estrategia', id }]
        }),
        updateEstrategico: builder.mutation<void, EstrategicoProps>({
            query: (estrategico) => ({
                url: `/estrategicos/${estrategico.id}`,
                method: 'PUT',
                body: estrategico
            }),
            invalidatesTags: (result, error, { id, perspectivaId }) => [{ type: 'Estrategia', id, perspectivaId },  { type: 'Estrategia', id: 'LIST' }, { type: 'Estrategia', id: id }]

        }),
        createEstrategico: builder.mutation({
            query: ({perspectivaId, year}: {perspectivaId: string, year: number}) => ({
                url: `/estrategicos`,
                method: 'POST',
                body: { perspectivaId, year }
            }),
            transformResponse: (response: {objetivoEstrategico: EstrategicoProps}) => response.objetivoEstrategico,
            invalidatesTags: (result, error, { perspectivaId }) => [ { type: 'Estrategia', id: 'LIST' }]
        }),
        changeTypeProgressEstrategico: builder.mutation({
            query: ({estrategicoId, typeProgress}: {estrategicoId: string, typeProgress: string}) => ({
                url: `/estrategicos/changeTypeProgress`,
                method: 'PUT',
                body: { estrategicoId, typeProgress }
            }),
            invalidatesTags: (result, error, { estrategicoId }) => [{ type: 'Estrategia', id: estrategicoId }]
        }),
        deleteEstrategico: builder.mutation({
            query: (estrategicoId: string) => ({
                url: `/estrategicos/${estrategicoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Estrategia', id }]
        }),
        getEstrategicosByArea: builder.query<EstrategicoProps[], {year: number, slug?: string}>({
            query: ({year, slug}) => ({
                url: `/estrategicos/byArea`,
                params: { year, slug }
            }),
            providesTags: (result) => result  ? [...result.map(({ id, perspectivaId }) => ({ type: 'Estrategia' as const, id, perspectivaId })), { type: 'Estrategia', id: 'LIST-AREA' }]
            : [{ type: 'Estrategia', id: 'LIST-AREA' }],
            transformResponse: (response: {objetivosEstrategicos: EstrategicoProps[]}) => response.objetivosEstrategicos 
        }),
    })
})

export const { useGetEstrategicosQuery, useGetEstrategicoQuery, useUpdateEstrategicoMutation, useCreateEstrategicoMutation, useChangeTypeProgressEstrategicoMutation, useDeleteEstrategicoMutation, useGetEstrategicosByAreaQuery } = estategicosApi;
