import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = localStorage.getItem('accessToken');
        if( accessToken ) headers.set('accessToken', `${accessToken}`);  
        return headers;
    }
});