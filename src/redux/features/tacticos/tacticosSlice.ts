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
        },
        estrategico: {
            id: '',
            nombre: '',
            codigo: '',
            descripcion: '',
            fechaFin: new Date(),
            fechaInicio: new Date(),
            progreso: 0,
            status: 0,
            indicador: '',
            perspectivaId: '',
            responsables: [],
        },
        
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
            state.tacticos_core = action.payload.tacticos_core
        },
        getCurrentTactico: (state, action) => {
            state.currentTactico = action.payload.tactico
            state.isLoading = false
        },
        createTactico: (state, action) => {      
            const {objetivo} = action.payload
            
            if(objetivo.estrategicoId){
                state.tacticos = [ ...state.tacticos, objetivo]
            }else{
                state.tacticos_core = [ ...state.tacticos_core, objetivo]
            }

            state.currentTactico = objetivo
            state.created = true
            state.isLoading = false
        },
        updateTactico: (state, action) => {
            const {objetivo} = action.payload
            
            
            if(objetivo.estrategicoId){
                state.tacticos = [ ...state.tacticos, objetivo]
                state.tacticos_core = state.tacticos_core.filter( objetivo => objetivo.id !== objetivo.id )
            
            }else{
                state.tacticos_core = [ ...state.tacticos_core, objetivo]
                state.tacticos = state.tacticos_core.filter( objetivo => objetivo.id !== objetivo.id )
            }

            state.updated = true
            state.isLoading = false
            state.currentTactico = objetivo
        },
        deleteTactico: (state, action) => {
            state.tacticos = state.tacticos.filter(tactico => tactico.id !== action.payload.id)
            state.deleted = true
            state.isLoading = false
        },
        clearTacticos: (state) => {
            state.tacticos = initialState.tacticos
            state.tacticos_core = initialState.tacticos_core
        },
        clearCurrentTactico: (state) => {
            
            state.currentTactico = initialState.currentTactico
        },       
        clearAlertTacticos: (state) => {   
            state.error = false
            state.updated = false
            state.created = false
            state.deleted = false
            state.infoMessage = ''
        }
        
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
    clearCurrentTactico,
    clearAlertTacticos
} = tacticosSlice.actions

export default tacticosSlice.reducer