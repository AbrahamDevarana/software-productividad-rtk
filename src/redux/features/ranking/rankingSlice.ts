

import { createSlice } from '@reduxjs/toolkit'
import { RankingState } from '@/interfaces';
import { getRankingsThunk } from './rankingThunk';




const initialState: RankingState = {
    rankingUsuarios: [],
    isLoading: false,
    error: false,
    infoMessage: '',    
}


const rankingSlice = createSlice({
    name: 'rankingSlice',
    initialState,
    reducers: {
       clearRankings: (state) => {
            state.rankingUsuarios = initialState.rankingUsuarios
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRankingsThunk.pending, (state) => {
                state.isLoading = true
        })
        .addCase(getRankingsThunk.fulfilled, (state, action) => {
                state.isLoading = false                
                state.rankingUsuarios = action.payload
        })
        .addCase(getRankingsThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
        })
    }
})

export const { clearRankings } = rankingSlice.actions
export default rankingSlice.reducer
