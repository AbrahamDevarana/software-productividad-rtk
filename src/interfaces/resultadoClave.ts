

import { AccionesProps, InitialState, Paginate } from ".";




export interface ResultadoClaveProps {
    id: string
    nombre: string
    tipoProgreso: string
    progreso?: number
    fechaInicio: string | Date
    fechaFin: string | Date
    operativoId: string
    propietarioId: string
    acciones: AccionesProps[]
}



export interface ResultadoClaveState extends InitialState{
    resultadosClave: ResultadoClaveProps[];
    isLoadingResultado: boolean;
    paginate?:     Paginate;
    currentResultadoClave: ResultadoClaveProps;
}
