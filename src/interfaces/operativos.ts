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
    operativoPropietario:  CustomUsuarioProps;
    operativosResponsable: CustomUsuarioProps[];
    propietarioId:   string;
    participantesIds:    string[];
    resultadosClave: ResultadoClaveProps[];
}



export interface OperativoState extends InitialState {
    operativos: OperativoProps[];
    proyectos:  OperativoProps[];
    paginate?:     Paginate;
    isLoadingObjetivo: boolean;
    currentOperativo: OperativoProps;
}
