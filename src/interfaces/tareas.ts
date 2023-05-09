import { InitialState } from "./slice";
import { UsuarioProps } from "./usuario";

export interface TareasProps {
    id: string;
    nombre: string;
    descripcion: string;
    status: number;
    fechaInicio: Date;
    fechaFin: Date;
    propietarioId: UsuarioProps;
    participantesIds: string[];
    participantes: UsuarioProps[];
}


export interface TareasState extends InitialState {
    tareas: TareasProps[];
    currentTarea: TareasProps;
    isLoadingCurrentTarea: boolean;
}
