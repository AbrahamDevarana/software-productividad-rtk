// helpers/getColor y helpers/getStatus dependen de statusTypes
export const statusTypes = {
    SIN_INICIAR: 'Sin Iniciar',
    FINALIZADO: 'Finalizado',
    EN_TIEMPO: 'En tiempo',
    CANCELADO: 'Cancelado',
    EN_PAUSA: 'En Pausa',
    RETRASADO: 'Retrasado',
    abierto: 'Abierto',
    cerrado: 'Cerrado',
    cancelado: 'Cancelado',
    retrasado: 'Retrasado',
}

export type statusType = keyof typeof statusTypes


export const uploadUrl = Object.freeze({
    'PROYECTO': 'proyecto',
    'USUARIO': 'usuario',
})
