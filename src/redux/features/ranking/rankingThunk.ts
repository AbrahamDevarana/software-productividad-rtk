import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@/redux/store';
import { clientAxios } from '@/config/axios';


export const getRankingsThunk = createAsyncThunk(
    'ranking/getRankingsThunk',
    async ({year, quarter}: {year: number, quarter: number}, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter
                }
            }
            const response = await clientAxios.get('/rendimiento/ranking', config);
            return response.data.rankingUsuarios
        }
        catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

    