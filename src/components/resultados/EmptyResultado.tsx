import { FaPlusCircle } from "react-icons/fa";
import { BsWindowPlus } from "react-icons/bs";
import { Tooltip } from "antd";

interface Props {
    handleCreate: () => void
}

const EmptyResultado = ({handleCreate} :Props) => {
    return (
        <Tooltip title="Nuevo Resultado Clave">
            <div className="w-full border border-dashed cursor-pointer" onClick={handleCreate}>
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-4xl">
                        <BsWindowPlus className="fill-devarana-graph"/>
                    </div>
                    <div className="text-devarana-graph">
                        Agregar Resultado Clave
                    </div>
                </div>
            </div>
        </Tooltip>
    );
}
 
export default EmptyResultado;