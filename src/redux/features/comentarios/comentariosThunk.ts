import { ComentarioProps } from '@/interfaces';
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const comentariosApi = createApi({
    reducerPath: 'comentariosApi',
    baseQuery: baseQuery,
    tagTypes: ['Comentarios'],
    endpoints: (build) => ({
        getComentarios: build.query<ComentarioProps[], { comentableType?: string, comentableId?: string | number }>({
            query: ({ comentableType, comentableId }) => ({
                url: `comentarios`,
                params: { comentableType, comentableId }
            }),
            transformResponse: ( response: { comentarios: ComentarioProps[] }) => response.comentarios || []
        }),
        createComentario: build.mutation<ComentarioProps, { mensaje: string, comentableType: string, comentableId: string | number }>({
            query: ({ mensaje, comentableType, comentableId }) => ({
                url: `comentarios`,
                method: 'POST',
                body: { mensaje, comentableType, comentableId }
            }),
            transformResponse: (response: { comentario: ComentarioProps }) => response.comentario,
            onQueryStarted: async ({ mensaje, comentableType, comentableId }, { dispatch, queryFulfilled }) => {
                const tempId = Date.now() + Math.random()
                const patchResult = dispatch(comentariosApi.util.updateQueryData('getComentarios', { comentableType, comentableId }, (draft) => {
                    const defaultProps: ComentarioProps = {
                        id: tempId,
                        mensaje,
                        comentableType,
                        comentableId,
                        createdAt: new Date().toISOString()
                    } as ComentarioProps
                    draft?.push(defaultProps)
                    })
                )

                try {
                    
                    const { data: comentario } = await queryFulfilled
                    dispatch(comentariosApi.util.updateQueryData('getComentarios', { comentableType, comentableId }, (draft) => {
                        const index = draft.findIndex(comment => comment.id === tempId);
                        if (index !== -1) {
                            draft[index] = comentario
                        }
                    }))
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
        deleteComentario: build.mutation<ComentarioProps, { id: number, comentableId: string | number, comentableType: string }>({
            query: ({id}) => ({
                url: `comentarios/${id}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({id, comentableId, comentableType}, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    comentariosApi.util.updateQueryData('getComentarios', { comentableType, comentableId }, (draft) => {
                    const index = draft.findIndex(comment => comment.id === id);
                        if (index !== -1) {
                            draft.splice(index, 1)
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            },
        })
    })
})

export const { useGetComentariosQuery, useCreateComentarioMutation, useDeleteComentarioMutation } = comentariosApi;