
import { Perspectiva, Paginate, Usuario } from '@/interfaces';

export interface EstrategicoProps {
    id:           string;
    nombre:       string;
    clave:        string;
    descripcion:  string;
    progreso:     number;
    fechaInicio:  Date;
    fechaFin:     Date;
    status:       number;
    perspectivas: Perspectiva[];
}

export interface EstrategicosState {
    estrategicos: EstrategicoProps[];
    isLoading:    boolean;
    paginate:     Paginate;
    error:        boolean;
    infoMessage:  string;
    updated:      boolean;
    created:      boolean;
    deleted:      boolean;
    currentEstrategico: EstrategicoProps;
}

export interface Estrategico {
    id: string;
    nombre: string;
    clave: string;
    descripcion: string;
    progreso: number;
    fechaInicio: Date;
    fechaFin: Date;
    status: number;
    perspectivas?: Perspectiva[];
    responsables?: Usuario[];
}

