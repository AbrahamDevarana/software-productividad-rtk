
import { ProyectosProps } from '@/interfaces';
import { useAppSelector } from '@/redux/hooks';
import { useGantt } from '@/hooks/useGantt';
import Loading from '../antd/Loading';

import { Smart, GanttChart } from 'smart-webcomponents-react/ganttchart';
import { useEffect } from 'react';
window.Smart.License = "7C743E09-8C47-4BFC-9783-7CF87E92D987";


interface GanttProps {
    currentProyecto: ProyectosProps
    visible: boolean
    setVisible: (visible: boolean) => void
}

export const Gantt = ({currentProyecto, visible, setVisible}: GanttProps) => {
    const { hitos, isLoading } = useAppSelector(state => state.hitos)
    const {dataSource, taskColumns, date, durationUnit, month, year} = useGantt({hitos, currentProyecto});  
    
    if(isLoading) return ( <Loading /> )
    
	return (
		<div>
			<GanttChart
				// dateStart={new Date(year, month, date - 1, 8, 0, 0)}
				// dateEnd={new Date(year, month, date + 1, 17, 0, 0)}
                // dataSource={dataSource} 
                // taskColumns={taskColumns}
                // durationUnit={durationUnit}
                // currentTimeIndicator={true}
				// shadeUntilCurrentTime={true}
                // className='customGantt'
                // id="gantt"
                ></GanttChart>
		</div>
	);
}

