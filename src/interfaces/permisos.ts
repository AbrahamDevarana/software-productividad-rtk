

export interface PermisosState {
    permisos: PermisoProps[],
    isLoadingPermisos: boolean,
    error: boolean,
    infoMessage: string
}

export interface PermisoProps {
    id: number,
    nombre: string,
    permisos: string,
}