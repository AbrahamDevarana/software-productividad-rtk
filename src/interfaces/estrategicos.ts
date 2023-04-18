
import { Perspectiva, Paginate, UsuarioProps } from '@/interfaces';


export interface EstrategicosState {
    estrategicos: EstrategicoProps[];
    isLoading:    boolean;
    isLoadingCurrent: boolean;
    paginate:     Paginate;
    error:        boolean;
    infoMessage:  string;
    updated:      boolean;
    created:      boolean;
    deleted:      boolean;
    currentEstrategico: EstrategicoProps;
}

export interface EstrategicoProps {
    id: string;
    nombre: string;
    codigo: string;
    descripcion: string;
    progreso: number;
    fechaInicio: Date;
    fechaFin: Date;
    status: number;
    indicador: string;
    perspectivas?: Perspectiva[];
    responsables?: UsuarioProps[];
    tacticos_count?: number;
    propietarioId?: string
    propietario?: UsuarioProps;
}



