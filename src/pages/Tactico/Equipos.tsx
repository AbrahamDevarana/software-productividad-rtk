import { clearTacticosThunk, getTacticoFromEquiposThunk } from "@/redux/features/tacticos/tacticosThunk"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useMemo, useState } from "react"
import { Box } from "@/components/ui"
import { ImStatsBars2 } from "react-icons/im"
import { motion } from 'framer-motion';
import { Divider, Tooltip } from "antd"
import { FaBrain, FaCrosshairs, FaQuestionCircle, FaRocket } from "react-icons/fa"
import { clearCurrentAreaThunk, getAreaThunk } from "@/redux/features/admin/areas/areasThunks"
import Loading from "@/components/antd/Loading"
import { TablaTacticos } from "@/components/tacticos/TablaTacticos"

interface Props {
    slug?: string
    year: number
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void;
    setShowDrawer: (showDrawer: boolean) => void;
}

const Equipos = ({ slug, year, handleCreateTactico, setShowDrawer }:Props) => {
    
    const dispatch = useAppDispatch()
    const { currentArea, isLoadingCurrent:isLoadingArea } = useAppSelector(state => state.areas)
    const { tacticos, tacticos_core, isLoading} = useAppSelector(state => state.tacticos)
    const [activeTeam, setActiveTeam] = useState<string>('')
    
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
            dispatch(getTacticoFromEquiposThunk({slug: currentArea.departamentos[0].slug, year}))
            setActiveTeam(currentArea.departamentos[0].slug)
        }
    }, [currentArea])


    const handleGetDepartamentos = (slug: string) => {
        dispatch(getTacticoFromEquiposThunk({slug, year}))
        setActiveTeam(slug)
    }

    const activeDepartamento = useMemo(() => {
        const current = activeTeam ? currentArea?.departamentos?.find(equipo => equipo.slug === activeTeam) : null
        return current
    }, [activeTeam])

    if(isLoadingArea) return <Loading />

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
                                            <p className="font-medium"
                                                style={{ color: equipo.color }}> {equipo.nombre} </p>
                                        </div>
                                ))
                            }
                        </div>
                    </div>    
                    <div className="pt-5 w-full flex flex-col gap-y-5">
                        <Box>
                            <p className="text-sm text-opacity-20 text-devarana-midnight">{currentArea.nombre}</p>
                            <h1 className="text-devarana-dark-graph font-medium">{activeDepartamento?.nombre}</h1>
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