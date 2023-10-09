import { SinglePerfilProps } from "./perfil";
import { InitialState } from "./slice";

export interface EvaluacionesProps {

    id: string;
    nombre: string;
    descripcion: string;
    preguntasEvaluacion: PreguntasEvaluacionProps[];
    status: boolean;
}

export interface PreguntasEvaluacionProps {
    id: string;
    texto: string;
    descripcion: string;
}

export interface EvaluacionState extends InitialState {
    isLoadingEvaluacion: boolean;
    isLoadingResultados: boolean;
    evaluaciones: EvaluacionesProps[];
    evaluacion: EvaluacionesProps;
    evaluacionColaborador: EvaluacionesProps[];
    evaluacionLider: SinglePerfilProps;
    evaluacionPropia: SinglePerfilProps;
    resultados: number;
}
