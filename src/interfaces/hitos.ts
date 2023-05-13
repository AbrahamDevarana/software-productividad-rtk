import { statusType } from "@/types";
import { InitialState } from "./slice";
import { TareasProps } from "./tareas";


export interface HitosProps {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    status: statusType;
    proyectoId: string;
    tareas: TareasProps[];
}


export interface HitosState extends InitialState {
    hitos: HitosProps[];
    currentHito: HitosProps;
    isLoadingCurrentHito: boolean;
}
