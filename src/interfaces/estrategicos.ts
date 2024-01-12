
import { PerspectivaProps, Paginate, UsuarioProps, TacticoProps } from '@/interfaces';
import { statusType } from '@/types';
import { ComentarioProps } from './comentarios';


export interface EstrategicosState {
    estrategicos: EstrategicoProps[];
    estrategicosTacticos: EstrategicoProps[];
    isLoading:    boolean;
    isLoadingCurrent: boolean;
    isLoadingEstrategicosByArea: boolean;
    isLoadingProgress: boolean;
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
    year: number;
    status: statusType;
    tipoProgreso: 'MANUAL' | 'PROMEDIO'
    indicador: string;
    perspectivaId: string;
    perspectivas: PerspectivaProps;
    responsables: UsuarioProps[];
    tacticos?: TacticoProps[];
    propietarioId?: string
    propietario?: UsuarioProps;
    comentarios: ComentarioProps[];
    suggest: number;
}



