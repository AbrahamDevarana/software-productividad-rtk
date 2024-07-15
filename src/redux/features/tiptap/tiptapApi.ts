import { baseQuery } from '@/config/baseQuery';
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';baseQuery

export const tiptapApi = createApi({
    reducerPath: 'tiptapApi',
    baseQuery: baseQuery as BaseQueryFn <string | FetchArgs, unknown, FetchBaseQueryError>,
    tagTypes: ['TipTap'],
    endpoints: (builder) => ({
        getTipTapToken: builder.query({
            query: () => 'ext/tiptap',
            transformResponse: (response: {tiptap: string}) => {
                return response.tiptap
            }
        })
    }),
});

export const { useGetTipTapTokenQuery } = tiptapApi;