import { useDebounceCallback } from '@/hooks'
import { TaskProps } from '@/interfaces'
import { updateTaskThunk, useUpdateTaskMutation } from '@/redux/features/tasks/tasksThunk'
import { useAppDispatch } from '@/redux/hooks'
import { InputNumber, message, Slider } from 'antd'
import { useEffect, useState } from 'react'


interface TaskProgressProps {
    record: TaskProps
    disabled?: boolean
    input?: boolean
}

export const TaskProgress = ({ record, disabled, input = false }: TaskProgressProps) => {

    const [ updateTask, { isLoading: isUpdatingTask, error: updateTaskError } ] = useUpdateTaskMutation()
    const [progress, setProgress] = useState<number>()
    
    const handleProgressChange = async (value: number) => {
        const query = {
            ...record,
            progreso: value
        }
        await updateTask(query).unwrap().then(() => {
            message.open({
                type: 'success',
                content: 'Tarea actualizada',
                key: 'task-progress'
            })
        }).catch((error) => {
            message.error('Error al actualizar la tarea')
        })
    }

    useEffect(() => {
        setProgress(record.progreso)
    }, [record.progreso])


    

    const debounceProgress = useDebounceCallback(handleProgressChange, 300)

    return (
        <div className='flex gap-1 w-full'>
            <Slider
                key={record.id}
                value={progress}
                onChange={(value) => {
                    setProgress(value)
                    debounceProgress(value)
                }}
                min={0} 
                max={100} 
                disabled={disabled}
                step={1} 
                className='w-full'
            />
           {
                input && (
                    <InputNumber
                        key={record.id}
                        min={0}
                        max={100}
                        variant='borderless'
                        value={progress}
                        onStep={(value) => {
                            setProgress(value)
                            handleProgressChange(value)
                        }}
                        onChange={debounceProgress}
                        disabled={disabled}
                        className='w-22'
                    />
                )
           }
        </div>
    )
}
