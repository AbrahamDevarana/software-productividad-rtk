import { OperativoState } from "@/interfaces/Operativo";
import { createSlice } from "@reduxjs/toolkit";

const initialState: OperativoState = {
    operativos: [],
    proyectos: [],
    isLoading: false,        
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
        propietario_op: [],
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
        getOperativo: (state, action) => {
            state.isLoading = false
            state.currentOperativo = action.payload.operativo
        },
        createOperativo: (state, action) => {
            state.isLoading = false
            state.created = true
            state.infoMessage = action.payload
        },
        updateOperativo: (state, action) => {
            state.isLoading = false
            state.updated = true
            state.infoMessage = action.payload
        },
        deleteOperativo: (state, action) => {
            state.isLoading = false
            state.deleted = true
            state.infoMessage = action.payload
        },
        clearOperativos: (state) => {
            state = initialState
        },
        clearOperativo: (state) => {
            state.currentOperativo = initialState.currentOperativo
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
    getOperativo,
    createOperativo,
    updateOperativo,
    deleteOperativo,
    clearOperativos,
    clearOperativo,
    clearStatus
} = operativoSlice.actions

export default operativoSlice.reducer