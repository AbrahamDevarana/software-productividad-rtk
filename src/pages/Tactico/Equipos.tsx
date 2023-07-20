import { clearTacticosThunk, getTacticoFromEquiposThunk } from "@/redux/features/tacticos/tacticosThunk"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect, useState } from "react"
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

    if(isLoadingArea) return <Loading />

    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
        >
            <div className="flex gap-5 max-h-screen flex-row">
                    <div className="flex flex-col gap-x-5 gap-y-10 pt-5 max-w-[320px] w-full max-h-[calc(100vh-170px)] hover:overflow-y-auto overflow-y-hidden">
                            {
                                currentArea.departamentos?.map(equipo => (
                                    <motion.div key={equipo.id} className="cursor-pointer">
                                       <div onClick={() => handleGetDepartamentos(equipo.slug)}>
                                        <div className={`p-5 shadow-ext rounded-ext w-[300px]`} 
                                            style={{
                                                backgroundColor: `${activeTeam === equipo.slug ? equipo.color : 'white'}`,
                                            }}
                                        >
                                                <div className="">
                                                    <div className={`text-white w-16 h-16 p-4 rounded-md shadow align-middle flex -mt-10 mx-auto`}
                                                        style={{
                                                            background: `${activeTeam === equipo.slug ? 'white' : `linear-gradient(to top right, ${equipo.color}, ${equipo.color}`}`,
                                                        }}
                                                    >
                                                        <div className="text-3xl  w-full justify-center flex m-auto">
                                                            <ImStatsBars2 className="drop-shadow"
                                                                style={{
                                                                    color: `${activeTeam === equipo.slug ? equipo.color : 'white'}`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center sm:py-0 pt-710">
                                                    <p className="font-medium pt-2"
                                                        style={{
                                                            color: `${activeTeam === equipo.slug ? 'white' : equipo.color}`,
                                                        }}
                                                    > {equipo.nombre} </p>
                                                </div>
                                                <Divider className="my-3" />
                                                <div className="flex justify-center w-full">
                                                    <div className="flex gap-x-3 items-center"
                                                        style={{
                                                            color: `${activeTeam === equipo.slug ? 'white' : equipo.color}`,
                                                        }}
                                                    >
                                                        <Tooltip title="Objetivos Estratégicos" className="flex items-center gap-x-1">
                                                            <FaRocket />
                                                            <p>5</p>
                                                        </Tooltip>
                                                        <Tooltip title="Objetivos Tácticos" className="flex items-center gap-x-1">
                                                            <FaBrain />
                                                            <p>4</p>
                                                        </Tooltip>
                                                        <Tooltip title="Objetivos Operativos" className="flex items-center gap-x-1">
                                                            <FaCrosshairs />
                                                            <p>3</p>
                                                        </Tooltip>
                                                    </div>
                                                    {/* <Avatar.Group>
                                                        {
                                                            equipo.usuarios.map(participante => (
                                                                <Tooltip title={participante.nombre} key={participante.id}>
                                                                    <Avatar key={participante.id} src={<Image src={`${getStorageUrl(participante.foto)}`} preview={false} fallback={getBrokenUser()} />} alt={participante.nombre} className="w-8 h-8 rounded-full" />
                                                                </Tooltip>
                                                            ))
                                                        }
                                                    </Avatar.Group> */}
                                                </div>
                                            </div>
                                       </div>
                                    </motion.div>
                                ))
                            }
                    </div>    
                    <div className="pt-5 w-full flex flex-col gap-10">
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
                                <TablaTacticos tacticos={tacticos_core} estrategico handleCreateTactico={ handleCreateTactico} setShowDrawer={ setShowDrawer }  isLoading={isLoading} />
                        </Box>
                        
                        
                    </div>
                
            </div>
        </motion.div> 
    );
}
 
export default Equipos;