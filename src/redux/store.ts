import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authThunks";

import authSlice from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice";
import socketSlice from "./features/socket/socketSlice";
import areasSlice from './features/admin/areas/areasSlice';
import usuariosSlice from './features/admin/usuarios/usuariosSlice';
import departamentosSlice from "./features/admin/departamentos/departamentosSlice";
import perspectivasSlice from "./features/perspectivas/perspectivasSlice";
import estrategicosSlice from "./features/estrategicos/estrategicosSlice";
import tacticosSlice from "./features/tacticos/tacticosSlice";
import operativosSlice from "./features/operativo/operativosSlice";
import resultadosSlice from "./features/resultados/resultadosSlice";
import proyectosSlice from "./features/proyectos/proyectosSlice";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        
        auth: authSlice,
        areas: areasSlice,
        profile: profileSlice,
        socket: socketSlice,
        usuarios: usuariosSlice,
        departamentos: departamentosSlice,
        perspectivas: perspectivasSlice,
        estrategicos: estrategicosSlice,
        tacticos: tacticosSlice,
        operativos: operativosSlice,
        resultados: resultadosSlice,
        proyectos: proyectosSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware),
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
