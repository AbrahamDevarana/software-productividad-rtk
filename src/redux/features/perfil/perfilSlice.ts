import { createSlice } from '@reduxjs/toolkit'
import { PerfilState } from '@/interfaces';
import { getUsuariosAEvaluarThunk, getColaboradoresThunk, getEquipoThunk, getProfileThunk, updateProfileConfigThunk, updateProfileThunk, uploadProfilePictureThunk, getEvaluacionThunk, getEvaluacionResultadosThunk, updatePortraitThunk } from './perfilThunk';


const initialState: PerfilState = {
    isLoading: false,
    isUpdating: false,
    isLoadingEvaluation: true,
    isLoadingConfiguration: false,
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
            evaluacionColaborador: [],
            evaluacionLider: {
                id: '',
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                iniciales: '',
                nombreCorto: '',
                email: '',
                foto: '',
                slug: '',
            },
            evaluacionPropia: {
                id: '',
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                iniciales: '',
                nombreCorto: '',
                email: '',
                foto: '',
                slug: '',
            },
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
                state.isUpdating = true
            })
            .addCase(updateProfileThunk.fulfilled, (state, action) => {
                state.isUpdating = false
                state.perfil = action.payload
            })
            .addCase(updateProfileThunk.rejected, (state, action) => {
                state.isUpdating = false
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
                state.perfil.evaluaciones.evaluacionColaborador = action.payload.evaluacionColaborador
                state.perfil.evaluaciones.evaluacionLider = action.payload.evaluacionLider
                state.perfil.evaluaciones.evaluacionPropia = action.payload.evaluacionPropia
                state.perfil.evaluaciones.evaluacion = action.payload.evaluacion
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
            .addCase(updatePortraitThunk.pending, (state) => {
                state.isLoadingConfiguration = true
            })
            .addCase(updatePortraitThunk.fulfilled, (state, action) => {
                state.isLoadingConfiguration = false
                state.perfil.configuracion.portadaPerfil = action.payload.configuracionUsuario.portadaPerfil
            })
            .addCase(updatePortraitThunk.rejected, (state, action) => {
                state.isLoadingConfiguration = false
                state.error = action.error.message
            })
    }
});




export const {clearProfile} = profileSlice.actions

export default profileSlice.reducer