import { AppDispatch } from "@/redux/store";
import { connectSocket, disconnectSocket } from "./socketSlice";

export const connectSocketThunk = (socket: any) => {
    return async ( dispatch : AppDispatch ) => {
        const online = socket.connected;
        dispatch(connectSocket({socket, online}))
    }
}
export const disconnectSocketThunk = (socket: any) => {
    return async ( dispatch : AppDispatch ) => {
        socket?.disconnect()
        dispatch(disconnectSocket({socket, online: false}))
    }
}