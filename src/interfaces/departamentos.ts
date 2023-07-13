import { Paginate } from "./slice";
import { Lider, UsuarioProps } from "./usuario";

export interface DepartamentoState {
    departamentos: DepartamentoProps[];
    paginate: Paginate;
    isLoading: boolean;
    isLoadingCurrent: boolean;
    error: boolean;
    infoMessage: string;
    currentDepartamento: DepartamentoProps;
    lideres: Lider[];
}

export interface DepartamentoProps {
    id:        number;
    nombre:    string;
    leaderId:  string;
    status:    boolean;
    slug:      string;
    parentId?: null;
    area?:     DepartamentoProps;
    areaId?:   number;
    leader?:   Lider;
    usuarios: UsuarioProps[];
}