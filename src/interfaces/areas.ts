import { Paginate } from "./slice";

export interface AreaProps {
    id: number;
    nombre: string;
    parentId: number | null;
    slug: string;
}

export interface AreasState {
    areas: AreaProps[];
    paginate: Paginate;
    isLoading: boolean;
    error: boolean;
    infoMessage: string;
    currentArea: AreaProps;
    
    
}
