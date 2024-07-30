import { ListadoProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


export const listadoApi = createApi({
    reducerPath: 'listadoApi',
    baseQuery: baseQuery,
    tagTypes: ['Listado'],
    endpoints: (builder) => ({
        getListado : builder.query<ListadoProps, {listadoId?: string}>({
            query: ({listadoId}) => `listados/${listadoId}`,
            providesTags: ['Listado'],
            transformResponse: (response: {listado: ListadoProps}) => response.listado
        }),
        getListados: builder.query<ListadoProps[], {comiteId: string}>({
            query: ({comiteId}) => ({
                url: `listados`,
                params: {
                    comiteId: comiteId
                }
            }),
            transformResponse: (response: {listados: ListadoProps[]}) => response.listados,
        }),
        updateListado: builder.mutation<void, Pick<ListadoProps, 'id'> & Partial<ListadoProps>>({
            query: ({id, ...patch}) => ({
                url: `listados/${id}`,
                method: 'PUT',
                body: patch
            }),
            onQueryStarted: async ( {id, ...patch}, { dispatch, queryFulfilled } ) => {
                const patchResult = dispatch(
                    listadoApi.util.updateQueryData('getListados', {comiteId: patch.comiteId!}, (draft) => {
                        const index = draft.findIndex(listado => listado.id === id);
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
        createListado: builder.mutation<ListadoProps, any>({
            query: (listado) => ({
                url: `listados`,
                method: 'POST',
                body: listado
            }),
            transformResponse: (response: {listado: ListadoProps}) => response.listado,
            onQueryStarted: async (listado, { dispatch, queryFulfilled }) => {
                const temporaryId = 'temporary-id-' + Math.random().toString(36).substr(2, 9);

                const patchResult = dispatch(
                    listadoApi.util.updateQueryData('getListados', {comiteId: listado.comiteId}, (draft) => {
                        const defaultProps = {
                            id: temporaryId,
                            ...listado
                        }
                        draft.push(defaultProps)
                    }
                ))

                try {
                    const { data: createdListado } = await queryFulfilled
                    dispatch(
                        listadoApi.util.updateQueryData('getListados', {comiteId: listado.comiteId}, (draft) => {
                            const index = draft.findIndex(listado => listado.id === temporaryId);
                            if (index !== -1) {
                                draft[index] = createdListado;
                            }
                        })
                    )
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
        deleteListado: builder.mutation<void, {id: string, comiteId: string}>({
            query: ({id}) => ({
                url: `listados/${id}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({id, comiteId }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    listadoApi.util.updateQueryData('getListados', {comiteId}, (draft) => {
                        const index = draft.findIndex(listado => listado.id === id);
                        if (index !== -1) {
                            draft.splice(index, 1);
                        }
                    })
                )

                try {
                    await queryFulfilled;
                } catch (error) {
                    patchResult.undo()
                }
            }
        })
            
    })
})


export const { useGetListadoQuery, useGetListadosQuery, useUpdateListadoMutation, useCreateListadoMutation, useDeleteListadoMutation } = listadoApi;