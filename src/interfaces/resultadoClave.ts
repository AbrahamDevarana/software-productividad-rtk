

import { AccionesProps, InitialState, Paginate, SinglePerfilProps, UsuarioProps } from ".";




export interface ResultadoClaveProps {
    id: string
    nombre: string
    tipoProgreso: string
    progreso?: number
    fechaInicio: string | Date
    fechaFin: string | Date
    operativoId: string
    propietarioId: string
    propietario: SinglePerfilProps
    acciones: AccionesProps[]
}



export interface ResultadoClaveState extends InitialState{
    resultadosClave: ResultadoClaveProps[];
    isLoadingResultado: boolean;
    paginate?:     Paginate;
    currentResultadoClave: ResultadoClaveProps;
}