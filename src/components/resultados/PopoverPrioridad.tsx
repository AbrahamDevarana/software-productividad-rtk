import { useAppDispatch } from '@/redux/hooks'
import React from 'react'
import { Prioridad, styles } from '@/types'

interface Props {
  current: any
  dispatchFunction: any
}


export const PopoverPrioridad = ({current, dispatchFunction}: Props) => {

	const dispatch = useAppDispatch()

  	const handleChangePrioridad = (prioridad: string) => {	
		const query = {
			...current,
			prioridad
		}
		dispatch(dispatchFunction(query))
	}

  	return (	
		<>
			{
				Object.values(Prioridad).map((prioridad, index) => (
					<div
						key={index}
						className="flex items-center justify-center py-1 rounded-sm cursor-pointer text-white font-medium drop-shadow-sm my-2"
						style={{
							backgroundColor: styles[prioridad as Prioridad]
						}}
						onClick={() => handleChangePrioridad(prioridad)}
					>
						{ prioridad }
					</div>
				))

			}
		</>
  	)
}
