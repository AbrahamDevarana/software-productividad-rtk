import {FC, useEffect, useMemo, useState, useRef} from 'react'
import { OperativoProps } from '@/interfaces';
import { getResultadosThunk } from '@/redux/features/resultados/resultadosThunk';
import { useAppDispatch } from '@/redux/hooks';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import Draggable from 'react-draggable';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarProps {
    currentOperativo: OperativoProps
}

export const CalendarObjetivo: FC<CalendarProps> = ({currentOperativo}) => {

	const dispatch = useAppDispatch()
	const [ resultadoList, setResultadoList ] = useState(currentOperativo.resultados_clave || [] )  

	const calendarRef = useRef<any>(null);
  
	useEffect(() => {
		if ( currentOperativo.id === '' ) return
		dispatch( getResultadosThunk(currentOperativo.id) )
	}, [currentOperativo.id])

	
	const events = useMemo(() => {
		return resultadoList.map( resultado => ({
			title: resultado.nombre,
			start: resultado.fechaInicio,
			end: resultado.fechaFin,
			id: resultado.id
	}))}, [resultadoList])
  




	return (
		<div className='grid grid-cols-12'>
			<div className='col-span-4'>
				<ul className=''>
					{
						resultadoList && resultadoList.map( resultado => (
							<Draggable>
								<li key={resultado.id} className='flex gap-x-5 p-2 border last-of-type:rounded-b-ext first-of-type:rounded-t-ext'>
									<p className='w-full'>{resultado.nombre}</p> 
								</li>
							</Draggable>
						))
					}
					</ul>
			</div>
			<div className='col-span-8'>
				<FullCalendar
					ref={calendarRef}
					plugins={[ dayGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
					events={events}
					editable={true}
					selectable={true}
					droppable={true}
				/>
			</div>
		</div>
	)
}
