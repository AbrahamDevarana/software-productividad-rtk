
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";
import { PerfilProps } from "@/interfaces";
import { clearProfile } from "./perfilSlice";


interface Props {
    usuario : PerfilProps
}


interface Respuesta {
    id: string;
    preguntaId: string;
    evaluacionId: number;
    usuarioId: string;
    rate: number;
    comentarios: string;
  }


export const getProfileThunk = createAsyncThunk(
    'profile/getProfile',
    async ({usuarioId, year, quarter}:{usuarioId: string, year: number, quarter: number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }
            const response = await clientAxios.get<Props>(`/perfiles/${usuarioId}`, config);
                    
            return response.data.usuario
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
        
export const updateProfileThunk = createAsyncThunk(
    'profile/updateProfile',
    async (profile: PerfilProps, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put<Props>(`/perfiles/${profile.id}`, profile, config);
            return response.data.usuario


        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

// TODO:Revisar
export const uploadProfilePictureThunk = createAsyncThunk(
    'profile/uploadProfilePicture',
    async ({profile, usuarioId}: {profile:FormData, usuarioId: string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { 
                    "accessToken": `${accessToken}`,
                    'Content-Type': 'multipart/form-data'
                },
            }
        
            const response = await clientAxios.post<Props>(`/usuarios/upload/${usuarioId}`, profile, config);
            return response.data.usuario
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

// TODO:Revisar
export const updateProfileConfigThunk = createAsyncThunk(
    'profile/updateProfileConfig',
    async (params: any, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/usuarios/config`, params, config);
            return response.data.usuario
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getEquipoThunk = createAsyncThunk(
    'profile/getEquipo',
    async ({usuarioId}: {usuarioId:string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
            }
            const response = await clientAxios.get(`/perfiles/get-equipo/${usuarioId}`, config);
            
            return response.data.equipo
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getColaboradoresThunk = createAsyncThunk(
    'profile/getColaboradores',
    async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }
            const response = await clientAxios.get(`/perfiles/get-colaboradores/${usuarioId}`, config);
            return response.data.colaboradores
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
 



export const updatePortraitThunk = createAsyncThunk(
    'profile/updatePortrait',
    async ({id, portadaPerfil}: {id:string, portadaPerfil:string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const response = await clientAxios.put(`/perfiles/portrait/${id}`, {portadaPerfil}, {
                headers: { "accessToken": `${accessToken}` }
            });

            console.log(response.data);
            
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getRendimientoThunk = createAsyncThunk(
    'profile/getRendimiento',
    async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const response = await clientAxios.get(`/rendimiento/avance/${usuarioId}`, {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            });
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getHistorialRendimientoThunk = createAsyncThunk(
    'profile/getHistorialRendimiento',
    async ({usuarioId, year}:{usuarioId: string, year: number}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year
                }
            }
            const response = await clientAxios.get(`/rendimiento/historial/${usuarioId}`, config);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const clearProfileThunk = () => {
    return (dispatch: any) => {
        dispatch(clearProfile());
    }
}


// export const postSolicitarEvaluacionThunk = createAsyncThunk(
//     'profile/postSolicitarEvaluacion',
//     async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
//         try {
//             const { accessToken } = (getState() as RootState).auth;
//             const config = {
//                 headers: { "accessToken": `${accessToken}` }
//             }
//             const response = await clientAxios.post(`/evaluacion/asignar`, {year, quarter, usuarioId}, config);
//             console.log(response.data);
            
//             return response.data
//         } catch (error: any) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )

// export const getEvaluacionesRealizadasThunk = createAsyncThunk(
//     'profile/getEvaluacionesRealizadas',
//     async ({usuarioId, year, quarter}:{usuarioId: string, year:number, quarter:number}, {rejectWithValue, getState}) => {
//         try {
//             const { accessToken } = (getState() as RootState).auth;
//             const config = {
//                 headers: { "accessToken": `${accessToken}` },
//                 params: {
//                     year,
//                     quarter
//                 }
//             }
//             const response = await clientAxios.get(`/evaluacion/realizadas/${usuarioId}`, config);
//             return response.data
//         } catch (error: any) {
//             return rejectWithValue(error.response.data)
//         }
//     }
// )