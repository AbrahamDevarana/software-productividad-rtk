import { Estrategico } from "./estrategicos";
import { IconName } from '../components/Icon';

export interface PerspectivasState {
    perspectivas: Perspectiva[];
    isLoading: boolean;
    error: boolean;
    infoMessage: string;
    updated: boolean;
    created: boolean;
    deleted: boolean;
    currentPerspectiva: Perspectiva;
}

export interface Perspectiva {
    id: number;
    nombre: string;
    descripcion: string;
    progreso: number;
    color: string;
    status: number;
    icono?: IconName; 
    fechaInicio?: Date;
    fechaFin?: Date;
    clave?: string;
    objetivo_estr?: Estrategico[];
}

