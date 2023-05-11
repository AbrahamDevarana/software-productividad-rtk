import { HitosState } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';
import { getHitosThunk, createHitoThunk, deleteHitoThunk, updateHitoThunk } from './hitosThunk';
import { createTareaThunk } from '../tareas/tareasThunk';

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
    infoMessage: '',
    isLoading: false,
    error: false,
    isLoadingCurrentHito: false,
}

const hitosSlice = createSlice({
    name: 'hitos',
    initialState,
    reducers: {  
    },
    extraReducers: (builder) => {
        builder
        .addCase(getHitosThunk.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        .addCase(getHitosThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hitos = action.payload;
        })
        .addCase(getHitosThunk.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
        .addCase(createHitoThunk.pending, (state) => {
            state.error = false;
        })
        .addCase(createHitoThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hitos.push(action.payload);
        })
        .addCase(createHitoThunk.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
        .addCase(deleteHitoThunk.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        .addCase(deleteHitoThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hitos = state.hitos.filter(hito => hito.id !== action.payload);
        })
        .addCase(deleteHitoThunk.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
        .addCase(updateHitoThunk.pending, (state) => {
            state.isLoading = true;
            state.error = false;
        })
        .addCase(updateHitoThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hitos = state.hitos.map(hito =>  (hito.id === action.payload.id ) ? action.payload : hito)
        })
        .addCase(updateHitoThunk.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
        .addCase(createTareaThunk.pending, (state) => {
            state.error = false;
        })
        .addCase(createTareaThunk.fulfilled, (state, action) => {
            const { hitoId } = action.payload

            const hito = state.hitos.find(hito => hito.id === hitoId);
            if(hito){
                hito.tareas?.push(action.payload);
            }


        })    
        .addCase(createTareaThunk.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        })
    }
        
})


export const {  } = hitosSlice.actions;
export default hitosSlice.reducer;


