import { statusType } from "@/types";
import { UsuarioProps } from "./usuario";
import { InitialState } from "./slice";

export interface AccionesProps {
    id: string;
    nombre: string;
    descripcion: string;
    status: statusType;
    fechaInicio: Date;
    fechaFin: Date;
    propietarioId: UsuarioProps;
    resultadoClaveId: string;
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


export interface AccionesState extends InitialState {
    acciones: AccionesProps[];
    currentAccion: AccionesProps;
    isLoadingCurrentAccion: boolean;
}
