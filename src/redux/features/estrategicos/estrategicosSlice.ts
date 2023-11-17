import { createSlice } from '@reduxjs/toolkit'
import { EstrategicosState } from '@/interfaces';
import { createEstrategicoThunk, deleteEstrategicoThunk, getEstrategicoThunk, getEstrategicosByAreaThunk, getEstrategicosThunk, updateEstrategicoThunk } from './estrategicosThunk';

const initialState: EstrategicosState = {
    estrategicos: [],
    estrategicosTacticos: [],
    isLoading: false,
    isLoadingCurrent: false,
    isLoadingProgress: false,
    isLoadingEstrategicosByArea: false,
    infoMessage: '',
    error: false,
    currentEstrategico: {
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
        suggest: 0,
        tipoProgreso: 'PROMEDIO',
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

const estrategicosSlice = createSlice({
    name: 'estrategicosSlice',
    initialState,
    reducers: {
        checkingEstrategicos: (state) => {
            state.isLoading = true
        },
        checkingCurrent: (state) => {
            state.isLoadingCurrent = true
        },
        setEstrategicosError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },

        clearEstrategicos: (state) => {
            state = initialState
        },
        clearCurrentEstrategico: (state) => {
            state.currentEstrategico = initialState.currentEstrategico
        },             
    },
    extraReducers: (builder) => {
        builder
            .addCase(getEstrategicosThunk.pending, (state) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(getEstrategicosThunk.fulfilled, (state, action) => {       
                state.isLoading = false,
                state.estrategicos = action.payload
            })
            .addCase(getEstrategicosThunk.rejected, (state) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(getEstrategicoThunk.pending, (state) => {
                state.isLoadingCurrent = true
                state.error = false
            })
            .addCase(getEstrategicoThunk.fulfilled, (state, action) => {
                state.isLoadingCurrent = false
                state.currentEstrategico = action.payload
            })
            .addCase(getEstrategicoThunk.rejected, (state) => {
                state.isLoadingCurrent = false
                state.error = true
            })
            .addCase(createEstrategicoThunk.pending, (state) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(createEstrategicoThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.estrategicos = [...state.estrategicos, action.payload]
            })
            .addCase(createEstrategicoThunk.rejected, (state) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(updateEstrategicoThunk.pending, (state) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(updateEstrategicoThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.currentEstrategico = action.payload
            
            })
            .addCase(updateEstrategicoThunk.rejected, (state) => {
                state.isLoading = false
                state.error = true
            })
            .addCase(deleteEstrategicoThunk.pending, (state) => {
                state.isLoading = true
                state.error = false
            })
            .addCase(deleteEstrategicoThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.estrategicos = state.estrategicos.filter(estrategico => estrategico.id !== action.payload.id)
            })
            .addCase(deleteEstrategicoThunk.rejected, (state) => {
                state.isLoading = false
                state.error = true
            })

            .addCase(getEstrategicosByAreaThunk.pending, (state) => {
                state.isLoadingEstrategicosByArea = true
                state.error = false
            })
            .addCase(getEstrategicosByAreaThunk.fulfilled, (state, action) => {
                state.isLoadingEstrategicosByArea = false
                state.estrategicosTacticos = action.payload
            })
            .addCase(getEstrategicosByAreaThunk.rejected, (state) => {
                state.isLoadingEstrategicosByArea = false
                state.error = true
            })
    }
})

export const {
    checkingEstrategicos,
    setEstrategicosError,
    clearEstrategicos,
    clearCurrentEstrategico,
    checkingCurrent
} = estrategicosSlice.actions

export default estrategicosSlice.reducer