
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


                    if( resultadoClave.tipoProgreso === 'acciones'){
                        // el resultadoClave.pogreso es el promedio de las accion.status completadas (1) y las no completadas (0)
                        resultadoClave.progreso = resultadoClave.acciones.reduce((acc, accion) => acc + accion.status, 0) / resultadoClave.acciones.length * 100
                    }
                    
                }
            })
            .addCase(createAccionThunk.rejected, (state) => {
                state.error = true
            })
            .addCase(updateAccionThunk.pending, (state) => {
                state.error = false
            })
            .addCase(updateAccionThunk.fulfilled, (state, { payload }) => {
                
                const updatedResultadoClave = state.resultadosClave.find(resultado => resultado.id === payload.resultadoClaveId)

                if(updatedResultadoClave){
                    updatedResultadoClave.acciones = updatedResultadoClave.acciones.map(accion => accion.id === payload.id ? payload : accion)

                    if( updatedResultadoClave.tipoProgreso === 'acciones'){
                        // el updatedResultadoClave.pogreso es el promedio de las accion.status completadas (1) y las no completadas (0)
                        updatedResultadoClave.progreso = updatedResultadoClave.acciones.reduce((acc, accion) => acc + accion.status, 0) / updatedResultadoClave.acciones.length * 100
                    }
                }

            })
            .addCase(updateAccionThunk.rejected, (state) => {
                state.error = true
            })
            .addCase(deleteAccionThunk.pending, (state) => {
                state.error = false
            })
            .addCase(deleteAccionThunk.fulfilled, (state, { payload }) => {
                const deletedAccion = state.resultadosClave.find(resultado => resultado.id === payload.resultadoClaveId)

                if(deletedAccion){
                    deletedAccion.acciones = deletedAccion.acciones.filter(accion => accion.id !== payload.id)

                    if( deletedAccion.tipoProgreso === 'acciones'){
                        // el deletedAccion.pogreso es el promedio de las accion.status completadas (1) y las no completadas (0)
                        deletedAccion.progreso = deletedAccion.acciones.reduce((acc, accion) => acc + accion.status, 0) / deletedAccion.acciones.length * 100
                    }
                }
            })
            .addCase(deleteAccionThunk.rejected, (state) => {
                state.error = true
            })
    }
})

export const { clearResultadoClave } = resultadoClaveSlice.actions

export default resultadoClaveSlice.reducer


