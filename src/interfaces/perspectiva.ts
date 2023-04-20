import { EstrategicoProps } from "./estrategicos";
import { IconName } from '../components/Icon';

export interface PerspectivasState {
    perspectivas: PerspectivaProps[];
    isLoading: boolean;
    error: boolean;
    infoMessage: string;
    updated: boolean;
    created: boolean;
    deleted: boolean;
    currentPerspectiva: PerspectivaProps;
}

export interface PerspectivaProps {
    id: string;
    nombre: string;
    descripcion?: string;
    progreso: number;
    color?: string;
    status: number;
    icono?: IconName; 
    fechaInicio?: Date;
    fechaFin?: Date;
    clave?: string;
    objetivos_estrategicos?: EstrategicoProps[];
}

