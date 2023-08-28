import { createSlice } from '@reduxjs/toolkit'
import { PerfilState } from '@/interfaces';
import { getColaboradoresThunk, getEquipoThunk, getProfileThunk, updateProfileConfigThunk, updateProfileThunk, uploadProfilePictureThunk } from './perfilThunk';


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
        slug: '',
        equipo: [],
        colaboradores: [],
        objetivosOperativos: [],
        proyectos: [],
        social: {
            facebook: {
                nombre: 'facebook',
                url: ''
            },
            instagram: {
                nombre: 'instagram',
                url: ''
            },
            linkedin: {
                nombre: 'linkedin',
                url: ''
            },
            otros: {
                nombre: 'otros',
                url: ''
            },
        },
        evaluacionesRecibidas: [],
        evaluacionesRealizadas: [],
        configuracion:{
            usuarioId: '',
            notificacionesWeb: false,
            notificacionesEmail: false,
            notificacionesEmailDiario: false,
            notificacionesEmailSemanal: false,
            notificacionesEmailMensual: false,
            notificacionesEmailTrimestral: false,
            portadaPerfil: ''
        }
    },

}
    

const profileSlice = createSlice({
    name: 'profileSlice',
    initialState,
    reducers: {
        clearProfile: (state) => {
            state.perfil = initialState.perfil
        }
    },
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
            .addCase(uploadProfilePictureThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadProfilePictureThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.perfil = action.payload
            })
            .addCase(uploadProfilePictureThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(updateProfileConfigThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfileConfigThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.perfil = action.payload
            })
            .addCase(updateProfileConfigThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(getEquipoThunk.pending, (state) => {
                // state.isLoading = true
            })
            .addCase(getEquipoThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.perfil.equipo = action.payload
            })
            .addCase(getEquipoThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(getColaboradoresThunk.pending, (state) => {
                // state.isLoading = true
            })
            .addCase(getColaboradoresThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.perfil.colaboradores = action.payload
            })
            .addCase(getColaboradoresThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    }
});




export const {clearProfile} = profileSlice.actions

export default profileSlice.reducer