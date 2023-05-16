import { OperativoState } from "@/interfaces/operativos";
import { createSlice } from "@reduxjs/toolkit";
import { createObjetivoThunk, getObjetivoThunk, getOperativosThunk, updateObjetivoThunk } from "./operativosThunk";


const initialState: OperativoState = {
    operativos: [],
    proyectos: [],
    isLoading: false,
    isLoadingObjetivo: false,
    error: false,
    infoMessage: '',
    currentOperativo: {
        id: '',
        nombre: '',
        fechaFin: new Date(),
        fechaInicio: new Date(),
        tacticoId: '',
        operativoPropietario: {
            id: '',
            nombre: '',
            apellidoMaterno: '',
            apellidoPaterno: '',
            iniciales: '',
            email: '',
        },
        propietarioId: '',
        operativosResponsable: [],
        indicador: '',
        meta: '',
    }
}

const operativoSlice = createSlice({
    name: 'operativoSlice',
    initialState,
    reducers: {
        clearOperativo: (state) => {
            state.currentOperativo = initialState.currentOperativo
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getOperativosThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getOperativosThunk.fulfilled, (state, { payload }) => {
            state.isLoading = false
            state.operativos = payload
        })
        .addCase(getOperativosThunk.rejected, (state) => {
            state.isLoading = false
            state.error = true
        })
        .addCase(getObjetivoThunk.pending, (state) => {
            state.isLoadingObjetivo = true
        })
        .addCase(getObjetivoThunk.fulfilled, (state, { payload }) => {
            state.isLoadingObjetivo = false
            state.currentOperativo = payload
        })
        .addCase(getObjetivoThunk.rejected, (state) => {
            state.isLoadingObjetivo = false
            state.error = true
        })
        .addCase(createObjetivoThunk.pending, (state) => {
            state.isLoadingObjetivo = true
        })
        .addCase(createObjetivoThunk.fulfilled, (state, { payload }) => {
            state.isLoadingObjetivo = false
            state.operativos.push(payload)
        })
        .addCase(createObjetivoThunk.rejected, (state) => {
            state.isLoadingObjetivo = false
            state.error = true
        })
        .addCase(updateObjetivoThunk.pending, (state) => {
            state.isLoadingObjetivo = true
        })
        .addCase(updateObjetivoThunk.fulfilled, (state, { payload }) => {
            state.isLoadingObjetivo = false
            state.currentOperativo = payload
            state.operativos = state.operativos.map(operativo => operativo.id === payload.id ? payload : operativo)
        })
        .addCase(updateObjetivoThunk.rejected, (state) => {
            state.isLoadingObjetivo = false
        })
    }
})

export const { clearOperativo } = operativoSlice.actions

export default operativoSlice.reducer