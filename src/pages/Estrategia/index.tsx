import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import {  Segmented } from 'antd';
import { Proximamente } from '@/components/ui';
import Loading from '@/components/antd/Loading';
export const EstrategiaHome: React.FC = () => {

    const dispatch = useAppDispatch();

    const [segment, setSegment] = useState<React.SetStateAction<any>>('Listado') // ['Listado', 'Mapa', 'Gantt'
    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);
    const { year } = useAppSelector(state => state.global.currentConfig)

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
        dispatch(getPerspectivasThunk({year}));
        
    }, [year]);


    if(isLoading) return <Loading />    

    return (
        <>
            
                <div className='flex justify-between w-full items-center pb-5'>
                    <div className='max-w-sm w-full'>
                        <Segmented block options={options} value={segment} onChange={setSegment} />
                    </div>
                </div>
                {
                    segment === 'Listado' && <Estrategia perspectivas={perspectivas} year={year}/>
                }
                {
                    segment === 'Mapa' && <Proximamente size='default' avance={50} />
                }
                {
                    segment === 'Gantt' && <Proximamente size='default' avance={28} />
                }
            
            {/* <FloatButton.Group
                trigger='hover'
                icon={<FaPlus />}
            >
                {
                    perspectivas.map((perspectiva, index) => (
                        <FloatButton
                            key={index}
                            tooltip={perspectiva.nombre}
                            
                            icon={<Image src={getStorageUrl(perspectiva.icono)} width={20} height={20} preview={false} />}
                            onClick={() => console.log('click')}
                        />  
                    ))
                }
            </FloatButton.Group> */}
        </>
    )
}
