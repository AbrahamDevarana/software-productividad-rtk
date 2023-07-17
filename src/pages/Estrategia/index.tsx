import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getPerspectivasThunk } from '@/redux/features/perspectivas/perspectivasThunk';
import { Estrategia } from '@/components/estrategia/Estrategia';
import { DatePicker, Segmented } from 'antd';
import { Proximamente } from '@/components/ui';
import dayjs from 'dayjs';
import Loading from '@/components/antd/Loading';


export const EstrategiaHome: React.FC = () => {

    const dispatch = useAppDispatch();

    const [segment, setSegment] = useState<React.SetStateAction<any>>('Listado') // ['Listado', 'Mapa', 'Gantt'
    const { perspectivas, isLoading } = useAppSelector(state => state.perspectivas);
    const [year, setYear] = useState(dayjs().year())

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
            <>
                <div className='flex justify-between w-full items-center pb-5'>
                    <div className='max-w-sm w-full'>
                        <Segmented block options={options} value={segment} onChange={setSegment} />
                    </div>
                    <DatePicker 
                        picker='year' 
                        onChange={(date, dateString) => setYear(dayjs(dateString).year())} 
                        value={dayjs(`${year}`)}
                        disabledDate={(current) => {
                            // no se puede mas del año actual y menos de hace 11 años
                            return current.year() > dayjs().year() || current.year() < dayjs().subtract(11, 'year').year()
                        }}
                        allowClear={false}
                    />
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
            </>
        </>
    )
}
