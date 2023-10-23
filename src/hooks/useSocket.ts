import { connectSocketThunk, disconnectSocketThunk } from '@/redux/features/socket/socketThunk';
import { useAppDispatch } from '@/redux/hooks';
import { useMemo, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';


interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
  }

export const useSocket = (serverPath:string) => { 

    const dispatch = useAppDispatch()

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo( () => io( serverPath , {
        transports: ['websocket'],
        query: {
            token: localStorage.getItem('accessToken')
        }
    } ), [ serverPath ] );
    

    useEffect( () => {
        socket?.on('connect', () => {
            dispatch(connectSocketThunk(socket))
        })
    }, [ socket ])

    useEffect( () => {
        socket?.on('disconnect', () => {
            dispatch(disconnectSocketThunk(socket))
        })
    }, [ socket ])

    return {
        socket
    }
}