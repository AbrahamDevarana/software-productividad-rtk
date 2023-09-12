import { InitialState, Paginate, ResultadoClaveProps, UsuarioProps } from ".";


export interface CustomUsuarioProps extends UsuarioProps {
    scoreCard: {
        propietario:      boolean;
        progresoFinal:    number;
        progresoAsignado: number;
        progresoReal:     number;
        extra:            number;
        status:           'abierto' | 'cerrado' | 'cancelado' | 'retrasado'
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
    resultadosClave: ResultadoClaveProps[];
}



export interface OperativoState extends InitialState {
    operativos: OperativoProps[];
    proyectos:  OperativoProps[];
    paginate?:     Paginate;
    isLoadingObjetivo: boolean;
    currentOperativo: OperativoProps;
}
