import { TaskProps } from '@/interfaces'
import { updateTaskThunk, useUpdateTaskMutation } from '@/redux/features/tasks/tasksThunk'
import { useAppDispatch } from '@/redux/hooks'
import { Checkbox, message } from 'antd'
import React, { useEffect, useState } from 'react'


interface TaskCheckboxProps {
    record: TaskProps
    disabled?: boolean
}

export const TaskCheckbox = ({record, disabled}: TaskCheckboxProps) => {

    const [checked, setChecked] = useState<boolean>(record.status ===  'FINALIZADO' ? true : false)
    const [ updateTask, { isLoading: isUpdatingTask, error: updateTaskError } ] = useUpdateTaskMutation()
    const dispatch = useAppDispatch()
    
    const handleCheckedChange = (value: boolean) => {
        const query = {
            ...record,
            status: value ? 'FINALIZADO' : 'SIN_INICIAR' as 'FINALIZADO' | 'SIN_INICIAR'
        }

        setChecked(value ? true : false)
        // dispatch(updateTaskThunk(query))
        updateTask(query).unwrap().then(() => {
            message.success('Tarea actualizada')
        }).catch((error) => {
            message.error('Error al actualizar la tarea')
        })
    }
    
    useEffect(() => {
        setChecked(record.status ===  'FINALIZADO' ? true : false)
    }, [record])

    return (
        <Checkbox
            key={record.status}
            disabled={disabled}
            checked={checked}
            onChange={(e) => handleCheckedChange(e.target.checked ? true : false)}
        /> 
    )
}
