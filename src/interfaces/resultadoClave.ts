

import { AccionesProps, InitialState, Paginate, SinglePerfilProps, UsuarioProps } from ".";
import { TaskProps } from "./tasks";




export interface ResultadoClaveProps {
    id: string
    nombre: string
    tipoProgreso: string
    progreso: number
    fechaInicio: string | Date
    fechaFin: string | Date
    operativoId: string
    propietarioId: string
    propietario: SinglePerfilProps
    acciones: AccionesProps[]
    task: TaskProps[]
    color: string
}



export interface ResultadoClaveState extends InitialState{
    resultadosClave: ResultadoClaveProps[];
    isLoadingResultado: boolean;
    isCreatingResultado: boolean;
    isCreatedResultado: boolean;
    paginate?:     Paginate;
    currentResultadoClave: ResultadoClaveProps;
}
