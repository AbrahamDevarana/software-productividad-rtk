export const statusItems = [
    {
        label: (
            <div className="px-3 bg-current rounded-sm bg-gradient-to-r from-devarana-dark-graph to-devarana-graph text-center">
                <p className="text-white">Sin Iniciar</p>
            </div>),
        value: 'SIN_INICIAR'
    },
    {
        label: (
            <div className="px-3 bg-current rounded-sm bg-gradient-to-r from-primary to-primary-light text-center">
                <p className="text-white">En Proceso</p>
            </div>),
        value: 'EN_PROCESO'
    },
    {
        label: (
            <div className="px-3 bg-current rounded-sm bg-gradient-to-r from-success to-success-light text-center">
                <p className="text-white">Finalizado</p>
            </div>),
        value: 'FINALIZADO'
    },
    {
        label: (
            <div className="px-3 bg-current rounded-sm bg-gradient-to-r from-error to-error-light text-center">
                <p className="text-white">Cancelado</p>
            </div>),
        value: 'CANCELADO'
    },
    {
        label: (
            <div className="px-3 bg-current rounded-sm bg-gradient-to-r from-warning to-warning-light text-center">
                <p className="text-white">Detenido</p>
            </div>),
        value: 'DETENIDO'
    },
    {
        label: (
            <div className="px-3 bg-current rounded-sm bg-gradient-to-r from-info to-info-light text-center">
                <p className="text-white">Retrasado</p>
            </div>),
        value: 'RETRASADO'
    }
]