
import { ResultadoClaveState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { getResultadosThunk, createResultadoThunk, deleteResultadoThunk, getResultadoThunk, updateResultadoThunk, duplicateResultadoThunk} from "./resultadosThunk";
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
        color: 'rgba(101, 106, 118, 1)',
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
            .addCase(duplicateResultadoThunk.pending, (state) => {
                state.isCreatingResultado = true
                state.isCreatedResultado = false
            })
            .addCase(duplicateResultadoThunk.fulfilled, (state, {payload}) => {
                state.isCreatingResultado = false
                state.resultadosClave = [...state.resultadosClave, payload]
                state.isCreatedResultado = true
            })
            .addCase(duplicateResultadoThunk.rejected, (state) => {
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


            .addCase(createTaskThunk.pending, (state) => {
                state.error = false
            })
            .addCase(createTaskThunk.fulfilled, (state, { payload }) => {
                const resultadoClave = state.resultadosClave.find(resultado => resultado.id === payload.taskeableId)
                
                if(resultadoClave){
                    resultadoClave.task = [...resultadoClave.task, payload]
                   
                    if( resultadoClave.tipoProgreso === 'acciones'){
                        (resultadoClave.progreso = resultadoClave.task.reduce((acc, task) => acc + task.progreso, 0) / resultadoClave.task.length).toFixed(2)
                    }
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

                if( updatedResultadoClave.tipoProgreso === 'acciones'){
                    const taskLength = updatedResultadoClave.task.filter(task => task.status !== 'CANCELADO').length
                    updatedResultadoClave.progreso = updatedResultadoClave.task.reduce((acc, task) => acc + task.progreso, 0) / taskLength
                }
                
   
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
                    const tasksInProgressOrFinished = deletedTask.task.filter(task => task.status === 'EN_PROCESO' || task.status === 'FINALIZADO' || task.status === 'SIN_INICIAR')
                      
                      const totalTasks = tasksInProgressOrFinished.length;
                      
                      if (totalTasks > 0) {
                        const sumProgress = tasksInProgressOrFinished.reduce((acc, task) => acc + task.progreso, 0);
                        deletedTask.progreso = sumProgress / totalTasks;
                      } else {
                        // Si no hay tareas en "EN PROCESO" o "FINALIZADO", el progreso es 0
                        deletedTask.progreso = 0;
                      }
                }
            })

    }
})

export const { clearResultadoClave, clearCreatedResultado } = resultadoClaveSlice.actions

export default resultadoClaveSlice.reducer


