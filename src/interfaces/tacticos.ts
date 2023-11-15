import { UsuarioProps,  } from "./usuario";
import { ComentarioProps, CoreProps, EstrategicoProps, TrimestreProps } from "./";
import { AreaProps } from '@/interfaces';
import { statusType } from "@/types";

export interface TacticoProps {
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
    estrategico: EstrategicoProps;
    estrategicoId: string;
    propietario: UsuarioProps
    propietarioId?: string
    comentarios: ComentarioProps[];
    departamentoId: number;
    suggest: number;
}

export interface TacticosState {
    objetivosTacticos: TacticoProps[];
    objetivosCore: CoreProps[];
    isLoading:    boolean;
    isLoadingCore: boolean;
    isLoadingCurrent: boolean;
    isLoadingCurrentCore: boolean;
    isLoadingProgress: boolean;
    error:        boolean;
    infoMessage:  string;
    currentTactico: TacticoProps;
}
