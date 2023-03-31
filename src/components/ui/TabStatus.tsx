import React from 'react'
import { useGetColor } from '@/hooks/useGetColor';

interface TabStatusProps  {
    statusId: number;
    children?: React.ReactNode;
}

export const TabStatus: React.FC<TabStatusProps> = ({statusId, children}) => {
  return (
    <div className='flex items-center gap-2 px-2 py-1 rounded-full min-w-[100px]'>  
        <div style={{ 
                backgroundColor: useGetColor(statusId)?.hex, 
                boxShadow: `0 0 3px 2px ${useGetColor(statusId, .3)?.rgba}`,
                width: '5px',
                height: '5px',
            }}  
        />

        <p> {useGetColor(statusId)?.status} </p>
    </div>
  )
}
