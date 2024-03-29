import { EstrategicoProps } from "./estrategicos";
import { IconName } from '../components/Icon';
import { statusType } from "@/types";

export interface PerspectivasState {
    perspectivas: PerspectivaProps[];
    isLoading: boolean;
    error: boolean;
    infoMessage: string;
    currentPerspectiva: PerspectivaProps;
}

export interface PerspectivaProps {
    id: string;
    nombre: string;
    progreso: number;
    descripcion?: string;
    color?: string;
    status: statusType;
    icono?: IconName; 
    fechaInicio?: Date;
    propietarioId?: string;
    fechaFin?: Date;
    clave?: string;
    objetivosEstrategicos: EstrategicoProps[];
}

