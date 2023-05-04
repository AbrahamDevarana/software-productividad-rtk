import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { clearProyectoThunk, getProyectoThunk } from '@/redux/features/proyectos/proyectosThunk'
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Drawer, Segmented } from 'antd';
import { Icon } from '@/components/Icon';
import { UserDropDown } from '@/components/ui/UserDropDown';
import { Gantt } from '@/components/complexUI/Gantt';
import { TableProyectos } from '@/components/proyectos/TableProyectos';
import { FormAccionesProyecto } from '../../components/forms/FormAccionesProyecto';

type SegmentTypes = 'listado' | 'kanban' | 'gantt' | 'calendario'

export const ProyectoView = () => {

    const { currentProyecto } = useAppSelector(state => state.proyectos)
    const { usuarios } = useAppSelector(state => state.usuarios)
    const [value, setValue] = useState<SegmentTypes>('listado');
    const [visible, setVisible] = useState<boolean>(false);


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

    const handleClose = () => {
        setVisible(false)
    }



    return (
        <div className='min-h-[500px]'>

            <h1>{ currentProyecto.titulo }</h1>

                <Segmented
                    className='my-4'
                    options={options}
                    value={value}
                    onChange={(value) => setValue(value as SegmentTypes)}
                />

                <div>
                    <UserDropDown searchFunc={ getUsuariosThunk } data={usuarios}  />
                </div>
 
            {
                currentProyecto && (
                    <>
                        {
                            value === 'listado' && (
                                <div>
                                    <TableProyectos currentProyecto={currentProyecto} visible={visible} setVisible={setVisible}/>
                                </div>
                            )
                        }
                        {
                            value === 'gantt' && (
                                <Gantt currentProyecto={currentProyecto} visible={visible} setVisible={setVisible}/>
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
           
            

            <Drawer
                open={visible}
                onClose={handleClose}
                placement='right'
                width='500'
            >
                <FormAccionesProyecto />
            </Drawer>
        </div>


    )
}
