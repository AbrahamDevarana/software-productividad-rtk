import { createSlice } from '@reduxjs/toolkit'
import { PerspectivasState } from '@/interfaces';
import { createPerspectivaThunk, deletePerspectivaThunk, updatePerspectivaThunk } from './perspectivasThunk';

const initialState: PerspectivasState = {
    perspectivas: [],
    isLoading: false,
    infoMessage: '',
    error: false,
    currentPerspectiva: {
        id: '',
        nombre: '',
        descripcion: '',
        progreso: 0,
        color: '',
        status: 'SIN_INICIAR',
        objetivosEstrategicos: [],
    }
}

const perspectivasSlice = createSlice({
    name: 'perspectivasSlice',
    initialState,
    reducers: {
        clearPerspectivas: (state) => {
            state = initialState
        },
        clearCurrentPerspectiva: (state) => {
            state.currentPerspectiva = initialState.currentPerspectiva
        },           
    },
    extraReducers: (builder) => {
        builder
        .addCase(createPerspectivaThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createPerspectivaThunk.fulfilled, (state, action) => {
            state.perspectivas.push(action.payload)
            state.isLoading = false
        })
        .addCase(createPerspectivaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.error.message ? action.error.message : 'Error al crear la perspectiva'
        })
        .addCase(deletePerspectivaThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deletePerspectivaThunk.fulfilled, (state, action) => {
            state.perspectivas = state.perspectivas.filter(perspectiva => perspectiva.id !== action.payload.id)
            state.isLoading = false
        })
        .addCase(deletePerspectivaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.error.message ? action.error.message : 'Error al eliminar la perspectiva'
        })
        .addCase(updatePerspectivaThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updatePerspectivaThunk.fulfilled, (state, action) => {
            state.perspectivas = state.perspectivas.map(perspectiva => perspectiva.id === action.payload.id ? action.payload : perspectiva)
            state.isLoading = false
        })
        .addCase(updatePerspectivaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.error.message ? action.error.message : 'Error al actualizar la perspectiva'
        })
    }
})

export const {
    clearPerspectivas,
    clearCurrentPerspectiva,
} = perspectivasSlice.actions

export default perspectivasSlice.reducer