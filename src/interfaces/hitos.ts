import { statusType } from "@/types";
import { InitialState } from "./slice";
import { TareasProps } from "./tareas";
import { TaskProps } from "./tasks";


export interface HitosProps {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    status: statusType;
    proyectoId: string;
    color: string;
    progreso: number;
    task: TaskProps[];
    createdAt?: Date;
}


export interface HitosState extends InitialState {
    hitos: HitosProps[];
    currentHito: HitosProps;
    isLoadingCurrentHito: boolean;
}
