import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import jwtDecode from 'jwt-decode';
import { logOut, setCredentials } from './authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include'
});

const baseQueryWithReauth:BaseQueryFn <string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if(result.error?.status === 401) {
        const refreshAccessToken = await baseQuery('refresh-access-token', api, extraOptions);
            if(refreshAccessToken.data) {
                const { accessToken, refreshToken }:any = refreshAccessToken.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                const user = jwtDecode(accessToken)
                api.dispatch(setCredentials({user, accessToken}))   
                result = await baseQuery(args, api, extraOptions);
            } else {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                api.dispatch(logOut());
            }       
    }

    const { accessToken, refreshToken }:any = result.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    const user = jwtDecode(accessToken)
    api.dispatch(setCredentials({user, accessToken}))   

    return result;
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getValidation: builder.query({
            query: () => 'auth/validate',            
        }),
    })
});


export const { useGetValidationQuery } = authApi;

