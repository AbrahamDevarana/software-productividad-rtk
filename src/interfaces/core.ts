import { UsuarioProps,  } from "./usuario";
import { ComentarioProps } from "./";
import { AreaProps } from '@/interfaces';
import { statusType } from "@/types";

export interface CoreProps {
    id:           string;
    nombre:       string;
    codigo:        string;
    meta:  string;
    indicador:  string;
    progreso:     number;
    fechaInicio:  Date;
    fechaFin:     Date;
    status:       statusType;
    tipoObjetivo: 'ESTRATEGICO' | 'CORE' ;
    tipoProgreso: 'MANUAL' | 'PROMEDIO'
    responsables:  UsuarioProps[];
    areas: AreaProps[]
    propietario: UsuarioProps
    propietarioId?: string
    departamentoId: number;
    comentarios: ComentarioProps[];
    suggest: number;
}

export interface CoreState {
    objetivosCore: CoreProps[];
    isLoading:    boolean;
    isLoadingCurrent: boolean;
    error:        boolean;
    infoMessage:  string;
    currentCore: CoreProps;
}
