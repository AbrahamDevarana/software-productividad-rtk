import { clientAxios } from "../../../config/axios";
import { RootState } from "../../store";

// Logout Provider
export const logOutProvider = async (getState: () => RootState) => {
    try {
        const response = await clientAxios.get('/auth/logout',
            { headers: { "accessToken": `${getState().auth.token}` } }
        );       

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