import { getColor } from '@/helpers'
import { TaskProps } from '@/interfaces'
import { TaskStatusType, taskStatusTypes } from '@/types'

interface Props {
    current: TaskProps
    handleUpdateStatus: (query: TaskProps) => void
    isClosed?: boolean
}

export const PopoverStatus = ({ current, handleUpdateStatus, isClosed = false}: Props) => {


    const statusKeys: TaskStatusType[] = Object.keys(taskStatusTypes) as TaskStatusType[];

    const handleChangeStatus = (status: TaskStatusType) => {
        const query: TaskProps = {
            ...current,
            status
        }
        handleUpdateStatus(query)
    }

    return (
        <div>
            {statusKeys.map((status, index) => (
                <div className={`flex items-center gap-2 py-1 cursor-pointer ${ isClosed ? 'cursor-not-allowed': ''}`} key={index} onClick={() => {
                    !isClosed && handleChangeStatus(status)
                }}>
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
