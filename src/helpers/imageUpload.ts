import { clientAxios } from '@/config/axios';
import type { RcFile } from 'antd/es/upload/interface';


export const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
});

export const uploadUserPicture = async (file: string | RcFile | Blob, id: string) => {
    const formData = new FormData();
    formData.append('file', file as Blob);
    const result = await clientAxios.post(`/usuarios/upload/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'accessToken': `${localStorage.getItem('accessToken')}`
        }
    });
    
    return {
        ok: result.status === 200,
        status: result.status,
    }
}

