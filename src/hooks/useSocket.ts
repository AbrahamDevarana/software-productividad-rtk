import { useAppSelector } from '@/redux/hooks';
import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath:string) => {

    // const { userAuth } = useAppSelector( state => state.auth );    

    const socket = useMemo( () => io( serverPath , {
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