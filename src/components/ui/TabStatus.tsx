import React from 'react'
import { useGetColor } from '@/hooks/useGetColor';

interface TabStatusProps  {
    statusId: number;
    children?: React.ReactNode;
}

export const TabStatus: React.FC<TabStatusProps> = ({statusId, children}) => {
  return (
    <div className='flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-ext'>  
        <div style={{ 
            backgroundColor: useGetColor(statusId)?.hex, 
            boxShadow: `0 0 3px 2px ${useGetColor(statusId, .3)?.rgba}`
        }} className='w-1 h-1' />

        <p> {useGetColor(statusId)?.status} </p>
    </div>
  )
}
