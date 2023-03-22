import { createSlice } from '@reduxjs/toolkit'
import { TacticosState } from '@/interfaces';

const initialState: TacticosState = {
    tacticos: [],
    tacticos_core: [],
    isLoading: false,
    infoMessage: '',
    error: false,
    updated: false,
    created: false,
    deleted: false,
    currentTactico: {
        id: '',
        nombre: '',
        codigo: '',
        meta: '',
        indicador: '',
        progreso: 0,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        status: 0,
        tipoObjetivo: 0
    }
}

const tacticosSlice = createSlice({
    name: 'tacticosSlice',
    initialState,
    reducers: {
        checkingTacticos: (state) => {
            state.isLoading = true
            state.updated = false
        },
        setTacticosError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getTacticos: (state, action) => {                 
            state.isLoading = false
            state.tacticos = action.payload.tacticos
        },
        getCurrentTactico: (state, action) => {
            console.log(action.payload);
            
            state.currentTactico = action.payload.tactico
            state.isLoading = false
        },
        createTactico: (state, action) => {
            state.tacticos = [...state.tacticos, action.payload.tactico]
            state.created = true
            state.isLoading = false
        },
        updateTactico: (state, action) => {
            state.tacticos = state.tacticos.map(tactico => tactico.id === action.payload.tactico.id ? action.payload.tactico : tactico)
            state.updated = true
            state.isLoading = false
            state.currentTactico = action.payload.tactico
        },
        deleteTactico: (state, action) => {
            state.tacticos = state.tacticos.filter(tactico => tactico.id !== action.payload.id)
            state.deleted = true
            state.isLoading = false
        },
        clearTacticos: (state) => {
            state = initialState
        },
        clearCurrentTactico: (state) => {
            state.currentTactico = initialState.currentTactico
        },          
        
    }
})

export const {
    checkingTacticos,
    setTacticosError,
    getTacticos,
    getCurrentTactico,
    createTactico,
    updateTactico,
    deleteTactico,
    clearTacticos,
    clearCurrentTactico
} = tacticosSlice.actions

export default tacticosSlice.reducer