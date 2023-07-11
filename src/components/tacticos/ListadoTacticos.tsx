import { TacticoProps } from "@/interfaces";
import { Box } from "../ui";
import { TablaTacticos } from "./TablaTacticos";
import { Tooltip } from "antd";
import { FaQuestion, FaQuestionCircle } from "react-icons/fa";

interface Props {
    tacticos: TacticoProps[];
    tacticos_core: TacticoProps[];
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>, estrategico: boolean) => void;
    setShowDrawer: (showDrawer: boolean) => void;
}

const ListadoTacticos = ({handleCreateTactico, tacticos, tacticos_core, setShowDrawer}:Props) => {
    return ( 

        <div className='grid gap-10'>
                <Box>
                    <div className="flex items-center gap-x-2">
                        <h2>Objetivos Tácticos Estratégicos</h2>
                        <Tooltip
                            title='Objetivos tacticos que contribuyen a los objetivos estratégicos'
                            color='#408FE3'
                        >
                            <FaQuestionCircle className='text-primary-light'/>
                        </Tooltip>
                    </div>
                    <TablaTacticos tacticos={tacticos}  handleCreateTactico={handleCreateTactico} estrategico={true} setShowDrawer={setShowDrawer}/>
                </Box>
                <Box>
                    <Tooltip>
                        <h2>Objetivos Tácticos Core</h2>
                    </Tooltip>
                    <TablaTacticos tacticos={tacticos_core} handleCreateTactico={handleCreateTactico} estrategico={false} setShowDrawer={setShowDrawer}/>
                </Box>
            </div>
     );
}
 
export default ListadoTacticos;