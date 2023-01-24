import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Cookies from 'js-cookie';

interface IUser{
    id: number;
    name: string;
    email: string;
    nick_name: string;
    secondLastName: string;
    short_name: string;
    lastName: string;
    picture: string;
}

interface AuthState {
    accessToken: string | null;
    loading: boolean | null;
    error: string | null;
    user: IUser | null;
    loggedOut: boolean;
}

const initialState: AuthState = {
    loading: true,
    error: null,
    user: null,
    accessToken: null,
    loggedOut: false

};


export const authSlice = createSlice({
    initialState,
    name: 'authSlice',
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        setAuthError: (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.loading = false;
            state.accessToken = accessToken;
        },
        logOut: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.user = null;
            state.accessToken = null;
            state.loading = false;  
            state.loggedOut = true;
        }
    }
});


export const { setLoading, setCredentials, setAuthError, logOut } = authSlice.actions;

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
