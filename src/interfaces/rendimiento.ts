
export interface Rendimiento {

    id: string;
    year: number;
    quarter: number;
    usuarioId: string;
    resultadoObjetivos: number;
    resultadoCompetencias: number;
    resultadoFinal: number;
    extra: number;
    status: 'ABIERTO' | 'CERRADO';
}