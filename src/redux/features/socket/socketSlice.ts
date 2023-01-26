import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    socket: null,
    online: false
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        connectSocket: (state, action) => {
            state.socket = action.payload.socket
            state.online = action.payload.online
        }
    }
})


export const {connectSocket} = socketSlice.actions

export default socketSlice.reducer