import { OperativoProps } from "@/interfaces"
import { useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"

interface Props {
    operativos: OperativoProps[]
    usuarioId: string
}


export const useOtherObjetivo = ({operativos, usuarioId}:Props) => {

        // HOOKS
        const ponderacionObjetivos = useMemo(() => {
            let total = 0
          
            operativos.forEach(operativo => {
                operativo.operativosResponsable?.map(responsable => {
                    if( responsable.id === usuarioId ) {
                        total += ((responsable.scoreCard?.progresoReal * responsable.scoreCard?.progresoAsignado) / 100)
                    }
                })
            })
            return total
            
        }, [operativos])
    
        const misObjetivosCount = useMemo(() => {
            let total = 0
            operativos.forEach(operativo => {
                operativo.operativosResponsable.find( responsable => responsable.id === usuarioId && responsable.scoreCard.propietario === true) && total++                
            })
            return total
        }, [operativos])
    
        const objetivosCompartidosCount = useMemo(() => {
            let total = 0
            operativos.forEach(operativo => {
                operativo.operativosResponsable.find( responsable => responsable.id === usuarioId && responsable.scoreCard.propietario === false) && total++
            })
            return total
        }, [operativos])
    
        const resultadosClaveCount = useMemo(() => {
            let total = 0
            operativos.forEach(operativo => {
                operativo.resultadosClave.length && (total += operativo.resultadosClave.length)
            })
            return total
        }, [operativos])
    
        const taskCount = useMemo(() => {
            let total = 0
            operativos.forEach(operativo => {
                operativo.resultadosClave.forEach(resultado => {                    
                    total += resultado.task?.length 
                })
            })
            return total
        }, [operativos])
    
        const misObjetivos = useMemo(() => {
            // buscar al objetivo operativo.operativosResponsable. propietario true
            const objetivos = operativos.filter( operativo => operativo.operativosResponsable.find( responsable => responsable.id === usuarioId && responsable.scoreCard.propietario === true))
            return objetivos
        }, [operativos])
    
        const objetivosCompartidos = useMemo(() => {
            const objetivos = operativos.filter( operativo => operativo.operativosResponsable.find( responsable => responsable.id === usuarioId && responsable.scoreCard.propietario === false))
            return objetivos
        }, [operativos])
    
        const scoreLeft = useMemo(() => {
        
            let score = 0
    
            operativos.map(operativo => {
                operativo.operativosResponsable.map(responsable => {      
                    score += (responsable.scoreCard.progresoAsignado)
                })
            })
            return score
        }, [operativos])


    return {
        ponderacionObjetivos,
        misObjetivosCount,
        objetivosCompartidosCount,
        resultadosClaveCount,
        taskCount,
        misObjetivos,
        objetivosCompartidos,
        scoreLeft
    }
}