import { TaskProps } from '@/interfaces'
import { updateTaskThunk } from '@/redux/features/tasks/tasksThunk'
import { useAppDispatch } from '@/redux/hooks'
import { Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'


interface TaskCheckboxProps {
    record: TaskProps
    disabled?: boolean
}

export const TaskCheckbox = ({record, disabled}: TaskCheckboxProps) => {

    const [checked, setChecked] = useState<boolean>(record.status ===  'FINALIZADO' ? true : false)
    const dispatch = useAppDispatch()
    
    const handleCheckedChange = (value: boolean) => {
        const query = {
            ...record,
            status: value ? 'FINALIZADO' : 'SIN_INICIAR' as 'FINALIZADO' | 'SIN_INICIAR'
        }

        setChecked(value ? true : false)
        dispatch(updateTaskThunk(query))
    }
    
    useEffect(() => {
        setChecked(record.status ===  'FINALIZADO' ? true : false)
    }, [record])

    return (
        <Checkbox
            disabled={disabled}
            checked={checked}
            onChange={(e) => handleCheckedChange(e.target.checked ? true : false)}
        /> 
    )
}
