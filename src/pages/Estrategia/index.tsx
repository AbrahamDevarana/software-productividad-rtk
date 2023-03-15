import { DateTime } from 'luxon';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import { TableDataType } from '@/interfaces';
import Loading from '@/components/antd/Loading';





export const EstrategíaHome = () => {

    const dispatch = useAppDispatch();

    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);

    useEffect(() => {
        dispatch(getPerspectivasThunk({}));
    }, []);

    

    const data: TableDataType[] = [
        {
            key: '1',
            tareas: 'Estrategía 1',
            status: 1, 
            progreso: 0,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 1',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },
        {
            key: '2',
            tareas: 'Estrategía 2',
            status: 2, 
            progreso: 20,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 2',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },
        {
            key: '3',
            tareas: 'Estrategía 3',
            status: 3,
            progreso: 100,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 3',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },
        {
            key: '4',
            tareas: 'Estrategía 4',
            status: 4,
            progreso: 35,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 4',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },
        {
            key: '5',
            tareas: 'Estrategía 5',
            status: 5,
            progreso: 76,
            fechaEntrega: DateTime.local().toFormat('DDD'),
            objetivo: 'Objetivo 5',
            responsables: [
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
                {
                    picture: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                },
            ]
        },

    ]   


    isLoading && <Loading />

    return (
        <>
            <Estrategia perspectivas={perspectivas} data={data} />
        </>
    )
}
