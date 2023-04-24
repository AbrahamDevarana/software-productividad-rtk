import {  createSlice } from '@reduxjs/toolkit';
import {  ProyectosState } from '@/interfaces';

const initialState: ProyectosState = {
    proyectos: [],
    currentProyecto: {
        id: '',
        titulo: '',
        descripcion: '',
        icono: '',
        imagen: '',
        participantesIds: [],
        participantes: [],
        fechaInicio: new Date(),
        fechaFin: new Date(),
        status: 0,
        proyectos_hitos: [],
    },
    isLoadingProyecto: false,
    errorProyecto: false,
    isLoading: false,
    error: false,
    infoMessage: '',
    updated: false,
    created: false,
    deleted: false,
}

const proyectosSlice = createSlice({
    name: 'proyectosSlice',
    initialState,
    reducers: {
        checkingProyectos: (state) => {
            state.isLoading = true
        },
        checkingProyecto: (state) => {
            state.isLoadingProyecto = true
        },
        getProyectos: (state, action) => {
            state.isLoading = false
            state.proyectos = action.payload.proyectos
        },
        getProyecto: (state, action) => {
            state.isLoadingProyecto = false
            state.currentProyecto = action.payload.proyecto
        },
        setProyectosError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        setProyectoError: (state, action) => {
            state.isLoadingProyecto = false
            state.infoMessage = action.payload
            state.errorProyecto = true
        },
        createProyecto: (state, action) => {
            state.isLoading = false
            state.proyectos.push(action.payload.proyecto)
            state.created = true
        },
        updateProyecto: (state, action) => {
            state.isLoadingProyecto = false
            state.proyectos = state.proyectos.map(proyecto => proyecto.id === action.payload.proyecto.id ? action.payload.proyecto : proyecto)
            state.updated = true
        },
        clearProyecto: (state) => {
            state.currentProyecto = initialState.currentProyecto
        },
        clearProyectos: (state) => {
            state.proyectos = initialState.proyectos
        },        
    }
})


export const {
    checkingProyectos,
    checkingProyecto,
    getProyectos,
    getProyecto,
    setProyectosError,
    setProyectoError,
    createProyecto,
    updateProyecto,
    clearProyecto,
    clearProyectos,
} = proyectosSlice.actions

export default proyectosSlice.reducer