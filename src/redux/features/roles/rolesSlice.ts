import { OperativoState } from "@/interfaces/operativos";
import { RolesState } from "@/interfaces/rol";
import { createSlice } from "@reduxjs/toolkit";


const initialState: RolesState = {
    currentRole: {
        id: 0,
        nombre: '',
        status: 0,
        descripcion: '',
        permisos: []
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

    },
    extraReducers: (builder) => {
        builder
    }
})


export const {  } = rolesSlice.actions
export default rolesSlice.reducer


