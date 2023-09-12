

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
    periodControls: {
        prePeriodDefinitionDays: number
        postPeriodDefinitionDays: number,
        preClosureDays: number,
        postClosureDays: number
        preEvaluationDays: number,
        postEvaluationDays: number
    }
}        