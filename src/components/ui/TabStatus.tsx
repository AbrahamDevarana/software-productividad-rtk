import React from 'react'
import { useColor } from '@/hooks';

interface TabStatusProps  {
    statusId: number;
    children?: React.ReactNode;
}

export const TabStatus: React.FC<TabStatusProps> = ({statusId, children}) => {
  return (
    <div className='flex items-center gap-2 px-2 py-1 rounded-full min-w-[100px]'>  
        <div style={{ 
                backgroundColor: useColor(statusId).color, 
                boxShadow: `0 0 3px 2px ${useColor(statusId, .3).color}`,
                width: '5px',
                height: '5px',
            }}  
        />

        <p> {useColor(statusId).nombre} </p>
    </div>
  )
}
