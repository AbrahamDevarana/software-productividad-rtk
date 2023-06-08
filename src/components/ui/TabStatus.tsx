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
                width: '6px',
                height: '6px',
                borderRadius: '25%'
            }}  
        />

        <p style={{
            color: getColor(status).color,
            fontWeight: 600

        }}> {getStatus(status)} </p>
    </div>
  )
}
