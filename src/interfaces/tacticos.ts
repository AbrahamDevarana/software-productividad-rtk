import { UsuarioProps,  } from "./usuario";
import { AreaProps } from "./";

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
    objetivo_tact?: any
    propietario?: UsuarioProps
    propietarioId?: string


}

export interface TacticosState {
    tacticos: TacticoProps[];
    tacticos_core?: TacticoProps[];
    isLoading:    boolean;
    error:        boolean;
    infoMessage:  string;
    updated:      boolean;
    created:      boolean;
    deleted:      boolean;
    currentTactico: TacticoProps;
    
}
