import { createSlice } from '@reduxjs/toolkit'
import { CoreState, } from '@/interfaces';
import { createCoreThunk, deleteCoreThunk, getCoreThunk, getCoresThunk, updateCoreThunk } from './coreThunk';


const initialState: CoreState = {
    objetivosCore: [],
    isLoading: false,
    isLoadingCurrent: false,
    infoMessage: '',
    error: false,
    currentCore: {
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
        propietario: {
            id: '',
            nombre: '',
            apellidoMaterno: '',
            apellidoPaterno: '',
            email: '',
            iniciales: '',
            departamentos: [],
        },
        comentarios: [],
        
    }
}

const tacticosSlice = createSlice({
    name: 'tacticosSlice',
    initialState,
    reducers: {
        clearTacticos: (state) => {
            state.objetivosCore = initialState.objetivosCore
        },
        clearCurrentTactico: (state) => {
            state.currentCore = initialState.currentCore
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCoresThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCoresThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.objetivosCore = payload.objetivosCore
            })
            .addCase(getCoresThunk.rejected, (state) => {
                state.isLoading = false,
                state.infoMessage = 'Error al obtener los objetivos cores'
            })
            .addCase(getCoreThunk.pending, (state) => {
                state.isLoadingCurrent = true
            })
            .addCase(getCoreThunk.fulfilled, (state, { payload }) => {
                state.isLoadingCurrent = false
                state.currentCore = payload.objetivoCore
            })
            .addCase(getCoreThunk.rejected, (state) => {
                state.isLoadingCurrent = false,
                state.infoMessage = 'Error al obtener el objetivo core'
            })
            .addCase(updateCoreThunk.pending, (state) => {
                
            })
            .addCase(updateCoreThunk.fulfilled, (state, { payload }) => {
                state.currentCore = payload.objetivoCore

                state.objetivosCore = state.objetivosCore.map((tactico) => {
                    if (tactico.id === payload.objetivoCore.id) {
                        return payload.objetivoCore
                    }
                    return tactico
                })

                
            })
            .addCase(updateCoreThunk.rejected, (state) => {
                state.infoMessage = 'Error al actualizar el objetivo core'
            })
            .addCase(createCoreThunk.pending, (state) => {   
            })
            .addCase(createCoreThunk.fulfilled, (state, { payload }) => {
                state.objetivosCore = [...state.objetivosCore, payload.response.objetivoCore]
            })
            .addCase(createCoreThunk.rejected, (state) => {
                state.infoMessage = 'Error al crear el objetivo core'
            })
            .addCase(deleteCoreThunk.pending, (state) => {
            })
            .addCase(deleteCoreThunk.fulfilled, (state, { payload }) => {
                state.objetivosCore = state.objetivosCore.filter((tactico) => tactico.id !== payload.objetivoCore.id)
            })
            .addCase(deleteCoreThunk.rejected, (state) => {
                state.infoMessage = 'Error al eliminar el objetivo core'
            })

        }
})

export const {
    clearTacticos,
    clearCurrentTactico,
} = tacticosSlice.actions

export default tacticosSlice.reducer