import { Spin } from 'antd'
import React from 'react'

interface Props {
  height?: string
}

export const Spinner = ({height}: Props) => {
  return (
    <div className='flex justify-center items-center align-middle flex-col' style={{ height: height }}>
        <Spin />
    </div>
  )
}
