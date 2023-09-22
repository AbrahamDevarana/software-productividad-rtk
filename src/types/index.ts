// helpers/getColor y helpers/getStatus dependen de statusTypes
export const statusTypes = {
    SIN_INICIAR: 'Sin Iniciar',
    FINALIZADO: 'Finalizado',
    EN_TIEMPO: 'En tiempo',
    CANCELADO: 'Cancelado',
    EN_PAUSA: 'En Pausa',
    RETRASADO: 'Retrasado',
}

export type statusType = keyof typeof statusTypes


export const uploadUrl = Object.freeze({
    'PROYECTO': 'proyecto',
    'USUARIO': 'usuario',
})


export const objetivosTypes = {
    ABIERTO: 'Abierto', // Cuando se crea un objetivo dentro del periodo
    PENDIENTE_APROBACION: 'Pendiente de Aprobación', // Cuando se crea un objetivo y se envia a aprobacion
    APROBADO: 'Aprobado', // Cuando se aprueba un objetivo
    SIN_APROBAR: 'Sin Aprobar', // Cuando se rechaza un objetivo
    CANCELADO: 'Cancelado', // Cuando se cancela un objetivo
    FINALIZADO: 'Finalizado', // Cuando se finaliza un objetivo
}

export type objetivosType = keyof typeof objetivosTypes