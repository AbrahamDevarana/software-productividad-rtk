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
    },
    lideres: []
}

const departamentosSlice = createSlice({
    name: 'departamentosSlice',
    initialState,
    reducers: {
        // checkingDepartamentos: (state) => {
        //     state.isLoading = true
        // },
        // setDepartamentosError: (state, action) => {
        //     state.isLoading = false
        //     state.infoMessage = action.payload
        //     state.error = true
        // },
        // getDepartamentos: (state, action) => {
        //     state.departamentos = action.payload.departamentos.rows
        //     state.paginate = {
        //         totalItem: action.payload.departamentos.totalItem,
        //         totalPages: action.payload.departamentos.totalPages,
        //         currentPage: action.payload.departamentos.currentPage
        //     }
        //     state.isLoading = false
        // },
        // getCurrentDepartamento: (state, action) => {
        //     state.currentDepartamento = action.payload.departamento
        //     state.isLoading = false
        // },
        // createDepartamento: (state, action) => {
        //     state.departamentos.push(action.payload.departamento)
        //     state.isLoading = false
        //     state.infoMessage = action.payload.message         
        // },
        // updateDepartamento: (state, action) => {            
        //     const index = state.departamentos.findIndex(departamento => departamento.id === action.payload.departamento.id)
        //     state.departamentos[index] = action.payload.departamento
        //     state.isLoading = false
        //     state.infoMessage = action.payload.message
        // },
        // deleteDepartamento: (state, action) => {
        //     const index = state.departamentos.findIndex(departamento => departamento.id === action.payload)
        //     state.departamentos.splice(index, 1)
        //     state.isLoading = false
        //     state.infoMessage = 'Área eliminada correctamente' 
        // },
        clearDepartamentos: (state) => {
            state.departamentos = initialState.departamentos 
        },
        clearCurrentDepartamento: (state) => {
            state.currentDepartamento = initialState.currentDepartamento
        },
        // getLideresDepartamento: (state, action) => {
        //     state.lideres = action.payload.lideres
        //     state.isLoading = false
        // }
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
} = departamentosSlice.actions

export default departamentosSlice.reducer

