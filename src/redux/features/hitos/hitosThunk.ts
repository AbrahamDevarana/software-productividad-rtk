import { HitosProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


export const hitosApi = createApi({
    reducerPath: 'hitosApi',
    baseQuery: baseQuery,
    tagTypes: ['Hitos'],
    endpoints: (builder) => ({
        getHito : builder.query<HitosProps, {hitoId?: string}>({
            query: ({hitoId}) => `hitos/${hitoId}`,
            providesTags: ['Hitos'],
            transformResponse: (response: {hito: HitosProps}) => response.hito
        }),
        getHitos: builder.query<HitosProps[], {proyectoId: string}>({
            query: ({proyectoId}) => ({
                url: `hitos`,
                params: {
                    proyectoId: proyectoId
                }
            }),
            transformResponse: (response: {hitos: HitosProps[]}) => response.hitos,
        }),
        updateHito: builder.mutation<void, Pick<HitosProps, 'id'> & Partial<HitosProps>>({
            query: ({id, ...patch}) => ({
                url: `hitos/${id}`,
                method: 'PUT',
                body: patch
            }),
            onQueryStarted: async ( {id, ...patch}, { dispatch, queryFulfilled } ) => {
                const patchResult = dispatch(
                    hitosApi.util.updateQueryData('getHitos', {proyectoId: patch.proyectoId!}, (draft) => {
                        const index = draft.findIndex(hito => hito.id === id);
                        if (index !== -1) {
                            Object.assign(draft[index], patch);
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
        createHito: builder.mutation<HitosProps, any>({
            query: (hito) => ({
                url: `hitos`,
                method: 'POST',
                body: hito
            }),
            transformResponse: (response: {hito: HitosProps}) => response.hito,
            onQueryStarted: async (hito, { dispatch, queryFulfilled }) => {
                const temporaryId = 'temporary-id-' + Math.random().toString(36).substr(2, 9);

                const patchResult = dispatch(
                    hitosApi.util.updateQueryData('getHitos', {proyectoId: hito.proyectoId}, (draft) => {
                        const defaultProps = {
                            id: temporaryId,
                            titulo: 'Nueva Sección...',
                            color: '#656A76',
                        }
                        
                        draft.push({...defaultProps, ...hito})
                    })
                )
                try {
                    const {data: createdHito } = await queryFulfilled
                    dispatch(
                            hitosApi.util.updateQueryData('getHitos', {proyectoId: hito.proyectoId}, (draft) => {
                                const index = draft.findIndex(hito => hito.id === temporaryId);
                                if (index !== -1) {
                                    draft[index] = createdHito
                                }
                            }
                        )
                    )
                } catch (error) {
                    patchResult.undo()
                }
            },
        }),
        deleteHito: builder.mutation<string, {hitoId: string, proyectoId: string}>({
            query: ({hitoId}) => ({
                url: `hitos/${hitoId}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({hitoId, proyectoId}, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    hitosApi.util.updateQueryData('getHitos', { proyectoId }, (draft) => {
                        const index = draft.findIndex(hito => hito.id === hitoId);
                        if (index !== -1) {
                            draft.splice(index, 1);
                        }
                    })
                );
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            },
            invalidatesTags: ['Hitos']
        }),
        duplicateHito: builder.mutation<HitosProps, {hitoId: string, proyectoId: string}>({
            query: ({hitoId, proyectoId}) => ({
                url: `hitos/duplicate`,
                method: 'POST',
                body: {
                    hitoId
                }
            }),
            onQueryStarted: async ({hitoId, proyectoId}, { dispatch, queryFulfilled }) => {
               const temporaryId = 'temporary-id-' + Math.random().toString(36).substr(2, 9);
                const patchResult = dispatch(
                    hitosApi.util.updateQueryData('getHitos', { proyectoId }, (draft) => {
                        const hito = draft.find(hito => hito.id === hitoId);
                        const defaultProps = {
                            ...hito,
                            id: temporaryId,
                            titulo: 'Nueva Sección...',
                            color: '#656A76',
                        }
                        if (hito) {
                            draft.push({...hito, ...defaultProps})
                        }
                    })
                )
                try {
                    const {data: duplicatedHito} = await queryFulfilled

                    console.log(duplicatedHito);
                    
                    dispatch(
                        hitosApi.util.updateQueryData('getHitos', { proyectoId }, (draft) => {
                            const index = draft.findIndex(hito => hito.id === temporaryId);

                            console.log(index);
                            
                            if (index !== -1) {
                                draft[index] = duplicatedHito
                            }
                        })
                    )
                } catch (error) {
                    patchResult.undo()
                }
            }
        })
    })  
})


export const { useGetHitosQuery, useGetHitoQuery, useUpdateHitoMutation, useCreateHitoMutation, useDeleteHitoMutation, useDuplicateHitoMutation } = hitosApi;