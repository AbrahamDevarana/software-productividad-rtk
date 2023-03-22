

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
