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
    departamentoId: number | null;
    leaderId: number | null ;
    direccion: Direccion;
    departamento: Departamento;
}

export interface Direccion {
    id: number;
    calle: string;
    numeroExterior: string;
    numeroInterior: string;
    colonia: string;
    codigoPostal: string;
    ciudad: string;
    estado: string;
}

export interface Departamento {
    id: number | null;
    nombre: string;
    leaderId: number | null;
}

export interface Lider {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
}