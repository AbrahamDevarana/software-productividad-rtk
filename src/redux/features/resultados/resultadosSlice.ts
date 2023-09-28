
import { ResultadoClaveState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { getResultadosThunk, createResultadoThunk, deleteResultadoThunk, getResultadoThunk, updateResultadoThunk} from "./resultadosThunk";
import { createAccionThunk, deleteAccionThunk, updateAccionThunk } from "../acciones/accionesThunk";
import { createTaskThunk, deleteTaskThunk, updateTaskThunk } from "../tasks/tasksThunk";


const initialState: ResultadoClaveState = {
    resultadosClave: [],
    isLoading: false,
    isCreatingResultado: false,
    isLoadingResultado: false,
    isCreatedResultado: false,
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
        acciones: [],
        propietario:{
            nombre: '',
            apellidoPaterno: '',
            email: '',
            iniciales: '',
            id: '',
            apellidoMaterno: '',
            foto: '',
            nombreCorto: '',
            slug: ''
        },
        task: []
    }

    // Tasks

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
        },
        clearCreatedResultado: (state) => {
            state.isCreatedResultado = false
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
                state.isCreatingResultado = true
                state.isCreatedResultado = false
            })
            .addCase(createResultadoThunk.fulfilled, (state, {payload}) => {
                state.isCreatingResultado = false
                state.resultadosClave = [...state.resultadosClave, payload]
                state.isCreatedResultado = true
            })
            .addCase(createResultadoThunk.rejected, (state) => {
                state.isCreatingResultado = false
                state.isCreatedResultado = false
                state.error = true
            })
            .addCase(updateResultadoThunk.pending, (state) => {
                state.isLoadingResultado = true
            })
            .addCase(updateResultadoThunk.fulfilled, (state, {payload}) => {
                state.isLoadingResultado = false
                state.resultadosClave = state.resultadosClave.map(resultado => resultado.id === payload.id ? payload : resultado)
                state.currentResultadoClave = payload
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



            // Tasks sustituye a Acciones
            // createTaskThunk
            // updateTaskThunk
            // deleteTaskThunk

            .addCase(createTaskThunk.pending, (state) => {
                state.error = false
            })
            .addCase(createTaskThunk.fulfilled, (state, { payload }) => {
                const resultadoClave = state.resultadosClave.find(resultado => resultado.id === payload.taskeableId)
                
                if(resultadoClave){
                    resultadoClave.task = [...resultadoClave.task, payload]
                    resultadoClave.progreso = resultadoClave.task.reduce((acc, task) => acc + (task.status === 'FINALIZADA' ? 1 : 0), 0) / resultadoClave.task.length * 100
                }
            })
            .addCase(createTaskThunk.rejected, (state) => {
                state.error = true
            })
            .addCase(updateTaskThunk.pending, (state) => {
                state.error = false
            })
            .addCase(updateTaskThunk.fulfilled, (state, { payload }) => {
                const updatedResultadoClave = state.resultadosClave.find(resultado => resultado.id === payload.taskeableId)

                if(updatedResultadoClave){
                    updatedResultadoClave.task = updatedResultadoClave.task.map(task => task.id === payload.id ? payload : task)

                    updatedResultadoClave.progreso = updatedResultadoClave.task.reduce((acc, task) => acc + (task.status === 'FINALIZADA' ? 1 : 0), 0) / updatedResultadoClave.task.length * 100

                    console.log(updatedResultadoClave.progreso);
                    
                }

            })
            .addCase(updateTaskThunk.rejected, (state) => {
                state.error = true
            })
            .addCase(deleteTaskThunk.pending, (state) => {
                state.error = false
            })
            .addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
                const deletedTask = state.resultadosClave.find(resultado => resultado.id === payload.taskeableId)

                if(deletedTask){
                    deletedTask.task = deletedTask.task.filter(task => task.id !== payload.id)
                    deletedTask.progreso = deletedTask.task.reduce((acc, task) => acc + (task.status === 'FINALIZADA' ? 1 : 0), 0) / deletedTask.task.length * 100
                }
            })

    }
})

export const { clearResultadoClave, clearCreatedResultado } = resultadoClaveSlice.actions

export default resultadoClaveSlice.reducer


