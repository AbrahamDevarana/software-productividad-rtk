import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { clearProyectoThunk, getProyectoThunk } from '@/redux/features/proyectos/proyectosThunk'
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Segmented } from 'antd';
import { Icon } from '@/components/Icon';
import { UserDropDown } from '@/components/ui/UserDropDown';
import { Gantt } from '@/components/complexUI/Gantt';
import { TableProyectos } from '@/components/proyectos/TableProyectos';



export const ProyectoView = () => {

    const { currentProyecto } = useAppSelector(state => state.proyectos)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const [value, setValue] = useState<string | number>('listado');


    const options = [
        {
            label: 'Listado',
            value: 'listado',
            icon: <Icon iconName='faList' />
        },
        {
            label: 'Gantt',
            value: 'gantt',
            icon: <Icon iconName='faChartGantt' />
        },
        {
            label: 'Calendario',
            value: 'calendario',
            icon: <Icon iconName='faCalendar' />
        },
        {
            label: 'Kanban',
            value: 'kanban',
            icon: <Icon iconName='faColumns' />
        }
    ]
    
    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()


    

    useEffect(() => {
      if(id) {
        dispatch(getProyectoThunk(id))
      }
    //   dispatch(getUsuariosThunk({}))
      return () => {
        dispatch(clearProyectoThunk())
      }
    }, [id])



    return (
        <>

            <h1>{ currentProyecto.titulo }</h1>

                <Segmented
                    className='my-4'
                    options={options}
                    value={value}
                    onChange={setValue}
                />

                <div>
                    <UserDropDown searchFunc={ getUsuariosThunk } data={usuarios}  />
                </div>
 
            {
                currentProyecto && (
                    <>
                        {
                            value === 'listado' && (
                                <p>
                                    <TableProyectos currentProyecto={currentProyecto} />
                                </p>
                            )
                        }
                        {
                            value === 'gantt' && (
                                <Gantt currentProyecto={currentProyecto}/>
                            )
                        }
                        {
                            value === 'calendario' && (
                                <p>
                                    Calendario
                                </p>
                            )
                        }
                        {
                            value === 'kanban' && (
                                <p>
                                    Kanban
                                </p>
                            )
                        }
                    </>
                )
            }
           
            

        </>
    )
}
