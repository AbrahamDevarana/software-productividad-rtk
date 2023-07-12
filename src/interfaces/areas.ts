import { Paginate } from "./slice";
import { UsuarioProps } from "./usuario";

export interface AreaProps {
    id: number;
    nombre: string;
    parentId: number | null;
    leaderId?: number
    slug: string;
    leader: UsuarioProps
    subAreas: AreaProps[]
}

export interface AreasState {
    areas: AreaProps[];
    paginate: Paginate;
    isLoading: boolean;
    isLoadingCurrent: boolean;
    error: boolean;
    infoMessage: string;
    currentArea: AreaProps;
    
    
}
