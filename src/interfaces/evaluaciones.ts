import { SinglePerfilProps } from "./perfil";

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