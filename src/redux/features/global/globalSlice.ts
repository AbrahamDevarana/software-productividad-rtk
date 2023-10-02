import { GlobalState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import dayjs from 'dayjs';


const initialState: GlobalState = {
    currentConfig: {
        quarter: Math.ceil((new Date().getMonth() + 1) / 3),
        year: new Date().getFullYear(),
        currentDate: dayjs().format('YYYY-MM-DD')
    },
    periodControls: {
        prePeriodDefinitionDays: 15,
        postPeriodDefinitionDays: 15,
        preClosureDays: 15, 
        postClosureDays: 15,
        preEvaluationDays: 15, 
        postEvaluationDays: 15
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


