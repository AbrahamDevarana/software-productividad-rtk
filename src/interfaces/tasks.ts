import { SinglePerfilProps } from "./perfil";

export interface TaskProps {
    id:            number;
    nombre:        string;
    descripcion:   string;
    prioridad:     string;
    propietarioId: string;
    fechaFin:      string;
    taskeableId:    string;
    status:        'SIN_INICIAR' | 'EN_PROCESO' | 'FINALIZADA' | 'CANCELADA';
    propietario:   SinglePerfilProps;
}
