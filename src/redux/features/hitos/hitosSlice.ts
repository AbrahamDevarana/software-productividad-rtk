import { HitosState } from '@/interfaces';
import {  createSlice } from '@reduxjs/toolkit';

const initialState:HitosState = {
    hitos: [],
    currentHito: {
        id: '',
        titulo: '',
        descripcion: '',
        fechaInicio: new Date(),
        fechaFin: new Date(),
        status: 0,
        proyectoId: '',
        tareas: []
    },
    created:false,
    updated:false,
    deleted:false,
    infoMessage: '',
    isLoading: false,
    error: false,
    isLoadingCurrentHito: false,
}

const hitosSlice = createSlice({
    name: 'hitos',
    initialState,
    reducers: {
        checkingHitos: (state) => {
            state.isLoading = true;
        },
        chekingHito: (state) => {
            state.isLoading = true;
        }
    }
})


export const { checkingHitos, chekingHito } = hitosSlice.actions;
export default hitosSlice.reducer;


