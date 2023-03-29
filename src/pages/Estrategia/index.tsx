import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import {motion} from 'framer-motion';


export const EstrategíaHome: React.FC = () => {

    const dispatch = useAppDispatch();

    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);

    console.log(typeof perspectivas);
    console.log(perspectivas);
    
    

    useEffect(() => {
        dispatch(getPerspectivasThunk({}));
    }, []);

    return (
        <div className='' id="Estrategia">
            <Estrategia perspectivas={perspectivas} />
        </div>
    )
}
