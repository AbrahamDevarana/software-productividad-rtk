
import { ResultadoClaveState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";


const initialState: ResultadoClaveState = {
    resultadosClave: [],
    isLoading: false,
    infoMessage: '',
    error: false,
    updated: false,
    created: false,
    deleted: false,
    currentResultadoClave: {
        id: '',
        nombre: '',
        tipoProgreso: '',
        progreso: 0,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        operativoId: '',
        propietarioId: '',
    }
}

        

const resultadoClaveSlice = createSlice({
    name: 'resultadoClaveSlice',
    initialState,
    reducers: {
        checkingResultados: (state) => {
            state.isLoading = true
            state.updated = false
        },
        setResultadoClaveError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getResultadosClave: (state, action) => {
            state.isLoading = false
            state.resultadosClave = action.payload.resultados
        },
        getResultadoClave: (state, action) => {
            state.isLoading = false
            state.currentResultadoClave = action.payload.resultado
        },
        createResultadoClave: (state, action) => {
            state.isLoading = false
            state.created = true
        },
        updateResultadoClave: (state, action) => {
            state.isLoading = false
            state.updated = true
        },
        deleteResultadoClave: (state, action) => {
            state.isLoading = false
            state.deleted = true
        },
        cleanCurrentResultadoClave: (state) => {
            state.currentResultadoClave = initialState.currentResultadoClave
        },
        cleanResultadosClave: (state) => {
            state.resultadosClave = initialState.resultadosClave
        }
    }
})

export const { checkingResultados, setResultadoClaveError, getResultadosClave, getResultadoClave, createResultadoClave, updateResultadoClave, deleteResultadoClave, cleanCurrentResultadoClave, cleanResultadosClave } = resultadoClaveSlice.actions

export default resultadoClaveSlice.reducer


