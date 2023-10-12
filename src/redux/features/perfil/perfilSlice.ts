import { createSlice } from '@reduxjs/toolkit'
import { PerfilState } from '@/interfaces';
import { getColaboradoresThunk, getEquipoThunk, getProfileThunk, updateProfileConfigThunk, updateProfileThunk, uploadProfilePictureThunk, updatePortraitThunk, getRendimientoThunk, getHistorialRendimientoThunk } from './perfilThunk';
import { postEvaluacionThunk } from '../evaluaciones/evaluacionesThunk';


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
        },
        rendimiento: {
            resultadoObjetivos: 0,
            resultadoCompetencias: 0,
            resultadoFinal: 0,
            status: 'ABIERTO',
            extra: 0,
            id: '',
            year: new Date().getFullYear(),
            quarter: Math.floor((new Date().getMonth() + 3) / 3),
            usuarioId: '',
            
        },
        historialRendimiento: []
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

            .addCase(getRendimientoThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getRendimientoThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.perfil.rendimiento = action.payload.rendimiento
            })
            .addCase(getRendimientoThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

            .addCase(getHistorialRendimientoThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHistorialRendimientoThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.perfil.historialRendimiento = action.payload.rendimientos
            })
            .addCase(getHistorialRendimientoThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
            .addCase(postEvaluacionThunk.fulfilled, (state, action) => {
                state.perfil.rendimiento = action.payload.rendimiento
            })
            .addCase(postEvaluacionThunk.rejected, (state, action) => {
                state.error = action.error.message
            })
    }
});




export const {clearProfile} = profileSlice.actions

export default profileSlice.reducer