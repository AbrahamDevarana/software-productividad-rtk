import { clearTacticosThunk } from "@/redux/features/tacticos/tacticosThunk"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect } from "react"
import { Badge, Box } from "@/components/ui"
import { ImStatsBars2 } from "react-icons/im"
import { clamp, motion } from 'framer-motion';
import { Avatar, Divider, Image, Tooltip } from "antd"
import { FaBrain, FaCrosshairs, FaRocket } from "react-icons/fa"
import { clearCurrentAreaThunk, getAreaThunk } from "@/redux/features/admin/areas/areasThunks"
import Loading from "@/components/antd/Loading"
import getBrokenUser from "@/helpers/getBrokenUser"
import { getStorageUrl } from "@/helpers"
import { TablaTacticos } from "@/components/tacticos/TablaTacticos"

interface Props {
    slug?: string
    year: number
}

const Equipos = ({ slug, year }:Props) => {
    
    const dispatch = useAppDispatch()
    const { currentArea, isLoadingCurrent:isLoadingArea } = useAppSelector(state => state.areas)
    
    useEffect(() => {
        if(slug){
            dispatch(getAreaThunk(slug))
        }

        return () => { 
            dispatch(clearTacticosThunk())
            dispatch(clearCurrentAreaThunk())
         }
    }, [slug, year])

    const equipos = [
        {
            id: 1,
            nombre: 'Tecnología',
            participantes: [
                {
                    id: 1,
                    nombre: 'Juan Perez',
                    foto: 'https://randomuser.me/api/portraits/men/1.jpg'
                },
                {
                    id: 2,
                    nombre: 'Bartolo Perez',
                    foto: 'https://randomuser.me/api/portraits/men/2.jpg'
                },
            ]
        },
        {
            id: 2,
            nombre: 'Staff',
            participantes: [
                {
                    id: 1,
                    nombre: 'Juan Rodriguez',
                    foto: 'https://randomuser.me/api/portraits/men/3.jpg'
                }
            ]
        }
    ]


    if(isLoadingArea) return <Loading />

    return ( 
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: .5 } }}
        >
            <div className="flex gap-5">
                <div className="flex flex-wrap gap-x-5 gap-y-10 pt-5 flex-col w-[350px] h-screen">
                        {
                            currentArea.departamentos?.map(equipo => (
                                <motion.div key={equipo.id}>
                                    <Box className="w-[300px]">
                                        <div className="">
                                            <Badge badgeType="primary" className="-mt-10 mx-auto">
                                                <ImStatsBars2 />
                                            </Badge>
                                        </div>
                                        <div className="text-center sm:py-0 pt-7">
                                            <p className="text-devarana-graph font-medium"> {equipo.nombre} </p>
                                        </div>
                                        <Divider className="my-3" />
                                        <div className="flex justify-center w-full">
                                            <div className="flex gap-x-3 text-devarana-graph items-center">
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
                                    </Box>
                                </motion.div>
                            ))
                        }
                </div>    
                <div className="pt-5">
                    <TablaTacticos tacticos={[]} estrategico handleCreateTactico={ () => {} } setShowDrawer={ () => {}}  />
                </div>
            </div>
        </motion.div> 
    );
}
 
export default Equipos;