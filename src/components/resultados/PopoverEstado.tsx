import { getColor } from '@/helpers'
import { TaskStatusType, taskStatusTypes } from '@/types'
import React from 'react'
import { useDispatch } from 'react-redux'

interface Props {
    current: any
    dispatchFunction: any
}





export const PopoverEstado = ({ current, dispatchFunction}: Props) => {

    const dispatch = useDispatch()
    const statusKeys: TaskStatusType[] = Object.keys(taskStatusTypes) as TaskStatusType[];

    const handleChangeStatus = (status: TaskStatusType) => {
        const query = {
            ...current,
            status
        }
        dispatch(dispatchFunction(query))
    }

    return (
        <div>
            {statusKeys.map((status, index) => (
                <div className="flex items-center gap-2 py-1 cursor-pointer" key={index} onClick={() => handleChangeStatus(status)}>
                    <div className={`shadow`}
                        style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '25%',
                            backgroundImage: `linear-gradient(to right, ${getColor(status).lowColor}, ${getColor(status).color})`,
                        }}
                    >  </div>
                    <p className='px-1 py-1 w-full' style={{
                        color: getColor(status).color
                    }}>  { taskStatusTypes[status] } </p>
                </div> 
            ))}
        </div>
    )
}
