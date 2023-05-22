
import { ProyectosProps, TareasProps } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGantt } from '@/hooks/useGantt';
import Loading from '../antd/Loading';

import { Smart, GanttChart } from 'smart-webcomponents-react/ganttchart';
import { useEffect, useState } from 'react';
import { getTareaThunk } from '@/redux/features/tareas/tareasThunk';
window.Smart.License = "7C743E09-8C47-4BFC-9783-7CF87E92D987";


interface GanttProps {
    currentProyecto: ProyectosProps
    visible: boolean
    setVisible: (visible: boolean) => void
}

export const Gantt = ({currentProyecto, visible, setVisible}: GanttProps) => {
    const { hitos, isLoading } = useAppSelector(state => state.hitos)
    const {dataSource, taskColumns, durationUnit } = useGantt({hitos, currentProyecto}); 

    
    const dispatch = useAppDispatch()
    
    if(isLoading) return ( <Loading /> )
    
    
    const [view, setView] = useState<'day' | 'week' | 'month' | 'year'>('week')
    
	return (
		<div>
            <div className='flex gap-x-3 text-devarana-graph justify-end'>
                <button onClick={() => setView('day')}>
                    <span>Day</span>
                </button>
                <button onClick={() => setView('week')}>
                    <span>Week</span>
                </button>
                <button onClick={() => setView('month')}>
                    <span>Month</span>
                </button>
                <button onClick={() => setView('year')}>
                    <span>Year</span>
                </button>
            </div>
			<GanttChart
				dateStart={currentProyecto.fechaInicio}
				dateEnd={currentProyecto.fechaFin}
                dataSource={dataSource} 
                taskColumns={taskColumns}
                durationUnit={durationUnit}
                currentTimeIndicator={true}
				shadeUntilCurrentTime={true}
                view={view}
                className='customGantt'
                id="gantt"
                ></GanttChart>
		</div>
	);
}

