import { objetivosType } from "@/types";
import { InitialState, Paginate, ResultadoClaveProps, UsuarioProps } from ".";


export interface CustomUsuarioProps extends UsuarioProps {
    scoreCard: {
        propietario:      boolean;
        progresoFinal:    number;
        progresoAsignado: number;
        progresoReal:     number;
        extra:            number;
        status:           objetivosType
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
    operativosResponsable: CustomUsuarioProps[];
    propietarioId:   string;
    resultadosClave: ResultadoClaveProps[];
    status:          'NUEVO' | 'POR_AUTORIZAR' | 'ABIERTO' | 'POR_APROBAR' | 'CERRADO';
    year:            number;
    quarter:         number;
}



export interface OperativoState extends InitialState {
    operativos: OperativoProps[];
    operativosUsuario: OperativoProps[];
    proyectos:  OperativoProps[];
    paginate?:     Paginate;
    isLoadingObjetivo: boolean;
    isLoadingOperativosUsuario: boolean;
    isClosingCicle: boolean;
    currentOperativo: OperativoProps;
}
