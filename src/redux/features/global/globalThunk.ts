
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clientAxios } from '@/config/axios';
import { cambiarConfig } from './globalSlice';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '@/config/baseQuery';



export const changeConfigThunk = ({quarter, year}: { quarter:number, year:number }) => (dispatch: AppDispatch) => {
    dispatch(cambiarConfig({quarter, year}))
}


export const globalApi = createApi({    
    reducerPath: 'globalApi',
    baseQuery: baseQuery,
    tagTypes: ['Global'],
    endpoints: (builder) => ({
        getGlobalsConfig: builder.query({
            query: (filtros: any) => ({
                url: `/global`,
                params: filtros
            }),
            transformResponse: (response: any) => response.config,
            providesTags: ['Global']
        }),
    })
})

export const { 
    useGetGlobalsConfigQuery,
 } = globalApi;