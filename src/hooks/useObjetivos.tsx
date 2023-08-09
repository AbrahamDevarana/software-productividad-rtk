import { OperativoProps } from "@/interfaces"
import { useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"

interface Props {
    operativos: OperativoProps[]
}


export const useObjetivo = ({operativos}:Props) => {

        const { userAuth } = useAppSelector(state => state.auth)
        // HOOKS
        const ponderacionObjetivos = useMemo(() => {
            let total = 0
          
            operativos.forEach(operativo => {
                operativo.operativosResponsable?.map(responsable => {
                    if( responsable.id === userAuth?.id ) {
                        total += ((responsable.scoreCard?.progresoReal * responsable.scoreCard?.progresoAsignado) / 100) * .90
                    }
                })
            })
            return total
            
        }, [operativos])
    
        const misObjetivosCount = useMemo(() => {
            let total = 0
            operativos.forEach(operativo => {
                operativo.propietarioId === userAuth?.id && total++
            })
            return total
        }, [operativos])
    
        const objetivosCompartidosCount = useMemo(() => {
            let total = 0
            operativos.forEach(operativo => {
                operativo.propietarioId !== userAuth?.id && total++
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
    
        const accionesCount = useMemo(() => {
            let total = 0
            operativos.forEach(operativo => {
                operativo.resultadosClave.forEach(resultado => {
                    total += resultado.acciones?.length 
                })
            })
            return total
        }, [operativos])
    
        const misObjetivos = useMemo(() => {
            const objetivos = operativos.filter(operativo => operativo.propietarioId === userAuth?.id)
            return objetivos
        }, [operativos])
    
        const objetivosCompartidos = useMemo(() => {
            const objetivos = operativos.filter(operativo => operativo.propietarioId !== userAuth?.id)
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
        accionesCount,
        misObjetivos,
        objetivosCompartidos,
        scoreLeft
    }
}