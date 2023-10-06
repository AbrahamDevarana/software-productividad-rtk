import { OperativoProps } from "@/interfaces"
import { useAppSelector } from "@/redux/hooks"
import { useMemo } from "react"

interface Props {
    objetivo: OperativoProps
}

export const useOperativo = ({objetivo}: Props) => {

    const { userAuth } = useAppSelector(state => state.auth)

    

    const { progresoAsignado, progresoReal } = objetivo.operativosResponsable.find(responsable => responsable?.id === userAuth?.id)?.scoreCard || { progresoAsignado: 0, progresoReal: 0 }
    const fixedProgresoReal = useMemo(() => Number(progresoReal.toFixed(2)), [progresoReal])

    const {firstColor, secondColor} = useMemo(() => { 
        
        const esAutor = objetivo.operativosResponsable.filter((item) => item.scoreCard.propietario === true).map((item) => item.id).includes(userAuth?.id!)

        if(esAutor) {
            return {
                firstColor: 'rgba(9, 103, 201, 1)',
                secondColor: 'rgba(9, 103, 201, .5)'
            }
        }

        return {
            firstColor: 'rgba(229, 17, 65, 1)',
            secondColor: 'rgba(229, 17, 65, .5)'
        }

    }, [userAuth?.id])

    const resultadoClaveDoneCount = useMemo(() => {
        let total = 0
        objetivo.resultadosClave.forEach(resultado => {
            resultado.progreso === 100 && total++
        })
        return total
    }, [objetivo])

    const orderedResponsables = useMemo(() => {
        const responsables = objetivo.operativosResponsable
        // poner primero al responsable.propietario === true
        const responsablePropietario = responsables.find(responsable => responsable.scoreCard.propietario === true)
        const responsablesSinPropietario = responsables.filter(responsable => responsable.scoreCard.propietario === false)
        return [responsablePropietario, ...responsablesSinPropietario]
    }, [objetivo.operativosResponsable])

    const statusObjetivo = useMemo(() => {
        const miScoreCard = objetivo.operativosResponsable.find(responsable => responsable.id === userAuth?.id)?.scoreCard || { progresoAsignado: 0, progresoReal: 0, status: 'ABIERTO' }
        return miScoreCard.status
    }, [objetivo])

    const usuarioPropietaro = useMemo(() => {
        const usuario = objetivo.operativosResponsable.find(responsable => responsable.scoreCard.propietario === true)
        return usuario
    }, [objetivo])

    const taskCount = useMemo(() => {
        let total = 0
        objetivo.resultadosClave.forEach(resultado => {
            total += resultado.task.length
        })
        return total
    }, [objetivo])

    const taskCountDone = useMemo(() => {
        let total = 0
        objetivo.resultadosClave.forEach(resultado => {
            resultado.task.forEach(task => {
                task.status === 'FINALIZADO' && total++
            })
        })
        return total
    }, [objetivo])

    
    return {
        progresoAsignado,
        progresoReal,
        fixedProgresoReal,
        firstColor,
        secondColor,
        resultadoClaveDoneCount,
        orderedResponsables,
        statusObjetivo,
        usuarioPropietaro,
        taskCount,
        taskCountDone
    }

}