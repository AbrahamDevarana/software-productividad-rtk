import { OperativoState } from "@/interfaces/operativos";
import { createSlice } from "@reduxjs/toolkit";
import { createOperativoThunk, getOperativoThunk, getOperativosThunk, getOperativosUsuarioThunk, setPonderacionesThunk, updateOperativoThunk } from "./operativosThunk";


const initialState: OperativoState = {
    operativos: [],
    operativosUsuario: [],
    proyectos: [],
    isLoading: false,
    isLoadingObjetivo: false,
    isLoadingOperativosUsuario: false,
    error: false,
    infoMessage: '',
    currentOperativo: {
        id: '',
        nombre: '',
        fechaFin: new Date(),
        fechaInicio: new Date(),
        tacticoId: '',
        resultadosClave: [],
        propietarioId: '',
        operativosResponsable: [{
            nombre: '',
            apellidoPaterno: '',
            departamentos: [],
            id: '',
            email: '',
            iniciales: '',
            scoreCard: {
                progresoAsignado: 0,
                progresoReal: 0,
                extra: 0,
                progresoFinal: 0,
                propietario: false,
                status: 'ABIERTO'
            },
        }],
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
        .addCase(getOperativosUsuarioThunk.pending, (state) => {
            state.isLoadingOperativosUsuario = true
        })
        .addCase(getOperativosUsuarioThunk.fulfilled, (state, { payload }) => {
            state.isLoadingOperativosUsuario = false
            state.operativosUsuario = payload
        })
        .addCase(getOperativosUsuarioThunk.rejected, (state) => {
            state.isLoadingOperativosUsuario = false
            state.error = true
        })
    }
})

export const { clearObjetivo } = operativoSlice.actions

export default operativoSlice.reducer