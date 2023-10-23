import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { connectSocketThunk, disconnectSocketThunk } from './socketThunk';



interface SocketState {
    socket: Socket | null;
    online: boolean;
}

const initialState: SocketState = {
    socket: null,
    online: false
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {

        connectSocket: (state, {payload}) => {
            state.online = payload.online
            state.socket = payload.socket
        },
        disconnectSocket: (state, {payload}) => {
            state.online = payload.online
            state.socket = payload.socket
        }

    }
})

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;