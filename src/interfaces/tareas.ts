import { InitialState } from "./slice";
import { UsuarioProps } from "./usuario";

export interface TareasProps {
    id: string;
    nombre: string;
    descripcion: string;
    status: number;
    fechaInicio: Date;
    fechaFin: Date;
    hitoId: string;
    propietarioId: string;
    propietario: UsuarioProps;
    participantes: string[];
    usuariosTarea: UsuarioProps[];
}


export interface TareasState extends InitialState {
    tareas: TareasProps[];
    currentTarea: TareasProps;
    isLoadingCurrentTarea: boolean;
}
