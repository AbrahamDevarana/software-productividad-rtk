import { createSlice } from '@reduxjs/toolkit'
import { Paginate } from '../../../../interfaces';

interface DepartamentoState {
    departamentos: Departamento[];
    paginate: Paginate;
    isLoading: boolean;
    error: boolean;
    infoMessage: string;
    updated: boolean;
    created: boolean;
    deleted: boolean;
    currentDepartamento: Departamento;
}

interface Departamento {
    id: number;
    nombre: string;
    areaId: number | null;
}

const initialState: DepartamentoState = {
    departamentos: [],
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
    currentDepartamento: {
        id: 0,
        nombre: '',
        areaId: null
    }
}

const departamentosSlice = createSlice({
    name: 'departamentosSlice',
    initialState,
    reducers: {
        checkingDepartamentos: (state) => {
            state.isLoading = true
            state.updated = false
        },
        setDepartamentosError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getDepartamentos: (state, action) => {
            state.departamentos = action.payload.departamentos.rows
            state.paginate = {
                totalItems: action.payload.departamentos.totalItems,
                totalPages: action.payload.departamentos.totalPages,
                currentPage: action.payload.departamentos.currentPage
            }
            state.isLoading = false
        },
        getCurrentDepartamento: (state, action) => {
            state.currentDepartamento = action.payload.departamento
            state.isLoading = false
        },
        createDepartamento: (state, action) => {
            state.departamentos.push(action.payload.departamento)
            state.isLoading = false
            state.created = true
            state.infoMessage = action.payload.message         
        },
        updateDepartamento: (state, action) => {            
            const index = state.departamentos.findIndex(departamento => departamento.id === action.payload.departamento.id)
            state.departamentos[index] = action.payload.departamento
            state.isLoading = false
            state.updated = true
            state.infoMessage = action.payload.message
        },
        deleteDepartamento: (state, action) => {
            const index = state.departamentos.findIndex(departamento => departamento.id === action.payload)
            state.departamentos.splice(index, 1)
            state.isLoading = false
            state.deleted = true
            state.infoMessage = 'Área eliminada correctamente' 
        },
        clearDepartamentos: (state) => {
            state.departamentos = []
            state.isLoading = false
            state.error = false
            state.infoMessage = ''
            state.updated = false
            state.currentDepartamento = initialState.currentDepartamento
        },
        clearCurrentDepartamento: (state) => {
            state.currentDepartamento = initialState.currentDepartamento
        }
    }
})

export const {
    checkingDepartamentos,
    setDepartamentosError,
    getDepartamentos,
    getCurrentDepartamento,
    createDepartamento,
    updateDepartamento,
    deleteDepartamento,
    clearDepartamentos,
    clearCurrentDepartamento
} = departamentosSlice.actions

export default departamentosSlice.reducer