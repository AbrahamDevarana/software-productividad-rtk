import { createSlice } from '@reduxjs/toolkit'
import { PerfilState } from '@/interfaces';
import { getProfileThunk, updateProfileThunk } from './profileThunk';


const initialState: PerfilState = {
    isLoading: false,
    error: '',
    perfil: {
        id: '',
        nombre: '',
        apellidoMaterno: '',
        apellidoPaterno: '',
        iniciales: '',
        nombreCorto: '',
        email: '',
        foto: '',
        objetivosOperativos: [],
        proyectos: [],
    }
}
    

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProfileThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProfileThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.perfil = action.payload
            })
            .addCase(getProfileThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(updateProfileThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfileThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.perfil = action.payload
            })
            .addCase(updateProfileThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
});




export const {} = profileSlice.actions

export default profileSlice.reducer