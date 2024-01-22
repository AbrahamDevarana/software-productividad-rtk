import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authThunks";
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
import operativosSlice from "./features/operativo/operativosSlice";
import resultadosSlice from "./features/resultados/resultadosSlice";
import proyectosSlice from "./features/proyectos/proyectosSlice";
import hitosSlice from "./features/hitos/hitosSlice";
import tareasSlice from "./features/tareas/tareasSlice";
import accionesSlice from "./features/acciones/accionesSlice";
import comentariosSlice from "./features/comentarios/comentariosSlice";
import galeriaSlice from "./features/galeria/galeriaSlice";
import evaluacionsSlice from "./features/evaluaciones/evaluacionsSlice";
import gestionSlice from "./features/gestion/gestionSlice";
import { rolesApi } from "./features/roles/rolesThunk";
import { permisosApi } from "./features/permisos/PermisosThunk";
import { gestionApi } from "./features/gestion/gestionThunk";
import { evaluacionApi } from "./features/evaluaciones/evaluacionesThunk";
import { globalApi } from "./features/global/globalThunk";
import { perspectivasApi } from "./features/perspectivas/perspectivasThunk";
import { tacticosApi } from "./features/tacticos/tacticosThunk";
import { usuariosApi } from "./features/usuarios/usuariosThunks";
import { rankingApi } from "./features/ranking/rankingThunk";
import { perfilApi } from "./features/perfil/perfilThunk";
import { estategicosApi } from "./features/estrategicos/estrategicosThunk";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [globalApi.reducerPath]: globalApi.reducer,
        [usuariosApi.reducerPath]: usuariosApi.reducer,
        [rolesApi.reducerPath]: rolesApi.reducer,
        [permisosApi.reducerPath]: permisosApi.reducer,
        [gestionApi.reducerPath]: gestionApi.reducer,
        [evaluacionApi.reducerPath]: evaluacionApi.reducer,
        [perspectivasApi.reducerPath]: perspectivasApi.reducer,
        [tacticosApi.reducerPath]: tacticosApi.reducer,
        [rankingApi.reducerPath]: rankingApi.reducer,
        [perfilApi.reducerPath]: perfilApi.reducer,
        [estategicosApi.reducerPath]: estategicosApi.reducer,
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
        operativos: operativosSlice,
        resultados: resultadosSlice,
        proyectos: proyectosSlice,
        hitos: hitosSlice,
        tareas: tareasSlice,
        acciones: accionesSlice,
        comentarios: comentariosSlice,
        galeria: galeriaSlice,
        evaluaciones: evaluacionsSlice,
        gestion: gestionSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware)
        .concat(globalApi.middleware)
        .concat(usuariosApi.middleware)
        .concat(rolesApi.middleware)
        .concat(permisosApi.middleware)
        .concat(gestionApi.middleware)
        .concat(evaluacionApi.middleware)
        .concat(perspectivasApi.middleware)
        .concat(rankingApi.middleware)
        .concat(tacticosApi.middleware)
        .concat(perfilApi.middleware)
        .concat(estategicosApi.middleware),
        devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
