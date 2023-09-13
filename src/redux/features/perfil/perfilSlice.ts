import { createSlice } from '@reduxjs/toolkit'
import { PerfilState } from '@/interfaces';
import { getUsuariosAEvaluarThunk, getColaboradoresThunk, getEquipoThunk, getProfileThunk, updateProfileConfigThunk, updateProfileThunk, uploadProfilePictureThunk, getEvaluacionThunk, getEvaluacionResultadosThunk } from './perfilThunk';


const initialState: PerfilState = {
    isLoading: false,
    isLoadingEvaluation: true,
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
        evaluaciones: {
            usuariosColaborador: [],
            usuariosLider: [],
            evaluacion: {
                id: '',
                nombre: '',
                descripcion: '',
                preguntasEvaluacion: [],
                status: false
            },
            resultados: 0
        },
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
                state.perfil = {
                    ...state.perfil,
                    ...action.payload
                }
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

            .addCase(getUsuariosAEvaluarThunk.pending, (state) => {
                state.isLoadingEvaluation = true
            })
            .addCase(getUsuariosAEvaluarThunk.fulfilled, (state, action) => {
                state.isLoadingEvaluation = false
                state.perfil.evaluaciones.usuariosColaborador = action.payload.usuariosColaborador
                state.perfil.evaluaciones.usuariosLider = action.payload.usuariosLider
            })
            .addCase(getUsuariosAEvaluarThunk.rejected, (state, action) => {
                state.isLoadingEvaluation = false
                state.error = action.error.message
            })
            .addCase(getEvaluacionThunk.pending, (state) => {
                // state.isLoadingEvaluation = true
            })
            .addCase(getEvaluacionThunk.fulfilled, (state, action) => {
                state.isLoadingEvaluation = false
                const evaluacion = {
                    ...action.payload.evaluacion,
                    status: action.payload.asignacion.status
                }
                state.perfil.evaluaciones.evaluacion = evaluacion
            })
            .addCase(getEvaluacionThunk.rejected, (state, action) => {
                state.isLoadingEvaluation = false
                state.error = action.error.message
            })

            .addCase(getEvaluacionResultadosThunk.pending, (state) => {
                // state.isLoadingEvaluation = true
            })

            .addCase(getEvaluacionResultadosThunk.fulfilled, (state, action) => {
                state.isLoadingEvaluation = false
                state.perfil.evaluaciones.resultados = action.payload.promedio
            })
            .addCase(getEvaluacionResultadosThunk.rejected, (state, action) => {
                state.isLoadingEvaluation = false
                state.error = action.error.message
            })
    }
});




export const {clearProfile} = profileSlice.actions

export default profileSlice.reducer