import { UsuarioProps } from "./usuario";

export interface AccionesProps {
    id: string;
    nombre: string;
    descripcion: string;
    status: number;
    propietarioId: UsuarioProps;
}