import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authThunks";

import authSlice from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice";
import socketSlice from "./features/socket/socketSlice";
import areasSlice from './features/admin/areas/areasSlice';
import usuariosSlice from './features/admin/usuarios/usuariosSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        
        auth: authSlice,
        areas: areasSlice,
        profile: profileSlice,
        socket: socketSlice,
        usuarios: usuariosSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware),
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
