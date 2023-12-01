import { createSlice } from '@reduxjs/toolkit'
import { PermisosState } from '@/interfaces';


const initialState:PermisosState = {
    permisos: [],
    isLoadingPermisos: false,
    error: false,
    infoMessage: ''
}

const permisosSlice = createSlice({
    name: 'permisos',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getPermisosThunk.pending, (state) => {
            //     state.isLoadingPermisos = true
            // })
            // .addCase(getPermisosThunk.fulfilled, (state, { payload }) => {
            //     state.isLoadingPermisos = false
            //     state.permisos = payload
            // })
            // .addCase(getPermisosThunk.rejected, (state, { payload }) => {
            //     state.isLoadingPermisos = false
            //     state.error = true
            // })
    }
})

export default permisosSlice.reducer

export const { } = permisosSlice.actions


