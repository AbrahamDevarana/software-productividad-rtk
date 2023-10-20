import { useMemo } from "react"
import {  EvaluacionResultadosProps } from '@/interfaces'

interface Props {
    evaluacionResultados: EvaluacionResultadosProps[]
    evaluacionResultadosColaboradores: EvaluacionResultadosProps[]
    ponderacionObjetivos: number
}

export const usePonderaciones = ({evaluacionResultados, evaluacionResultadosColaboradores, ponderacionObjetivos}: Props) => {

	const resultadoMisEvaluaciones = useMemo(() => {
		return evaluacionResultados.map(evaluacion => {
		 	return {
				evaluador: evaluacion.evaluador.nombre + ' ' + evaluacion.evaluador.apellidoPaterno,
				resultado: ( evaluacion.evaluacion_respuesta.reduce((acc, respuesta) => acc + respuesta.resultado, 0)) / evaluacion.evaluacion_respuesta.length || 0,
				status: evaluacion.evaluacion_respuesta.length > 0 ? evaluacion.evaluacion_respuesta?.every(respuesta => respuesta.status === true) : false
				
			}
		})
	}, [evaluacionResultados])

	const resultadoMisEvaluados = useMemo(() => {
		return evaluacionResultadosColaboradores.map(evaluacion => {
		 	return {
				evaluado: evaluacion.evaluado.nombre + ' ' + evaluacion.evaluado.apellidoPaterno,
				resultado: ( evaluacion.evaluacion_respuesta.reduce((acc, respuesta) => acc + respuesta.resultado, 0)) / evaluacion.evaluacion_respuesta.length || 0,
				status: evaluacion.evaluacion_respuesta.length > 0 ? evaluacion.evaluacion_respuesta?.every(respuesta => respuesta.status === true) : false
			}
		})
	}, [evaluacionResultados])

	const promedioOjetivos = useMemo(() => {
		// 100 es a 90% como promedio es a x
		const total = (ponderacionObjetivos * 90) / 100
		return total
	}, [ponderacionObjetivos])

	const promedioEvaluaciones = useMemo(() => {
		return resultadoMisEvaluaciones.reduce((acc, evaluacion) => acc + evaluacion.resultado, 0) / resultadoMisEvaluaciones.length || 0
	}, [resultadoMisEvaluaciones])

	const ponderacionEvaluciones = useMemo(() => {
		// 5 es a 100 como promedioEvaluaciones es a x
		return  (promedioEvaluaciones * 100) / 5
	}, [promedioEvaluaciones])

	const finalEvaluaciones = useMemo(() => {
		return (ponderacionEvaluciones * 10) / 100
	}, [ponderacionEvaluciones])


    return {
        resultadoMisEvaluaciones,
        resultadoMisEvaluados,
        promedioOjetivos,
        promedioEvaluaciones,
        ponderacionEvaluciones,
        finalEvaluaciones

    }
}