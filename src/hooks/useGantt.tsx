import { useMemo } from "react";
import ReactDOMServer from 'react-dom/server';
import dayjs from 'dayjs';
import { Avatar } from "antd";
import { HitosProps, ProyectosProps } from "@/interfaces";


interface Props {
	hitos: HitosProps[]
	currentProyecto: ProyectosProps
}

export const useGantt = ({hitos, currentProyecto}:Props) => {

	const treeSize = '30%';
	const durationUnit = 'hour';

	const today = new Date(),
	year = today.getFullYear(),
	month = today.getMonth(),
	date = today.getDate();


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
		const data = hitos?.map((hito) => {
			return {
				dragProject: true,
				synchronized: true,
				label: hito.titulo,
				type: 'project',
				expanded: true,
				dateStart: hito.fechaInicio,
				dateEnd: hito.fechaFin,

				tasks: hito.tareas?.map((hito) => {
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


  return {
	dataSource,
	taskColumns,
	durationUnit,
	year,
	month, 
	date

  }

}