import { Paginate } from "./slice";

export interface UsuariosState {
    usuarios: Usuario[];
    paginate: Paginate;
    isLoading: boolean;
    error: boolean;
    infoMessage: string;
    updated: boolean;
    created: boolean;
    deleted: boolean;
    currentUsuario: Usuario;
}

export interface Usuario {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreCorto: string;
    iniciales: string;
    email: string;
    password: string;
    status: boolean;
    fechaNacimiento: Date;
    fechaIngreso: Date;
    telefono: string;
    descripcionPerfil: string;
    areaId: number;
    leaderId: number;
}