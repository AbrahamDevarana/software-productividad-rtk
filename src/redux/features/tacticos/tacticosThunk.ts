import { CoreProps, TacticoProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';

interface Props {
    objetivosTacticos: TacticoProps[]
    objetivoTactico: TacticoProps
    objetivosCore: CoreProps[]
    objetivoCore: CoreProps
}



export const tacticosApi = createApi({
    reducerPath: 'tacticosApi',
    baseQuery: baseQuery,
    tagTypes: ['Tacticos'],
    endpoints: (builder) => ({
        getTacticosByEstrategia: builder.query<TacticoProps[], {estrategicoId?: string, year: number, showOnlyMe: boolean}>({
            query: ({estrategicoId, year, showOnlyMe, ...props}) => ({
                url: `/tacticos/byEstrategia`,
                params: { estrategicoId, year, showOnlyMe, ...props}
            }),
            transformResponse: (response: { objetivosTacticos: TacticoProps[] }, meta, arg) => response.objetivosTacticos,
            providesTags: (result, error, {estrategicoId}) => [{ type: 'Tacticos', estrategicoId }],
        }),
        getTacticos: builder.query({
            query: (filtros: any) => ({
                url: `/tacticos`,
                params: filtros
            }),
            transformResponse: (response: { objetivosTacticos: TacticoProps[] }) => response.objetivosTacticos,
            providesTags: ['Tacticos']
        }),
        getTactico: builder.query({
            query: ({tacticoId}: {tacticoId?: string}) => `/tacticos/${tacticoId}`,
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            providesTags: (result, error, tacticoId) => [{ type: 'Tacticos', tacticoId }],
        }),
        getTacticosByEquipos: builder.query({
            query: ({departamentoId, year, showOnlyMe}: {departamentoId?: number | string, year: number, showOnlyMe: boolean}) => ({
                url: `/tacticos/byEquipo`,
                params: { departamentoId, year, showOnlyMe}
            }),
            transformResponse: (response: { objetivosTacticos: TacticoProps[] }) => response.objetivosTacticos,
            providesTags: ['Tacticos']
        }),
        getTacticosByEquipoCore: builder.query({
            query: ({departamentoId, year, showOnlyMe}: {departamentoId?: number | string, year: number, showOnlyMe: boolean}) => ({
                url: `/tacticos/byEquipoCore`,
                params: { departamentoId, year, showOnlyMe}
            }),
            transformResponse: (response: { objetivosCore: CoreProps[] }) => response.objetivosCore,
            providesTags: ['Tacticos']
        }),
        updateTactico: builder.mutation <TacticoProps, Partial<TacticoProps> & Pick<TacticoProps, 'id'>> ({
            query: ({id, ...tactico}) => ({
                url: `/tacticos/${id}`,
                method: 'PUT',
                body: tactico
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos']
        }),
        createTactico: builder.mutation <TacticoProps, {year: number, estrategicoId?: string, slug?: string, propietarioId?: string}> ({
            query: ({year, estrategicoId, slug, propietarioId}) => ({
                url: `/tacticos`,
                method: 'POST',
                body: { year, estrategicoId, slug, propietarioId }
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos'],
        }),
        updateTyp: builder.mutation <TacticoProps, {tacticoId: string, type: string, estrategicoId?: string}> ({
            query: ({tacticoId, type, estrategicoId}: {tacticoId: string, type: string, estrategicoId?: string}) => ({
                url: `/tacticos/changeType`,
                method: 'PUT',
                body: { tacticoId, type, estrategicoId }
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos']
        }),
        updateTypeProgress: builder.mutation <TacticoProps, {tacticoId: string, type: string}> ({
            query: ({tacticoId, type}: {tacticoId: string, type: string}) => ({
                url: `/tacticos/changeTypeProgress`,
                method: 'PUT',
                body: { tacticoId, type }
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos']
        }),
        deleteTactico: builder.mutation <TacticoProps, {tacticoId: string}> ({
            query: ({tacticoId}: {tacticoId: string}) => ({
                url: `/tacticos/${tacticoId}`,
                method: 'DELETE'
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos']
        }),
    })

})

export const { 
        useGetTacticosQuery,
        useGetTacticoQuery,
        useGetTacticosByEstrategiaQuery,
        useGetTacticosByEquiposQuery,
        useGetTacticosByEquipoCoreQuery,
        useCreateTacticoMutation,
        useUpdateTacticoMutation,
        useUpdateTypeProgressMutation,
        useUpdateTypMutation,
        useDeleteTacticoMutation
    } = tacticosApi;

