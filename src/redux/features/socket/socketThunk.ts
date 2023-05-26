

import { Socket } from "socket.io-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const connectSocketThunk = createAsyncThunk(
    'socket/connectSocket',
    async (socket: any, {rejectWithValue, getState}) => {
        try {
            const online = socket.connected;
            return {socket, online}
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const disconnectSocketThunk = createAsyncThunk(
    'socket/disconnectSocket',
    async (socket: any, {rejectWithValue, getState}) => {
        try {
            socket?.disconnect();
            return {socket, online: false}
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)
