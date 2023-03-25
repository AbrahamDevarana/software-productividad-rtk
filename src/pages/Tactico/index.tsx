import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTacticoFromAreaThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box, Button } from '@/components/ui';
import { Drawer } from 'antd';
import { FormTactico } from '@/components/tacticos/FormTacticos';
import { motion } from 'framer-motion';

export const Tactico = () => {

    const {slug} = useParams<{slug:string}>()
    const dispatch = useAppDispatch()
    const {tacticos, tacticos_core} = useAppSelector(state => state.tacticos)
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if(slug){
            dispatch(getTacticoFromAreaThunk(slug))
        }
    }, [slug])

    return (
        <div className=''>
            <div className="flex justify-end pb-5">
                <Button fn={() => setVisible(true)} btnType='primary'>Agregar</Button>
            </div>
            <div className='grid gap-10'>
                <Box>
                    <TablaTacticos tacticos={tacticos}/>
                </Box>
                <Box>
                    <TablaTacticos tacticos={tacticos_core}/>
                </Box>

                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={() => setVisible(false)}
                    open={visible}
                    width={window.innerWidth > 1200 ? 600 : '100%'}
                    destroyOnClose={true}

                >
                    <FormTactico />
                </Drawer>
            </div>
        </div>
    )
}
