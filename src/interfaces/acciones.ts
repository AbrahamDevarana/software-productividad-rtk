import { statusType } from "@/types";
import { UsuarioProps } from "./usuario";

export interface AccionesProps {
    id: string;
    nombre: string;
    descripcion: string;
    status: statusType;
    fechaInicio: Date;
    fechaFin: Date;
    propietarioId: UsuarioProps;
}

export interface AccionesProyectosProps {
    id: string;
    nombre: string;
    descripcion: string;
    status: statusType;
    fechaInicio: Date;
    fechaFin: Date;
    propietarioId: UsuarioProps;
    hitoId: string;
}
