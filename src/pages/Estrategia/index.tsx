import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import { FloatButton, Segmented } from 'antd';
import { Proximamente } from '@/components/ui';
import { FaPlus } from 'react-icons/fa';
import { createEstrategicoFromPerspectivaThunk, createEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';


export const EstrategiaHome: React.FC = () => {

    const dispatch = useAppDispatch();

    const [segment, setSegment] = useState<React.SetStateAction<any>>('Listado') // ['Listado', 'Mapa', 'Gantt'
    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);

    const options = [
        {
            label: 'Listado',
            value: 'Listado',
        },
        {
            label: 'Mapa',
            value: 'Mapa',
        },
        {
            label: 'Gantt',
            value: 'Gantt',
        }
    ]

    useEffect(() => {
        dispatch(getPerspectivasThunk({}));
    }, []);


    const handleNuevaPerspectiva = () => {
        dispatch(createEstrategicoThunk({
            perspectivaId: 1,
            propietarioId: 1,
        }))
    }

    return (
        <>
            <>
                <div className='max-w-sm pb-5'>
                    <Segmented block options={options} value={segment} onChange={setSegment} />
                </div>
                {
                    segment === 'Listado' && <Estrategia perspectivas={perspectivas} />
                }
                {
                    segment === 'Mapa' && <Proximamente size='default' avance={50} />
                }
                {
                    segment === 'Gantt' && <Proximamente size='default' avance={28} />
                }
            </>
        </>
    )
}
