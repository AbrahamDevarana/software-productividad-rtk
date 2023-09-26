import { DepartamentoProps, EvaluacionesProps, OperativoProps, ProyectosProps } from "./";



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
    isLoadingEvaluation: boolean;
    isLoadingConfiguration: boolean;
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

export interface SinglePerfilProps {
    id:                   string;
    nombre:               string;
    apellidoPaterno:      string;
    apellidoMaterno:      string;
    iniciales:            string;
    nombreCorto:          string;
    email:                string;
    foto:                 string;
    leaderId?:              string;
    slug:                 string; 
}



export interface PerfilProps extends SinglePerfilProps {
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
    proyectos:     ProyectosProps[];
    social: Social,
    configuracion: ConfiguracionUsuarioProps;
    equipo: SinglePerfilProps[];
    colaboradores: SinglePerfilProps[];
    evaluaciones : {
        evaluacionColaborador: SinglePerfilProps[];
        evaluacionLider: SinglePerfilProps;
        evaluacionPropia: SinglePerfilProps;
        evaluacion: EvaluacionesProps
        resultados: number;
    }
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