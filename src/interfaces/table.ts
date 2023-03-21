export type TacticoType = {
    key: React.Key;
    nombre: string;
    progreso: number;
    status: number;
    fechaInicio: string;
    fechaFin: string;
}


export type PerspectivaType = {
    key: React.Key;
    nombre: string;
    status: number;
    progreso: number
    fechaInicio: string;
    fechaFin: string;
    clave: string;
    responsables: {
        picture: string;
    }[]
};