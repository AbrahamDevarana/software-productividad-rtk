import { TaskProps } from '@/interfaces'
import { useUpdateTaskMutation } from '@/redux/features/tasks/tasksThunk'
import { useAppDispatch } from '@/redux/hooks'
import { Checkbox } from 'antd'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'


interface TaskCheckboxProps {
    record: TaskProps
    disabled?: boolean
}

export const TaskCheckbox = ({record, disabled}: TaskCheckboxProps) => {

    const [checked, setChecked] = useState<boolean>(record.status ===  'FINALIZADO' ? true : false)
    const [ updateTask, { isLoading: isUpdatingTask, error: updateTaskError } ] = useUpdateTaskMutation()    
    const handleCheckedChange = (value: boolean) => {
        const query = {
            ...record,
            status: value ? 'FINALIZADO' : 'SIN_INICIAR' as 'FINALIZADO' | 'SIN_INICIAR'
        }

        setChecked(value ? true : false)
        

        toast.promise(
            updateTask(query).unwrap(), {
                loading: 'Actualizando tarea...',
                success: 'Tarea actualizada',
                error: 'Error al actualizar la tarea'
            }
        )
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
