import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import jwtDecode from 'jwt-decode';
import { AppDispatch, RootState } from '../../store';
import { logOutProvider } from './authProvider';
import { logOut, setAuthError, setCredentials, setisLoading } from './authSlice';
import { useNotification } from '../../../hooks/useNotification';


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem('accessToken');
        if( accessToken ) headers.set('Authorization', `${accessToken}`);  
        return headers;
    }

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

                if( localStorage.getItem('accessToken') ) useNotification({type: 'error', message: 'Su sesión ha expirado, por favor vuelva a iniciar sesión' });
                
                api.dispatch( logOut() );
            }
        }else{
            const { accessToken }:any = result.data;
            if( accessToken ) localStorage.setItem('accessToken', accessToken);
            if( accessToken ) {
                const userAuth = jwtDecode(accessToken);
                api.dispatch( setCredentials({ userAuth, accessToken }) );
                api.dispatch( setisLoading(false) );
                
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


export const loginThunk = (tokens: any ) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { accessToken, refreshToken } = tokens;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        dispatch( setCredentials({ accessToken, refreshToken }) );
    }
}



export const logoutThunk = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const result = await logOutProvider(getState)        
        if(!result.ok) return dispatch( setAuthError(result.errorMessage) )
        
        dispatch( logOut() )
    }
}
