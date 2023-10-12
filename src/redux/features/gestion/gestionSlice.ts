import { GestionState } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'
import { obtenerUsuariosThunk } from './gestionThunk'


const initialState: GestionState = {
    error: false,
    infoMessage: '',
    isLoading: false,
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
        .addCase(obtenerUsuariosThunk.pending, (state) => {
            state.isLoadingUsuarios = true
        })
        .addCase(obtenerUsuariosThunk.fulfilled, (state, action) => {
            state.isLoadingUsuarios = false
            state.usuarios = action.payload.usuarios
        })
        .addCase(obtenerUsuariosThunk.rejected, (state, action) => {
            state.isLoadingUsuarios = false
            state.error = true
            state.infoMessage = action.payload as string
        })

    }
})


export const {  } = gestionSlice.actions

export default gestionSlice.reducer