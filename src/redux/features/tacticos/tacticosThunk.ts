
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clearCurrentTactico, clearTacticos } from './tacticosSlice';
import { CoreProps, TacticoProps } from '@/interfaces';
import { clientAxios } from '@/config/axios';

interface Props {
    objetivosTacticos: TacticoProps[]
    objetivoTactico: TacticoProps
    objetivosCore: CoreProps[]
    objetivoCore: CoreProps
}

export const getTacticosByEstrategiaThunk = createAsyncThunk(
    'tacticos/getTacticosByEstrategiaThunk',
    async ({estrategicoId, year, showOnlyMe, ...props}: {estrategicoId: string, year: number, showOnlyMe: boolean}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { estrategicoId, year, showOnlyMe, ...props}
            }
            
            const response = await clientAxios.get<Props>('/tacticos/byEstrategia', config);        
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTacticosByEquiposThunk = createAsyncThunk(
    'tacticos/getTacticosByEquipos',
    async ({departamentoId, year, showOnlyMe}: {departamentoId: number | string, year: number, showOnlyMe: boolean}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { departamentoId, year, showOnlyMe}
            }
            
            const response = await clientAxios.get<Props>('/tacticos/byEquipo', config);        
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTacticosByEquipoCoreThunk = createAsyncThunk(
    'tacticos/getTacticosByEquipoCore',
    async ({departamentoId, year, showOnlyMe}: {departamentoId: number | string, year: number, showOnlyMe: boolean}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { departamentoId, year, showOnlyMe}
            }
            
            const response = await clientAxios.get<Props>('/tacticos/byEquipoCore', config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const getTacticoThunk = createAsyncThunk(
    'tacticos/getTacticoThunk',
    async (tacticosId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/tacticos/${tacticosId}`, config);  
            console.log(response.data);
                      
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const createTacticoThunk = createAsyncThunk(
    'tacticos/createTacticoThunk',
    async ({year, estrategicoId, slug}: { year: number, estrategicoId?: string, slug: string }, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
            }
            const params = { year, estrategicoId, slug }

            const response = await clientAxios.post<Props>('/tacticos', params, config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteTacticoThunk = createAsyncThunk(
    'tacticos/deleteTacticoThunk',
    async (tacticosId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete<Props>(`/tacticos/${tacticosId}`, config);
            
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateTacticoThunk = createAsyncThunk(
    'tacticos/updateTacticoThunk',
    async (tactico: TacticoProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.put<Props>(`/tacticos/${tactico.id}`, tactico, config);
            return response.data
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const updateTacticoTypeThunk = createAsyncThunk(
    'tacticos/updateTacticoTypeThunk',
    async ({tacticoId, type, estrategicoId}: {tacticoId: string, type: string, estrategicoId?: string}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const params = { tacticoId, type, estrategicoId }
            const response = await clientAxios.put<Props>(`/tacticos/changeType`, params, config);
            return response.data
        }
        catch (error: any) {            
            return rejectWithValue(error.response.data)
        }
    }
)


export const changeTypeProgressThunk = createAsyncThunk(
    'tacticos/changeTypeProgressThunk',
    async ({tacticoId, type}: {tacticoId: string, type: string}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const params = { tacticoId, type }
            const response = await clientAxios.put<Props>(`/tacticos/changeTypeProgress`, params, config);
            return response.data
        }
        catch (error: any) {            
            return rejectWithValue(error.response.data)
        }
    }
)



export const clearTacticosThunk = () => {
    return async ( dispatch : AppDispatch) => {
        dispatch( clearTacticos() )        
    }   
}
    
export const clearCurrentTacticoThunk = () => {
    return async ( dispatch : AppDispatch) => {
        dispatch( clearCurrentTactico() )        
    }   
}




// TODO: No esta funcionando
export const getTacticoFromEstrategiaThunk = createAsyncThunk(
    'tacticos/getTacticoFromEstrategiaThunk',
    async (estrategiaId: string, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.get<Props>(`/tacticos/estrategia/${estrategiaId}`, config);
            return response.data.objetivosTacticos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
export const getTacticoFromAreaThunk = createAsyncThunk(
    'tacticos/getTacticoFromAreaThunk',
    async ({slug, year, filter}: {slug: string, year:number, filter: object}, { rejectWithValue, getState }) => {

        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: { year, ...filter }
            }
            
            const response = await clientAxios.get<Props>(`/tacticos/area/${slug}`, config);  
            return response.data.objetivosTacticos
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
