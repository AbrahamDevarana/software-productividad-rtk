import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from "@/config/baseQuery";
import { Ranking } from '@/interfaces';


export const rankingApi =  createApi({
    reducerPath: 'rankingApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getRankings: builder.query({
            query: ({year, quarter}: {year: number, quarter: number}) => ({
                url: `/rendimiento/ranking`,
                method: 'GET',
                params: {
                    year,
                    quarter
                }
            }),
            transformResponse: (response: {rankingUsuarios: Ranking[], rankingCompetencias: Ranking[]}) => response,
            transformErrorResponse: (response) => response
        })
    })
})

export const { useGetRankingsQuery } = rankingApi;