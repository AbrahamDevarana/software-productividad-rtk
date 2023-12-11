import { baseQuery } from "@/config/baseQuery";
import { RoleProps, RoleWithPermisosProps } from "@/interfaces/rol";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


interface Props {
    roles: RoleProps[]
    role: RoleWithPermisosProps
}

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
            transformResponse: (response: { role: RoleWithPermisosProps }) => response.role,
            providesTags: ['Roles']
        }),
        createRol: builder.mutation({
            query: (role: RoleWithPermisosProps) => ({
                url: `/roles`,
                method: 'POST',
                body: role
            }),
            transformResponse: (response: { role: RoleWithPermisosProps }) => response.role,
            invalidatesTags: ['Roles'],
        }),
        updateRol: builder.mutation <RoleWithPermisosProps, Partial<RoleWithPermisosProps> & Pick<RoleWithPermisosProps, 'id'>> ({
            query: ({id, ...role}: RoleWithPermisosProps) => ({
                url: `/roles/${id}`,
                method: 'PUT',
                body: role
            }),
            transformResponse: (response: { role: RoleWithPermisosProps }) => response.role,
            invalidatesTags: ['Roles']
        }),
        deleteRol: builder.mutation({
            query: (rolId: number) => ({
                url: `/roles/${rolId}`,
                method: 'DELETE'
            }),
            transformResponse: (response: { role: RoleWithPermisosProps }) => response.role,
            invalidatesTags: ['Roles']
        })
    })
})

export const { useGetRolesQuery, useGetRolQuery, useCreateRolMutation, useUpdateRolMutation, useDeleteRolMutation } = rolesApi;
   
