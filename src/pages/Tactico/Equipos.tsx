import { clearTacticosThunk, getTacticoFromEquiposThunk } from "@/redux/features/tacticos/tacticosThunk"
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
import { useDebounce } from "@/hooks/useDebouce";

interface Props {
    slug?: string
    year: number
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void;
    setShowDrawer: (showDrawer: boolean) => void;
    filter: object
}

const Equipos = ({ slug, year, handleCreateTactico, setShowDrawer, filter }:Props) => {
    
    const dispatch = useAppDispatch()
    const { currentArea, isLoadingCurrent:isLoadingArea } = useAppSelector(state => state.areas)
    const { tacticos, tacticos_core, isLoading} = useAppSelector(state => state.tacticos)
    const [ activeTeam, setActiveTeam ] = useState<string>('')

    const { debouncedValue } = useDebounce(filter, 500)
    
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
        if(currentArea?.departamentos?.length){
            dispatch(getTacticoFromEquiposThunk({slug: currentArea.departamentos[0].slug, year, filter:debouncedValue}))
            
        }
    }, [currentArea, debouncedValue])

    useEffect(() => {
        if(currentArea?.departamentos?.length){
            setActiveTeam(currentArea.departamentos[0].slug)
        }
    }, [currentArea])

    const handleGetDepartamentos = (slug: string) => {
        dispatch(getTacticoFromEquiposThunk({slug, year, filter: debouncedValue}))
        setActiveTeam(slug)
    }

    const activeDepartamento = useMemo(() => {
        const current = activeTeam ? currentArea?.departamentos?.find(equipo => equipo.slug === activeTeam) : null
        return current
    }, [activeTeam])



    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
        >
            <div className="flex gap-5 max-h-screen flex-row">
                    <div className="flex flex-col gap-x-5 gap-y-5 pt-5 max-w-[280px] w-full max-h-[calc(100vh-170px)] hover:overflow-y-auto overflow-y-hidden">

                        <div className="bg-white shadow-ext rounded-ext w-[275px] p-3">
                            {
                                currentArea.departamentos?.map(equipo => (
                                    <div key={equipo.slug} 
                                        onClick={() => handleGetDepartamentos(equipo.slug)} 
                                        className={`p-2 hover:bg-gray-200 transition duration-300 ease-in-out  first:rounded-t-ext last:rounded-b-ext cursor-pointer`}
                                        style={{
                                            backgroundColor: activeTeam === equipo.slug ? 'rgb(229, 231, 235)' : '',
                                        }}
                                    >
                                            <p className="font-medium text-devarana-graph"> {equipo.nombre} </p>
                                        </div>
                                ))
                            }
                        </div>
                    </div>    
                    <div className="pt-5 w-full flex flex-col gap-y-5">
                        <Box className="flex" style={{
                            backgroundColor: activeDepartamento?.color,
                        }}>
                            <div>
                                <h1 className="text-white font-medium">{activeDepartamento?.nombre}</h1>
                                <p className="text-white text-opacity-80 drop-shadow">{currentArea.nombre}</p>
                            </div>

                            <div className="mx-5 px-5 border-r-0 border-t-0 border-b-0 border-white border items-center flex">
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
                                <TablaTacticos tacticos={tacticos} estrategico handleCreateTactico={ handleCreateTactico } setShowDrawer={setShowDrawer} isLoading={isLoading} />
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
                                <TablaTacticos tacticos={tacticos_core} estrategico={false} handleCreateTactico={ handleCreateTactico} setShowDrawer={ setShowDrawer }  isLoading={isLoading} />
                        </Box>
                        
                        
                    </div>
                
            </div>
        </motion.div> 
    );
}
 
export default Equipos;