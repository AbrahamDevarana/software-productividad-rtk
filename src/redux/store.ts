import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authThunks";
import { userApi } from "./features/usuarios/usuariosThunks";

import authSlice from "./features/auth/authSlice";
import globalSlice from "./features/global/globalSlice";
import profileSlice from "./features/perfil/perfilSlice";
import socketSlice from "./features/socket/socketSlice";
import areasSlice from './features/areas/areasSlice';
import usuariosSlice from './features/usuarios/usuariosSlice';
import departamentosSlice from "./features/departamentos/departamentosSlice";
import perspectivasSlice from "./features/perspectivas/perspectivasSlice";
import estrategicosSlice from "./features/estrategicos/estrategicosSlice";
import tacticosSlice from "./features/tacticos/tacticosSlice";
import coreSlice from "./features/core/coreSlice";
import operativosSlice from "./features/operativo/operativosSlice";
import resultadosSlice from "./features/resultados/resultadosSlice";
import proyectosSlice from "./features/proyectos/proyectosSlice";
import hitosSlice from "./features/hitos/hitosSlice";
import tareasSlice from "./features/tareas/tareasSlice";
import accionesSlice from "./features/acciones/accionesSlice";
import comentariosSlice from "./features/comentarios/comentariosSlice";
import galeriaSlice from "./features/galeria/galeriaSlice";
import rankingsSlice from "./features/ranking/rankingSlice";
import evaluacionsSlice from "./features/evaluaciones/evaluacionsSlice";
import gestionSlice from "./features/gestion/gestionSlice";
import rolesSlice from "./features/roles/rolesSlice";
import { rolesApi } from "./features/roles/rolesThunk";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [rolesApi.reducerPath]: rolesApi.reducer,
        auth: authSlice,
        global: globalSlice,
        areas: areasSlice,
        profile: profileSlice,
        socket: socketSlice,
        usuarios: usuariosSlice,
        departamentos: departamentosSlice,
        perspectivas: perspectivasSlice,
        estrategicos: estrategicosSlice,
        tacticos: tacticosSlice,
        core: coreSlice,
        operativos: operativosSlice,
        resultados: resultadosSlice,
        proyectos: proyectosSlice,
        hitos: hitosSlice,
        tareas: tareasSlice,
        acciones: accionesSlice,
        comentarios: comentariosSlice,
        galeria: galeriaSlice,
        rankings: rankingsSlice,
        evaluaciones: evaluacionsSlice,
        gestion: gestionSlice,
        roles: rolesSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware)
        .concat(userApi.middleware)
        .concat(rolesApi.middleware),
    devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
