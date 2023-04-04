import { InitialState, Paginate, UsuarioProps } from ".";


interface CustomUsuarioProps extends UsuarioProps {
    pivot_op_user: {
        propietario:      number;
        progresoFinal:    number;
        progresoAsignado: number;
        progresoReal:     number;
    }
}


export interface OperativoProps {
    id:              string;
    nombre:          string;
    meta?:            string;
    indicador?:       string;
    tacticoId:       string;
    fechaInicio:     Date;
    fechaFin:        Date;
    createdAt?:       Date;
    updatedAt?:       Date;
    deletedAt?:       Date | null;
    propietario_op?:  CustomUsuarioProps[];
    responsables_op?: CustomUsuarioProps[];
}



export interface OperativoState extends InitialState{
    operativos: OperativoProps[];
    proyectos:  OperativoProps[];
    paginate?:     Paginate;
    currentOperativo: OperativoProps;
}
