import { TacticoProps } from "@/interfaces";
import { Box } from "../ui";
import { TablaTacticos } from "./TablaTacticos";

interface Props {
    tacticos: TacticoProps[];
    tacticos_core: TacticoProps[];
    handleCreateTactico: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ListadoTacticos = ({handleCreateTactico, tacticos, tacticos_core}:Props) => {
    return ( 

        <div className='grid gap-10'>
                <Box>
                    <h2>Objetivos Tácticos que contribuyen a la Estrategia </h2>
                    <TablaTacticos tacticos={tacticos}  handleCreateTactico={handleCreateTactico}  />
                </Box>
                <Box>
                    <h2>Tácticos Core</h2>
                    <TablaTacticos tacticos={tacticos_core} handleCreateTactico={handleCreateTactico}  />
                </Box>
            </div>
     );
}
 
export default ListadoTacticos;