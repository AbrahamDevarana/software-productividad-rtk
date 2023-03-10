import { createSlice } from "@reduxjs/toolkit";
import { UsuariosState  } from "@/interfaces";

const initialState: UsuariosState = {
    usuarios: [],
    paginate: {
        totalItems: 0,
        totalPages: 0,
        currentPage: 0,
    },
    isLoading: false,
    infoMessage: '',
    error: false,
    updated: false,
    created: false,
    deleted: false,
    currentUsuario: {
        id: 0,
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreCorto: '',
        iniciales: '',
        email: '',
        password: '',
        status: false,
        fechaNacimiento: new Date(),
        fechaIngreso: new Date(),
        telefono: '',
        descripcionPerfil: '',
        areaId: 0,
        leaderId: 0
    }
}

const usuariosSlice = createSlice({
    name: 'usuariosSlice',
    initialState,
    reducers: {
        checkingUsuarios: (state) => {
            state.isLoading = true
            state.updated = false
        },
        setUsuariosError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        getUsuarios: (state, action) => {
            state.usuarios = action.payload.usuarios.rows
            state.paginate = {
                totalItems: action.payload.usuarios.totalItems,
                totalPages: action.payload.usuarios.totalPages,
                currentPage: action.payload.usuarios.currentPage
            }
            state.isLoading = false
            state.error = false
        },
        getUsuario: (state, action) => {
            state.currentUsuario = action.payload.usuario
            state.isLoading = false
            state.error = false
        },
        createUsuario: (state, action) => {
            state.usuarios.push(action.payload.usuario)
            state.created = true
            state.isLoading = false
            state.error = false
        },
        updateUsuario: (state, action) => {
            state.usuarios = state.usuarios.map(usuario => usuario.id === action.payload.usuario.id ? action.payload.usuario : usuario)
            state.updated = true
            state.isLoading = false
            state.error = false
        },
        deleteUsuario: (state, action) => {
            state.usuarios = state.usuarios.filter(usuario => usuario.id !== action.payload.id)
            state.deleted = true
            state.isLoading = false
            state.error = false
        },
        clearUsuarios: (state) => {
            state.usuarios = []
            state.paginate = {
                totalItems: 0,
                totalPages: 0,
                currentPage: 0,
            }
            state.isLoading = false
            state.infoMessage = ''
            state.error = false
            state.updated = false
            state.created = false
            state.deleted = false
            state.currentUsuario = initialState.currentUsuario
        },
        cleanCurrentUsuario: (state) => {
            state.currentUsuario = initialState.currentUsuario
        }

    }
})

export const { checkingUsuarios, setUsuariosError, getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario, cleanCurrentUsuario, clearUsuarios } = usuariosSlice.actions



export default usuariosSlice.reducer


