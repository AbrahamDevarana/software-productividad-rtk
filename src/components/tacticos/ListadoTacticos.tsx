import { Box } from "../ui";
import { TablaTacticos } from "./TablaTacticos";
import { Tooltip } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearTacticosThunk, getTacticoFromAreaThunk } from "@/redux/features/tacticos/tacticosThunk";
import Loading from "../antd/Loading";
import { useDebounce } from "@/hooks/useDebouce";

interface Props {
    slug?: string
    year: number
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void;
    setShowDrawer: (showDrawer: boolean) => void;
    filter: object
}

const ListadoTacticos = ({handleCreateTactico, slug, year, setShowDrawer, filter}:Props) => {

    const dispatch = useAppDispatch()
    const {tacticos, tacticos_core, isLoading} = useAppSelector(state => state.tacticos)

    const { debouncedValue } = useDebounce(filter, 500)


    useEffect(() => {
        if(slug){
            dispatch(getTacticoFromAreaThunk({ slug, year, filter:debouncedValue }))
        }

        return () => { dispatch(clearTacticosThunk()) }
    }, [slug, year, debouncedValue])


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
                    <TablaTacticos tacticos={tacticos}  handleCreateTactico={handleCreateTactico} estrategico={true} setShowDrawer={setShowDrawer} isLoading={isLoading}/>
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
                    <TablaTacticos tacticos={tacticos_core} handleCreateTactico={handleCreateTactico} estrategico={false} setShowDrawer={setShowDrawer} isLoading={isLoading}/>
                </Box>
            </div>
     );
}
 
export default ListadoTacticos;