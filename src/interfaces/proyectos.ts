import { HitosProps, InitialState, Paginate, UsuarioProps } from ".";


export interface ProyectosProps {
    id: string;
    titulo: string;
    descripcion: string;
    icono: string;
    imagen: string;
    participantesIds: string[];
    usuariosProyecto: UsuarioProps[];
    proyectosHito: HitosProps[];
    fechaInicio: Date;
    fechaFin: Date;
    status: number;
}


export interface ProyectosState extends InitialState{
    proyectos: ProyectosProps[];
    // paginate?:     Paginate;
    isLoadingProyecto: boolean;
    errorProyecto: boolean;
    currentProyecto: ProyectosProps;
}
