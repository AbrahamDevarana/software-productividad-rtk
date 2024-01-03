import { getColor } from "./getColor";

export const calcularEtapaActual = (objeto: any) => {
    if (!objeto) {
      return {
        etapaActual: "Sin Iniciar",
        color: getColor('SIN_INICIAR').color,
		isClosed: false
      }
    }

    
    const currentDate = new Date();
    const periodoDefinicionInicio = new Date(objeto.periodoDefinicionInicio);
    const periodoDefinicionFin = new Date(objeto.periodoDefinicionFin);
    const ejecucionInicio = new Date(objeto.ejecucionInicio);
    const ejecucionFin = new Date(objeto.ejecucionFin);
    const revisionIntermediaInicio = new Date(objeto.revisionIntermediaInicio);
    const revisionIntermediaFin = new Date(objeto.revisionIntermediaFin);
    const cierreObjetivosInicio = new Date(objeto.cierreObjetivosInicio);
    const cierreObjetivosFin = new Date(objeto.cierreObjetivosFin);
    const cierreEvaluacionCompetenciasInicio = new Date(objeto.cierreEvaluacionCompetenciasInicio);
    const cierreEvaluacionCompetenciasFin = new Date(objeto.cierreEvaluacionCompetenciasFin);

    let etapaActual = '';
    let color = getColor('SIN_INICIAR').color;
	let isClosed = false;
	

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
  

    return { etapaActual, color, isClosed };

};