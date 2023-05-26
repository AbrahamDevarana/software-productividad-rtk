import {  createSlice } from '@reduxjs/toolkit';
import {  ProyectosState } from '@/interfaces';
import { createProyectoThunk, deleteProyectoThunk, getProyectoThunk, getProyectosThunk, updateProyectoThunk } from './proyectosThunk';

const initialState: ProyectosState = {
    proyectos: [],
    currentProyecto: {
        id: '',
        titulo: '',
        descripcion: '',
        icono: '',
        imagen: '',
        participantes: [],
        propietarioId: '',
        usuariosProyecto: [],
        fechaInicio: new Date(),
        fechaFin: new Date(),
        status: 'SIN_INICIAR',
        proyectosHito: [],
    },
    isLoadingProyecto: false,
    errorProyecto: false,
    isLoading: false,
    isUpdating: false,
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
        clearProyecto: (state) => {
            state.currentProyecto = initialState.currentProyecto
        },
        clearProyectos: (state) => {
            state.proyectos = initialState.proyectos
        },
        getCreatedProyecto: (state, action) => {
            state.proyectos.push(action.payload)
        },
        getUpdatedProyecto: (state, action) => {
            state.proyectos = state.proyectos.map(proyecto => proyecto.id === action.payload.id ? action.payload : proyecto)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProyectosThunk.pending, (state) => {
                state.isLoading = true
        })
            .addCase(getProyectosThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.proyectos = action.payload
        })
            .addCase(getProyectosThunk.rejected, (state, action) => {
                state.isLoading = false
                state.infoMessage = action.payload as string
                state.error = true
        })
            .addCase(getProyectoThunk.pending, (state) => {
                state.isLoadingProyecto = true
        })
            .addCase(getProyectoThunk.fulfilled, (state, action) => {
                state.isLoadingProyecto = false
                state.currentProyecto = action.payload
        })
            .addCase(getProyectoThunk.rejected, (state, action) => {
                state.isLoadingProyecto = false
                state.infoMessage = action.payload as string
                state.errorProyecto = true
        })
            .addCase(createProyectoThunk.pending, (state) => {
                state.isUpdating = true
        })
            .addCase(createProyectoThunk.fulfilled, (state, action) => {
                state.isUpdating = false
                state.proyectos.push(action.payload)
                state.created = true
        })
            .addCase(createProyectoThunk.rejected, (state, action) => {
                state.isUpdating = false
                state.infoMessage = action.payload as string
                state.error = true
        })
            .addCase(updateProyectoThunk.pending, (state) => {
                state.isUpdating = true
        })
            .addCase(updateProyectoThunk.fulfilled, (state, action) => {
                state.isUpdating = false
                state.proyectos = state.proyectos.map(proyecto => proyecto.id === action.payload.id ? action.payload : proyecto)
                state.updated = true
        })
            .addCase(updateProyectoThunk.rejected, (state, action) => {
                state.isUpdating = false
                state.infoMessage = action.payload as string
                state.errorProyecto = true
        })
            .addCase(deleteProyectoThunk.pending, (state) => {
                state.isLoadingProyecto = true
        })
            .addCase(deleteProyectoThunk.fulfilled, (state, action) => {
                state.isLoadingProyecto = false
                state.proyectos = state.proyectos.filter(proyecto => proyecto.id !== action.payload.id)
                state.deleted = true
        })
            .addCase(deleteProyectoThunk.rejected, (state, action) => {
                state.isLoadingProyecto = false
                state.infoMessage = action.payload as string
                state.errorProyecto = true
        })


    }
            
})


export const {
    clearProyecto,
    clearProyectos,
    getCreatedProyecto,
    getUpdatedProyecto } = proyectosSlice.actions

export default proyectosSlice.reducer