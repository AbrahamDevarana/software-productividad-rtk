import { statusType } from "@/types";
import { HitosProps, InitialState, Paginate, SinglePerfilProps, UsuarioProps } from ".";


export interface ProyectosProps {
    id: string;
    titulo: string;
    descripcion: string;
    icono?: string;
    imagen?: string;
    participantes: SinglePerfilProps[];
    propietario: SinglePerfilProps;
    propietarioId: string;
    usuariosProyecto: SinglePerfilProps[];
    fechaInicio: Date;
    fechaFin: Date;
    categorias: any[];
    status: statusType;
}


export interface ProyectosState extends InitialState{
    proyectos: ProyectosProps[];
    isUpdating: boolean;
    isLoadingProyecto: boolean;
    errorProyecto: boolean;
    currentProyecto: ProyectosProps;
}
