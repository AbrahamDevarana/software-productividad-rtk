import { SinglePerfilProps } from "./perfil";

export interface TaskProps {
    id:            number;
    nombre:        string;
    descripcion:   string;
    prioridad:     'ALTA' | 'MEDIA' | 'BAJA' | 'CRÍTICA';
    propietarioId: string;
    fechaFin:      string;
    taskeableType: 'RESULTADO_CLAVE' | 'HITO'
    taskeableId:    string;
    progreso:      number;
    status:        'SIN_INICIAR' | 'EN_PROCESO' | 'FINALIZADO' | 'CANCELADO' | 'DETENIDO' | 'RETRASADO';
    coResponsables: SinglePerfilProps[];
    created?:     string;
    propietario:   SinglePerfilProps;
}
