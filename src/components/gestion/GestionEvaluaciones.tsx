import { Avatar } from 'antd'
import React from 'react'

export const GestionEvaluaciones = () => {
    return (
		<>
			<div className='grid grid-cols-12 h-80'>
				<div className="col-span-4 flex items-center justify-center flex-col">

					<h1>Abraham Alvarado Guevara</h1>
					<Avatar 
						alt='Remy Sharp'
						src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
						size={120}
					>

					</Avatar>

				</div>
				<div className='grid grid-cols-12 col-span-8'>
					<div className='col-span-6 border rounded-tl-full'>
						
					</div>
					<div className='col-span-6 border rounded-tr-full'>
						
					</div>
					<div className='col-span-6 border rounded-bl-full'>
						
					</div>
					<div className='col-span-6 border rounded-br-full'>
						
					</div>

				</div>
			</div>
		</>
    )
}
