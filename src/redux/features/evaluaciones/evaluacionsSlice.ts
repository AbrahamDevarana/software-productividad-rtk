import { EvaluacionState } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'
import { getEvaluacionResultadosThunk, getEvaluacionThunk, getUsuariosAEvaluarThunk } from './evaluacionesThunk'


const initialState: EvaluacionState = {
    error: false,
    isLoading: false,
    isLoadingResultados: false,
    isLoadingEvaluacion: false,
    infoMessage: '',
    evaluaciones: [],
    resultados: 0,
    evaluacion: {
        id: '',
        nombre: '',
        descripcion: '',
        preguntasEvaluacion: [],
        status: false,
    },
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
    }
}


const evaluacionesSlice = createSlice({
    name: 'evaluaciones',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsuariosAEvaluarThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUsuariosAEvaluarThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.evaluacionLider = action.payload.evaluacionLider
            state.evaluacionPropia = action.payload.evaluacionPropia
        })
        .addCase(getUsuariosAEvaluarThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.payload as string
        })

        .addCase(getEvaluacionThunk.pending, (state) => {
            state.isLoadingEvaluacion = true
        })
        .addCase(getEvaluacionThunk.fulfilled, (state, action) => {
            state.isLoadingEvaluacion = false
            const evaluacion = {
                ...action.payload.evaluacion,
                status: action.payload.asignacion.status
            }
            state.evaluacion = evaluacion
        })
        .addCase(getEvaluacionThunk.rejected, (state, action) => {
            state.isLoadingEvaluacion = false
            state.error = true
        })


        .addCase(getEvaluacionResultadosThunk.pending, (state) => {
            state.isLoadingResultados = true
        })
        .addCase(getEvaluacionResultadosThunk.fulfilled, (state, action) => {
            state.isLoadingResultados = false
            state.resultados = action.payload.promedio
        })
        .addCase(getEvaluacionResultadosThunk.rejected, (state, action) => {
            state.isLoadingResultados = false
            state.error = true
        })
    },
})

export default evaluacionesSlice.reducer
