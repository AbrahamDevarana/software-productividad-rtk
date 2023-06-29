import { createSlice } from '@reduxjs/toolkit';
import { AccionesProps, AccionesState } from '@/interfaces';
import { getAccionesThunk, createAccionThunk, deleteAccionThunk, getAccionThunk, updateAccionThunk } from './accionesThunk';



const initialState: AccionesState = {
    acciones: [],
    currentAccion: {
        id: '',
        propietarioId: '',
        nombre: '',
        descripcion: '',
        status: 0,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        resultadoClaveId: '',
        propietario: {
            id: '',
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            email: '',
            iniciales: '',
        }
    },
    infoMessage: '',
    isLoading: false,
    error: false,
    isLoadingCurrentAccion: false,
}

const accionesSlice = createSlice({
    name: 'accionesSlice',
    initialState,
    reducers: {
        clearAcciones: (state) => {
            state.acciones = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccionThunk.pending, (state) => {
                state.isLoadingCurrentAccion = true;
                state.error = false;
            })
            .addCase(getAccionThunk.fulfilled, (state, action) => {
                state.isLoadingCurrentAccion = false;
                state.currentAccion = action.payload;
            })
            .addCase(getAccionThunk.rejected, (state) => {
                state.isLoadingCurrentAccion = false;
                state.error = true;
            })
    },
});

export const { clearAcciones } = accionesSlice.actions;
export default accionesSlice.reducer;