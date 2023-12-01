import { InitialState } from "./slice";



export interface RoleProps {
    id:          number;
    nombre:      string;
    descripcion: string;
    status:      number;
}

export interface RolesState extends InitialState {
    roles: RoleProps[];
    currentRole: RoleProps;
    isLoadingCurrentRole: boolean;
}