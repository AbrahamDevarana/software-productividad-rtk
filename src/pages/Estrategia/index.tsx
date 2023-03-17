import { DateTime } from 'luxon';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import { TableDataType } from '@/interfaces';
import Loading from '@/components/antd/Loading';
import { getEstrategicosThunk } from '@/redux/features/estrategicos/estrategicosThunk';





export const EstrategíaHome = () => {

    const dispatch = useAppDispatch();

    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);



    useEffect(() => {
        dispatch(getPerspectivasThunk({}));
    }, []);

    // useEffect(() => {
    //     dispatch(getEstrategicosThunk({}))
    // }, []);

    return (
        <>
            <Estrategia perspectivas={perspectivas} />
        </>
    )
}
