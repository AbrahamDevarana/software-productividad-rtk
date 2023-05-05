
import {  createSlice } from '@reduxjs/toolkit';
import { TareasState } from '@/interfaces';
import { createTareaThunk, getTareaThunk } from './tareasThunk';

const initialState:TareasState = {
    tareas: [],
    currentTarea:{
        id: '',
        nombre: '',
        descripcion: '',
        status: 0,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        propietarioId: {
            id: '',
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            email: '',
            foto: '',
            iniciales: '',
        },
    },
    infoMessage: '',
    isLoading: false,
    error: false,
    isLoadingCurrentTarea: false,
}

const tareasSlice = createSlice({
    name: 'tareasSlice',
    initialState,
    reducers: {
		clearTareas: (state) => {
			state.tareas = [];
		},
		clearCurrentTarea: (state) => {
			state.currentTarea = initialState.currentTarea;
		}
    },
    extraReducers: (builder) => {
    builder
		.addCase(getTareaThunk.pending, (state) => {
			state.isLoadingCurrentTarea = true;
			state.error = false;
		})
		.addCase(getTareaThunk.fulfilled, (state, action) => {
			state.isLoadingCurrentTarea = false;
			state.currentTarea = action.payload;
		})
		.addCase(getTareaThunk.rejected, (state) => {
			state.isLoadingCurrentTarea = false;
			state.error = true;
		})
		.addCase(createTareaThunk.pending, (state) => {
			state.isLoading = true;
			state.error = false;
		})
		.addCase(createTareaThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.tareas.push(action.payload);
		})
		.addCase(createTareaThunk.rejected, (state) => {
			state.isLoading = false;
			state.error = true;
		});
    },
})

export const {clearCurrentTarea, clearTareas } = tareasSlice.actions;
export default tareasSlice.reducer;
