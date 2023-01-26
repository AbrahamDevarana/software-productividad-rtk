import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import { authApi } from "./features/auth/authThunks";
import profileSlice from "./features/profile/profileSlice";
import socketSlice from "./features/socket/socketSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        
        auth: authSlice,
        profile: profileSlice,
        socket: socketSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware),
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
