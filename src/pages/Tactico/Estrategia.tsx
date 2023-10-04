
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box } from '@/components/ui';
import { EstrategicoProps } from '@/interfaces';
import { getEstrategicosByAreaThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import { getTacticoFromObjetivoIdThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Divider, Spin, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
    slug?: string
    filter?: any
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}


const Estrategia = ({slug, handleCreateTactico, setShowDrawer}: Props) => {

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

    const orderedEstrategicos = useMemo(() => {
        if (estrategicosTacticos?.length) {
            // CD1, CD3, CD4, etc. Ordenar por el dígito y ignorar las letras con regex.
            const regex = /\D/g; // \D coincide con cualquier carácter que no sea un dígito.
            const clonedArray = [...(estrategicosTacticos || [])]; // Clonar el array original para evitar mutaciones.
    
            const ordered = clonedArray.sort((a, b) => {
                const aNumber = Number(a.codigo.replace(regex, ''));
                const bNumber = Number(b.codigo.replace(regex, ''));
                return aNumber - bNumber;
            });
    
            return ordered;
        } else {
            return [];
        }
    }, [estrategicosTacticos])

    useEffect(() => {
        if(orderedEstrategicos?.length) {
            handleGetTacticos(orderedEstrategicos?.[0])
            setActiveEstrategico(orderedEstrategicos?.[0])
        }
    }, [orderedEstrategicos])

    const handleGetTacticos = (objetivo: EstrategicoProps ) => {
        dispatch(getTacticoFromObjetivoIdThunk({id: objetivo.id, year, slug}))
        setActiveEstrategico(objetivo)
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
                                    <TablaTacticos tacticos={tacticosGeneral} isEstrategico handleCreateTactico={ handleCreateTactico } setShowDrawer={setShowDrawer} isLoading={isLoading} />
                            </Box>
                        </div>
                    </div>
            </div>
        </motion.div>
    );
}
 
export default Estrategia;