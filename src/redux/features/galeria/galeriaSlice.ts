import { GaleriaProps, GaleriaDevaranaState} from "@/interfaces"
import { createSlice } from '@reduxjs/toolkit'
import { getGaleriaDevaranaThunk, getGaleriaUsuarioThunk } from "./galeriaThunk"


const initialState: GaleriaDevaranaState = {
    galeriaDevarana: [],
    galeriaUsuarios: [],
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
        .addCase(getGaleriaUsuarioThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getGaleriaUsuarioThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.galeriaUsuarios = payload
        })
        .addCase(getGaleriaUsuarioThunk.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = true
        })
    }
})

export const { cleanGaleria } = galeriaSlice.actions
export default galeriaSlice.reducer


