import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearTacticosThunk, getTacticoFromAreaThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box } from '@/components/ui';
import { Drawer, FloatButton } from 'antd';
import { FormTactico } from '@/components/tacticos/FormTacticos';
import { FaPlus } from 'react-icons/fa';

export const Tactico: React.FC = () => {


    let {state} = useLocation()
    const {slug} = useParams<{slug:string}>()

    const dispatch = useAppDispatch()
    const {tacticos, tacticos_core} = useAppSelector(state => state.tacticos)
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if(slug){
            dispatch(getTacticoFromAreaThunk(slug, state.quarter, state.year))
        }

        return () => { dispatch(clearTacticosThunk()) }
    }, [slug])

    return (
        <>
            <div className='grid gap-10'>
                <Box>
                    <h2>Objetivos que contribuyen a la estrategia </h2>
                    <TablaTacticos tacticos={tacticos}/>
                </Box>
                <Box>
                    <h2>Tácticos Core</h2>
                    <TablaTacticos tacticos={tacticos_core}/>
                </Box>

                <Drawer
                    closable={false}
                    onClose={() => setVisible(false)}
                    open={visible}
                    width={window.innerWidth > 1200 ? 600 : '100%'}
                    destroyOnClose={true}

                >
                    <FormTactico setShowEdit={setVisible}/>
                </Drawer>
            </div>
            <FloatButton
                icon={<FaPlus />}
                onClick={() => setVisible(true)}
            />
        </>
    )
}
