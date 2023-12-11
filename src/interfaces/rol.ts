import { PermisoProps } from "./permisos";
import { InitialState } from "./slice";



export interface RoleProps {
    id:          number;
    nombre:      string;
    descripcion: string;
    status:      number;
}

export interface RoleWithPermisosProps {
    id:          number;
    nombre:      string;
    descripcion: string;
    status:      number;
    permisos:    PermisoProps[];
}

export interface RolesState extends InitialState {
    roles: RoleProps[];
    currentRole: RoleWithPermisosProps;
    isLoadingCurrentRole: boolean;
}