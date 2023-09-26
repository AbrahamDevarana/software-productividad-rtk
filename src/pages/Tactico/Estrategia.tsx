
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box } from '@/components/ui';
import { getEstrategicosByAreaThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getTacticoFromObjetivoIdThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
    slug?: string
    filter?: any
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}


const Estrategia = ({slug, handleCreateTactico, setShowDrawer}: Props) => {

    const { year } = useAppSelector(state => state.global.currentConfig)
    const { estrategicosTacticos } = useAppSelector(state => state.estrategicos)
    const { tacticosGeneral, isLoading } = useAppSelector(state => state.tacticos)
    const [isCore , setIsCore] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    useEffect(() => {
        if(slug){
            dispatch(getEstrategicosByAreaThunk({slug, year}))
        }
    }, [])

    const handleGetTacticos = (id: string | undefined) => {
        dispatch(getTacticoFromObjetivoIdThunk({id, year}))      
        id ? setIsCore(false) : setIsCore(true)
    }

    return ( 
        <motion.div>
            <div className="flex gap-5 max-h-screen flex-row">
                    <div className="flex flex-col gap-x-5 gap-y-5 pt-5 max-w-[280px] w-full max-h-[calc(100vh-170px)] hover:overflow-y-auto overflow-y-hidden">

                        <div className="bg-white shadow-ext rounded-ext w-[275px] p-3">
                            {
                                estrategicosTacticos?.map(objetivo => (
                                    <div key={objetivo.id}
                                        onClick={() => handleGetTacticos(objetivo.id)} 
                                        className={`p-2 hover:bg-gray-200 transition duration-300 ease-in-out  first:rounded-t-ext last:rounded-b-ext cursor-pointer relative`}
                                        style={{
                                 
                                        }}
                                    >
                                            <p className="font-medium text-devarana-graph"> {objetivo.nombre} </p>
                                            {/* <div className="absolute -bottom-0.5 left-0 h-2 bg-gradient-to-r  from-primary to-primary-light text-right"
                                                style={{
                                                    width: `${objetivo.progreso < 10 ? '5%' : objetivo.progreso }%`
                                                }}
                                                >
                                                    <p className="text-white -translate-x-3 -translate-y-2 text-[8px]">{objetivo.progreso}%</p>
                                            </div> */}
                                        </div>
                                ))
                                
                            }
                             <div
                                        onClick={() => handleGetTacticos(undefined)} 
                                className={`p-2 hover:bg-gray-200 transition duration-300 ease-in-out  first:rounded-t-ext last:rounded-b-ext cursor-pointer relative`}
                                style={{
                            
                                }}
                            >
                                    <p className="font-medium text-devarana-graph"> Core  </p>
                                </div>
                        </div>
                    </div>    
                    <div className="pt-5 w-full flex flex-col gap-y-5">
                       {
                        isCore &&
                            <Box>
                                <div className="flex items-center gap-x-2">
                                    <h2>Objetivos Tácticos Core</h2>
                                    <Tooltip>
                                        <Tooltip
                                            title='Objetivos anuales de las áreas enfocados en mantener una operación eficiente'
                                            color='#408FE3'
                                        >
                                            <FaQuestionCircle className='text-primary-light'/>
                                        </Tooltip>
                                    </Tooltip>
                                </div>
                                    <TablaTacticos tacticos={tacticosGeneral} isEstrategico={false} handleCreateTactico={ handleCreateTactico} setShowDrawer={ setShowDrawer }  isLoading={isLoading} />
                            </Box>
                        }
                         {
                            !isCore && <Box>
                            <div className="flex items-center gap-x-2">
                                <h2>Objetivos Tácticos Estratégicos</h2>
                                <Tooltip
                                    title='Objetivos anuales de las áreas que contribuyen directamente al cumplimiento de la Estrategía'
                                    color='#408FE3'
                                >
                                    <FaQuestionCircle className='text-primary-light'/>
                                </Tooltip>
                            </div>
                                <TablaTacticos tacticos={tacticosGeneral} isEstrategico handleCreateTactico={ handleCreateTactico } setShowDrawer={setShowDrawer} isLoading={isLoading} />
                        </Box>
                       } 
                    </div>
            </div>
        </motion.div>
    );
}
 
export default Estrategia;