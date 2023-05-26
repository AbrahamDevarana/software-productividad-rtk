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
    },
    extraReducers: builder => {
        builder.addCase(connectSocketThunk.fulfilled, (state, action) => {
            state.socket = action.payload.socket;
            state.online = action.payload.online;
        })
        builder.addCase(disconnectSocketThunk.fulfilled, (state, action) => {
            state.socket = action.payload.socket;
            state.online = action.payload.online;
        })
    }
})

export const { } = socketSlice.actions;
export default socketSlice.reducer;