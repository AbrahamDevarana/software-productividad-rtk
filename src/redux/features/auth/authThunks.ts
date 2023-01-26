import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import jwtDecode from 'jwt-decode';
import { AppDispatch, RootState } from '../../store';
import { logOutProvider } from './authProvider';
import { logOut, setAuthError, setCredentials } from './authSlice';


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include'
});

const baseQueryWithReauth:BaseQueryFn <string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => { 
    const result = await baseQuery(args, api, extraOptions);    

        if( result.error && result.error.status === 401 ) {
            const refreshAccessToken = await baseQuery('refresh-access-token', api, extraOptions);
            if( refreshAccessToken.data ) {
                const { accessToken }:any = refreshAccessToken.data;
                localStorage.setItem('accessToken', accessToken);
                const user = jwtDecode(accessToken);
                api.dispatch( setCredentials({ user, accessToken }) );
                return baseQuery(args, api, extraOptions);
            }else{ 
                api.dispatch( logOut() );
            }
        }else{
            const { accessToken, refreshToken }:any = result.data;
            if( accessToken ) localStorage.setItem('accessToken', accessToken);
            if( refreshToken ) localStorage.setItem('refreshToken', refreshToken);
            if( accessToken ) {
                const userAuth = jwtDecode(accessToken);
                api.dispatch( setCredentials({ userAuth, accessToken }) );
            }
        } 
    

    
    return result
}


export const authApi = createApi({
    reducerPath: 'authValidation',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getValidation: builder.query({
            query: () => 'auth/validate',
        }),
    })
});


export const { useGetValidationQuery } = authApi;


export const logoutThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const result = await logOutProvider(getState)        
        if(!result.ok) return dispatch( setAuthError(result.errorMessage) )
        
        dispatch( logOut() )
    }
}
