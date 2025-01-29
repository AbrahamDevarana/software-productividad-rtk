import { AppDispatch, RootState } from '@/redux/store';
import { clearAreas, clearCurrentArea } from './areasSlice';
import { AreaProps } from '@/interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clientAxios } from '@/config/axios';

import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';

interface Props {
    area: AreaProps
    areas: AreasData
}

interface AreasData {
    rows: AreaProps[];
    totalItem: number;
    totalPages: number;
    currentPage: number;
  }





export const getAreasThunk = createAsyncThunk(
    'areas/getAreas',
    async (filtros: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: filtros
            }
            
            const response = await clientAxios.get<Props>(`/areas`, config);
            return response.data.areas
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getAreaThunk = createAsyncThunk(
    'areas/getArea',
    async (areaId: number | string , {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.get<Props>(`/areas/${areaId}`, config);
            return response.data.area
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createAreaThunk = createAsyncThunk(
    'areas/createArea',
    async (area: AreaProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>(`/areas`, area, config);
            return response.data.area
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteAreaThunk = createAsyncThunk(
    'areas/deleteArea',
    async (areaId: number, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.delete<Props>(`/areas/${areaId}`, config);
            return response.data.area
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateAreaThunk = createAsyncThunk(
    'areas/updateArea',
    async (area: AreaProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put<Props>(`/areas/${area.id}`, area, config);
            return response.data.area
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


//  Clean Area
export const cleanAreaThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearAreas() )
    }
}

export const clearCurrentAreaThunk = () => {
    return async (dispatch: AppDispatch) => {
        dispatch( clearCurrentArea() )
    }
}



export const areasApi = createApi({
    reducerPath: 'areasApi',
    baseQuery: baseQuery,
    tagTypes: ['Area'],
    endpoints: (builder) => ({
        getAreas: builder.query({
            query: (filtros) => ({
                url: `/areas`,
                params: filtros
            }),
            transformResponse: (response: { areas: AreasData }) => response.areas
        }),
        
        getArea: builder.query({
            query: ({areaSlug} : { areaSlug?:string}) => ({
                url: `/areas/${areaSlug}`
            }),
            transformResponse: (response: { area: AreaProps }, meta, arg) => response.area,
        }),
        
       
    }),
})

export const { useGetAreasQuery, useGetAreaQuery } = areasApi;