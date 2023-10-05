import { Rendimiento } from "./rendimiento";
import { InitialState } from "./slice";


export interface Ranking {
    id: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    iniciales: string;
    email: string;
    foto: string;
    slug: string;
    leaderId: string;
    rendimiento: Rendimiento[];
}


export interface RankingState extends InitialState {
    rankingUsuarios: Ranking[];
}