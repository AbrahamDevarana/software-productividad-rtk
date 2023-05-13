import React from 'react'
import { statusType, statusTypes } from "@/types";
import { getColor, getStatus } from '@/helpers';

interface TabStatusProps  {
    status:  statusType
    children?: React.ReactNode;
}

export const TabStatus: React.FC<TabStatusProps> = ({status, children}) => {
  return (
    <div className='flex items-center gap-2 px-2 py-1 rounded-full min-w-[100px]'>  
        <div style={{ 
                backgroundColor: getColor(status).color, 
                boxShadow: `0 0 3px 2px ${getColor(status, .3).color}`,
                width: '5px',
                height: '5px',
            }}  
        />

        <p> {getStatus(status)} </p>
    </div>
  )
}
