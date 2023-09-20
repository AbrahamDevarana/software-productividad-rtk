

export interface IGlobal {

}

export interface GlobalState {
    currentConfig: {
        quarter: number,
        year: number
        currentDate: string
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