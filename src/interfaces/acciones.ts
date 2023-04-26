import { UsuarioProps } from "./usuario";

export interface AccionesProps {
    id: string;
    nombre: string;
    descripcion: string;
    status: number;
    fechaInicio: Date;
    fechaFin: Date;
    propietarioId: UsuarioProps;
}