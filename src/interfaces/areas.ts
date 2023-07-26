import { DepartamentoProps } from "./departamentos";
import { PerspectivaProps } from "./perspectiva";
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
    departamentos: DepartamentoProps[]
    perspectivas?: PerspectivaProps
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
