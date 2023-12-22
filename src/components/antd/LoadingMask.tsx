
import React from 'react'
import { Spinner } from './Spinner'
import { Spin } from 'antd'

export const LoadingMask = ({ text = 'Cargando...' } : { text?: string }) => {
  return (
    <div className='bg-opacity-50 bg-white w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center flex-col'>
        <Spin size='large' tip={ text }/>
        <p className='text-devarana-graph py-5'>{text}</p>
    </div>
  )
}
