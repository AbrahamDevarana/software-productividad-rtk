import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import {motion} from 'framer-motion';
import { Segmented } from 'antd';


export const EstrategíaHome: React.FC = () => {

    const dispatch = useAppDispatch();

    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);


    useEffect(() => {
        dispatch(getPerspectivasThunk({}));
    }, []);

    return (
        <div className='' id="Estrategia">
            <div className='max-w-sm pb-5'>
                <Segmented block options={[123, 456, 'longtext-longtext-longtext-longtext']} />
            </div>
            <Estrategia perspectivas={perspectivas} />
        </div>
    )
}
