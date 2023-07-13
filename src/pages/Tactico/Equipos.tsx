import { clearTacticosThunk } from "@/redux/features/tacticos/tacticosThunk"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEffect } from "react"
import { Badge, Box } from "@/components/ui"
import { ImStatsBars2 } from "react-icons/im"
import { motion } from 'framer-motion';
import { Avatar, Divider, Tooltip } from "antd"
import { FaBrain, FaCrosshairs, FaRocket } from "react-icons/fa"
import { clearCurrentAreaThunk, getAreaThunk } from "@/redux/features/admin/areas/areasThunks"
import Loading from "@/components/antd/Loading"

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
            <div className="flex flex-wrap gap-x-5 py-10">
                {
                    currentArea.departamentos?.map(equipo => (
                        <motion.div key={equipo.id} className="max-w-sm w-full">
                            <Box>
                                <div className="flex justify-between items-center">
                                    <Badge badgeType="dark" className="-mt-10">
                                        <ImStatsBars2 />
                                    </Badge>
                                    <div className="text-right sm:py-0">
                                        <p className="text-devarana-graph font-medium"> {equipo.nombre} </p>
                                    </div>
                                </div>
                                <Divider className="my-3" />
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-x-2 text-devarana-graph items-center">
                                        <Tooltip title="Estrategia" className="flex items-center gap-x-2">
                                            <FaRocket />
                                            <p>5</p>
                                        </Tooltip>
                                        <Tooltip title="Táctica" className="flex items-center gap-x-2">
                                            <FaBrain />
                                            <p>4</p>
                                        </Tooltip>
                                        <Tooltip title="Operativos" className="flex items-center gap-x-2">
                                            <FaCrosshairs />
                                            <p>3</p>
                                        </Tooltip>
                                    </div>
                                    <Avatar.Group>
                                        {
                                            equipo.usuarios.map(participante => (
                                                <Tooltip title={participante.nombre} key={participante.id}>
                                                    <Avatar key={participante.id} src={participante.foto} alt={participante.nombre} className="w-8 h-8 rounded-full" />
                                                </Tooltip>
                                            ))
                                        }
                                    </Avatar.Group>
                                </div>
                            </Box>
                        </motion.div>
                    ))
                }
            </div>    
        </motion.div> 
    );
}
 
export default Equipos;