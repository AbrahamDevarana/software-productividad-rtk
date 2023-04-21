import { UsuarioProps,  } from "./usuario";
import { EstrategicoProps } from "./";
import { AreaProps } from '@/interfaces';

export interface TacticoProps {
    id:           string;
    nombre:       string;
    codigo:        string;
    meta:  string;
    indicador:  string;
    progreso:     number;
    fechaInicio:  Date;
    fechaFin:     Date;
    status:       number;
    tipoObjetivo: number;
    responsables:  UsuarioProps[];
    areas: AreaProps[]
    estrategico: EstrategicoProps;
    estrategicoId: string;
    propietario?: UsuarioProps
    propietarioId?: string


}

export interface TacticosState {
    tacticos: TacticoProps[];
    tacticos_core: TacticoProps[];
    isLoading:    boolean;
    error:        boolean;
    infoMessage:  string;
    updated:      boolean;
    created:      boolean;
    deleted:      boolean;
    currentTactico: TacticoProps;
    
    
}
