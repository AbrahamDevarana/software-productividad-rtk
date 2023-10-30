import { createSlice } from '@reduxjs/toolkit'
import { TacticosState } from '@/interfaces';
import { createTacticoThunk, deleteTacticoThunk, getTacticoFromAreaThunk, getTacticoFromEstrategiaThunk, getTacticoThunk, getTacticosThunk, updateTacticoThunk } from './tacticosThunk';


const initialState: TacticosState = {
    objetivosTacticos: [],
    isLoading: false,
    isLoadingCurrent: false,
    infoMessage: '',
    error: false,
    currentTactico: {
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
        estrategicoId: '',
        propietario: {
            id: '',
            nombre: '',
            apellidoMaterno: '',
            apellidoPaterno: '',
            email: '',
            iniciales: '',
            departamentos: [],
        },
        estrategico: {
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
            comentarios: [],
            propietarioId: '',
            tacticos: [],
            propietario: {
                nombre: '',
                apellidoPaterno: '',
                email: '',
                id: '',
                apellidoMaterno: '',
                iniciales: '',
                departamentos: [],
            },
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
        },
        comentarios: [],
        
    }
}

const tacticosSlice = createSlice({
    name: 'tacticosSlice',
    initialState,
    reducers: {
        clearTacticos: (state) => {
            state.objetivosTacticos = initialState.objetivosTacticos
        },
        clearCurrentTactico: (state) => {
            state.currentTactico = initialState.currentTactico
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTacticosThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTacticosThunk.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.objetivosTacticos = payload.objetivosTacticos
            })
            .addCase(getTacticosThunk.rejected, (state) => {
                state.isLoading = false,
                state.infoMessage = 'Error al obtener los objetivos tácticos'
            })
            .addCase(getTacticoThunk.pending, (state) => {
                state.isLoadingCurrent = true
            })
            .addCase(getTacticoThunk.fulfilled, (state, { payload }) => {
                state.isLoadingCurrent = false
                state.currentTactico = payload.objetivoTactico
            })
            .addCase(getTacticoThunk.rejected, (state) => {
                state.isLoadingCurrent = false,
                state.infoMessage = 'Error al obtener el objetivo táctico'
            })

        }
})

export const {
    clearTacticos,
    clearCurrentTactico,
} = tacticosSlice.actions

export default tacticosSlice.reducer