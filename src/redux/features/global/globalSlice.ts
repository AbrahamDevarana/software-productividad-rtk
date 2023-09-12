import { GlobalState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';


const initialState: GlobalState = {
    objetivosConfig: {
        diasApertura: 10,
        diasCierre: 15,
    },
    currentConfig: {
        quarter: Math.ceil((new Date().getMonth() + 1) / 3),
        year: new Date().getFullYear()
    },
    periodControls: {
        prePeriodDefinitionDays: 100, 
        postPeriodDefinitionDays: 100, 
        preClosureDays: 100, 
        postClosureDays: 100,
        preEvaluationDays: 100, 
        postEvaluationDays: 100
    }
}


const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        cambiarConfig: (state, { payload }) => {
            state.currentConfig = payload
        }
    },
    extraReducers: (builder) => {
        
    }
})


export const { cambiarConfig } = globalSlice.actions
export default globalSlice.reducer


