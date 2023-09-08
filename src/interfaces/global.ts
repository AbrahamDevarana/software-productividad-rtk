

export interface IGlobal {

}

export interface GlobalState {
    objetivosConfig: {
        diasApertura: number,
        diasCierre: number,
    }
    currentConfig: {
        quarter: number,
        year: number
    },
    nextPeriodAvailable: {
        days: number
    }
}