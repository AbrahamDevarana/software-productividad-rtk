// helpers/getColor y helpers/getStatus dependen de statusTypes
export const statusTypes = {
    SIN_INICIAR: 'Sin Iniciar',
    EN_TIEMPO: 'En tiempo',
    FINALIZADO: 'Finalizado',
    CANCELADO: 'Cancelado',
    EN_PAUSA: 'En Pausa',
    RETRASADO: 'Retrasado',
}

export type statusType = keyof typeof statusTypes


export const uploadUrl = Object.freeze({
    'PROYECTO': 'proyecto',
    'USUARIO': 'usuario',
})
