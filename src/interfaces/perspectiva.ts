import { Estrategico } from "./estrategicos";

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
    color: string;
    status?: number;
    icono?: string; 
    objetivo_estr?: Estrategico[];
}

