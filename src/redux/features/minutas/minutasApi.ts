import { MinutasProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


export const minutasApi = createApi({
    reducerPath: 'minutasApi',
    baseQuery: baseQuery,
    tagTypes: ['Minutas'],
    endpoints: (builder) => ({
        getMinutas: builder.query<MinutasProps[], {proyectoId: string}>({
            query: ({proyectoId}) => ({
                url: `minutas`,
                params: {
                    proyectoId
                }
            }),
            transformResponse: (response: {minutas: MinutasProps[]}) => response.minutas
        }),
        getMinuta: builder.query<MinutasProps, {id?: string}>({
            query: ({id}) => `minutas/${id}`,
            transformResponse: (response: {minuta: MinutasProps}) => response.minuta,
            providesTags: ['Minutas'],
        }),
        createMinuta: builder.mutation<MinutasProps, Partial<MinutasProps>>({
            query: (body) => ({
                url: `minutas`,
                method: 'POST',
                body
            }),
            onQueryStarted: async (body, {dispatch, queryFulfilled}) => {
                const temporaryId = 'temporary-id-' + Math.random().toString(36).substr(2, 9);
                const patchResult = dispatch(
                    minutasApi.util.updateQueryData('getMinutas', {proyectoId: body.minuteableId!}, (draft) => {
                        draft.push({...body, id: temporaryId, updatedAt: new Date().toString(), titulo: 'Cargando...', descripcion: 'Cargando...', fecha: new Date(), authorId: 'Cargando...', minuteableType: 'PROYECTO', minuteableId: 'Cargando...'})
                    })
                )

                try {
                    const {data : minuta} = await queryFulfilled;
                    dispatch(
                        minutasApi.util.updateQueryData('getMinutas', {proyectoId: body.minuteableId!}, (draft) => {
                            const index = draft.findIndex(minuta => minuta.id === temporaryId);
                            if (index !== -1) {
                                Object.assign(draft[index], minuta);
                            }
                        })
                    )
                } catch (error) {
                    patchResult.undo()
                }
            }
            
        }),
        updateMinuta: builder.mutation<MinutasProps, Partial<MinutasProps>>({
            query: ({id, ...body}) => ({
                url: `minutas/${id}`,
                method: 'PUT',
                body
            }),
            onQueryStarted: async ({id, ...body}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    minutasApi.util.updateQueryData('getMinutas', {proyectoId: body.minuteableId!}, (draft) => {
                        const index = draft.findIndex(minuta => minuta.id === id);
                        if (index !== -1) {
                            Object.assign(draft[index], body);
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
        deleteMinuta: builder.mutation<void, {id: string}>({
            query: ({id}) => ({
                url: `minutas/${id}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({id}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    minutasApi.util.updateQueryData('getMinutas', {proyectoId: id}, (draft) => {
                        const index = draft.findIndex(minuta => minuta.id === id);
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
        }),
    })
});

export const {
    useGetMinutasQuery,
    useGetMinutaQuery,
    useCreateMinutaMutation,
    useUpdateMinutaMutation,
    useDeleteMinutaMutation
} = minutasApi;
    