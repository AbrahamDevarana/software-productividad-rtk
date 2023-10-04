
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box } from '@/components/ui';
import { EstrategicoProps } from '@/interfaces';
import { getEstrategicosByAreaThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getTacticoFromObjetivoIdThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Divider, Spin, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
    slug?: string
    filter?: any
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}


const Core = ({slug, handleCreateTactico, setShowDrawer}: Props) => {

    const { year } = useAppSelector(state => state.global.currentConfig)
    const { estrategicosTacticos, isLoadingEstrategicosByArea } = useAppSelector(state => state.estrategicos)
    const { tacticosGeneral, isLoading } = useAppSelector(state => state.tacticos)

    const [ activeEstrategico, setActiveEstrategico ] = useState<EstrategicoProps>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(slug){
            dispatch(getEstrategicosByAreaThunk({slug, year}))
        }
    }, [])

    useEffect(() => {
        if(estrategicosTacticos?.length) {
            handleGetTacticos(estrategicosTacticos?.[0])
            setActiveEstrategico(estrategicosTacticos?.[0])
        }
    }, [estrategicosTacticos])

    const handleGetTacticos = (objetivo: EstrategicoProps ) => {
        dispatch(getTacticoFromObjetivoIdThunk({id:undefined, year, slug}))
        setActiveEstrategico(objetivo)
    }
    

    return ( 
        <motion.div>

            <div className="flex gap-5 max-h-screen flex-row">
                    <div className="flex flex-col gap-x-5 gap-y-5 max-w-[280px] w-full max-h-[calc(100vh-170px)] hover:overflow-y-auto overflow-y-hidden">

                        <div className="bg-white shadow-ext rounded-ext w-[275px] p-3">
                            <p className='text-devarana-graph'>
                                El objetivo de esta sección es mantener una operación eficiente, por lo que los objetivos tácticos que se creen en esta sección deben estar enfocados en mantener la operación de la empresa.
                            </p>
                            
                        </div>
                    </div>    
                    <div className="w-full flex flex-col gap-y-5 align-middle">
                        {
                            !isLoadingEstrategicosByArea && 
                            <Box className="flex" style={{
                                    backgroundColor: activeEstrategico?.perspectivas?.color ,
                            }}>
                                {/* <div className='flex items-center'>
                                    <p className="text-white text-opacity-80 drop-shadow text-3xl">{activeEstrategico?.codigo}</p>
                                </div> */}
                                {/* <Divider type='vertical' className='mx-2 h-full bg-white bg-opacity-70 shadow' /> */}
                                <div>
                                    <h1 className="text-white font-medium">Objetivos Tácticos Core</h1>
                                    <p className="text-white text-opacity-80 drop-shadow"> Objetivos anuales de las áreas enfocados en mantener una operación eficiente </p>
                                </div>
                            </Box>
                        }
                        <div className="w-full flex flex-col gap-y-5">
                            <Box>
                                <div className="flex items-center gap-x-2">
                                    <h2>Objetivos Tácticos Estratégicos</h2>
                                    <Tooltip
                                        title='Objetivos anuales de las áreas enfocados en mantener una operación eficiente'
                                        color='#408FE3'
                                    >
                                        <FaQuestionCircle className='text-primary-light'/>
                                    </Tooltip>
                                </div>
                                    <TablaTacticos tacticos={tacticosGeneral} isEstrategico handleCreateTactico={ handleCreateTactico } setShowDrawer={setShowDrawer} isLoading={isLoading} />
                            </Box>
                        </div>
                    </div>
            </div>
        </motion.div>
    );
}
 
export default Core;