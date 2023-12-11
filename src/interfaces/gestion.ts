import { SinglePerfilProps } from "./perfil";
import { InitialState } from "./slice";


export interface UsuarioGestion extends SinglePerfilProps {

    rendimiento: {
        countObjetivos: number
        resultadoCompetencias: number
        resultadoObjetivos: number
        resultadoFinal: number
        bono: number
        status: 'ABIERTO' | 'CERRADO'
    }

}

export interface GestionObjetivo {
    id: number
    year: number
    quarter: number
    periodoDefinicionInicio: string
    periodoDefinicionFin: string
    ejecucionInicio: string
    ejecucionFin: string
    revisionIntermediaInicio: string
    revisionIntermediaFin: string
    cierreObjetivosInicio: string
    cierreObjetivosFin: string
    cierreEvaluacionCompetenciasInicio: string
    cierreEvaluacionCompetenciasFin: string


}


export interface GestionState extends InitialState{
    isLoadingUsuarios: boolean
    usuarios: UsuarioGestion[]
    isGeneratingReport: boolean

}