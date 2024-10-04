import { getColor } from "./getColor";



export const calcularEtapaActual = ({periodos, status}: any) => {

	
    if (!periodos) {
      return {
        etapaActual: "Sin Iniciar",
        color: getColor('SIN_INICIAR').color,
		isCierreObjetivos: false,
		isClosed: false
      }
    }

	if (status === 'CERRADO') {
		return {
			etapaActual: "Período Cerrado",
			color: getColor('FINALIZADO').color,
			isCierreObjetivos: false,
			isClosed: true
		}
	}

    
    const currentDate = new Date();
    const periodoDefinicionInicio = new Date(periodos.periodoDefinicionInicio);
    const periodoDefinicionFin = new Date(periodos.periodoDefinicionFin);
    const ejecucionInicio = new Date(periodos.ejecucionInicio);
    const ejecucionFin = new Date(periodos.ejecucionFin);
    const revisionIntermediaInicio = new Date(periodos.revisionIntermediaInicio);
    const revisionIntermediaFin = new Date(periodos.revisionIntermediaFin);
    const cierreObjetivosInicio = new Date(periodos.cierreObjetivosInicio);
    const cierreObjetivosFin = new Date(periodos.cierreObjetivosFin);
    const cierreEvaluacionCompetenciasInicio = new Date(periodos.cierreEvaluacionCompetenciasInicio);
    const cierreEvaluacionCompetenciasFin = new Date(periodos.cierreEvaluacionCompetenciasFin);

    let etapaActual = '';
    let color = getColor('SIN_INICIAR').color;
	let isClosed = false;
	let isCierreObjetivos = false;
	

	if (currentDate >= ejecucionInicio && currentDate <= ejecucionFin) {
		etapaActual = "En Curso";
		color = getColor('EN_PROCESO').color;
	}
	// Si la fecha actual está entre el periodo de definición
	if (currentDate >= periodoDefinicionInicio && currentDate <= periodoDefinicionFin) {
		etapaActual = "Periodo de Definición";
		color = getColor('EN_TIEMPO').color;

	// Si la fecha actual está entre el periodo de ejecución
	} else if (currentDate >= revisionIntermediaInicio && currentDate <= revisionIntermediaFin) {
		etapaActual = "Revisión Intermedia";
		color = getColor('EN_PROCESO').color;
	
	// Si la fecha actual está entre el periodo de cierre de objetivos
	} else if (currentDate >= cierreObjetivosInicio && currentDate <= cierreObjetivosFin) {
		etapaActual = "Cierre de Período";
		color = getColor('RETRASADO').color;
		isCierreObjetivos = true;
	} else if (
		currentDate >= cierreEvaluacionCompetenciasInicio &&
		currentDate <= cierreEvaluacionCompetenciasFin
	) {
		etapaActual = "Cierre de Evaluación de Competencias";
		color = getColor('RETRASADO').color;

	}

    else if (currentDate > cierreEvaluacionCompetenciasFin || currentDate < periodoDefinicionInicio) {
		etapaActual = "Período Cerrado";
		color = getColor('FINALIZADO').color;
		isClosed = true;
    }
  

    return { etapaActual, color, isClosed, isCierreObjetivos}

};