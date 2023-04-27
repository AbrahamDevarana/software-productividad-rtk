import { AccionesProps } from "./acciones";
import { InitialState } from "./slice";


export interface HitosProps {
    id: string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    status: number;
    proyectoId: string;
    hitos_acciones: AccionesProps[];
}


export interface HitosState extends InitialState {
    hitos: HitosProps[];
    currentHito: HitosProps;
    isLoadingCurrentHito: boolean;
}
