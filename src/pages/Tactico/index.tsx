import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTacticoFromAreaThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box, Button } from '@/components/ui';
import { Drawer, FloatButton } from 'antd';
import { FormTactico } from '@/components/tacticos/FormTacticos';
import { Icon } from '@/components/Icon';

export const Tactico = () => {

    let {state} = useLocation() 

    

    const [currentInfo, setCurrentInfo] = useState({
        state
    })    

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
        <>
            <p>
                {JSON.stringify(currentInfo)}
            </p>
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
                    <FormTactico areaId={state.areaId} />
                </Drawer>
            </div>
            <FloatButton
                icon={<Icon iconName='faPlus' />}
                onClick={() => setVisible(true)}
            />
        </>
    )
}
