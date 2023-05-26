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

    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = useMemo( () => io( serverPath , {
        transports: ['websocket'],
        autoConnect: true,
        query: {
            token: localStorage.getItem('accessToken')
        }
        
    } ), [ serverPath ] );

    const [ online, setOnline ] = useState(false);

    useEffect(() => {
        setOnline( socket?.connected );
    }, [ socket ])

    useEffect( () => {
        socket?.on('connect', () => {
            setOnline( true );
        })

    }, [ socket ])

    useEffect( () => {
        socket?.on('disconnect', () => {
            setOnline( false );
        })

    }, [ socket ])

    return {
        socket,
        online
    }
}