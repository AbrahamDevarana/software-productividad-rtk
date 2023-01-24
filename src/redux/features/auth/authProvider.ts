import { clientAxios } from "../../../config/axios";
import { RootState } from "../../store";

// Logout Provider
export const logOutProvider = async (getState: () => RootState) => {
    
    try {
        const response = await clientAxios.post('/auth/logout',{
            withCredentials: true,
            credentials: "include",
        }); 
        return {
            ok: true,
            response
        }
        
    } catch (error:any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
    
}

export const validateProvider = async () => {
    try {
        // with credentials
        const response = await clientAxios.get('/auth/validate', { withCredentials: true });
        
        return {
            ok: true,
            response
        }
    } catch (error:any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}