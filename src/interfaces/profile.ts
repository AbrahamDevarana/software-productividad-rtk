export interface ProfileProps {
    isLoading:           boolean;
    updated:             boolean;
    errorMesssage:       string;
    id:                  number;
    name:                string;
    lastName:            string;
    secondLastName:      string;
    nick_name:           null;
    email:               string;
    short_name:          string;
    active:              number;
    birth_date:          Date;
    admission_date:      Date;
    phone:               string;
    profile_description: null;
    google_id:           string;
    slug:                string;
    social_facebook:     null;
    social_linkedin:     null;
    social_twitter:      null;
    social_instagram:    null;
    street:              null;
    suburb:              null;
    bachelor_degree:     null;
    birth_place:         null;
    picture:             string;
    rol_id:              number;
    position_id:         number;
    department_id:       number;
    town_id:             null;
    createdAt:           Date;
    updatedAt:           Date;
    deletedAt:           null;
    responsabilidades:   any[];
    position:            DepartmentProps;
    department:          DepartmentProps;
    town:                null;
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