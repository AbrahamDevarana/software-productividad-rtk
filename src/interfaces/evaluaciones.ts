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
    isLoadingResultadosLider: boolean;
    evaluaciones: EvaluacionesProps[];
    evaluacion: EvaluacionesProps;
    evaluacionColaborador: SinglePerfilProps[];
    evaluacionLider: SinglePerfilProps;
    evaluacionPropia: SinglePerfilProps;
    evaluacionResultados: EvaluacionResultadosProps[];
    evaluacionResultadosColaboradores: EvaluacionResultadosProps[];
    resultados: number;
}

export interface EvaluacionResultadosProps {
    id:                   number;
    evaluadorId:          string;
    evaluadoId:           string;
    evaluacionId:         number;
    status:               boolean;
    year:                 number;
    quarter:              number;
    evaluador:            SinglePerfilProps;
    evaluado:             SinglePerfilProps;
    evaluacion_respuesta: EvaluacionRespuestaProps[];
}

export interface EvaluacionRespuestaProps {
    id:                   number;
    resultado:            number;
    comentario:           string;
    status:               boolean;
    evaluacionId:         number;
    evaluacionPreguntaId: number;
    evaluacionUsuarioId:  number;
}
