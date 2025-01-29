import { createSlice } from "@reduxjs/toolkit";
import { UsuariosState  } from "@/interfaces";
import { createUsuarioThunk, deleteUsuarioThunk, getResultadosThunk, getUsuarioThunk, getUsuariosThunk, updateUsuarioThunk } from "./usuariosThunks";

const initialState: UsuariosState = {
    usuarios: [],
    usuariosResultados: [],
    paginate: {
        totalItem: 0,
        totalPages: 0,
        currentPage: 0,
    },
    isLoading: false,
    isLoadingCurrentUsuario: false,
    infoMessage: '',
    error: false,
    currentUsuario: {
        id: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        nombreCorto: '',
        iniciales: '',
        foto: '',
        email: '',
        password: '',
        status: 'ACTIVO',
        fechaNacimiento: new Date(),
        fechaIngreso: new Date(),
        telefono: 1234567890,
        descripcionPerfil: '',
        leaderId: null,
        direccion: {
            id: 0,
            calle: '',
            numeroExterior: '',
            numeroInterior: '',
            colonia: '',
            codigoPostal: '',
            ciudad: '',
            estado: ''
        },
        departamentos: [],
        departamento: {
            id: 0,
            nombre: '',
            color: '',
            areaId: 0,
            leaderId: '',
            slug: '',
            usuario: [],
            isEvaluableDepartment: true,
            leader: {
                id: '',
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                email: '',
                foto: '',
                iniciales: '',
                nombreCorto: '',
                slug: '',
                creditos: {
                    saldo: 0
                }
            },
        }
    }
}

const usuariosSlice = createSlice({
    name: 'usuariosSlice',
    initialState,
    reducers: {
        checkingUsuarios: (state) => {
            state.isLoading = true
        },
        setUsuariosError: (state, action) => {
            state.isLoading = false
            state.infoMessage = action.payload
            state.error = true
        },
        clearUsuarios: (state) => {
            state = initialState
        },
        cleanCurrentUsuario: (state) => {
            state.currentUsuario = initialState.currentUsuario
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsuariosThunk.pending, (state) => {
                state.isLoading = true
        })
            .addCase(getUsuariosThunk.fulfilled, (state, action) => {
                state.usuarios = action.payload.rows
                state.paginate = {
                    totalItem: action.payload.totalItem,
                    totalPages: action.payload.totalPages,
                    currentPage: action.payload.currentPage
                }
                state.isLoading = false
                state.error = false
        })
            .addCase(getUsuariosThunk.rejected, (state, action) => {
                state.isLoading = false
                state.infoMessage = action.error.message!
                state.error = true
        })
            .addCase(getUsuarioThunk.pending, (state) => {
                state.isLoadingCurrentUsuario = true
        })
            .addCase(getUsuarioThunk.fulfilled, (state, action) => {
                state.currentUsuario = action.payload
                state.isLoadingCurrentUsuario = false
                state.error = false
        })
            .addCase(getUsuarioThunk.rejected, (state, action) => {
                state.isLoadingCurrentUsuario = false
                state.infoMessage = action.error.message!
                state.error = true
        })
            .addCase(createUsuarioThunk.pending, (state) => {
                state.isLoading = true
        })
            .addCase(createUsuarioThunk.fulfilled, (state, action) => {
                state.usuarios.push(action.payload)
                state.currentUsuario = action.payload
                state.isLoading = false
                state.error = false
        })
            .addCase(createUsuarioThunk.rejected, (state, action) => {
                state.isLoading = false
                state.infoMessage = action.error.message!
                state.error = true
        })
            .addCase(updateUsuarioThunk.pending, (state) => {
                state.isLoading = true
        })
            .addCase(updateUsuarioThunk.fulfilled, (state, action) => {
                state.usuarios = state.usuarios.map(usuario => usuario.id === action.payload.id ? action.payload : usuario)
                state.currentUsuario = action.payload
                state.isLoading = false
                state.error = false
        })  
            .addCase(updateUsuarioThunk.rejected, (state, action) => {
                state.isLoading = false
                state.infoMessage = action.error.message!
                state.error = true
        })
            .addCase(deleteUsuarioThunk.pending, (state) => {
                state.isLoading = true
        })
            .addCase(deleteUsuarioThunk.fulfilled, (state, action) => {
                state.usuarios = state.usuarios.filter(usuario => usuario.id !== action.payload.id)
                state.isLoading = false
                state.error = false
        })
            .addCase(deleteUsuarioThunk.rejected, (state, action) => {
                state.isLoading = false
                state.infoMessage = action.error.message!
                state.error = true
        })
        .addCase(getResultadosThunk.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getResultadosThunk.fulfilled, (state, action) => {
            state.usuariosResultados = action.payload
            state.isLoading = false
            state.error = false
        })
        .addCase(getResultadosThunk.rejected, (state, action) => {
            state.isLoading = false
            state.infoMessage = action.error.message!
            state.error = true
        })

    }
})

export const { checkingUsuarios, setUsuariosError, cleanCurrentUsuario, clearUsuarios } = usuariosSlice.actions



export default usuariosSlice.reducer


