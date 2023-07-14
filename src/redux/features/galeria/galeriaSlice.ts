import { GaleriaDevaranaProps, GaleriaDevaranaState} from "@/interfaces"
import { createSlice } from '@reduxjs/toolkit'
import { getGaleriaDevaranaThunk } from "./galeriaThunk"


const initialState: GaleriaDevaranaState = {
    galeriaDevarana: [],
    isLoading: false,
    error: false,
    infoMessage: '',
}

const galeriaSlice = createSlice({
    name: 'galeriaSlice',
    initialState,
    reducers: {
        cleanGaleria: (state) => {
            state = initialState
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getGaleriaDevaranaThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getGaleriaDevaranaThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.galeriaDevarana = payload
        })
        .addCase(getGaleriaDevaranaThunk.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = true
        })
    }
})

export const { cleanGaleria } = galeriaSlice.actions
export default galeriaSlice.reducer


