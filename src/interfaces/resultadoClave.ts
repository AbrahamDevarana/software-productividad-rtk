

import { InitialState, OperativoProps, Paginate, UsuarioProps } from ".";




export interface ResultadoClaveProps {
    id?: string
    nombre: string
    tipoProgreso: string
    progreso?: number
    fechaInicio?: string | Date
    fechaFin?: string | Date
    operativoId: string
    // propietarioId: string
}



export interface ResultadoClaveState extends InitialState{
    operativos: OperativoProps[];
    paginate?:     Paginate;
    currentResultadoClave: ResultadoClaveProps;
}
