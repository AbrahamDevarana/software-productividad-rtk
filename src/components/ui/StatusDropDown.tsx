import React, { useState } from 'react'
import { statusTypes } from '@/types'
import { Dropdown } from 'antd'
import { TabStatus } from './TabStatus'

interface Props {
    status: keyof typeof statusTypes
}

export const StatusDropDown = ({status}: Props) => {

    const [statusElement, setStatusElement] = useState<keyof typeof statusTypes>(status)

    const items = Object.entries(statusTypes).map(([key, value]) => ({
        key,
        value,
        label: ( <button onClick={() => setStatusElement(key as keyof typeof statusTypes)}>{value}</button> )
    }))

    
  return (
    <Dropdown menu={{items}} overlayClassName='bg-transparent' >
        <button type='button' className='flex items-center gap-2' onClick={ (e) => e.preventDefault() }>
            <TabStatus status={statusElement} />
        </button>
    </Dropdown>
  )



}
