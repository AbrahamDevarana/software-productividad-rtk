import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { clearProyectoThunk, getProyectoThunk } from '@/redux/features/proyectos/proyectosThunk'
import { getUsuariosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Drawer, Segmented, Skeleton } from 'antd';
import { Icon } from '@/components/Icon';
import { UserDropDown } from '@/components/ui/UserDropDown';
import { Gantt } from '@/components/complexUI/Gantt';
import { TableProyectos } from '@/components/proyectos/TableProyectos';
import { FormTareas } from '../../components/forms/FormTareas';
import { clearCurrentTarea } from '@/redux/features/tareas/tareasSlice';

type SegmentTypes = 'listado' | 'kanban' | 'gantt' | 'calendario'

export const ProyectoView = () => {

    const { currentProyecto, isLoadingProyecto } = useAppSelector(state => state.proyectos)
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
        return () => {
            dispatch(clearProyectoThunk())
        }
    }, [id])

    const handleClose = () => {
        setVisible(false)
        dispatch(clearCurrentTarea())
    }


    const handleCreateHito = () => {
        //
    }

    const handleUpdateHito = () => {
        //
    }

    const handleCreateTarea = () => {
        //
    }

    const handleUpadateTarea = () => {
        //
    }


    if( isLoadingProyecto ) return ( <Skeleton paragraph={{ rows: 20 }} /> )


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
                                    <TableProyectos 
                                        visible={visible} 
                                        setVisible={setVisible} 
                                        currentProyecto={currentProyecto} 
                                    />
                                </div>
                            )
                        }
                        {
                            value === 'gantt' && (
                                <Gantt 
                                    visible={visible} 
                                    setVisible={setVisible} 
                                    currentProyecto={currentProyecto}
                                />
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
                destroyOnClose={true}
                placement='right'
                width='500'
            >
                <FormTareas />
            </Drawer>
        </div>


    )
}
