

import { InitialState, Paginate, UsuarioProps } from ".";




export interface ResultadoClaveProps {

    resultados_clave?: [];
}



export interface ResultadoClaveState extends InitialState{
    operativos: ResultadoClaveProps[];
    proyectos:  ResultadoClaveProps[];
    paginate?:     Paginate;
    currentResultadoClave: ResultadoClaveProps;
}
