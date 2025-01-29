import { clientAxios } from "@/config/axios";
import { RootState } from "@/redux/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";


export const generarReporteRendimientoThunk = createAsyncThunk(
    'gestion/generarReporte',
    async ({ departamentosIds, id, send, sign, year, quarter }: { id: number, departamentosIds: number[], sign: boolean, send: boolean, year: number, quarter: number }, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config: AxiosRequestConfig = {
                headers: { 
                    "accessToken": accessToken,
                },
                responseType: 'json' as const // 👈 Solución aquí
            };

            // Asegurar que el `await` captura correctamente el error
            const response = await clientAxios.post(`/reportes/generate-report`, { 
                areaId: id, 
                departamentosIds, 
                sign, 
                send, 
                year, 
                quarter 
            }, config);

            console.log('Response:', response);
            
            
            
            const { fileName, file } = response.data;

            // Decodificar el contenido base64 a un Blob
                const byteCharacters = atob(file);  // Decodificar el base64
                const byteArrays = new Uint8Array(byteCharacters.length);

                for (let i = 0; i < byteCharacters.length; i++) {
                    byteArrays[i] = byteCharacters.charCodeAt(i);
                }

            // Procesar el archivo PDF correctamente
            const blob = new Blob([byteArrays], { type: 'application/pdf' });
            console.log('Blob:', blob);
            
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);

            return response.data; // Asegurar que la data es retornada correctamente
        } catch (error: any) {
            console.error('Error en la generación del reporte:', error);
            return rejectWithValue(error?.response?.data || { message: 'Error al generar el reporte' });
        }
    }
);

