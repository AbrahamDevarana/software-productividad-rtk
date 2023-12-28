import { createSlice } from '@reduxjs/toolkit'
import { PerspectivasState } from '@/interfaces';
import { changeTypeProgressEstrategicoThunk, createEstrategicoThunk, deleteEstrategicoThunk, updateEstrategicoThunk } from '../estrategicos/estrategicosThunk';
import { createPerspectivaThunk, deletePerspectivaThunk, getPerspectivaThunk, getPerspectivasThunk, updatePerspectivaThunk } from './perspectivasThunk';

const initialState: PerspectivasState = {
    perspectivas: [],
    isLoading: false,
    infoMessage: '',
    error: false,
    currentPerspectiva: {
        id: '',
        nombre: '',
        descripcion: '',
        progreso: 0,
        color: '',
        status: 'SIN_INICIAR',
        objetivosEstrategicos: [],
    }
}

const perspectivasSlice = createSlice({
    name: 'perspectivasSlice',
    initialState,
    reducers: {
        clearPerspectivas: (state) => {
            state = initialState
        },
        clearCurrentPerspectiva: (state) => {
            state.currentPerspectiva = initialState.currentPerspectiva
        },           
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPerspectivasThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getPerspectivasThunk.fulfilled, (state, action) => {
            state.perspectivas = action.payload
            state.isLoading = false
        })
        .addCase(getPerspectivasThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.error.message ? action.error.message : 'Error al obtener las perspectivas'
        })
        .addCase(getPerspectivaThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getPerspectivaThunk.fulfilled, (state, action) => {
            state.currentPerspectiva = action.payload
            state.isLoading = false
        })
        .addCase(getPerspectivaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.error.message ? action.error.message : 'Error al obtener la perspectiva'
        })
        .addCase(createPerspectivaThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createPerspectivaThunk.fulfilled, (state, action) => {
            state.perspectivas.push(action.payload)
            state.isLoading = false
        })
        .addCase(createPerspectivaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.error.message ? action.error.message : 'Error al crear la perspectiva'
        })
        .addCase(deletePerspectivaThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deletePerspectivaThunk.fulfilled, (state, action) => {
            state.perspectivas = state.perspectivas.filter(perspectiva => perspectiva.id !== action.payload.id)
            state.isLoading = false
        })
        .addCase(deletePerspectivaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.error.message ? action.error.message : 'Error al eliminar la perspectiva'
        })
        .addCase(updatePerspectivaThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updatePerspectivaThunk.fulfilled, (state, action) => {
            state.perspectivas = state.perspectivas.map(perspectiva => perspectiva.id === action.payload.id ? action.payload : perspectiva)
            state.isLoading = false
        })
        .addCase(updatePerspectivaThunk.rejected, (state, action) => {
            state.isLoading = false
            state.error = true
            state.infoMessage = action.error.message ? action.error.message : 'Error al actualizar la perspectiva'
        })
        .addCase(updateEstrategicoThunk.fulfilled, (state, action) => {
            const perspectiva = state.perspectivas.find(perspectiva => perspectiva.id === action.payload.perspectivaId)
            const oldPerspectiva = state.perspectivas.find(perspectiva => perspectiva.objetivosEstrategicos?.find(estrategico => estrategico.id === action.payload.id))
            
            if (perspectiva && oldPerspectiva?.id !== perspectiva.id) {
                perspectiva.objetivosEstrategicos = perspectiva.objetivosEstrategicos ? [...perspectiva.objetivosEstrategicos, action.payload] : [action.payload]

                if ( oldPerspectiva ) {
                    oldPerspectiva.objetivosEstrategicos = oldPerspectiva.objetivosEstrategicos?.filter(estrategico => estrategico.id !== action.payload.id)
                }
            }else{
                if (perspectiva) {
                    perspectiva.objetivosEstrategicos = perspectiva.objetivosEstrategicos?.map(estrategico => estrategico.id === action.payload.id ? action.payload : estrategico)
                }
            }
        })
        .addCase(createEstrategicoThunk.fulfilled, (state, action) => {

            const perspectiva = state.perspectivas.find(perspectiva => perspectiva.id === action.payload.perspectivaId)
            if (perspectiva) {
                perspectiva.objetivosEstrategicos = perspectiva.objetivosEstrategicos ? [...perspectiva.objetivosEstrategicos, action.payload] : [action.payload]
            }
        })
        .addCase(deleteEstrategicoThunk.fulfilled, (state, action) => {

            const perspectiva = state.perspectivas.find(perspectiva => perspectiva.id === action.payload.perspectivaId)
            if (perspectiva) {
                perspectiva.objetivosEstrategicos = perspectiva.objetivosEstrategicos?.filter(estrategico => estrategico.id !== action.payload.id)
            }
        })

        .addCase(changeTypeProgressEstrategicoThunk.pending, (state) => {
        })
        .addCase(changeTypeProgressEstrategicoThunk.fulfilled, (state, {payload}) => {


            const { objetivoEstrategico} = payload
            const perspectiva = state.perspectivas.find(perspectiva => perspectiva.id === objetivoEstrategico.perspectivaId)

            if (perspectiva) {
                const objetivo = perspectiva.objetivosEstrategicos?.find(estrategico => estrategico.id === objetivoEstrategico.perspectivaId)
                if (objetivo) {
                    objetivo.progreso = objetivoEstrategico.progreso
                    objetivo.status = objetivoEstrategico.status
                    objetivo.suggest = objetivoEstrategico.suggest
                }

                
            }
        })

    }
})

export const {
    clearPerspectivas,
    clearCurrentPerspectiva,
} = perspectivasSlice.actions

export default perspectivasSlice.reducer