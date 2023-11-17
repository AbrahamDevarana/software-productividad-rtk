
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box } from '@/components/ui';
import { CoreProps, EstrategicoProps, TacticoProps } from '@/interfaces';
import { getEstrategicosByAreaThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { createTacticoThunk, getTacticoThunk, getTacticosByEstrategiaThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Checkbox, Divider, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
    slug?: string
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const Estrategia = ({ slug, setShowDrawer }: Props) => {

    const { year } = useAppSelector(state => state.global.currentConfig)
    const { estrategicosTacticos, isLoadingEstrategicosByArea } = useAppSelector(state => state.estrategicos)
    const { objetivosTacticos, isLoading } = useAppSelector(state => state.tacticos)
    const [ showOnlyMe, setShowOnlyMe ] = useState(false)
    const [ activeEstrategico, setActiveEstrategico ] = useState<EstrategicoProps>()

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(slug){
            dispatch(getEstrategicosByAreaThunk({slug, year}))
        }
    }, [])

    const orderedEstrategicos = useMemo(() => {
        if (estrategicosTacticos.length > 0) {
            const regex = /\D/g;
            const sortedEstrategicos = estrategicosTacticos.slice().sort((a, b) => {
                const aNumber = parseInt(a.codigo.replace(regex, ''), 10) || 0;
                const bNumber = parseInt(b.codigo.replace(regex, ''), 10) || 0;
                return aNumber - bNumber;
            });
            return sortedEstrategicos;
        } else {
            return [];
        }
    }, [estrategicosTacticos]);
    
    useEffect(() => {
        if(orderedEstrategicos.length > 0 ) {
            const initialEstrategico = orderedEstrategicos[0];
            handleGetTacticos(initialEstrategico)            
            setActiveEstrategico(initialEstrategico)
        }
    }, [estrategicosTacticos])

    const handleGetTacticos = (objetivo: EstrategicoProps ) => {        
        setActiveEstrategico(objetivo)
        dispatch(getTacticosByEstrategiaThunk({ estrategicoId: objetivo.id, year, showOnlyMe}))
    }

    const handleGetOnlyMe = (value : boolean) => {
        setShowOnlyMe(value)
        activeEstrategico && dispatch(getTacticosByEstrategiaThunk({ estrategicoId: activeEstrategico.id, year, showOnlyMe: value}))
    }

    const handleCreateTactico = useCallback(() => {        
        slug && activeEstrategico && dispatch(createTacticoThunk({ year, estrategicoId: activeEstrategico.id, slug}))
    }, [activeEstrategico])

    const handleShowObjetivo = (objetivo: TacticoProps | CoreProps) => {
        dispatch(getTacticoThunk(objetivo.id))        
        setShowDrawer(true)
    }


    return ( 
        <motion.div>
            <div className="flex gap-5 max-h-screen flex-row md:flex-nowrap flex-wrap">
                    <div className="flex flex-col gap-x-5 gap-y-5 md:max-w-[280px] w-full md:max-h-[calc(100vh-170px)] hover:overflow-y-auto overflow-y-hidden">

                        <div className="bg-white shadow-ext rounded-ext md:w-[275px] w-full p-3">
                            {
                                orderedEstrategicos?.map(objetivo => (
                                    <div key={objetivo.id}
                                        onClick={() => handleGetTacticos(objetivo)} 
                                        className={`p-2 hover:bg-gray-200 transition duration-300 ease-in-out first:rounded-t-ext last:rounded-b-ext cursor-pointer relative
                                            ${activeEstrategico?.id === objetivo.id && 'bg-gray-200'}
                                        `}
                                        style={{
                                 
                                        }}
                                    >
                                            <p className="font-medium text-devarana-graph"> Objetivo Estratégico - {objetivo.codigo} </p>
                                        </div>
                                ))
                                
                            }
                        </div>
                    </div>    
                    <div className="w-full flex flex-col gap-y-5 align-middle">
                        {
                            !isLoadingEstrategicosByArea && 
                            <Box className="flex" style={{
                                    backgroundColor: activeEstrategico?.perspectivas?.color ,
                            }}>
                                <div className='flex items-center'>
                                    <p className="text-white text-opacity-80 drop-shadow text-3xl">{activeEstrategico?.codigo}</p>
                                </div>
                                <Divider type='vertical' className='mx-2 h-full bg-white bg-opacity-70 shadow' />
                                <div>
                                    <h1 className="text-white font-medium">{activeEstrategico?.nombre}</h1>
                                    <p className="text-white text-opacity-80 drop-shadow">{activeEstrategico?.perspectivas.nombre}</p>
                                </div>
                                <div className='ml-auto'>
                                    <Checkbox
                                        checked={showOnlyMe}
                                        onChange={(e) => handleGetOnlyMe(e.target.checked)}
                                        className='text-white'
                                    >
                                        <p className='text-white'>Solo mis objetivos {showOnlyMe} </p>
                                    </Checkbox>

                                </div>
                            </Box>
                        }
                        <div className="w-full flex flex-col gap-y-5">
                            <Box>
                                <div className="flex items-center gap-x-2">
                                    <h2>Objetivos Tácticos Estratégicos</h2>
                                    <Tooltip
                                        title='Objetivos anuales de las áreas que contribuyen directamente al cumplimiento de la Estrategía'
                                        color='#408FE3'
                                    >
                                        <FaQuestionCircle className='text-primary-light'/>
                                    </Tooltip>
                                </div>
                                    <TablaTacticos objetivos={objetivosTacticos} handleCreateObjetivo={ handleCreateTactico } isLoading={isLoading} handleShowObjetivo={handleShowObjetivo} />
                            </Box>
                        </div>
                    </div>
            </div>
        </motion.div>
    );
}
 
export default Estrategia;