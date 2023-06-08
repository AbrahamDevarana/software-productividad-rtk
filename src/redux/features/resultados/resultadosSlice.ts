
import { ResultadoClaveState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { getResultadosThunk, createResultadoThunk, deleteResultadoThunk, getResultadoThunk, updateResultadoThunk} from "./resultadosThunk";
import { createAccionThunk, deleteAccionThunk, updateAccionThunk } from "../acciones/accionesThunk";


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
        },
        getUpdatedAccion: (state, { payload }) => {
            state.currentResultadoClave.acciones = [...state.currentResultadoClave.acciones, payload]
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




            // Acciones

            .addCase(createAccionThunk.pending, (state) => {
                state.error = false
            })
            .addCase(createAccionThunk.fulfilled, (state, { payload }) => {
                const { resultadoClaveId } = payload
                const resultadoClave = state.resultadosClave.find(resultado => resultado.id === resultadoClaveId)
                
                if(resultadoClave){
                    resultadoClave.acciones = [...resultadoClave.acciones, payload]
                }
            })
            .addCase(createAccionThunk.rejected, (state) => {
                state.error = true
            })
            .addCase(updateAccionThunk.pending, (state) => {
                state.error = false
            })
            .addCase(updateAccionThunk.fulfilled, (state, { payload }) => {                
                state.resultadosClave = state.resultadosClave.map(resultado => {
                    if(resultado.id === payload.resultadoClaveId){
                        resultado.acciones = resultado.acciones.map(accion => accion.id === payload.id ? payload : accion)
                    }
                    return resultado
                })
            })
            .addCase(updateAccionThunk.rejected, (state) => {
                state.error = true
            })
            .addCase(deleteAccionThunk.pending, (state) => {
                state.error = false
            })
            .addCase(deleteAccionThunk.fulfilled, (state, { payload }) => {
                state.resultadosClave = state.resultadosClave.map(resultado => {
                    if(resultado.id === payload.resultadoClaveId){
                        resultado.acciones = resultado.acciones.filter(accion => accion.id !== payload.id)
                    }
                    return resultado
                })
            })
            .addCase(deleteAccionThunk.rejected, (state) => {
                state.error = true
            })
    }
})

export const { clearResultadoClave } = resultadoClaveSlice.actions

export default resultadoClaveSlice.reducer


