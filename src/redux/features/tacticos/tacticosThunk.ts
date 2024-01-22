
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clearCurrentTactico, clearTacticos } from './tacticosSlice';
import { CoreProps, TacticoProps } from '@/interfaces';
import { clientAxios } from '@/config/axios';


import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';



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



export const tacticosApi = createApi({
    reducerPath: 'tacticosApi',
    baseQuery: baseQuery,
    tagTypes: ['Tacticos'],
    endpoints: (builder) => ({
        getTacticosByEstrategia: builder.query({
            query: ({estrategicoId, year, showOnlyMe, ...props}: {estrategicoId: string, year: number, showOnlyMe: boolean}) => ({
                url: `/tacticos/byEstrategia`,
                params: { estrategicoId, year, showOnlyMe, ...props}
            }),
            transformResponse: (response: { objetivosTacticos: TacticoProps[] }) => response.objetivosTacticos,
            providesTags: ['Tacticos']
        }),
        getTacticosByEquipos: builder.query({
            query: ({departamentoId, year, showOnlyMe}: {departamentoId: number | string, year: number, showOnlyMe: boolean}) => ({
                url: `/tacticos/byEquipo`,
                params: { departamentoId, year, showOnlyMe}
            }),
            transformResponse: (response: { objetivosTacticos: TacticoProps[] }) => response.objetivosTacticos,
            providesTags: ['Tacticos']
        }),
        getTacticosByEquipoCore: builder.query({
            query: ({departamentoId, year, showOnlyMe}: {departamentoId: number | string, year: number, showOnlyMe: boolean}) => ({
                url: `/tacticos/byEquipoCore`,
                params: { departamentoId, year, showOnlyMe}
            }),
            transformResponse: (response: { objetivosTacticos: TacticoProps[] }) => response.objetivosTacticos,
            providesTags: ['Tacticos']
        }),
        getTacticos: builder.query({
            query: (filtros: any) => ({
                url: `/tacticos`,
                params: filtros
            }),
            transformResponse: (response: { objetivosTacticos: TacticoProps[] }) => response.objetivosTacticos,
            providesTags: ['Tacticos']
        }),
        getTactico: builder.query({
            query: (tacticosId: string) => `/tacticos/${tacticosId}`,
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            providesTags: ['Tacticos']
        }),
        createTactico: builder.mutation({
            query: ({year, estrategicoId, slug}: { year: number, estrategicoId?: string, slug: string }) => ({
                url: `/tacticos`,
                method: 'POST',
                body: { year, estrategicoId, slug }
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos'],
        }),
        deleteTactico: builder.mutation({
            query: (tacticosId: string) => ({
                url: `/tacticos/${tacticosId}`,
                method: 'DELETE'
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos']
        }),
        updateTactico: builder.mutation <TacticoProps, Partial<TacticoProps> & Pick<TacticoProps, 'id'>> ({
            query: ({id, ...tactico}: TacticoProps) => ({
                url: `/tacticos/${id}`,
                method: 'PUT',
                body: tactico
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos']
        }),
        updateTacticoType: builder.mutation <TacticoProps, Partial<TacticoProps> & Pick<TacticoProps, 'id'>> ({
            query: ({id, ...tactico}: TacticoProps) => ({
                url: `/tacticos/${id}`,
                method: 'PUT',
                body: tactico
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos']
        }),
        changeTypeProgress: builder.mutation <TacticoProps, Partial<TacticoProps> & Pick<TacticoProps, 'id'>> ({
            query: ({id, ...tactico}: TacticoProps) => ({
                url: `/tacticos/${id}`,
                method: 'PUT',
                body: tactico
            }),
            transformResponse: (response: { objetivoTactico: TacticoProps }) => response.objetivoTactico,
            invalidatesTags: ['Tacticos']
        }),
    })

})

export const { useGetTacticosQuery } = tacticosApi;


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
