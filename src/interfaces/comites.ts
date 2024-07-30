import { statusType, TaskStatusType } from "@/types";
import { SinglePerfilProps } from ".";


export interface ComitesProps {
    id: string;
    titulo: string;
    descripcion: string;
    icono?: string;
    imagen?: string;
    participantes: SinglePerfilProps[];
    propietario: SinglePerfilProps;
    propietarioId: string;
    usuariosComite: SinglePerfilProps[];
    fechaInicio: Date;
    fechaFin: Date;
    status: TaskStatusType;
}