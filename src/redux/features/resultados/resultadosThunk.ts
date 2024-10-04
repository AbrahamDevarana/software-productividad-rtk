import { ResultadoClaveProps } from "@/interfaces";
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';

export const resultadosApi = createApi({
    reducerPath: 'resultadosApi',
    baseQuery: baseQuery,
    tagTypes: ['Resultados'],
    endpoints: (builder) => ({
        getResultados: builder.query<ResultadoClaveProps[], {operativoId: string}>({
            query: ({operativoId}) => ({
                url: `/resultados`,
                params: {operativoId}
            }),
            providesTags: ['Resultados'],
            transformResponse: (response: { resultadosClave: ResultadoClaveProps[]}) => response.resultadosClave
        }),
        createResultado: builder.mutation<ResultadoClaveProps, any>({
            query: (resultado) => ({
                url: `/resultados`,
                method: 'POST',
                body: resultado
            }),
            transformResponse: (response: { resultadoClave: ResultadoClaveProps }) => response.resultadoClave,
            onQueryStarted: async (resultado, { dispatch, queryFulfilled }) => {                
                const temporaryId = Math.floor(Math.random() * 1000000).toString()
                const patchResult = dispatch(
                    resultadosApi.util.updateQueryData('getResultados', {operativoId: resultado.operativoId}, (draft) => {
                        const defaultProps = {
                            id: temporaryId,
                            nombre: 'Nuevo resultado clave',
                            fechaInicio: new Date().toISOString(),
                            fechaFin: new Date().toISOString(),
                            progreso: 0,
                            tipoProgreso: 'acciones',
                            color: 'rgba(101, 106, 118, 1)',
                            status: 'SIN_INICIAR',
                            ...resultado
                        }
                        draft.push(defaultProps)
                })
            )
                try {
                    const { data } = await queryFulfilled
                    dispatch(
                        resultadosApi.util.updateQueryData('getResultados', {operativoId: resultado.operativoId}, (draft) => {
                            const index = draft.findIndex(resultado => resultado.id === temporaryId)
                            console.log(draft.findIndex(resultado => resultado.id === temporaryId));
                            
                            if (index !== -1) {
                                
                                draft[index] = data
                            }
                        })
                    )
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
        updateResultado: builder.mutation<ResultadoClaveProps, ResultadoClaveProps>({
            query: (resultado) => ({
                url: `/resultados/${resultado.id}`,
                method: 'PUT',
                body: resultado
            }),
            onQueryStarted: async (resultado, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    resultadosApi.util.updateQueryData('getResultados', {operativoId: resultado.operativoId}, (draft) => {
                        const index = draft.findIndex(item => item.id === resultado.id)
                        if (index !== -1) {
                            draft[index] = resultado
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
        deleteResultado: builder.mutation<void, ResultadoClaveProps>({
            query: (resultado) => ({
                url: `/resultados/${resultado.id}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({id, operativoId}, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    resultadosApi.util.updateQueryData('getResultados', {operativoId: operativoId}, (draft) => {
                        const index = draft.findIndex(item => item.id === id)
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
            }
        }),
        duplicateResultado: builder.mutation<ResultadoClaveProps, ResultadoClaveProps>({
            query: (resultado) => ({
                url: `/resultados/duplicate`,
                method: 'POST',
                body: {
                    resultadoId: resultado.id
                }
            }),
            transformResponse: (response: { resultadoClave: ResultadoClaveProps }) => response.resultadoClave,
            onQueryStarted: async (resultado, { dispatch, queryFulfilled }) => {                
                const temporaryId = Math.floor(Math.random() * 1000000).toString()
                const patchResult = dispatch(
                    resultadosApi.util.updateQueryData('getResultados', {operativoId: resultado.operativoId}, (draft) => {
                        const defaultProps = {
                            ...resultado,
                            id: temporaryId
                        }
                        draft.push(defaultProps)
                })
            )
                try {
                    const { data } = await queryFulfilled
                    dispatch(
                        resultadosApi.util.updateQueryData('getResultados', {operativoId: resultado.operativoId}, (draft) => {
                            const index = draft.findIndex(resultado => resultado.id === temporaryId)
                            console.log(draft.findIndex(resultado => resultado.id === temporaryId));
                            
                            if (index !== -1) {
                                
                                draft[index] = data
                            }
                        })
                    )
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
    }),
})

export const { useGetResultadosQuery, useCreateResultadoMutation, useUpdateResultadoMutation, useDeleteResultadoMutation, useDuplicateResultadoMutation } = resultadosApi