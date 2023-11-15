
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clientAxios } from '@/config/axios';
import { ComentarioProps } from '@/interfaces';



interface Props {
    comentario: ComentarioProps
    comentarios: ComentarioProps[]
}

export const createComentarioThunk = createAsyncThunk(
    'comentarios/createComentario',
    async ({ mensaje,
        comentableType,
        comentableId}: {
            mensaje: string,
            comentableType: string,
            comentableId: string | number
        }, {rejectWithValue, getState}) => {

        const { accessToken } = (getState() as RootState).auth;

        const config = {
            headers: { "accessToken": `${accessToken}` }
        }
        try {
            const response = await clientAxios.post<Props>(`/comentarios`, {
                mensaje,
                comentableType,
                comentableId
            }, config);            
            return response.data.comentario
        }

        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const getComentariosThunk = createAsyncThunk(
    'comentarios/getComentarios',
    async ({ comentableType, comentableId }: { comentableType: string, comentableId: string | number }, { rejectWithValue, getState }) => {
            
        const { accessToken } = (getState() as RootState).auth;

        const config = {
            headers: { "accessToken": `${accessToken}` },
            params : {
                comentableType,
                comentableId
            }
        }
        try {
            const response = await clientAxios.get<Props>(`/comentarios`, config);

            return response.data.comentarios
        }

        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)