import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import { authApi } from "./features/auth/authThunks";
import { profileApi } from "./features/profile/profileThunk";
// import profileSlice from "./features/profile/profileSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(profileApi.middleware),
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
