import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import Cookies from 'js-cookie';

interface IuserAuth{
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
    error: string | null;
    loggedOut: boolean;
    userAuth: IuserAuth | null,
    isAuthenticated: boolean,
    isLoading: boolean,
}

const initialState: AuthState = {
    isLoading: true,
    error: null,
    userAuth: null,
    accessToken: null,
    loggedOut: false,
    isAuthenticated: false, 

};


export const authSlice = createSlice({
    initialState,
    name: 'authSlice',
    reducers: {
        setisLoading: (state) => {
            state.isLoading = true
        },
        setAuthError: (state, action) => {
            state.error = action.payload,
            state.isLoading = false
        },
        setCredentials: (state, action) => {
            const { userAuth, accessToken } = action.payload;
            state.userAuth = userAuth;
            state.isLoading = false;
            state.accessToken = accessToken;
            state.isAuthenticated = true;
        },
        logOut: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.userAuth = null;
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
