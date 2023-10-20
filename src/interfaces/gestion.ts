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


export interface GestionState extends InitialState{
    isLoadingUsuarios: boolean
    usuarios: UsuarioGestion[]
    isGeneratingReport: boolean

}