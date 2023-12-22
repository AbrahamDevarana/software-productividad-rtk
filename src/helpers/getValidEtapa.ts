
// type Etapa =  'PERIODO', 'EJECUCION', 'REVISION', 'CIERRE_OBJETIVOS', 'CIERRE_EVALUACION' : string;

interface Etapa {
    tipoPeriodo: 'DEFINICION' | 'REVISION' | 'CIERRE' | 'EVALUACION' | 'EN_CURSO' | 'CERRADO';
    etapa: any
}



export const verificarPeriodo = ({tipoPeriodo, etapa}: Etapa) => {    
    const currentDate = new Date();

    if (!etapa) {
        return false;
    }

    let periodoInicio, periodoFin;

    switch (tipoPeriodo) {
   
        case 'DEFINICION':
            periodoInicio = new Date(etapa.periodoDefinicionInicio);
            periodoFin = new Date(etapa.periodoDefinicionFin);
            break;
        case 'REVISION':
            periodoInicio = new Date(etapa.revisionIntermediaInicio);
            periodoFin = new Date(etapa.revisionIntermediaFin);
            break;
        case 'CIERRE':
            periodoInicio = new Date(etapa.cierreObjetivosInicio);
            periodoFin = new Date(etapa.cierreObjetivosFin);
            break;
        case 'EVALUACION':
            periodoInicio = new Date(etapa.cierreEvaluacionCompetenciasInicio);
            periodoFin = new Date(etapa.cierreEvaluacionCompetenciasFin);
            break;
        case 'EN_CURSO':
            periodoInicio = new Date(etapa.ejecucionInicio);
            periodoFin = new Date(etapa.ejecucionFin);
            break;
        case 'CERRADO':
            periodoInicio = new Date(etapa.ejecucionFin);
            periodoFin = new Date(etapa.ejecucionFin);
            break;
        default:
            periodoInicio = new Date(etapa.ejecucionInicio);
            periodoFin = new Date(etapa.ejecucionFin);
            break;
    }

    if (currentDate >= periodoInicio && currentDate <= periodoFin) {
        return false;
    } else {
        return true;
    }
}