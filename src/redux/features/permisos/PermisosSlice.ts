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
    }
})

export default permisosSlice.reducer

export const { } = permisosSlice.actions


