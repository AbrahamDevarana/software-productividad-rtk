import { AppDispatch, RootState } from '@/redux/store';
import {clearCurrentPerspectiva, clearPerspectivas } from './perspectivasSlice';
import { PerspectivaProps } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';


import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


interface Props {
    perspectivas: PerspectivaProps[]
    perspectiva: PerspectivaProps
}

export const createPerspectivaThunk = createAsyncThunk(
    'perspectivas/createPerspectiva',
    async (perspectiva: PerspectivaProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.post<Props>('/perspectivas', perspectiva, config);
            return response.data.perspectiva
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deletePerspectivaThunk = createAsyncThunk(
    'perspectivas/deletePerspectiva',
    async (perspectivaId: number, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete<Props>(`/perspectivas/${perspectivaId}`, config);
            return response.data.perspectiva
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const updatePerspectivaThunk = createAsyncThunk(
    'perspectivas/updatePerspectiva',
    async (perspectiva: PerspectivaProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            
            const response = await clientAxios.put<Props>(`/perspectivas/${perspectiva.id}`, perspectiva, config);
            return response.data.perspectiva
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const clearPerspectivasThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch( clearPerspectivas() )        
    }   
}
    
export const clearCurrentPerspectivaThunk = () => {
    return async ( dispatch : AppDispatch, getState: () => RootState ) => {
        dispatch( clearCurrentPerspectiva() )        
    }   
}



// Path: src/redux/features/perspectivas/perspectivasSlice.ts


export const perspectivasApi = createApi({
    reducerPath: 'perspectivasApi',
    baseQuery: baseQuery,
    tagTypes: ['Perspectivas'],
    endpoints: (builder) => ({
        getPerspectivas: builder.query<PerspectivaProps[], any>({
            query: (filtros) => ({
                url: `/perspectivas`,
                params: filtros
            }),
            transformResponse: (response: { perspectivas: PerspectivaProps[] }) => response.perspectivas,
            providesTags: (result) => result  ? [...result.map(({ id }) => ({ type: 'Perspectivas' as const, id })), { type: 'Perspectivas', id: 'LIST' }]
            : [{ type: 'Perspectivas', id: 'LIST' }],
        }),
        getPerspectiva: builder.query({
            query: (perspectivaId: number) => `/perspectivas/${perspectivaId}`,
            transformResponse: (response: { perspectiva: PerspectivaProps }) => response.perspectiva,
            providesTags: (result, error, id) => [{ type: 'Perspectivas', id }],
        }),
        // createPerspectiva: builder.mutation({
        //     query: (perspectiva: PerspectivaProps) => ({
        //         url: `/perspectivas`,
        //         method: 'POST',
        //         body: perspectiva
        //     }),
        //     transformResponse: (response: { perspectiva: PerspectivaProps }) => response.perspectiva,
        //     invalidatesTags: ['Perspectivas'],
        // }),
        // updatePerspectiva: builder.mutation <PerspectivaProps, Partial<PerspectivaProps> & Pick<PerspectivaProps, 'id'>> ({
        //     query: ({id, ...perspectiva}: PerspectivaProps) => ({
        //         url: `/perspectivas/${id}`,
        //         method: 'PUT',
        //         body: perspectiva
        //     }),
        //     transformResponse: (response: { perspectiva: PerspectivaProps }) => response.perspectiva,
        //     invalidatesTags: ['Perspectivas']
        // }),
        // deletePerspectiva: builder.mutation({
        //     query: (perspectivaId: number) => ({
        //         url: `/perspectivas/${perspectivaId}`,
        //         method: 'DELETE'
        //     }),
        //     transformResponse: (response: { perspectiva: PerspectivaProps }) => response.perspectiva,
        //     invalidatesTags: ['Perspectivas']
        // })
    })
})

export const { useGetPerspectivasQuery, useGetPerspectivaQuery } = perspectivasApi;

