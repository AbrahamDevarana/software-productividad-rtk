
import { AppDispatch, RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientAxios } from "@/config/axios";
import { RoleProps } from "@/interfaces/rol";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';


interface Props {
    roles: RoleProps[]
    role: RoleProps
}

// export const getRolesThunk = createAsyncThunk(
//     "roles/getRoles",
//     async (filtros: any, { rejectWithValue, getState }) => {
//         try {
//             const { accessToken } = (getState() as RootState).auth;
//             const config = {
//                 headers: { "accessToken": `${accessToken}` },
//                 params: filtros
//             }
//             const response = await clientAxios.get<Props>(`/roles`, config);
//             return response.data
//         }
//         catch (error: any) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )



const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem('accessToken');
        if( accessToken ) headers.set('accessToken', `${accessToken}`);  
        return headers;
    }
});

interface RolesParams {
    filtros?: any
    search?: string
}

interface IRolesResponse {
    roles: RoleProps[]
}


export const rolesApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: (filtros: any) => ({
                url: `/roles`,
                params: filtros
            }),
            transformResponse: (response: { roles: RoleProps[] }) => response.roles
        }),
        getRol: builder.query({
            query: (rolId: string) => `/roles/${rolId}`
        }),
        createRol: builder.mutation({
            query: (rol: RoleProps) => ({
                url: `/roles`,
                method: 'POST',
                body: rol
            })
        }),
        updateRol: builder.mutation({
            query: ({id, ...rol}: RoleProps) => ({
                url: `/roles/${id}`,
                method: 'PUT',
                body: rol
            })
        }),
        deleteRol: builder.mutation({
            query: (rolId: string) => ({
                url: `/roles/${rolId}`,
                method: 'DELETE'
            })
        })
    })
})

export const { useGetRolesQuery, useGetRolQuery, useCreateRolMutation, useUpdateRolMutation, useDeleteRolMutation } = rolesApi;
   

export const getRolThunk = createAsyncThunk(
    "roles/getRol",
    async (rolId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get(`/roles/${rolId}`, config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createRolThunk = createAsyncThunk(
    "roles/createRol",
    async (rol: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.post(`/roles`, rol, config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateRolThunk = createAsyncThunk(
    "roles/updateRol",
    async (rol: any, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put(`/roles/${rol.id}`, rol, config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteRolThunk = createAsyncThunk(
    "roles/deleteRol",
    async (rolId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete(`/roles/${rolId}`, config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


