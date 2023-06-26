import { createSlice } from '@reduxjs/toolkit'
import { ComentarioProps, ComentariosState } from '@/interfaces';
import { createComentarioThunk, getComentariosThunk } from './comentariosThunk';



const initialState: ComentariosState = {
    comentarios: [],
    isLoading: false,
    isCreating: false,
    error: false,
    infoMessage: ''
}


const comentariosSlice = createSlice({
    name: 'comentarios',
    initialState,
    reducers: {
        clearComentarios: (state) => {
            state.comentarios = initialState.comentarios
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getComentariosThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getComentariosThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.comentarios = payload
            })
            .addCase(getComentariosThunk.rejected, (state, { payload }) => {
                state.isLoading = false
                state.error = true
                state.infoMessage = payload as string
            })

            .addCase(createComentarioThunk.pending, (state) => {
                state.isCreating = true
            })
            .addCase(createComentarioThunk.fulfilled, (state, { payload }) => {
                state.isCreating = false
                state.comentarios.push(payload)
            })
            .addCase(createComentarioThunk.rejected, (state, { payload }) => {
                state.isCreating = false
                state.error = true
                state.infoMessage = payload as string
            })
    }

})

export const { clearComentarios } = comentariosSlice.actions

export default comentariosSlice.reducer