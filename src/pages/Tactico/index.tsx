import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearTacticosThunk, createTacticoThunk, getTacticoFromAreaThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { DatePicker, Segmented } from 'antd';
import ListadoTacticos from '@/components/tacticos/ListadoTacticos';
import { Prox } from '@/components/ui/Prox';
import dayjs from 'dayjs';

export const Tactico: React.FC = () => {


    let { state } = useLocation()
    const {slug} = useParams<{slug:string}>()

    const dispatch = useAppDispatch()
    const {tacticos, tacticos_core} = useAppSelector(state => state.tacticos)
    const [segmented, setSegmented] = useState<React.SetStateAction<any>>('listado')
    const [year, setYear] = useState(dayjs().year())

    useEffect(() => {
        if(slug){
            dispatch(getTacticoFromAreaThunk({ slug, year}))
        }

        return () => { dispatch(clearTacticosThunk()) }
    }, [slug, year])


    const handleCreateTactico = (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => {
        e.stopPropagation()
        e.preventDefault()
    
        dispatch(createTacticoThunk({slug, year: 2023, estrategico}))
    }


    return (
        <>
            <div className='flex justify-between w-full items-center pb-5'>
                <div className='max-w-sm w-full'>
                    <Segmented block
                        options={[
                            {label: 'Listado', value: 'listado'},
                            {label: 'Gantt', value: 'gantt'},
                            {label: 'Equipos', value: 'equipos'},
                        ]}
                        value={segmented}
                        onChange={setSegmented}
                    />

                </div>
                <DatePicker picker='year' onChange={(date, dateString) => setYear(dayjs(dateString).year())} value={dayjs(`${year}`)}
                    disabledDate={(current) => {
                        return current && current > dayjs().endOf('year')
                    }}
                />
            </div>

            {
                segmented === 'listado' && (<ListadoTacticos handleCreateTactico={handleCreateTactico} tacticos={tacticos} tacticos_core={tacticos_core} />)
            }
            {
                segmented === 'gantt' && (<Prox avance={87} />)
            }
            {
                segmented === 'equipos' && (<Prox avance={25} />)
            }
            
        </>
    )
}
