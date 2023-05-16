import { OperativoProps, ProyectosProps } from "./";

export interface DepartamentoProps {
    id:        number;
    nombre:    string;
    areaId?:   number;
    leaderId:  string;
    status:    boolean;
    slug:      string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    area?:     DepartamentoProps;
    parentId?: null;
}

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
    status?:               boolean;
    departamentoId?:       number;
    leaderId?:             string;
    direccionId?:          number;
    departamento?:         DepartamentoProps;
    direccion?:            DireccionProps;
    objetivosOperativos: OperativoProps[];
    proyectos:     ProyectosProps[];
}
