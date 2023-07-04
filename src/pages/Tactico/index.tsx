import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearTacticosThunk, createTacticoThunk, getTacticoFromAreaThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Segmented } from 'antd';
import ListadoTacticos from '@/components/tacticos/ListadoTacticos';

export const Tactico: React.FC = () => {


    let { state } = useLocation()
    const {slug} = useParams<{slug:string}>()

    const dispatch = useAppDispatch()
    const {tacticos, tacticos_core} = useAppSelector(state => state.tacticos)
    const [segmented, setSegmented] = useState<React.SetStateAction<any>>('listado')

    useEffect(() => {
        if(slug){
            dispatch(getTacticoFromAreaThunk({ slug, quarter: state.quarter, year: state.year}))
        }

        return () => { dispatch(clearTacticosThunk()) }
    }, [slug])


    const handleCreateTactico = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
    
        dispatch(createTacticoThunk({slug, quarter: state.quarter, year: state.year}))
    }


    return (
        <>
            <div className='max-w-sm pb-5'>
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

            {
                segmented === 'listado' && (<ListadoTacticos handleCreateTactico={handleCreateTactico} tacticos={tacticos} tacticos_core={tacticos_core} />)
            }
            
        </>
    )
}
