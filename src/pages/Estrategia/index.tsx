import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import { Segmented } from 'antd';


export const EstrategiaHome: React.FC = () => {

    const dispatch = useAppDispatch();

    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);


    useEffect(() => {
        dispatch(getPerspectivasThunk({}));
    }, []);

    return (
        <div className='' id="Estrategia">
            <div className='max-w-sm pb-5'>
                <Segmented block options={['Listado', 'Mapa', 'Gantt']} value={'Listado'} />
            </div>
            <Estrategia perspectivas={perspectivas} />
        </div>
    )
}
