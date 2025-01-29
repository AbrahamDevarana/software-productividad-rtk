import { OperativoProps, userAuthProps } from "@/interfaces"
import { useMemo } from "react"


interface Props {
    operativos?: OperativoProps[]
    userAuth?: userAuthProps
}

export const useOrderObjetivo = ({operativos, userAuth}:Props) => {

    if (!operativos || !Array.isArray(operativos) || !userAuth ) return {
        misObjetivos: [],
        objetivosCompartidos: []
    }

    const misObjetivos = useMemo(() => {

        if (!userAuth || !operativos) return []
        // buscar al objetivo operativo.operativosResponsable. propietario true
        const objetivos = operativos?.filter((operativo) =>
            operativo.operativosResponsable?.some(
                (responsable) =>
                    responsable.id === userAuth?.id &&
                    responsable.scoreCard?.propietario === true
            )
        );
        objetivos?.sort((a, b) => {
            const progresoA =
                a.operativosResponsable?.[0]?.scoreCard?.progresoAsignado || 0;
            const progresoB =
                b.operativosResponsable?.[0]?.scoreCard?.progresoAsignado || 0;
            return progresoB - progresoA;
        });

        return objetivos
    }, [operativos, userAuth])

    const objetivosCompartidos = useMemo(() => {
        if (!userAuth || ! operativos) return []
        const objetivos = operativos?.filter((operativo) =>
            operativo.operativosResponsable?.some(
                (responsable) =>
                    responsable.id === userAuth?.id &&
                    responsable.scoreCard?.propietario === false
            )
        );

        objetivos?.sort((a, b) => {
            const progresoA =
                a.operativosResponsable?.[0]?.scoreCard?.progresoAsignado || 0;
            const progresoB =
                b.operativosResponsable?.[0]?.scoreCard?.progresoAsignado || 0;
            return progresoB - progresoA;
        });
        return objetivos
    }, [operativos, userAuth])
        
    return {
        misObjetivos,
        objetivosCompartidos
    }
}