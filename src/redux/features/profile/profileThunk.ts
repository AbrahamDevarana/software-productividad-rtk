import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { selectCurrentToken } from "../auth/authSlice";


export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
        // prepareHeaders: (headers, { getState }) => {
        //     const token = selectCurrentToken(getState() as RootState);
        //         console.log(token);           
        //     return headers;
        // }

    }),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => 'profile',
        }),
    })
    
})

export const { useGetProfileQuery } = profileApi;