import { statusType } from "@/types";
import { HitosProps, InitialState, Paginate, UsuarioProps } from ".";


export interface ProyectosProps {
    id: string;
    titulo: string;
    descripcion: string;
    icono: string;
    imagen: string;
    participantes: UsuarioProps[];
    propietario: UsuarioProps;
    propietarioId: string;
    usuariosProyecto: UsuarioProps[];
    proyectosHito: HitosProps[];
    fechaInicio: Date;
    fechaFin: Date;
    status: statusType;
}


export interface ProyectosState extends InitialState{
    proyectos: ProyectosProps[];
    isUpdating: boolean;
    isLoadingProyecto: boolean;
    errorProyecto: boolean;
    currentProyecto: ProyectosProps;
}
