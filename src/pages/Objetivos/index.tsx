import { Progress } from 'antd'
import React from 'react'
import { Avatar, Box } from '../../components/ui'

export const Objetivos = () => {
  return (
    <>
        <Box>
            <h1>Mis Objetivos</h1>
            <Progress percent={20} className="py-2" strokeWidth={20} strokeLinecap='square'/>
        </Box>

        <div className='grid grid-cols-4 gap-5 my-8'>
            <Box className='flex flex-col align-middle'>
                <Progress percent={15} className="py-5 mx-auto" strokeWidth={15} type="circle" strokeColor="#d64767"/>
                <h1 className='text-center font-extrabold'>Objetivo 1</h1>
                <p className='text-center font-semibold text-devarana-graph'>Ponderación <span> 33% </span></p>
            </Box>
            <Box className='flex flex-col align-middle'>
                <Progress percent={50} className="py-5 mx-auto" strokeWidth={15} type="circle" strokeColor="#d64767"/>
                <h1 className='text-center font-extrabold'>Objetivo 2</h1>
                <p className='text-center font-semibold text-devarana-graph'>Ponderación <span> 33% </span></p>
            </Box>
            <Box className='flex flex-col align-middle items-center'>
                <Progress percent={95} className="py-5 mx-auto" strokeWidth={15} type="circle" strokeColor="#d64767"/>
                <h1 className='text-center font-extrabold'>Objetivo 3</h1>
                <p className='text-center font-semibold text-devarana-graph'>Ponderación <span> 33% </span></p>

                <div>
                    <Avatar size='small' />
                    <Avatar size='small' />
                </div>
                
            </Box>


        </div>
    </>
  )
}
