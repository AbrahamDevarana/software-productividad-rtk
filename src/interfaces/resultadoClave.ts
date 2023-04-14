

import { InitialState, Paginate } from ".";




export interface ResultadoClaveProps {
    id?: string
    nombre: string
    tipoProgreso: string
    progreso?: number
    fechaInicio?: string | Date
    fechaFin?: string | Date
    operativoId: string
    propietarioId: string
}



export interface ResultadoClaveState extends InitialState{
    resultadosClave: ResultadoClaveProps[];
    paginate?:     Paginate;
    currentResultadoClave: ResultadoClaveProps;
}
