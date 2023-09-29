import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskProps} from "@/interfaces";
import { AppDispatch, RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";


interface Props {
    task: TaskProps
    tasks: TaskProps[]
}

export const createTaskThunk = createAsyncThunk(
    'tasks/createTask',
    async (task: TaskProps, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.post<Props>(`/tasks`, task, config);
            return response.data.task
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})

export const updateTaskThunk = createAsyncThunk(
    'tasks/updateTask',
    async (task: TaskProps, { rejectWithValue, getState }) => {

        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }

            const response = await clientAxios.put<Props>(`/tasks/${task.id}`, task, config);
            
            return response.data.task
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})

export const deleteTaskThunk = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId: number, { rejectWithValue, getState }) => {
        try {
            const { accessToken } = (getState() as RootState).auth;
            const config = {
                headers: { "accessToken": `${accessToken}` }
            }
            const response = await clientAxios.delete<Props>(`/tasks/${taskId}`, config);
            return response.data.task
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
})
