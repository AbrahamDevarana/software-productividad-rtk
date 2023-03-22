import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getTacticoFromAreaThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box } from '@/components/ui';

export const Tactico = () => {

    const {slug} = useParams<{slug:string}>()
    const dispatch = useAppDispatch()
    const {tacticos, tacticos_core} = useAppSelector(state => state.tacticos)

    useEffect(() => {
        if(slug){
            dispatch(getTacticoFromAreaThunk(slug))
        }
    }, [slug])

    return (
        <>
           
            <div className='grid gap-10'>
                <Box>
                    <TablaTacticos tacticos={tacticos}/>
                </Box>
                <Box>
                    <TablaTacticos tacticos={tacticos_core}/>
                </Box>
            </div>
        </>
    )
}
