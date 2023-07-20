import { createSlice } from '@reduxjs/toolkit'
import { TacticosState } from '@/interfaces';
import { createTacticoThunk, deleteTacticoThunk, getTacticoFromAreaThunk, getTacticoFromEquiposThunk, getTacticoFromEstrategiaThunk, getTacticoThunk, getTacticosThunk, updateQuartersThunk, updateTacticoThunk } from './tacticosThunk';


const initialState: TacticosState = {
    tacticos: [],
    tacticos_core: [],
    tacticosGeneral: [],
    isLoading: false,
    isLoadingCurrent: false,
    isLoadingQuarters: false,
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
        trimestres: [],
        
    }
}

const tacticosSlice = createSlice({
    name: 'tacticosSlice',
    initialState,
    reducers: {
        clearTacticos: (state) => {
            state.tacticos = initialState.tacticos
            state.tacticos_core = initialState.tacticos_core
        },
        clearCurrentTactico: (state) => {
            state.currentTactico = initialState.currentTactico
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTacticoFromAreaThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTacticoFromAreaThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.tacticos = action.payload.tacticos
                state.tacticos_core = action.payload.tacticos_core
            })
            .addCase(getTacticoFromAreaThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
            // .addCase(getTacticoFromEstrategiaThunk.pending, (state) => {
            //     state.isLoading = true
            // })
            // .addCase(getTacticoFromEstrategiaThunk.fulfilled, (state, action) => {
            //     state.isLoading = false
            //     state.tacticos = action.payload.tacticos
            //     state.tacticos_core = action.payload.tacticos_core
            // })
            // .addCase(getTacticoFromEstrategiaThunk.rejected, (state, action) => {
            //     state.isLoading = false
            //     state.error = true
            // })
            .addCase(getTacticoThunk.pending, (state) => {
                state.isLoadingCurrent = true
            })
            .addCase(getTacticoThunk.fulfilled, (state, action) => {
                state.isLoadingCurrent = false
                state.currentTactico = action.payload
            })
            .addCase(getTacticoThunk.rejected, (state, action) => {
                state.isLoadingCurrent = false
                state.error = true
            })
            .addCase(updateTacticoThunk.pending, (state) => {
                // state.isLoadingCurrent = true
            })
            .addCase(updateTacticoThunk.fulfilled, (state, action) => {
                // currentTactico
                // state.isLoadingCurrent = false
                state.currentTactico = action.payload
                                                
                if(action.payload.estrategicoId){
                    // si existe en el array de tacticos, lo actualiza
                    const find = state.tacticos.find( tactico => tactico.id === action.payload.id )
                    if(find){
                        state.tacticos = state.tacticos.map( tactico =>  tactico.id === action.payload.id ? action.payload : tactico )
                    }else{
                        state.tacticos = [ ...state.tacticos, action.payload]
                    }
                    // si existe en el array de tacticos_core, lo elimina
                    state.tacticos_core = state.tacticos_core.filter( objetivo => objetivo.id !== action.payload.id )

                }else{
                    const find = state.tacticos_core.find( tactico => tactico.id === action.payload.id )
                    if(find){
                        state.tacticos_core = state.tacticos_core.map( tactico =>  tactico.id === action.payload.id ? action.payload : tactico )
                    }else{
                        state.tacticos_core = [ ...state.tacticos_core, action.payload]
                    }
                    state.tacticos = state.tacticos.filter( objetivo => objetivo.id !== action.payload.id )
                }

            })
            .addCase(updateTacticoThunk.rejected, (state, action) => {
                state.isLoadingCurrent = false
                state.error = true
            })
            .addCase(createTacticoThunk.pending, (state) => {
                
            })
            .addCase(createTacticoThunk.fulfilled, (state, action) => {
        
                if (action.payload.estrategicoId) {

                    state.tacticos = [...state.tacticos, action.payload]
                }else {
                    state.tacticos_core = [...state.tacticos_core, action.payload]
                }
            })
            .addCase(createTacticoThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(getTacticosThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTacticosThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.tacticosGeneral = action.payload
            })
            .addCase(deleteTacticoThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTacticoThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.tacticos = state.tacticos.filter( tactico => tactico.id !== action.payload.id )
                state.tacticos_core = state.tacticos_core.filter( tactico => tactico.id !== action.payload.id )
            })
            .addCase(deleteTacticoThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })

            .addCase(updateQuartersThunk.pending, (state) => {
                state.isLoadingQuarters = true
            })
            .addCase(updateQuartersThunk.fulfilled, (state, action) => {
                state.isLoadingQuarters = false
                state.currentTactico.trimestres = action.payload.trimestres
                state.tacticos.map( tactico => tactico.id === action.payload.id ? tactico.trimestres = action.payload.trimestres : tactico )
                state.tacticos_core.map( tactico => tactico.id === action.payload.id ? tactico.trimestres = action.payload.trimestres : tactico )

            })
            .addCase(updateQuartersThunk.rejected, (state, action) => {
                state.isLoadingQuarters = false
                state.error = true
            })
            .addCase(getTacticoFromEquiposThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTacticoFromEquiposThunk.fulfilled, (state, action) => {

                state.isLoading = false
                state.tacticos = action.payload.tacticos
                state.tacticos_core = action.payload.tacticos_core
            })
            .addCase(getTacticoFromEquiposThunk.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
        }
})

export const {
    clearTacticos,
    clearCurrentTactico,
} = tacticosSlice.actions

export default tacticosSlice.reducer