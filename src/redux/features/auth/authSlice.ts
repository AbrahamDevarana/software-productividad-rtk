import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { PermisoProps, userAuthProps } from "@/interfaces";



interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    error: string | null;
    loggedOut: boolean;
    userAuth: userAuthProps,
    isAuthenticated: boolean,
    isLoading: boolean,
    permisos: PermisoProps[]
}

const initialState: AuthState = {
    isLoading: true,
    error: null,
    userAuth: {
        id: '',
        nombre: '',
        apellidoMaterno: '',
        apellidoPaterno: '',
        iniciales: '',
        email: '',
        rol: {
            nombre: '',
        }
    },
    permisos: [],
    accessToken: null,
    refreshToken: null,
    loggedOut: false,
    isAuthenticated: false, 

};


export const authSlice = createSlice({
    initialState,
    name: 'authSlice',
    reducers: {
        setisLoading: (state, action) => {
            state.isLoading = false
        },
        setAuthError: (state, action) => {
            state.error = action.payload,
            state.isLoading = false
        },
        setCredentials: (state, action) => {
            const { usuario, accessToken, refreshToken } = action.payload;
            state.userAuth = usuario;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
            state.permisos = usuario.rol?.permisos;
        },
        logOut: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.userAuth = initialState.userAuth;
            state.accessToken = null;
            state.isLoading = false;  
            state.loggedOut = true;
        }
    }
});


export const { setisLoading, setCredentials, setAuthError, logOut } = authSlice.actions;

export default authSlice.reducer

export const selectCurrentuserAuth = (state: RootState) => state.auth.userAuth;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
