import { clearTacticosThunk, getTacticoThunk, getTacticosByEquiposThunk } from "@/redux/features/tacticos/tacticosThunk"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useMemo, useState } from "react"
import { Box } from "@/components/ui"
import { motion } from 'framer-motion';
import { Avatar, Image, Tooltip } from "antd"
import { FaQuestionCircle } from "react-icons/fa"
import { clearCurrentAreaThunk, getAreaThunk } from "@/redux/features/areas/areasThunks"
import { TablaTacticos } from "@/components/tacticos/TablaTacticos"
import { getStorageUrl } from "@/helpers"
import getBrokenUser from "@/helpers/getBrokenUser"
import { getCoreThunk, getCoresThunk } from "@/redux/features/core/coreThunk";
import { CoreProps, DepartamentoProps, TacticoProps } from "@/interfaces";

interface Props {
    slug?: string
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, isEstrategico: boolean) => void;
    setShowDrawer: (showDrawer: boolean) => void;
}

const Equipos = ({ slug, setShowDrawer }:Props) => {
    
    const dispatch = useAppDispatch()
    const { year } = useAppSelector(state => state.global.currentConfig)
    const { currentArea, isLoadingCurrent: isLoadingArea } = useAppSelector(state => state.areas)
    const { objetivosTacticos, isLoading} = useAppSelector(state => state.tacticos)
    const { objetivosCore } = useAppSelector(state => state.core)
    const [ activeTeam, setActiveTeam ] = useState<DepartamentoProps>()

    
    useEffect(() => {
        if(slug){
            dispatch(getAreaThunk(slug))
        }

        return () => { 
            dispatch(clearTacticosThunk())
            dispatch(clearCurrentAreaThunk())
         }
    }, [slug, year])

    

    useEffect(() => {
        if(currentArea.departamentos?.length){
            dispatch(getTacticosByEquiposThunk({year, departamentoId: currentArea.departamentos[0].id}))
        }
    }, [currentArea])

    useEffect(() => {
        if(currentArea.departamentos?.length){
            dispatch(getCoresThunk({year, departamentoId: currentArea.departamentos[0].id}))
        }
    }, [currentArea])

    useEffect(() => {
        if(currentArea?.departamentos?.length){
            setActiveTeam(currentArea.departamentos[0])
        }
    }, [currentArea])

    const handleGetDepartamentos = (departamento: DepartamentoProps) => {
        dispatch(getTacticosByEquiposThunk({year, departamentoId: departamento.slug}))
        dispatch(getCoresThunk({year, departamentoId: departamento.slug}))
        setActiveTeam(departamento)
    }

    const activeDepartamento = useMemo(() => {
        const current = activeTeam ? currentArea?.departamentos?.find(equipo => equipo.slug === activeTeam.slug) : null
        return current
    }, [activeTeam])

    const handleCreateObjetivo = () => {}

    const handleShowObjetivoT = (objetivo: TacticoProps | CoreProps) => {
        dispatch(getTacticoThunk(objetivo.id))        
        setShowDrawer(true)
    }
    const handleShowObjetivoC = (objetivo: TacticoProps | CoreProps) => {
        dispatch(getCoreThunk(objetivo.id))        
        setShowDrawer(true)
    }


    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
        >
            <div className="flex gap-5 flex-row md:flex-nowrap flex-wrap">
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
                <div className="pt-5 w-full flex flex-col gap-y-5">
                    <Box className="flex flex-col md:flex-row" style={{
                        backgroundColor: activeDepartamento?.color,
                    }}>
                        <div>
                            <h1 className="text-white font-medium md:text-left text-center">{activeDepartamento?.nombre}</h1>
                            <p className="text-white text-opacity-80 drop-shadow md:text-left text-center">{currentArea.nombre}</p>
                        </div>

                        <div className="mx-5 px-5 md:border-r-0 md:border-t-0 md:border-b-0 md:border-white md:border items-center flex">
                            {
                                currentArea.leader && activeDepartamento && (
                                    <div className="flex items-center gap-x-2 align-middle">
                                        <Avatar 
                                                src={<Image src={`${getStorageUrl(activeDepartamento?.leader?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                        />

                                        {
                                            activeDepartamento.leader &&
                                            ( 
                                            <div className="">
                                                <p className="text-white">{activeDepartamento.leader.nombre} {activeDepartamento.leader?.apellidoPaterno} {activeDepartamento?.leader?.apellidoMaterno}
                                                <p className="text-sm text-opacity-80 text-white drop-shadow">Lider de seguimiento</p>
                                                </p>
                                            
                                            </div>)
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </Box>
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
                            <TablaTacticos objetivos={objetivosTacticos} handleCreateObjetivo={ handleCreateObjetivo } isLoading={isLoading} handleShowObjetivo={handleShowObjetivoT}/>
                    </Box>
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
                            <TablaTacticos objetivos={objetivosCore} handleCreateObjetivo={ handleCreateObjetivo } isLoading={isLoading} handleShowObjetivo={handleShowObjetivoC}/>
                    </Box>
                    
                    
                </div>
            
            </div>
        </motion.div> 
    );
}
 
export default Equipos;