import { GaleriaProps, GaleriaDevaranaState} from "@/interfaces"
import { createSlice } from '@reduxjs/toolkit'
import { deleteGaleriaUsuarioThunk, getGaleriaDevaranaThunk, getGaleriaUsuarioThunk, uploadGaleriaUsuarioThunk } from "./galeriaThunk"


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
        .addCase(uploadGaleriaUsuarioThunk.pending, (state) => {
            // state.isLoading = true
        })
        .addCase(uploadGaleriaUsuarioThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.galeriaUsuarios = [...state.galeriaUsuarios, ...payload]
        })
        .addCase(uploadGaleriaUsuarioThunk.rejected, (state, { payload }) => {
            state.isLoading = false
            state.error = true
        })
        .addCase(deleteGaleriaUsuarioThunk.pending, (state) => {
            // state.isLoading = true
        })
        .addCase(deleteGaleriaUsuarioThunk.fulfilled, (state, { payload }) => {
            // state.isLoading = false
            state.galeriaUsuarios = state.galeriaUsuarios.filter((item) => item.id !== payload.id)
        })
        .addCase(deleteGaleriaUsuarioThunk.rejected, (state, { payload }) => {
            // state.isLoading = false
            state.error = true
        })
    }
})

export const { cleanGaleria } = galeriaSlice.actions
export default galeriaSlice.reducer


