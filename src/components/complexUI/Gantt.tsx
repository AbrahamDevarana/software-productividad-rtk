
import { ProyectosProps, TareasProps } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGantt } from '@/hooks/useGantt';
import Loading from '../antd/Loading';

import { GanttChart } from 'smart-webcomponents-react/ganttchart';
import { useEffect, useRef, useState } from 'react';
window.Smart.License = "7C743E09-8C47-4BFC-9783-7CF87E92D987";
import '@/assets/scss/smart.custom.scss'


// import  '@/assets/static/js/jszip.min.js'
// import '@/assets/static/js/pdfmake.min.js'
// import '@/assets/static/js/html2canvas.min.js'


interface GanttProps {
    currentProyecto: ProyectosProps
    visible: boolean
    setVisible: (visible: boolean) => void
}

type DurationUnit = 'day' | 'week' | 'month' | 'year'

export const Gantt = ({currentProyecto, visible, setVisible}: GanttProps) => {

    return (
        <>
        </>
    )


    // const { hitos, isLoading } = useAppSelector(state => state.hitos)

    // const ref = useRef(null);
    
    // const durationUnitOptions: DurationUnit[] = ['day', 'week', 'month', 'year']
    // const [view, setView] = useState<DurationUnit>('month')
    
    // const dispatch = useAppDispatch()


    // const {dataSource, taskColumns, durationUnit } = useGantt({hitos, currentProyecto});
        

    // const handleView = async (record:TareasProps) => {
    //     if(record === undefined ) return        
    //     await dispatch(getTareaThunk(record.id))
    //     setVisible(true)
    // }

    // const handleExport = (type: string) => {
    //     const gantt = ref.current as any
    //     gantt.exportData(type)
        
    // }

    // const handleChangeDate = async (event: any) => {   
    //     const { dateStart, dateEnd, hito } = event.detail.item;

    //     const query = {
    //         ...hito,
    //         fechaInicio: dateStart,
    //         fechaFin: dateEnd
    //     } as TareasProps


    //     await dispatch(updateTareaThunk(query))

    // }

    // if(isLoading) return ( <Loading /> )

	// return (
	// 	<div>
    //         <div className='flex gap-x-3 text-devarana-graph justify-end'>
    //             {
    //                 durationUnitOptions.map((unit, index) => (
    //                     <button key={index} onClick={() => setView(unit)} className='capitalize'> 
    //                         {unit}
    //                     </button>
    //                 ))
    //             }
    //         </div>
	// 		<GanttChart
    //             theme='custom'
    //             className='customGantt'
    //             id="gantt"
    //             ref={ref}
    //             dataSource={dataSource} 
    //             taskColumns={taskColumns}
	// 			dateStart={currentProyecto.fechaInicio}
	// 			dateEnd={currentProyecto.fechaFin}
    //             durationUnit={durationUnit}
    //             view={view}
    //             disableWindowEditor={true}
    //             disableSelection={true}
    //             onItemClick={ (event: any) => handleView(event.detail.item?.hito) }
    //             onDragEnd={ handleChangeDate }
    //             onResizeEnd={ handleChangeDate }
    //             ></GanttChart>
	// 	</div>
	// );
}

