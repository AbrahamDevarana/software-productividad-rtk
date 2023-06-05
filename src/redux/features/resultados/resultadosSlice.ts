
import { ResultadoClaveState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { getResultadosThunk, createResultadoThunk, deleteResultadoThunk, getResultadoThunk, updateResultadoThunk} from "./resultadosThunk";


const initialState: ResultadoClaveState = {
    resultadosClave: [],
    isLoading: false,
    isLoadingResultado: false,
    infoMessage: '',
    error: false,
    currentResultadoClave: {
        id: '',
        nombre: '',
        tipoProgreso: '',
        progreso: 0,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        operativoId: '',
        propietarioId: '',
        acciones: []
    }
}



        

const resultadoClaveSlice = createSlice({
    name: 'resultadoClaveSlice',
    initialState,
    reducers: {
        clearResultadoClave: (state) => {
            state.currentResultadoClave = initialState.currentResultadoClave
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getResultadosThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getResultadosThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.resultadosClave = payload
            })
            .addCase(getResultadosThunk.rejected, (state) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(getResultadoThunk.pending, (state) => {
                state.isLoadingResultado = true
            })
            .addCase(getResultadoThunk.fulfilled, (state, { payload }) => {
                state.isLoadingResultado = false
                state.currentResultadoClave = payload
            })
            .addCase(getResultadoThunk.rejected, (state) => {
                state.isLoadingResultado = false
                state.error = true
            })
            .addCase(createResultadoThunk.pending, (state) => {
                state.isLoadingResultado = true
            })
            .addCase(createResultadoThunk.fulfilled, (state, {payload}) => {
                state.isLoadingResultado = false
                state.resultadosClave = [...state.resultadosClave, payload]
            })
            .addCase(createResultadoThunk.rejected, (state) => {
                state.isLoadingResultado = false
                state.error = true
            })
            .addCase(updateResultadoThunk.pending, (state) => {
                state.isLoadingResultado = true
            })
            .addCase(updateResultadoThunk.fulfilled, (state, {payload}) => {
                state.isLoadingResultado = false
                state.resultadosClave = state.resultadosClave.map(resultado => resultado.id === payload.id ? payload : resultado)
            })
            .addCase(updateResultadoThunk.rejected, (state) => {
                state.isLoadingResultado = false
                state.error = true
            })
            .addCase(deleteResultadoThunk.pending, (state) => {
                state.isLoadingResultado = true
            })
            .addCase(deleteResultadoThunk.fulfilled, (state, {payload}) => {
                state.isLoadingResultado = false
                state.resultadosClave = state.resultadosClave.filter(resultado => resultado.id !== payload)
            })
            .addCase(deleteResultadoThunk.rejected, (state) => {
                state.isLoadingResultado = false
                state.error = true
            })
    }
})

export const { clearResultadoClave } = resultadoClaveSlice.actions

export default resultadoClaveSlice.reducer


