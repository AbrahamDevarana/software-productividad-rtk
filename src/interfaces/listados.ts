export interface ListadoProps {
    id: string;
    titulo: string;
    descripcion?: string;
    fechaInicio?: Date;
    fechaFin?: Date;
    comiteId: string;
    color?: string;
    status?: 'SIN_INICIAR' | 'EN_PROCESO' | 'FINALIZADO' | 'CANCELADO' | 'DETENIDO' | 'RETRASADO';
    createdAt?: Date;
    updatedAt?: Date;
}