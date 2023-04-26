import { ProyectosProps } from '@/interfaces';
import React, { useMemo } from 'react'
import { GanttChart } from 'smart-webcomponents-react/ganttchart';


interface GanttProps {
	currentProyecto: ProyectosProps
}


export const Gantt = ({currentProyecto}: GanttProps) => {
  
	const treeSize = '30%';
	const durationUnit = 'hour';

	const today = new Date(),
		year = today.getFullYear(),
		month = today.getMonth(),
		date = today.getDate();

	const taskColumns = [{
		label: 'Tasks',
		value: 'label',
		size: '60%',
	}, 
	{
		label: 'Duration (hours)',
		value: 'duration',
		size: '20%',
		formatFunction: (date:any) => parseInt(date)
	}];

	

	const dataSource = useMemo(() => {
    const data = currentProyecto.proyectos_hitos?.map((proyecto_hito) => {
		return {
			synchronized: true,
			label: proyecto_hito.titulo,
			type: 'project',
			expanded: true,
			dateStart: proyecto_hito.fechaInicio,
			dateEnd: proyecto_hito.fechaFin,
			tasks: proyecto_hito.hitos_acciones?.map((hito) => {
				return {
				label: hito.nombre,
				dateStart: hito.fechaInicio,
				dateEnd: hito.fechaFin,
				type: 'task',
				}
			})
		}
    })
    return data
  }, [currentProyecto])
 

	return (
		<div>
			<GanttChart
				dateStart={new Date(year, month, date - 1, 8, 0, 0)}
				dateEnd={new Date(year, month, date + 1, 17, 0, 0)}
                dataSource={dataSource} 
                taskColumns={taskColumns}
                treeSize={treeSize} 
                durationUnit={durationUnit}
                currentTimeIndicator={true}
				shadeUntilCurrentTime={true}
                id="gantt"/>
		</div>
	);
}

