import { createSlice } from '@reduxjs/toolkit'
import { DepartamentoState, Paginate } from '@/interfaces';
import { Lider } from '@/interfaces/usuario';
import { getLideresDepartamentoThunk, createDepartamentoThunk, deleteDepartamentoThunk, getDepartamentoThunk, getDepartamentosThunk, updateDepartamentoThunk } from './departamentosThunks';




const initialState: DepartamentoState = {
    departamentos: [],
    paginate: {
        totalItem: 0,
        totalPages: 0,
        currentPage: 0,
    },
    isLoadingCurrent: false,
    isLoading: false,
    infoMessage: '',
    error: false,
    currentDepartamento: {
        id: 0,
        nombre: '',
        slug: '',
        leaderId: '',
        status: true,
        usuario: [],
        isEvaluableDepartment: true,
        color: '#000000',
        leader: {
            id: '',
            nombreCorto: '',
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            iniciales: '',
            email: '',
            foto: '',
            slug: '',
        }
    },
    lideres: []
}

const departamentosSlice = createSlice({
    name: 'departamentosSlice',
    initialState,
    reducers: {
        clearDepartamentos: (state) => {
            state.departamentos = initialState.departamentos 
        },
        clearCurrentDepartamento: (state) => {
            state.currentDepartamento = initialState.currentDepartamento
        },
        clearLideres: (state) => {
            state.lideres = initialState.lideres
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getLideresDepartamentoThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getLideresDepartamentoThunk.fulfilled, (state, action) => {
            state.lideres = action.payload
            state.isLoading = false
        })
        .addCase(getLideresDepartamentoThunk.rejected, (state, action) => {
            state.isLoading = false
            state.infoMessage = action.error.message!
            state.error = true
        })
        .addCase(getDepartamentosThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getDepartamentosThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.departamentos = action.payload.rows
            state.paginate = {
                totalItem: action.payload.totalItem,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage
            }
        })
        .addCase(getDepartamentosThunk.rejected, (state, action) => {
            state.isLoading = false
            state.infoMessage = action.error.message!
            state.error = true
        })
        .addCase(getDepartamentoThunk.pending, (state) => {
            state.isLoadingCurrent = true
        })
        .addCase(getDepartamentoThunk.fulfilled, (state, action) => {
            state.isLoadingCurrent = false
            state.currentDepartamento = action.payload
        })
        .addCase(getDepartamentoThunk.rejected, (state, action) => {
            state.isLoadingCurrent = false
            state.infoMessage = action.error.message!
            state.error = true
        })
        .addCase(createDepartamentoThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createDepartamentoThunk.fulfilled, (state, action) => {
            state.departamentos = [...state.departamentos, action.payload]
            state.isLoading = false
        })
        .addCase(createDepartamentoThunk.rejected, (state, action) => {
            state.isLoading = false
            state.infoMessage = action.error.message!
            state.error = true
        })
        .addCase(updateDepartamentoThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateDepartamentoThunk.fulfilled, (state, action) => {
            state.departamentos = state.departamentos.map(departamento => departamento.id === action.payload.id ? action.payload : departamento)
            state.isLoading = false
        })
        .addCase(updateDepartamentoThunk.rejected, (state, action) => {
            state.isLoading = false
            state.infoMessage = action.error.message!
            state.error = true
        })
        .addCase(deleteDepartamentoThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteDepartamentoThunk.fulfilled, (state, action) => {
            state.departamentos = state.departamentos.filter(departamento => departamento.id !== action.payload.id)
        })
        .addCase(deleteDepartamentoThunk.rejected, (state, action) => {
            state.isLoading = false
            state.infoMessage = action.error.message!
            state.error = true
        })
        
    }
})

export const {
    clearDepartamentos,
    clearCurrentDepartamento,
    clearLideres
} = departamentosSlice.actions

export default departamentosSlice.reducer

