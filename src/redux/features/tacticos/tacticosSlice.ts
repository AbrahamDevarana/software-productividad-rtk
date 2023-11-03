import { createSlice } from '@reduxjs/toolkit'
import { TacticosState } from '@/interfaces';
import { createTacticoThunk, deleteTacticoThunk, getTacticoFromAreaThunk, getTacticoFromEstrategiaThunk, getTacticoThunk, getTacticosByEquiposThunk, getTacticosByEstrategiaThunk, updateTacticoThunk } from './tacticosThunk';


const initialState: TacticosState = {
    objetivosTacticos: [],
    isLoading: false,
    isLoadingCurrent: false,
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
        tipoObjetivo: 0,
        responsables: [],
        areas: [],
        propietarioId: '',
        estrategicoId: '',
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
        
    }
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
                state.currentTactico = payload.objetivoTactico

                const findObjetivoTactico = state.objetivosTacticos.find((tactico) => tactico.estrategicoId === payload.objetivoTactico.estrategicoId)

                if(findObjetivoTactico) {
                    state.objetivosTacticos = state.objetivosTacticos.map((tactico) => {
                        if (tactico.id === payload.objetivoTactico.id) {
                            return payload.objetivoTactico
                        }
                        return tactico
                    })
                }else {
                    // filter
                    state.objetivosTacticos = state.objetivosTacticos.filter((tactico) => tactico.id !== payload.objetivoTactico.id)
                }

                
            })
            .addCase(updateTacticoThunk.rejected, (state) => {
                state.infoMessage = 'Error al actualizar el objetivo táctico'
            })
            .addCase(createTacticoThunk.pending, (state) => {   
            })
            .addCase(createTacticoThunk.fulfilled, (state, { payload }) => {
                state.objetivosTacticos = [...state.objetivosTacticos, payload.response.objetivoTactico]
            })
            .addCase(createTacticoThunk.rejected, (state) => {
                state.infoMessage = 'Error al crear el objetivo táctico'
            })
            .addCase(deleteTacticoThunk.pending, (state) => {
            })
            .addCase(deleteTacticoThunk.fulfilled, (state, { payload }) => {
                state.objetivosTacticos = state.objetivosTacticos.filter((tactico) => tactico.id !== payload.objetivoTactico.id)
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

        }
})

export const {
    clearTacticos,
    clearCurrentTactico,
} = tacticosSlice.actions

export default tacticosSlice.reducer