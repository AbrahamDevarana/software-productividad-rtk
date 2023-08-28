import { OperativoState } from "@/interfaces/operativos";
import { createSlice } from "@reduxjs/toolkit";
import { createOperativoThunk, getOperativoThunk, getOperativosThunk, setPonderacionesThunk, updateOperativoThunk } from "./operativosThunk";


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
        resultadosClave: [],
        operativoPropietario: {
            id: '',
            nombre: '',
            apellidoMaterno: '',
            apellidoPaterno: '',
            iniciales: '',
            email: '',
            departamentos: [],
            scoreCard: {
                propietario: false,
                progresoAsignado: 0,
                progresoFinal: 0,
                progresoReal: 0,
            }
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
        clearObjetivo: (state) => {
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
        .addCase(getOperativoThunk.pending, (state) => {
            state.isLoadingObjetivo = true
        })
        .addCase(getOperativoThunk.fulfilled, (state, { payload }) => {
            state.isLoadingObjetivo = false
            state.currentOperativo = payload
        })
        .addCase(getOperativoThunk.rejected, (state) => {
            state.isLoadingObjetivo = false
            state.error = true
        })
        .addCase(createOperativoThunk.pending, (state) => {
            state.isLoadingObjetivo = true
        })
        .addCase(createOperativoThunk.fulfilled, (state, { payload }) => {
            state.isLoadingObjetivo = false
            state.operativos.push(payload)
        })
        .addCase(createOperativoThunk.rejected, (state) => {
            state.isLoadingObjetivo = false
            state.error = true
        })
        .addCase(updateOperativoThunk.pending, (state) => {
            state.isLoadingObjetivo = true
        })
        .addCase(updateOperativoThunk.fulfilled, (state, { payload }) => {
            state.isLoadingObjetivo = false
            state.currentOperativo = payload
            state.operativos = state.operativos.map(operativo => operativo.id === payload.id ? payload : operativo)
        })
        .addCase(updateOperativoThunk.rejected, (state) => {
            state.isLoadingObjetivo = false
        })
        .addCase(setPonderacionesThunk.pending, (state) => {
            
        })
        .addCase(setPonderacionesThunk.fulfilled, (state, { payload }) => {
            const { ponderaciones, usuarioId } = payload
            ponderaciones.forEach((ponderacion) => {
                const objetivo = state.operativos.find(operativo => operativo.id === ponderacion.objetivoId)
                if (objetivo) {
                    const pivot = objetivo.operativosResponsable.find((pivot) => pivot.id === usuarioId)
                    if (pivot) {
                        pivot.scoreCard.progresoAsignado = ponderacion.progresoAsignado
                    }
                }            
            })
        })
        .addCase(setPonderacionesThunk.rejected, (state) => {
        })
    }
})

export const { clearObjetivo } = operativoSlice.actions

export default operativoSlice.reducer