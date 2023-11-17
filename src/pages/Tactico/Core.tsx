
import { TablaTacticos } from '@/components/tacticos/TablaTacticos';
import { Box } from '@/components/ui';
import { CoreProps, DepartamentoProps, TacticoProps } from '@/interfaces';
import { getAreaThunk } from '@/redux/features/areas/areasThunks';
import { createCoreThunk, getCoreThunk } from '@/redux/features/core/coreThunk';
import { createTacticoThunk, getTacticoThunk, getTacticosByEquipoCoreThunk } from '@/redux/features/tacticos/tacticosThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Checkbox, Tooltip } from 'antd';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

interface Props {
    slug?: string
    setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}


const Core = ({slug, setShowDrawer}: Props) => {

    const { year } = useAppSelector(state => state.global.currentConfig)
    const { objetivosCore, isLoading, isLoadingCore } = useAppSelector(state => state.tacticos)
    const { currentArea } = useAppSelector(state => state.areas)
    const [ activeTeam, setActiveTeam ] = useState<DepartamentoProps>()
    const [showOnlyMe, setShowOnlyMe] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(slug){
            dispatch(getAreaThunk(slug))
        }
    }, [year])

    
    useEffect(() => {
        if(currentArea.departamentos?.length){
            dispatch(getTacticosByEquipoCoreThunk({year, departamentoId: currentArea.departamentos[0].id, showOnlyMe}))
        }
    }, [currentArea])

    useEffect(() => {
        if(currentArea?.departamentos?.length){
            handleGetDepartamentos(currentArea.departamentos[0])
            setActiveTeam(currentArea.departamentos[0])
        }
    }, [currentArea])

    const handleGetDepartamentos = (departamento: DepartamentoProps) => {
        dispatch(getTacticosByEquipoCoreThunk({year, departamentoId: departamento.slug, showOnlyMe}))
        setActiveTeam(departamento)
    }

    const activeDepartamento = useMemo(() => {
        const current = activeTeam ? currentArea?.departamentos?.find(equipo => equipo.slug === activeTeam.slug) : null
        return current
    }, [activeTeam])

    const handleCreateObjetivo = useCallback(() => {
        slug && dispatch(createTacticoThunk({ year, slug }))
    }, [year])

    const handleShowObjetivo = (objetivo: TacticoProps | CoreProps) => {
        dispatch(getTacticoThunk(objetivo.id))        
        setShowDrawer(true)
    }

    const handleGetOnlyMe = (value : boolean) => {
        setShowOnlyMe(value)
        activeTeam && dispatch(getTacticosByEquipoCoreThunk({year, departamentoId: activeTeam.slug, showOnlyMe: value}))
    }

    return ( 
        <motion.div>

            <div className="flex gap-5 max-h-screen flex-row">
                <div className="flex flex-col gap-x-5 gap-y-5 md:max-w-[280px] w-full md:max-h-[calc(100vh-170px)] hover:overflow-y-auto overflow-y-hidden">

                    <div className="bg-white shadow-ext rounded-ext md:w-[275px] w-full p-3">
                            {
                                currentArea.departamentos?.map(equipo => (
                                    <div key={equipo.slug} 
                                        onClick={() => handleGetDepartamentos(equipo)} 
                                        className={`p-2 hover:bg-gray-200 transition duration-300 ease-in-out  first:rounded-t-ext last:rounded-b-ext cursor-pointer`}
                                        style={{
                                            backgroundColor: activeTeam?.slug === equipo.slug ? 'rgb(229, 231, 235)' : '',
                                        }}
                                    >
                                            <p className="font-medium text-devarana-graph"> {equipo.nombre} </p>
                                        </div>
                                ))
                            }
                    </div>
                    
                </div>       
                    <div className="w-full flex flex-col gap-y-5 align-middle">
                        {
                            <Box className="flex flex-col md:flex-row" style={{
                                backgroundColor: activeDepartamento?.color,
                            }}>
                                <div>
                                    <h1 className="text-white font-medium">Objetivos Tácticos Core</h1>
                                    <p className="text-white text-opacity-80 drop-shadow"> Objetivos anuales de las áreas enfocados en mantener una operación eficiente </p>
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
                                        title='Objetivos anuales de las áreas enfocados en mantener una operación eficiente'
                                        color='#408FE3'
                                    >
                                        <FaQuestionCircle className='text-primary-light'/>
                                    </Tooltip>
                                </div>
                                    <TablaTacticos objetivos={objetivosCore} handleCreateObjetivo={ handleCreateObjetivo }  isLoading={isLoading || isLoadingCore} handleShowObjetivo={handleShowObjetivo}/>
                            </Box>
                        </div>
                    </div>
            </div>
        </motion.div>
    );
}
 
export default Core;