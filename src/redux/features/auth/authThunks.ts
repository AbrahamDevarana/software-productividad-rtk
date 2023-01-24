import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import jwtDecode from 'jwt-decode';
import { AppDispatch, RootState } from '../../store';
import { logOutProvider, validateProvider } from './authProvider';
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
    }

    const { accessToken, refreshToken }:any = result.data;
    if( accessToken ) localStorage.setItem('accessToken', accessToken);
    if( refreshToken ) localStorage.setItem('refreshToken', refreshToken);
    if( accessToken ) {
        const user = jwtDecode(accessToken);
        api.dispatch( setCredentials({ user, accessToken }) );
    }
    return result
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



export const logoutThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const result = await logOutProvider(getState)        
        if(!result.ok) return dispatch( setAuthError(result.errorMessage) )
        
        dispatch( logOut() )
    }
}

export const validateTokenThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        // if getstate.loggedOut return
        if( getState().auth.loggedOut ) return;

        const result = await validateProvider()     
        if(!result.ok) return dispatch( setAuthError(result.errorMessage) )
        const { accessToken, refreshToken }:any = result.response?.data;
        if( accessToken ) localStorage.setItem('accessToken', accessToken);
        if( refreshToken ) localStorage.setItem('refreshToken', refreshToken);
        if( accessToken ) {
            const user = jwtDecode(accessToken);
            dispatch( setCredentials({ user, accessToken }) );
        }        
    }

}