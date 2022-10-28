import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

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
    loading: boolean | null;
    error: string | null;
    user: IUser | null;
    token: string | null;
}

const initialState: AuthState = {
    loading: true,
    error: null,
    user: null,
    token: null,
};


export const authSlice = createSlice({
    initialState,
    name: 'authSlice',
    reducers: {
        setLoading: (state) => {
            state.loading = true
        },
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.loading = false;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.loading = false;
        }
    }
});


export const { setLoading, setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
