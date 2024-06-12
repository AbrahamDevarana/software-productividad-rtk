import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useGetPerspectivasQuery } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/pages/Estrategia/components';
import { Segmented } from 'antd';
import { Proximamente } from '@/components/ui';
import Loading from '@/components/antd/Loading';
import { options } from './utils';
export const EstrategiaHome: React.FC = () => {
    const [segment, setSegment] = useState<React.SetStateAction<any>>('Listado')
    const { year } = useAppSelector(state => state.global.currentConfig)
    const { data, isLoading } = useGetPerspectivasQuery({year});
    if(isLoading) return <Loading />    

    return (
        <>
            <div className='flex justify-between w-full items-center pb-5'>
                <div className='max-w-sm w-full'>
                    <Segmented block options={options} value={segment} onChange={setSegment} />
                </div>
            </div>
            {
                segment === 'Listado' && <Estrategia perspectivas={data} year={year}/>
            }
            {
                segment === 'Mapa' && <Proximamente size='default' avance={50} />
            }
            {
                segment === 'Gantt' && <Proximamente size='default' avance={28} />
            }
        </>
    )
}
