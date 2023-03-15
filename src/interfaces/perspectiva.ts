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
}

export type TableDataType = {
    key: React.Key;
    tareas: string;
    status: number;
    progreso: number
    fechaEntrega: string;
    objetivo: string;
    responsables: {
        picture: string;
    }[]
};