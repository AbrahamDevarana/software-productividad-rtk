interface StatusProps {
    label: string;
    gradient: string;
    colorBase: string;
    colorLight: string;
}

interface StatusColors {
    [key: string]: StatusProps;
}


export const statusColors: StatusColors = {
    
        SIN_INICIAR: {
            label: "Sin Iniciar",
            gradient: "bg-gradient-to-r from-devarana-dark-graph to-devarana-graph",
            colorBase: "devarana-dark-graph",
            colorLight: "devarana-graph",
        },

        EN_PROCESO: {
            label: "En Proceso",
            gradient: "bg-gradient-to-r from-primary to-primary-light",
            colorBase: "primary",
            colorLight: "primary-light",
        },

        FINALIZADO: {
            label: "Finalizado",
            gradient: "bg-gradient-to-r from-success to-success-light",
            colorBase: "success",
            colorLight: "success-light",
        },

        CANCELADO: {
            label: "Cancelado",
            gradient: "bg-gradient-to-r from-error to-error-light",
            colorBase: "error",
            colorLight: "error-light",
        },

        DETENIDO: {
            label: "Detenido",
            gradient: "bg-gradient-to-r from-warning to-warning-light",
            colorBase: "warning",
            colorLight: "warning-light",
        },
        RETRASADO: {
            label: "Retrasado",
            gradient: "bg-gradient-to-r from-info to-info-light",
            colorBase: "info",
            colorLight: "info-light",
        },
}

export type { StatusProps, StatusColors };