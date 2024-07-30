import { ComitesProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


export const comitesApi = createApi({
    reducerPath: 'comitesApi',
    baseQuery: baseQuery,
    tagTypes: ['Comite'],
    endpoints: (builder) => ({
        getComites: builder.query<ComitesProps[], any>({
            query: (filtros) => ({
                url: '/comites',
                method: 'GET',
                params: filtros
            }),
            providesTags: ['Comite'],
            transformResponse: (response: {comites: ComitesProps[]}) => response.comites
        }),
        getComite: builder.query<ComitesProps, {comiteId?: string}>({
            query: ({comiteId}) => `/comites/${comiteId}`,
            providesTags: ['Comite'],
            transformResponse: (response: {comite: ComitesProps}) => response.comite
        }),
        createComite: builder.mutation<Partial<ComitesProps>, FormData>({
            query: (comite) => ({
                url: '/comites',
                method: 'POST',
                body: comite,
            }),
            invalidatesTags: ['Comite'],
            transformResponse: (response: {comite: ComitesProps}) => response.comite,
            onQueryStarted: async (comite, {dispatch, queryFulfilled}) => {
                const temporaryId = 'temporary-id-' + Math.random().toString(36).substr(2, 9);
                const entries = Object.fromEntries(comite.entries());

                const patchResult = dispatch(
                    comitesApi.util.updateQueryData('getComites', {}, (draft) => {
                        draft.push({ 
                            id: temporaryId,
                            ...entries
                        } as ComitesProps)
                    })
                )

                const patchResultComite = dispatch(
                    comitesApi.util.updateQueryData('getComite', {comiteId: temporaryId}, (draft) => {
                        draft = { 
                            id: temporaryId,
                            ...entries
                        } as ComitesProps
                    })
                )

                try {
                    const {data: comite} = await queryFulfilled
                    dispatch (
                        comitesApi.util.updateQueryData('getComites', {}, (draft) => {
                            const index = draft.findIndex( proyecto => proyecto.id === temporaryId )
                            if( index !== -1){
                                draft[index] = comite as ComitesProps
                            }
                        })
                    )
    
                    dispatch (
                        comitesApi.util.updateQueryData('getComite', {comiteId: temporaryId}, (draft) => {
                            draft = comite as ComitesProps
                        })
                    )
                } catch (error) {
                    patchResult.undo()
                    patchResultComite.undo()
                    throw error
                }
            }
        }),
        updateComite: builder.mutation<Partial<ComitesProps>, {comiteId: string, comite: FormData}>({
            query: ({comiteId, comite}) => ({
                url: `/comites/${comiteId}`,
                method: 'PUT',
                body: comite
            }),
            invalidatesTags: ['Comite'],
            transformResponse: (response: {comite: ComitesProps}) => response.comite,
            onQueryStarted: async ({comiteId, comite}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    comitesApi.util.updateQueryData('getComites', {comiteId}, (draft) => {
                        const index = draft.findIndex( comite => comite.id === comiteId )
                        if (index !== -1) {
                            Object.assign(draft[index], comite);
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                    throw error
                }
            }
        }),
        deleteComite: builder.mutation<{comiteId: string}, {comiteId: string}>({
            query: ({comiteId}) => ({
                url: `/comites/${comiteId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Comite'],
            onQueryStarted: async ({comiteId}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    comitesApi.util.updateQueryData('getComites', {}, (draft) => {
                        const index = draft.findIndex( comite => comite.id === comiteId )
                        if( index !== -1){
                            draft.splice(index, 1)
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                    throw error
                }
            }
        })
    })
})

export const {
    useGetComitesQuery,
    useGetComiteQuery,
    useCreateComiteMutation,
    useUpdateComiteMutation,
    useDeleteComiteMutation
} = comitesApi;