import { ProyectosProps } from '@/interfaces';
import React, { useMemo } from 'react'
import { GanttChart } from 'smart-webcomponents-react/ganttchart';


interface GanttProps {
	currentProyecto: ProyectosProps
}


export const Gantt = ({currentProyecto}: GanttProps) => {

  console.log(currentProyecto);
  
  
  
	const treeSize = '30%';
	const durationUnit = 'hour';

	const taskColumns = [{
		label: 'Tasks',
		value: 'label',
		size: '60%'
	}, 
	{
		label: 'Duration (hours)',
		value: 'duration',
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
				dateStart: '2023-02-10',
				dateEnd: '2023-10-10',
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
                dataSource={dataSource} 
                taskColumns={taskColumns} 
                treeSize={treeSize} 
                durationUnit={durationUnit}
                
                id="gantt"/>
		</div>
	);
}

