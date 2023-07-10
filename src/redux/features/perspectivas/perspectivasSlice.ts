import { createSlice } from '@reduxjs/toolkit'
import { PerspectivasState } from '@/interfaces';
import { createEstrategicoThunk, deleteEstrategicoThunk, updateEstrategicoThunk } from '../estrategicos/estrategicosThunk';

const initialState: PerspectivasState = {
    perspectivas: [],
    isLoading: false,
    infoMessage: '',
    error: false,
    updated: false,
    created: false,
    deleted: false,
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
        checkingPerspectivas: (state) => {
            state.isLoading = true
            state.updated = false
        },
        setPerspectivasError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getPerspectivas: (state, action) => {
            state.perspectivas = action.payload.perspectivas
            state.isLoading = false
        },
        getCurrentPerspectiva: (state, action) => {
            state.currentPerspectiva = action.payload.perspectiva
            state.isLoading = false
        },
        createPerspectiva: (state, action) => {
            state.perspectivas.push(action.payload.perspectiva)
            state.created = true
            state.isLoading = false
        },
        updatePerspectiva: (state, action) => {
            state.perspectivas = state.perspectivas.map(perspectiva => perspectiva.id === action.payload.perspectiva.id ? action.payload.perspectiva : perspectiva)
            state.updated = true
            state.isLoading = false
            state.currentPerspectiva = action.payload.perspectiva
        },
        deletePerspectiva: (state, action) => {
            state.perspectivas = state.perspectivas.filter(perspectiva => perspectiva.id !== action.payload.id)
            state.deleted = true
            state.isLoading = false
        },
        clearPerspectivas: (state) => {
            state = initialState
        },
        clearCurrentPerspectiva: (state) => {
            state.currentPerspectiva = initialState.currentPerspectiva
        },   
        createEstrategicoFromProvider: (state, action) => {
           
            state.perspectivas = state.perspectivas.map((perspectiva) => perspectiva.id === action.payload.perspectivaId
              ? {
                  ...perspectiva,
                  objetivosEstrategicos: perspectiva.objetivosEstrategicos ? [...perspectiva.objetivosEstrategicos, action.payload.objetivoEstrategico] : [action.payload.objetivoEstrategico]
                }
              : perspectiva
            );
            state.created = true
            state.isLoading = false 
        }     
        
    },
    extraReducers: (builder) => {
        builder
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

    }
})

export const {
    checkingPerspectivas,
    setPerspectivasError,
    getPerspectivas,
    getCurrentPerspectiva,
    createPerspectiva,
    updatePerspectiva,
    deletePerspectiva,
    clearPerspectivas,
    clearCurrentPerspectiva,
    createEstrategicoFromProvider
} = perspectivasSlice.actions

export default perspectivasSlice.reducer