import { SinglePerfilProps } from "./perfil";

export interface TaskProps {
    id:            number;
    nombre:        string;
    descripcion:   string;
    prioridad:     string;
    propietarioId: string;
    fechaFin:      string;
    taskeableId:    string;
    progreso:      number;
    status:        'SIN_INICIAR' | 'EN_PROCESO' | 'FINALIZADO' | 'CANCELADO';
    propietario:   SinglePerfilProps;
}
