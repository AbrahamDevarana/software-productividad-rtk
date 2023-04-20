import { OperativoState } from "@/interfaces/operativos";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OperativoState = {
    operativos: [],
    proyectos: [],
    isLoading: false,
    isLoadingObjetivo: false,
    errorObjetivo: false,
    infoMessage: '',
    error: false,
    updated: false,
    created: false,
    deleted: false,
    currentOperativo: {
        id: '',
        nombre: '',
        fechaFin: new Date(),
        fechaInicio: new Date(),
        tacticoId: '',
        propietario_op: {
            id: '',
            nombre: '',
            apellidoMaterno: '',
            apellidoPaterno: '',
            iniciales: '',
            email: '',
        },
        propietarioId: '',
        responsables_op: [],
        indicador: '',
        meta: '',
    }
}

const operativoSlice = createSlice({
    name: 'operativoSlice',
    initialState,
    reducers: {
        checkingOperativos: (state) => {
            state.isLoading = true
            state.updated = false
        },
        checkingObjetivo: (state) => {
            state.isLoadingObjetivo = true
        },
        setOperativosError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getOperativos: (state, action) => {
            state.isLoading = false
            state.operativos = action.payload.operativos
        },
        getProyectos: (state, action) => {
            state.isLoading = false
            state.proyectos = action.payload.proyectos
        },
        getObjetivo: (state, action) => {            
            state.isLoadingObjetivo = false
            state.currentOperativo = action.payload
        },
        createObjetivo: (state, action) => {            
            state.isLoading = false
            state.created = true
            state.infoMessage = action.payload
            state.currentOperativo = action.payload
            state.operativos.push(action.payload)
        },
        updateObjetivo: (state, action) => {
            state.operativos = state.operativos.map(operativo => operativo.id === action.payload.id ? action.payload : operativo)
            state.isLoading = false
            state.updated = true
            state.infoMessage = action.payload
        },
        deleteObjetivo: (state, action) => {
            state.isLoading = false
            state.deleted = true
            state.infoMessage = action.payload
        },
        setObjetivoError: (state, action) => {
            state.isLoadingObjetivo = false
            state.infoMessage = action.payload
            state.errorObjetivo = true
        },
        clearOperativos: (state) => {
            state = initialState
        },
        clearOperativo: (state) => {
            state.currentOperativo = initialState.currentOperativo
            state.errorObjetivo = false
            
        },
        clearStatus: (state) => {
            state.updated = false
            state.created = false
            state.deleted = false
            state.error = false
            state.infoMessage = ''
        }

    }   
})

export const {
    checkingOperativos,
    setOperativosError,
    getOperativos,
    getProyectos,
    getObjetivo,
    createObjetivo,
    updateObjetivo,
    deleteObjetivo,
    clearOperativos,
    clearOperativo,
    clearStatus,
    checkingObjetivo,
    setObjetivoError
} = operativoSlice.actions

export default operativoSlice.reducer