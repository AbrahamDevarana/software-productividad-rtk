import { InitialState, Paginate, ResultadoClaveProps, UsuarioProps } from ".";


interface CustomUsuarioProps extends UsuarioProps {
    
    scoreCard?: {
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
    propietario_op?:  CustomUsuarioProps;
    responsables_op?: CustomUsuarioProps[];
    propietarioId:   string;
    participantesIds?:    string[];
    resultados_clave?: ResultadoClaveProps[];
}



export interface OperativoState extends InitialState{
    operativos: OperativoProps[];
    proyectos:  OperativoProps[];
    paginate?:     Paginate;
    isLoadingObjetivo: boolean;
    errorObjetivo: boolean;
    currentOperativo: OperativoProps;
}
