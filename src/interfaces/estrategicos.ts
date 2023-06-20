
import { PerspectivaProps, Paginate, UsuarioProps, TacticoProps } from '@/interfaces';
import { statusType } from '@/types';
import { ComentarioProps } from './comentarios';


export interface EstrategicosState {
    estrategicos: EstrategicoProps[];
    isLoading:    boolean;
    isLoadingCurrent: boolean;
    paginate:     Paginate;
    error:        boolean;
    infoMessage:  string;
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
    status: statusType;
    indicador: string;
    perspectivaId: string;
    perspectivas?: PerspectivaProps;
    responsables: UsuarioProps[];
    tacticos?: TacticoProps[];
    propietarioId?: string
    propietario?: UsuarioProps;
    comentarios?: ComentarioProps[];
}



