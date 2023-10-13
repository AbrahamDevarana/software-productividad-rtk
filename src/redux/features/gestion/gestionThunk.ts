import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { clientAxios } from '@/config/axios'
import { GestionState } from '@/interfaces'





export const obtenerUsuariosThunk = createAsyncThunk(
    'gestion/obtenerUsuarios',
    async ({year, quarter, search, status}:{year:number, quarter:number, search: string, status: string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` },
                params: {
                    year,
                    quarter,
                    search,
                    status
                }
            }
            const response = await clientAxios.get<GestionState>(`/reportes/usuarios`, config);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

    
export const generarReporteRendimientoThunk = createAsyncThunk(
    'gestion/generarReporteRendimiento',
    async ({year, quarter, search, status}:{year:number, quarter:number, search: string, status: string}, {rejectWithValue, getState}) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { 
                    "accessToken": `${accessToken}`,
                },
                params: {
                    year,
                    quarter,
                    search,
                    status
                }
            }
            await clientAxios.get(`/reportes/usuarios/generar`, {...config, responseType: 'blob'}).then( (response) => {
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `ReporteRendimiento-${year}-${quarter}.xlsx`);
                document.body.appendChild(link);
                link.click();
                return response.data
            }).catch( (error) => {
                console.log('Error al generar el reporte de rendimiento', error);
                return rejectWithValue(error.response.data)
            })
        } catch (error: any) {
            console.log('Error al generar el reporte de rendimiento', error);
            
            return rejectWithValue(error.response.data)
        }
    }
)
