

import { AppDispatch, RootState } from "../../store";
import { connectSocket } from "./socketSlice";


export const connectSocketThunk = (socket:any, online:any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(connectSocket({socket, online}))
    }
}