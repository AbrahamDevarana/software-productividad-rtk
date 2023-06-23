import { DepartamentoProps, OperativoProps, ProyectosProps } from "./";



export interface DireccionProps {
    id:             number;
    calle:          null;
    numeroExterior: null;
    numeroInterior: null;
    colonia:        null;
    codigoPostal:   null;
    ciudad:         null;
    estado:         null;
}


export interface PerfilState{
    isLoading: boolean;
    error: unknown;
    perfil: PerfilProps;

}


export interface ConfiguracionUsuarioProps {
    usuarioId: string;
    notificacionesWeb: boolean;
    notificacionesEmail: boolean;
    notificacionesEmailDiario: boolean;
    notificacionesEmailSemanal: boolean;
    notificacionesEmailMensual: boolean;
    notificacionesEmailTrimestral: boolean;
    portadaPerfil: string;
}


export interface PerfilProps {
    id:                   string;
    nombre:               string;
    apellidoPaterno:      string;
    apellidoMaterno:      string;
    iniciales:            string;
    nombreCorto:          string;
    email:                string;
    foto:                 string;
    fechaNacimiento?:      string;
    fechaIngreso?:         string;
    telefono?:             number;
    puesto?:               string;
    descripcionPerfil?:    null;
    responsabilidades?:    string;
    status?:               boolean;
    departamentoId?:       number;
    leaderId?:             string;
    direccionId?:          number;
    departamento?:         DepartamentoProps;
    direccion?:            DireccionProps;
    objetivosOperativos: OperativoProps[];
    proyectos:     ProyectosProps[];
    social: Social,
    configuracion: ConfiguracionUsuarioProps;
}



export interface Social {
    facebook: Redes;
    otros: Redes;
    instagram: Redes;
    linkedin: Redes;
}

export interface Redes {
    url: string;
    nombre: string;
}