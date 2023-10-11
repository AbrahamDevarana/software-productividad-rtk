import { OperativoState } from "@/interfaces/operativos";
import { createSlice } from "@reduxjs/toolkit";
import { cerrarObjetivoThunk, cierreCicloThunk, cierreObjetivoLiderThunk, createOperativoThunk, deleteOperativoThunk, getOperativoThunk, getOperativosThunk, getOperativosUsuarioThunk, setPonderacionesThunk, updateOperativoThunk } from "./operativosThunk";


const initialState: OperativoState = {
    operativos: [],
    operativosUsuario: [],
    proyectos: [],
    isLoading: false,
    isLoadingObjetivo: false,
    isLoadingOperativosUsuario: false,
    isClosingCicle: false,
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
        operativosResponsable: [],
        indicador: '',
        meta: '',
        status: 'ABIERTO',
        year: 0,
        quarter: 0
    }
}

const operativoSlice = createSlice({
    name: 'operativoSlice',
    initialState,
    reducers: {
        clearObjetivo: (state) => {
            state.currentOperativo = initialState.currentOperativo
        },
        clearObjetivos: (state) => {
            state.operativos = initialState.operativos
            state.operativosUsuario = initialState.operativosUsuario
        }
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
            state.currentOperativo = payload
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
        .addCase(deleteOperativoThunk.pending, (state) => {
                
        })
        .addCase(deleteOperativoThunk.fulfilled, (state, { payload }) => {
            state.operativos = state.operativos.filter(operativo => operativo.id !== payload)
        })
        .addCase(deleteOperativoThunk.rejected, (state) => {
            
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

        .addCase(cerrarObjetivoThunk.pending, (state) => {
        })
        .addCase(cerrarObjetivoThunk.fulfilled, (state, { payload }) => {
            const { status, id } = payload
            // encontrar objetivo y cambiar el status
                const objetivo = state.operativos.find(operativo => operativo.id === id)
                if (objetivo) {
                    objetivo.status = status
                    state.operativos = state.operativos.map(operativo => operativo.id === id ? objetivo : operativo)
                }
        })
        .addCase(cerrarObjetivoThunk.rejected, (state) => {
        })

        .addCase(cierreObjetivoLiderThunk.pending, (state) => {
        })
        .addCase(cierreObjetivoLiderThunk.fulfilled, (state, { payload }) => {
            const { objetivo, objetivoOperativo } = payload
           
            const findObjetivo = state.operativosUsuario.find(operativo => operativo.id === objetivo.objetivoOperativoId)

            const findObjetivoPersonal = state.operativos.find(operativo => operativo.id === objetivo.objetivoOperativoId)

            if (findObjetivo) {
               
               findObjetivo.operativosResponsable.forEach((pivot) => {                
                     if (pivot.id === objetivo.usuarioId) {
                          pivot.scoreCard.status = objetivo.status
                     }
                })
            }

            if(findObjetivoPersonal){
                
                findObjetivoPersonal.status = objetivoOperativo.status
            }
        })
        .addCase(cierreObjetivoLiderThunk.rejected, (state) => {
        })



        .addCase(cierreCicloThunk.pending, (state) => {
            state.isClosingCicle = true
        })
        .addCase(cierreCicloThunk.fulfilled, (state, { payload }) => {
            const { pivot } = payload
            state.isClosingCicle = false
            pivot.map((objetivo:any) => {
                const findObjetivo = state.operativosUsuario.find(operativo => operativo.id === objetivo.objetivoOperativoId)
                if (findObjetivo) {
                    findObjetivo.status = objetivo.status

                    findObjetivo.operativosResponsable.forEach((pivot:any) => {                
                        if (pivot.id === objetivo.usuarioId) {
                             pivot.scoreCard.status = objetivo.status
                        }
                    })
                }
            })
        })
        .addCase(cierreCicloThunk.rejected, (state) => {
            state.isClosingCicle = false
        })


    }
})

export const { clearObjetivo, clearObjetivos } = operativoSlice.actions

export default operativoSlice.reducer