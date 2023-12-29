import { TaskProps } from '@/interfaces'
import { updateTaskThunk } from '@/redux/features/tasks/tasksThunk'
import { useAppDispatch } from '@/redux/hooks'
import { Slider } from 'antd'
import { useEffect, useState } from 'react'


interface TaskProgressProps {
    record: TaskProps
    disabled?: boolean
}

export const TaskProgress = ({ record, disabled }: TaskProgressProps) => {

    const [progreso, setProgreso] = useState<number>(record.progreso)
    const dispatch = useAppDispatch()
    
    const handleProgressChange = (value: number) => {
        const query = {
            ...record,
            progreso: value
        }

        setProgreso(value)
        dispatch(updateTaskThunk(query))
    }
    
    useEffect(() => {
        setProgreso(record.progreso)
    }, [record])

    

    return (
        <Slider 
            value={progreso}
            onChange={(value) => setProgreso(value)}
            onAfterChange={(value) => handleProgressChange(value)}
            min={0} 
            max={100} 
            disabled={disabled}
            step={1} 
            className='w-full'
        />
    )
}
