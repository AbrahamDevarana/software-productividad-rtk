import { ProyectosProps } from '@/interfaces';
import { Avatar, DatePicker } from 'antd';
import React, { useMemo } from 'react'
import { GanttChart } from 'smart-webcomponents-react/ganttchart';
import ReactDOMServer from 'react-dom/server';
import dayjs from 'dayjs';
import { useAppSelector } from '@/redux/hooks';

interface GanttProps {
    currentProyecto: ProyectosProps
    visible: boolean
    setVisible: (visible: boolean) => void
}

export const Gantt = ({currentProyecto, visible, setVisible}: GanttProps) => {

	const treeSize = '30%';
	const durationUnit = 'hour';

	const today = new Date(),
		year = today.getFullYear(),
		month = today.getMonth(),
		date = today.getDate();

    const { RangePicker } = DatePicker; 

	const taskColumns = [{
		label: 'Tasks',
		value: 'label',
		size: '50%',
	}, 
	{
		label: 'Inicio',
		value: 'fechaInicio',
		size: '30%',
		formatFunction: function (data: any, task:any) {

            console.log(task, data);
            

            const fechaInicio = dayjs(task.hito?.fechaInicio).add(6, 'hour').format('DD/MM/YYYY');
            const fechaFin = dayjs(task.hito?.fechaFin).add(6, 'hour').format('DD/MM/YYYY');



            return `${fechaInicio} - ${fechaFin}`;
        }

	},
    {
        label: 'Propietario',
        value: 'hito',
        size: '20%',
        formatFunction: function (data: any, task:any) {
            const propietario = task.hito?.propietario;

            if (!propietario) return '';
            
            let result = (
                <div className="flex items-center">
                    <Avatar size="small" src={`${import.meta.env.VITE_STORAGE_URL}${propietario?.foto}`} >
                        {propietario?.iniciales}
                    </Avatar>
                </div> )
            
            const stringElement = ReactDOMServer.renderToString(result);
            return stringElement;
		}
      },
];

	

	const dataSource = useMemo(() => {
    const data = currentProyecto.proyectos_hitos?.map((proyecto_hito) => {
		return {
			dragProject: true,
			synchronized: true,
			label: proyecto_hito.titulo,
			type: 'project',
			expanded: true,
			dateStart: proyecto_hito.fechaInicio,
			dateEnd: proyecto_hito.fechaFin,

			tasks: proyecto_hito.tareas?.map((hito) => {
				return {
                    hito,
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

  console.log(taskColumns);
  
 

	return (
		<div>
			<GanttChart
                
				dateStart={new Date(year, month, date - 1, 8, 0, 0)}
				dateEnd={new Date(year, month, date + 1, 17, 0, 0)}
                dataSource={dataSource} 
                taskColumns={taskColumns}
                durationUnit={durationUnit}
                currentTimeIndicator={true}
				shadeUntilCurrentTime={true}
                className='customGantt'
                id="gantt"
                onClick={(e) => {
                    console.log(e);
                }}
                />
		</div>
	);
}

