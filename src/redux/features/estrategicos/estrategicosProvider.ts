import { clientAxios } from "../../../config/axios";
import { RootState } from "../../store";

export const createEstrategicoProvider = async (estrategico: any, getState: () => RootState) => {
    try {
        const response = await clientAxios.post(`/estrategicos`, estrategico, { headers: { "accessToken": `${getState().auth.accessToken}` } });
        return {
            ok: true,
            estrategico: response.data
        }
    } catch (error: any) {
        const errorCode = error.code
        const errorMessage = error.message
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}
