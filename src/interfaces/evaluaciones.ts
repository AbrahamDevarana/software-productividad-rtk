import { SinglePerfilProps } from "./perfil";

export interface EvaluacionesProps {

    id: string;
    evaluadorId: string;
    evaluadoId: string;
    evaluacionId: string;
    year: number;
    quarter: number;
    respuestaUsuario: any[]
    usuarioEvaluador: SinglePerfilProps;
}