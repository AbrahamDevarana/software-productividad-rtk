import { Box } from "../ui";
import { TablaTacticos } from "./TablaTacticos";
import { Tooltip } from "antd";
import { FaQuestion, FaQuestionCircle } from "react-icons/fa";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearTacticosThunk, getTacticoFromAreaThunk } from "@/redux/features/tacticos/tacticosThunk";

interface Props {
    slug?: string
    year: number
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void;
    setShowDrawer: (showDrawer: boolean) => void;
}

const ListadoTacticos = ({handleCreateTactico, slug, year, setShowDrawer}:Props) => {

    const dispatch = useAppDispatch()
    const {tacticos, tacticos_core} = useAppSelector(state => state.tacticos)

    useEffect(() => {
        if(slug){
            dispatch(getTacticoFromAreaThunk({ slug, year}))
        }

        return () => { dispatch(clearTacticosThunk()) }
    }, [slug, year])


    return ( 

        <div className='grid gap-10'>
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
                    <TablaTacticos tacticos={tacticos}  handleCreateTactico={handleCreateTactico} estrategico={true} setShowDrawer={setShowDrawer}/>
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
                    <TablaTacticos tacticos={tacticos_core} handleCreateTactico={handleCreateTactico} estrategico={false} setShowDrawer={setShowDrawer}/>
                </Box>
            </div>
     );
}
 
export default ListadoTacticos;