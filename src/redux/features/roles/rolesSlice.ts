import { OperativoState } from "@/interfaces/operativos";
import { RolesState } from "@/interfaces/rol";
import { createSlice } from "@reduxjs/toolkit";


const initialState: RolesState = {
    currentRole: {
        id: 0,
        nombre: '',
        status: 0,
        descripcion: ''
    },
    error: false,
    infoMessage: '',
    isLoading: false,
    isLoadingCurrentRole: false,
    roles: []
}



const rolesSlice = createSlice({
    name: 'rolesSlice',
    initialState,
    reducers: {
        clearCurrentRole: (state) => {
            state.currentRole = initialState.currentRole
        }
    },
    extraReducers: (builder) => {
        builder
      
    }
})


export const { clearCurrentRole } = rolesSlice.actions
export default rolesSlice.reducer


