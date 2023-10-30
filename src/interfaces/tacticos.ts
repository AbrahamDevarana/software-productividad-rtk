import { UsuarioProps,  } from "./usuario";
import { ComentarioProps, EstrategicoProps, TrimestreProps } from "./";
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
    tipoObjetivo: number;
    responsables:  UsuarioProps[];
    areas: AreaProps[]
    estrategico: EstrategicoProps;
    estrategicoId: string;
    propietario?: UsuarioProps
    propietarioId?: string
    comentarios: ComentarioProps[];
}

export interface TacticosState {
    objetivosTacticos: TacticoProps[];
    isLoading:    boolean;
    isLoadingCurrent: boolean;
    error:        boolean;
    infoMessage:  string;
    currentTactico: TacticoProps;
    
    
}
