import { useAppSelector } from '@/redux/hooks';
import { Box } from '../../../components/ui';
import { statusTypes } from '@/types';




export const KanbanProyecto = () => {

    // const { tareas } = useAppSelector(state => state.tareas)

    const tareas = [
        {
            id: '0b918ca4-0c33-44ae-842d-c55a7c4862ca',
            nombre: 'Tarea 12',
            descripcion: null,
            status: 'SIN_INICIAR',
            propietarioId: 'ebcd7a49-21f4-454a-828c-94d7ef8a5a95',
            hitoId: '24dfc068-3f94-4caf-9ee3-9f9ce4b56f4d',
            fechaInicio: '2023-05-09T23:31:09.000Z',
            fechaFin: '2023-05-09T23:31:09.000Z'
        },
        {
            id: '166325a2-7659-4d19-a406-9332c49a93ec',
            nombre: 'Tarea 15',
            descripcion: null,
            status: 'EN_PROGRESO',
            propietarioId: 'ebcd7a49-21f4-454a-828c-94d7ef8a5a95',
            hitoId: '24dfc068-3f94-4caf-9ee3-9f9ce4b56f4d',
            fechaInicio: '2023-05-09T23:26:19.000Z',
            fechaFin: '2023-05-09T23:26:19.000Z'
        },
        {
            id: '166325a2-345-4d19-a406-9332c49a93ec',
            nombre: 'Tarea 2345',
            descripcion: null,
            status: 'EN_PROGRESO',
            propietarioId: 'ebcd7a49-21f4-454a-828c-94d7ef8a5a95',
            hitoId: '24dfc068-3f94-4caf-9ee3-9f9ce4b56f4d',
            fechaInicio: '2023-05-09T23:26:19.000Z',
            fechaFin: '2023-05-09T23:26:19.000Z'
        },
        {
            id: '166325a2-123-4d19-a406-9332c49a93ec',
            nombre: 'Tarea 15',
            descripcion: null,
            status: 'FINALIZADO',
            propietarioId: 'ebcd7a49-21f4-454a-828c-94d7ef8a5a95',
            hitoId: '24dfc068-3f94-4caf-9ee3-9f9ce4b56f4d',
            fechaInicio: '2023-05-09T23:26:19.000Z',
            fechaFin: '2023-05-09T23:26:19.000Z'
        }
    ]
    
    return (
           <div className='w-full p-5 overflow-x-auto'>
                <div className="snap-x inline-flex gap-x-10">
                    {
                        Object.entries(statusTypes).map((item, index) => (
                            <Box key={index} className='w-80 snap-center bg-red h-[300px]'>
                                <p className='text-xs text-devarana-graph mx-auto text-center bg-white w-full'>{item[1]}</p>
                                <div> ---- ------ </div>
                                {
                                    tareas.filter(tarea => tarea.status === item[0]).map((tarea, index) => (
                                        <div key={index} className='p-2 shadow'>
                                            <p className='text-xs text-devarana-graph'>{tarea.nombre}</p>
                                        </div>
                                    ))
                                }
                            </Box>
                        ))
                    }
                </div>
           </div>
    )
}