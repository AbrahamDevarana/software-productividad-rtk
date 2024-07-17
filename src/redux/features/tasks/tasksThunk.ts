import { createAsyncThunk } from "@reduxjs/toolkit";
import { TaskProps} from "@/interfaces";
import { AppDispatch, RootState } from "@/redux/store";
import { clientAxios } from "@/config/axios";


import { baseQuery } from "@/config/baseQuery";
import { createApi } from '@reduxjs/toolkit/dist/query/react';


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

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: baseQuery,
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTask : builder.query<TaskProps, {taskId?: number}>({
            query: ({taskId}) => `tasks/${taskId}`,
            providesTags: ['Task'],
            transformResponse: (response: {task: TaskProps}) => response.task
        }),
        getTasks: builder.query<TaskProps[], {taskeableId: string}>({
            query: ({taskeableId}) => ({
                url: `tasks`,
                params: {
                    taskeableId: taskeableId
                }
            }),
            transformResponse: (response: {tasks: TaskProps[]}) => response.tasks,
        }),
        updateTask: builder.mutation<void, Pick<TaskProps, 'id'> & Partial<TaskProps>>({
            query: ({id, ...patch}) => ({
                url: `tasks/${id}`,
                method: 'PUT',
                body: patch
            }),
            onQueryStarted: async ({id, ...patch}, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData('getTasks', {taskeableId: patch.taskeableId!}, (draft) => {

                        const index = draft.findIndex(task => task.id === id);

                        console.log('index', index);
                        
                        if (index !== -1) {
                            Object.assign(draft[index], patch);
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
            }
        }
        }),
        createTask: builder.mutation<TaskProps, any>({
            query: (task) => ({
                url: `tasks`,
                method: 'POST',
                body: task
            }),
            transformResponse: (response: {task: TaskProps}) => response.task,
            onQueryStarted: async (task, { dispatch, queryFulfilled }) => {
                const temporaryId = Math.floor(Math.random() * 1000000)
                const patchResult = dispatch(
                    taskApi.util.updateQueryData('getTasks', {taskeableId: task.taskeableId}, (draft) => {
                        const defaultProps = {
                            id: temporaryId
                        }
                        draft.push({...defaultProps, ...task})
                    })
                )
                try {
                    const { data: createdTask } = await queryFulfilled

                    dispatch(
                        taskApi.util.updateQueryData('getTasks', {taskeableId: task.taskeableId}, (draft) => {
                                const index = draft.findIndex(task => task.id === temporaryId);
                                if (index !== -1) {
                                    draft[index] = createdTask
                                }
                            }
                        )
                    )

                } catch (error) {
                    patchResult.undo()
                }   
            }
            
        }),
        deleteTask: builder.mutation<string, {taskId: number, hitoId: string}>({
            query: ({taskId}) => ({
                url: `tasks/${taskId}`,
                method: 'DELETE'
            }),
            onQueryStarted: async ({taskId, hitoId}, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData('getTasks', {taskeableId: hitoId}, (draft) => {
                        
                        const index = draft.findIndex(task => task.id === taskId);
                        if (index !== -1) {
                            draft.splice(index, 1)
                        }
                    })
                )
                try {
                    await queryFulfilled
                } catch (error) {
                    patchResult.undo()
                }
            }
        }),
    })
})

export const { useGetTaskQuery, useGetTasksQuery, useUpdateTaskMutation, useCreateTaskMutation, useDeleteTaskMutation } = taskApi;