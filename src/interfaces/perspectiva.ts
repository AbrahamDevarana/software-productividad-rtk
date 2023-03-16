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
}

export type TableDataType = {
    key: React.Key;
    nombre: string;
    status: number;
    progreso: number
    fechaInicio: string;
    fechaFin: string;
    clave: string;
    responsables: {
        picture: string;
    }[]
};