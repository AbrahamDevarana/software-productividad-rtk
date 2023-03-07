export interface ProfileProps {
    isLoading:           boolean;
    updated:             boolean;
    errorMesssage:       string;
}

export interface DepartmentProps {
    id:          number;
    nombre:      string;
    descripcion: string;
    lider_id?:   number;
    slug:        string;
    area_id?:    number;
    createdAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
    estatus_id?: number;
}