import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import {motion} from 'framer-motion';


export const EstrategíaHome = () => {

    const dispatch = useAppDispatch();

    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);



    useEffect(() => {
        dispatch(getPerspectivasThunk({}));
    }, []);

    return (
        <div className='' id="Estrategia">
            <Estrategia perspectivas={perspectivas} />
        </div>
    )
}
