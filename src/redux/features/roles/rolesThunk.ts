
import { AppDispatch, RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientAxios } from "@/config/axios";
import { RoleProps } from "@/interfaces/rol";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';


interface Props {
    roles: RoleProps[]
    role: RoleProps
}

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem('accessToken');
        if( accessToken ) headers.set('accessToken', `${accessToken}`);  
        return headers;
    }
});

export const rolesApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: baseQuery,
    tagTypes: ['Roles'],
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: (filtros: any) => ({
                url: `/roles`,
                params: filtros
            }),
            transformResponse: (response: { roles: RoleProps[] }) => response.roles,
            providesTags: ['Roles']
        }),
        getRol: builder.query({
            query: (rolId: number) => `/roles/${rolId}`,
            transformResponse: (response: { role: RoleProps }) => response.role
        }),
        createRol: builder.mutation({
            query: (role: RoleProps) => ({
                url: `/roles`,
                method: 'POST',
                body: role
            }),
            invalidatesTags: ['Roles'],
        }),
        updateRol: builder.mutation({
            query: ({id, ...role}: RoleProps) => ({
                url: `/roles/${id}`,
                method: 'PUT',
                body: role
            }),
            invalidatesTags: ['Roles']
        }),
        deleteRol: builder.mutation({
            query: (rolId: number) => ({
                url: `/roles/${rolId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Roles']
        })
    })
})

export const { useGetRolesQuery, useGetRolQuery, useCreateRolMutation, useUpdateRolMutation, useDeleteRolMutation } = rolesApi;
   
