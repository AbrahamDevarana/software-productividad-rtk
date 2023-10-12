import { SinglePerfilProps } from "./perfil";
import { InitialState } from "./slice";


export interface UsuarioGestion extends SinglePerfilProps {

    rendimiento: [{
        resultadoCompetencias: number
        resultadoObjetivos: number
        resultadoFinal: number
        status: 'ABIERTO' | 'CERRADO'
    }]

}


export interface GestionState extends InitialState{
    isLoadingUsuarios: boolean
    usuarios: UsuarioGestion[]

}