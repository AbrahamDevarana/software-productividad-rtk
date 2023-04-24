import { AccionesProps } from "./acciones";


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