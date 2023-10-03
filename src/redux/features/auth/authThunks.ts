import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import jwtDecode from 'jwt-decode';
import { AppDispatch, RootState } from '../../store';
import { logOutProvider } from './authProvider';
import { logOut, setAuthError, setCredentials, setisLoading } from './authSlice';
import { userAuthProps } from '@/interfaces';

interface IAuthProps {
    accessToken?: string;
    refreshToken?: string;
    usuario?: userAuthProps
}



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
            
            if( refreshAccessToken.error && refreshAccessToken.error.status === 401 ) {
                api.dispatch( logOut() );
            }

            if( refreshAccessToken.data ) {
                const { accessToken }:any = refreshAccessToken.data;
                localStorage.setItem('accessToken', accessToken);
                const user = jwtDecode(accessToken);
                api.dispatch( setCredentials({ user, accessToken }) );
                return baseQuery(args, api, extraOptions);
            }
        }else{

            console.log('result.data', result.data);
            
            const { accessToken, usuario }  = result.data as IAuthProps;
            if( accessToken ) localStorage.setItem('accessToken', accessToken);
            if( accessToken ) {
                api.dispatch( setCredentials({ usuario, accessToken }) );
                api.dispatch( setisLoading(false) );
            }
            if( !accessToken ) api.dispatch( logOut() );
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
