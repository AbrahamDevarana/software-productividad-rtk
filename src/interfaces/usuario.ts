import { DepartamentoProps } from "./departamentos";
import { PermisoProps } from "./permisos";
import { Paginate } from "./slice";

export interface UsuariosState {
    usuarios: UsuarioProps[];
    paginate: Paginate;
    isLoading: boolean;
    isLoadingCurrentUsuario: boolean;
    error: boolean;
    infoMessage: string;
    currentUsuario: UsuarioProps;
}

export interface UsuarioProps {
    id: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    nombreCorto?: string;
    slug?: string;
    iniciales: string;
    email: string;
    password?: string;
    status?: boolean;
    fechaNacimiento?: Date | string;
    fechaIngreso?: Date | string;
    telefono?: string;
    foto?: string;
    descripcionPerfil?: string;
    departamentoId?: number;
    leaderId?: number | null ;
    direccion?: Direccion;
    departamentos: DepartamentoProps[];
    puesto?: string;
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


export interface Lider {
    id: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
}

export interface userAuthProps{
    id: string;
    nombre: string;
    email: string;
    iniciales: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    foto?: string;
    rol: {
        nombre: string;
    }
}