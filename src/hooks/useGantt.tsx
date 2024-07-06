import { useMemo } from "react";
import ReactDOMServer from 'react-dom/server';
import dayjs from 'dayjs';
import { Avatar } from "antd";
import { HitosProps, ProyectosProps } from "@/interfaces";


interface Props {
	hitos: HitosProps[]
	currentProyecto: ProyectosProps
}

export const useGantt = ({hitos, currentProyecto}: Props) => {
	const treeSize = '30%';
	const durationUnit = 'hour';


	const taskColumns = [{
		label: 'Tasks',
		value: 'label',
		size: '50%',
	}, 
	{
		label: 'Fecha',
		value: 'fecha',
		size: '30%',
		formatFunction: function (data: any, task:any) {            
            const fechaInicio = dayjs(task.hito?.fechaInicio).add(6, 'hour').format('D MMM');
            const fechaFin = dayjs(task.hito?.fechaFin).add(6, 'hour').format('D MMM');
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
				dragProject: false,
				synchronized: true,
				label: hito.titulo,
				type: 'project',
				class: 'project',
				expanded: true,
				dateStart: dayjs(hito.fechaInicio).add(6, 'hour').format('YYYY-MM-DD'),
				dateEnd: dayjs(hito.fechaFin).add(6, 'hour').format('YYYY-MM-DD'),
				tasks: hito.task?.map((hito) => {
					return {
						hito,
						label: hito.nombre,
						dateStart: dayjs(hito.created).add(6, 'hour').format('YYYY-MM-DD'),
						dateEnd: dayjs(hito.fechaFin).add(6, 'hour').format('YYYY-MM-DD'),
						type: 'task',
						class: 'task',
					}
				})
			}
		})
	
		return data

		
  }, [hitos, currentProyecto])


  return {
	dataSource,
	taskColumns,
	durationUnit
  }

}