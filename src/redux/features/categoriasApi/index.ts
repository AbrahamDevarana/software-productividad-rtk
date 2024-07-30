import { CategoriaProyectosProps } from "@/interfaces";
import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


export const categoriaProyectoApi = createApi({
    reducerPath: 'categoriaProyectoApi',
    baseQuery: baseQuery,
    tagTypes: ['Categoria'],
    endpoints: (builder) => ({
        getCategoriasProyecto: builder.query<CategoriaProyectosProps[], {propietarioId?: string}>({
            query: (filtros) => ({
                url: '/categoria-proyectos',
                method: 'GET',
                params: filtros
            }),
            providesTags: ['Categoria'],
            transformResponse: (response: {categorias: CategoriaProyectosProps[]}) => response.categorias
        }),
        getCategoriaProyecto: builder.query<CategoriaProyectosProps, {categoriaId: string}>({
            query: ({categoriaId}) => `/categoria-proyectos/${categoriaId}`,
            providesTags: ['Categoria'],
            transformResponse: (response: {categoria: CategoriaProyectosProps}) => response.categoria
        }),
        createCategoriaProyecto: builder.mutation<CategoriaProyectosProps, {nombre: string, order: number}>({
            query: ({nombre, order}) => ({
                url: '/categoria-proyectos',
                method: 'POST',
                body: {
                    nombre,
                    order
                }
            }),
            invalidatesTags: ['Categoria'],
            transformResponse: (response: {categoria: CategoriaProyectosProps}) => response.categoria,
            onQueryStarted: async (categoria, {dispatch, queryFulfilled}) => {
            },
        }),
        deleteCategoriaProyecto: builder.mutation<void, {categoriaId: string}>({
            query: ({categoriaId}) => ({
                url: `/categoria-proyectos/${categoriaId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Categoria'],
        }),
        updateCategoriaProyecto: builder.mutation<CategoriaProyectosProps, {categoriaId: string, categoria: CategoriaProyectosProps}>({
            query: ({categoriaId, categoria}) => ({
                url: `/categoria-proyectos/${categoriaId}`,
                method: 'PUT',
                body: categoria,
            }),
            invalidatesTags: ['Categoria'],
            transformResponse: (response: {categoria: CategoriaProyectosProps}) => response.categoria,
        }),
        addProyectoToCategoria: builder.mutation<void, {categoriaId: number, proyectoId: string}>({
            query: ({categoriaId, proyectoId}) => ({
                url: `/categoria-proyectos/proyectos`,
                method: 'POST',
                body: {
                    categoriaId,
                    proyectoId
                }
            }),
            invalidatesTags: ['Categoria'],
        })
    })
})

export const {
    useGetCategoriasProyectoQuery,
    useGetCategoriaProyectoQuery,
    useCreateCategoriaProyectoMutation,
    useDeleteCategoriaProyectoMutation,
    useUpdateCategoriaProyectoMutation,
    useAddProyectoToCategoriaMutation
} = categoriaProyectoApi;