import { SinglePerfilProps } from "./perfil";

export interface TaskProps {
    id:            number;
    nombre:        string;
    descripcion:   string;
    prioridad:     string;
    propietarioId: string;
    fechaFin:      string;
    taskeableType: 'RESULTADO_CLAVE' | 'HITO'
    taskeableId:    string;
    progreso:      number;
    status:        'SIN_INICIAR' | 'EN_PROCESO' | 'FINALIZADO' | 'CANCELADO';
    createdAt?:     string;
    propietario:   SinglePerfilProps;
}
