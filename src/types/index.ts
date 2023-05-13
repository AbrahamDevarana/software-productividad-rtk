// helpers/getColor y helpers/getStatus dependen de statusTypes
export const statusTypes = {
    SIN_INICIAR: 'Sin Iniciar',
    EN_PROGRESO: 'En Progreso',
    FINALIZADO: 'Finalizado',
    CANCELADO: 'Cancelado',
    DETENIDO: 'Detenido',
}

export type statusType = keyof typeof statusTypes


export const uploadUrl = Object.freeze({
    'PROYECTO': 'proyecto',
    'USUARIO': 'usuario',
})
