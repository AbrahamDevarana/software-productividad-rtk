import { GestionState } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'
import { generarReporteRendimientoThunk } from './gestionThunk'


const initialState: GestionState = {
    error: false,
    infoMessage: '',
    isLoading: false,
    isGeneratingReport: false,
    isLoadingUsuarios: false,
    usuarios: [],
}


export const gestionSlice = createSlice({
    name: 'gestionSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(generarReporteRendimientoThunk.pending, (state) => {
            state.isGeneratingReport = true
        })
        .addCase(generarReporteRendimientoThunk.fulfilled, (state) => {
            state.isGeneratingReport = false
        })
        .addCase(generarReporteRendimientoThunk.rejected, (state, action) => {
            state.isGeneratingReport = false
            state.error = true
            state.infoMessage = action.payload as string
        })


    }
})


export const { } = gestionSlice.actions

export default gestionSlice.reducer