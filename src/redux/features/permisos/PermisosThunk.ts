
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clientAxios } from '@/config/axios';
import { PermisoProps } from '@/interfaces';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';



interface Props {
    permiso: PermisoProps
    permisos: PermisoProps[]
}

export const getPermisosThunk = createAsyncThunk(
    'permisos/getPermisos',
    async (arg, { rejectWithValue, getState }) => {
        
        const { accessToken } = (getState() as RootState).auth;

        const config = {
            headers: { "accessToken": `${accessToken}` }
        }
        try {
            const response = await clientAxios.get<Props>(`/permisos`, config);
            
            return response.data.permisos
        }

        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem('accessToken');
        if( accessToken ) headers.set('accessToken', `${accessToken}`);  
        return headers;
    }
});

export const permisosApi = createApi({
    reducerPath: 'permisosApi',
    baseQuery: baseQuery,
    tagTypes: ['Permisos'],
    endpoints: (builder) => ({
        getPermisos: builder.query({
            query: (filtros: any) => ({
                url: `/permisos`,
                params: filtros
            }),
            transformResponse: (response: { permisos: PermisoProps[] }) => response.permisos,
            providesTags: ['Permisos']
        }),
        getPermiso: builder.query({
            query: (permisoId: number) => `/permisos/${permisoId}`,
            transformResponse: (response: { permiso: PermisoProps }) => response.permiso
        }),
        createPermiso: builder.mutation({
            query: (permiso: PermisoProps) => ({
                url: `/permisos`,
                method: 'POST',
                body: permiso
            }),
            invalidatesTags: ['Permisos'],
        }),
        updatePermiso: builder.mutation({
            query: ({id, ...permiso}: PermisoProps) => ({
                url: `/permisos/${id}`,
                method: 'PUT',
                body: permiso
            }),
            invalidatesTags: ['Permisos']
        }),
        deletePermiso: builder.mutation({
            query: (permisoId: number) => ({
                url: `/permisos/${permisoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Permisos']
        })
    })
})

export const {
    useGetPermisosQuery,
    useGetPermisoQuery,
    useCreatePermisoMutation,
    useUpdatePermisoMutation,
    useDeletePermisoMutation
} = permisosApi;