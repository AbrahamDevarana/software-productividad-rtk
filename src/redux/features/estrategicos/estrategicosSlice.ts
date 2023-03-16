import { createSlice } from '@reduxjs/toolkit'
import { EstrategicosState } from '@/interfaces';

const initialState: EstrategicosState = {
    estrategicos: [],
    paginate: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
    }, 
    isLoading: false,
    infoMessage: '',
    error: false,
    updated: false,
    created: false,
    deleted: false,
    currentEstrategico: {
        id: '',
        nombre: '',
        clave: '',
        descripcion: '',
        progreso: 0,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        status: 0,
        perspectivas: []
    }
}

const estrategicosSlice = createSlice({
    name: 'estrategicosSlice',
    initialState,
    reducers: {
        checkingEstrategicos: (state) => {
            state.isLoading = true
            state.updated = false
        },
        setEstrategicosError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getEstrategicos: (state, action) => {            
            state.isLoading = false
            state.estrategicos = action.payload.objetivosEstrategicos.rows
            state.paginate = {
                totalItems: action.payload.objetivosEstrategicos.totalItems,
                totalPages: action.payload.objetivosEstrategicos.totalPages,
                currentPage: action.payload.objetivosEstrategicos.currentPage
            }
        },
        getCurrentEstrategico: (state, action) => {
            state.currentEstrategico = action.payload.estrategico
            state.isLoading = false
        },
        createEstrategico: (state, action) => {
            state.estrategicos.push(action.payload.estrategico)
            state.created = true
            state.isLoading = false
        },
        updateEstrategico: (state, action) => {
            state.estrategicos = state.estrategicos.map(estrategico => estrategico.id === action.payload.estrategico.id ? action.payload.estrategico : estrategico)
            state.updated = true
            state.isLoading = false
            state.currentEstrategico = action.payload.estrategico
        },
        deleteEstrategico: (state, action) => {
            state.estrategicos = state.estrategicos.filter(estrategico => estrategico.id !== action.payload.id)
            state.deleted = true
            state.isLoading = false
        },
        clearEstrategicos: (state) => {
            state = initialState
        },
        clearCurrentEstrategico: (state) => {
            state.currentEstrategico = initialState.currentEstrategico
        },          
        
    }
})

export const {
    checkingEstrategicos,
    setEstrategicosError,
    getEstrategicos,
    getCurrentEstrategico,
    createEstrategico,
    updateEstrategico,
    deleteEstrategico,
    clearEstrategicos,
    clearCurrentEstrategico
} = estrategicosSlice.actions

export default estrategicosSlice.reducer