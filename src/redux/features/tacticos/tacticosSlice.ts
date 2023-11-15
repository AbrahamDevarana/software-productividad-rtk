import { createSlice } from '@reduxjs/toolkit'
import { TacticosState } from '@/interfaces';
import { changeTypeProgressThunk, createTacticoThunk, deleteTacticoThunk, getTacticoThunk, getTacticosByEquipoCoreThunk, getTacticosByEquiposThunk, getTacticosByEstrategiaThunk, updateTacticoThunk, updateTacticoTypeThunk } from './tacticosThunk';


const initialState: TacticosState = {
    objetivosTacticos: [],
    objetivosCore: [],
    isLoading: false,
    isLoadingCore: false,
    isLoadingCurrent: false,
    isLoadingCurrentCore: false,
    isLoadingProgress: false,
    infoMessage: '',
    error: false,
    currentTactico: {
        id: '',
        nombre: '',
        codigo: '',
        meta: '',
        indicador: '',
        progreso: 0,
        status: 'SIN_INICIAR',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        tipoObjetivo: 'ESTRATEGICO',
        tipoProgreso: 'MANUAL',
        responsables: [],
        areas: [],
        propietarioId: '',
        estrategicoId: '',
        departamentoId: 0,
        propietario: {
            id: '',
            nombre: '',
            apellidoMaterno: '',
            apellidoPaterno: '',
            email: '',
            iniciales: '',
            departamentos: [],
        },
        estrategico: {
            id: '',
            nombre: '',
            codigo: '',
            descripcion: '',
            progreso: 0,
            fechaInicio: new Date(),
            fechaFin: new Date(),
            status: 'SIN_INICIAR',
            indicador: '',
            perspectivaId: '',
            comentarios: [],
            propietarioId: '',
            tacticos: [],
            propietario: {
                nombre: '',
                apellidoPaterno: '',
                email: '',
                id: '',
                apellidoMaterno: '',
                iniciales: '',
                departamentos: [],
            },
            perspectivas: { 
                id: '',
                nombre: '',
                descripcion: '',
                icono: 'faChartLine',
                color: '',
                status: 'SIN_INICIAR',
                progreso: 0,
                objetivosEstrategicos: [],
            },
            responsables: [],
        },
        comentarios: [],
        suggest: 0,
    },
}

const tacticosSlice = createSlice({
    name: 'tacticosSlice',
    initialState,
    reducers: {
        clearTacticos: (state) => {
            state.objetivosTacticos = initialState.objetivosTacticos
        },
        clearCurrentTactico: (state) => {
            state.currentTactico = initialState.currentTactico
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTacticosByEstrategiaThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTacticosByEstrategiaThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.objetivosTacticos = payload.objetivosTacticos
            })
            .addCase(getTacticosByEstrategiaThunk.rejected, (state) => {
                state.isLoading = false,
                state.infoMessage = 'Error al obtener los objetivos tácticos'
            })
            .addCase(getTacticoThunk.pending, (state) => {
                state.isLoadingCurrent = true
            })
            .addCase(getTacticoThunk.fulfilled, (state, { payload }) => {
                state.isLoadingCurrent = false
                state.currentTactico = payload.objetivoTactico
            })
            .addCase(getTacticoThunk.rejected, (state) => {
                state.isLoadingCurrent = false,
                state.infoMessage = 'Error al obtener el objetivo táctico'
            })
            .addCase(updateTacticoThunk.pending, (state) => {
                
            })
            .addCase(updateTacticoThunk.fulfilled, (state, { payload }) => {

                const { objetivoTactico } = payload
                state.currentTactico = payload.objetivoTactico

                const findObjetivoTactico = state.objetivosTacticos.find((tactico) => tactico.id === objetivoTactico.id)
                const findObjetivoCore = state.objetivosCore.find((core) => core.id === objetivoTactico.id)


                
                if(findObjetivoTactico) {
                    state.objetivosTacticos = state.objetivosTacticos.map((tactico) => {
                        if (tactico.id === objetivoTactico.id) {
                            return objetivoTactico
                        }
                        return tactico
                    })
                }else {
                    state.objetivosTacticos = state.objetivosTacticos.filter((tactico) => tactico.id !== objetivoTactico.id)
                }

                if(findObjetivoCore){
                    state.objetivosCore = state.objetivosCore.map((core) => {
                        if (core.id === objetivoTactico.id) {
                            return objetivoTactico
                        }
                        return core
                    })
                }else {
                    state.objetivosCore = state.objetivosCore.filter((core) => core.id !== objetivoTactico.id)
                }
                
            })
            .addCase(updateTacticoThunk.rejected, (state) => {
                state.infoMessage = 'Error al actualizar el objetivo táctico'
            })
            .addCase(createTacticoThunk.pending, (state) => {   
            })
            .addCase(createTacticoThunk.fulfilled, (state, { payload }) => {

                const { objetivoTactico } = payload

                if(objetivoTactico.tipoObjetivo === 'ESTRATEGICO') state.objetivosTacticos = [...state.objetivosTacticos, objetivoTactico]
                if(objetivoTactico.tipoObjetivo === 'CORE') state.objetivosCore = [...state.objetivosCore, objetivoTactico]
            })
            .addCase(createTacticoThunk.rejected, (state) => {
                state.infoMessage = 'Error al crear el objetivo táctico'
            })
            .addCase(deleteTacticoThunk.pending, (state) => {
            })
            .addCase(deleteTacticoThunk.fulfilled, (state, { payload }) => {
                state.objetivosTacticos = state.objetivosTacticos.filter((tactico) => tactico.id !== payload.objetivoTactico.id)
                state.objetivosCore = state.objetivosCore.filter((core) => core.id !== payload.objetivoTactico.id)
            })
            .addCase(deleteTacticoThunk.rejected, (state) => {
                state.infoMessage = 'Error al eliminar el objetivo táctico'
            })
            .addCase(getTacticosByEquiposThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTacticosByEquiposThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.objetivosTacticos = payload.objetivosTacticos
            })
            .addCase(getTacticosByEquiposThunk.rejected, (state) => {
                state.isLoading = false,
                state.infoMessage = 'Error al obtener los objetivos tácticos'
            })

            .addCase(updateTacticoTypeThunk.pending, (state) => {
            })
            .addCase(updateTacticoTypeThunk.fulfilled, (state, { payload }) => {
                const { objetivoTactico } = payload
                state.currentTactico = payload.objetivoTactico

                if(objetivoTactico.tipoObjetivo === 'ESTRATEGICO') {

                    const sameTactico = state.objetivosTacticos.find((tactico) => tactico.estrategicoId === objetivoTactico.estrategicoId)

                    if (sameTactico){
                        state.objetivosTacticos = [...state.objetivosTacticos, objetivoTactico]
                    }
                    state.objetivosCore = state.objetivosCore.filter((core) => core.id !== objetivoTactico.id)
                }

                if(objetivoTactico.tipoObjetivo === 'CORE') {
                    state.objetivosCore = [...state.objetivosCore, objetivoTactico]
                    state.objetivosTacticos = state.objetivosTacticos.filter((tactico) => tactico.id !== objetivoTactico.id)
                }
            
            })

            .addCase(updateTacticoTypeThunk.rejected, (state) => {
                state.infoMessage = 'Error al actualizar el tipo de objetivo'
            })

            .addCase(changeTypeProgressThunk.pending, (state) => {
                state.isLoadingProgress = true
            })
            .addCase(changeTypeProgressThunk.fulfilled, (state, { payload }) => {
                const { objetivoTactico } = payload
                state.currentTactico = payload.objetivoTactico

                if(objetivoTactico.tipoObjetivo === 'ESTRATEGICO') {
                    state.objetivosTacticos = state.objetivosTacticos.map((tactico) => {
                        if (tactico.id === objetivoTactico.id) {
                            return objetivoTactico
                        }
                        return tactico
                    })
                }

                if(objetivoTactico.tipoObjetivo === 'CORE') {
                    state.objetivosCore = state.objetivosCore.map((core) => {
                        if (core.id === objetivoTactico.id) {
                            return objetivoTactico
                        }
                        return core
                    })
                }
                state.isLoadingProgress = false
            
            })
            .addCase(changeTypeProgressThunk.rejected, (state) => {
                state.infoMessage = 'Error al actualizar el tipo de progreso'
                state.isLoadingProgress = false
            })


            // Core

            .addCase(getTacticosByEquipoCoreThunk.pending, (state) => {
                state.isLoadingCore = true
            })
            .addCase(getTacticosByEquipoCoreThunk.fulfilled, (state, { payload }) => {
                state.isLoadingCore = false
                state.objetivosCore = payload.objetivosCore
            })
            .addCase(getTacticosByEquipoCoreThunk.rejected, (state) => {
                state.isLoadingCore = false,
                state.infoMessage = 'Error al obtener los objetivos core'
            })
    }
})

export const {
    clearTacticos,
    clearCurrentTactico,
} = tacticosSlice.actions

export default tacticosSlice.reducer