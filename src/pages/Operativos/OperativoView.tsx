import { Icon } from "@/components/Icon"
import { FormAcciones } from "@/components/acciones/FormAcciones"
import ListadoOperativo from "@/components/operativo/ListadoOperativo"
import { clearObjetivoThunk, getOperativoThunk } from "@/redux/features/operativo/operativosThunk"
import { createResultadoThunk } from "@/redux/features/resultados/resultadosThunk"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Drawer, FloatButton, Segmented } from "antd"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

type SegmentTypes = 'listado' | 'kanban' | 'gantt' | 'calendario'

export const OperativoView = () => {

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const [value, setValue] = useState<SegmentTypes>('listado');
    const [visible, setVisible] = useState<boolean>(false);
    const { currentOperativo, isLoadingObjetivo } = useAppSelector(state => state.operativos)

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
            label: 'Kanban',
            value: 'kanban',
            icon: <Icon iconName='faColumns' />
        }
    ]


    const handleNuevoResultado = () => {
        dispatch(createResultadoThunk(currentOperativo.id))
    }

    const handleClose = () => {
        setVisible(false)
        dispatch(clearObjetivoThunk())
    }

    useEffect(() => {
        if(id){
            dispatch(getOperativoThunk(id))
        }

        return () => {
            dispatch(clearObjetivoThunk())
        }
    }, [id])

    return (
        <>
            <div className='min-h-[500px]'>
                <p className="text-xs text-devarana-graph text-opacity-50"> Operativo </p>
                <h1>
                    { currentOperativo.nombre }
                </h1>
                <Segmented
                    className='my-4'
                    options={options}
                    value={value}
                    onChange={(value) => setValue(value as SegmentTypes)}
                />

                {
                    currentOperativo && (
                        <>
                            {
                                value === 'listado' && (
                                    <div>
                                        <ListadoOperativo currentOperativo={currentOperativo} setVisible={ () => {} } />
                                    </div>
                                )
                            }
                            {
                                value === 'gantt' && (
                                    <div>
                                        <p> Gantt </p>
                                    </div>
                                )
                            }
                            {
                                value === 'kanban' && (
                                    <div>
                                        <p> Kanban </p>
                                    </div>
                                )
                            }
                        </>
                    )

                }
            </div>

            <FloatButton
                onClick={() => handleNuevoResultado()}
                icon={<Icon iconName='faPlus' />}
            />

            
            <Drawer
                open={visible}
                onClose={handleClose}
                destroyOnClose={true}
                placement='right'
                width={600}
            >
                <FormAcciones />
            </Drawer>


        </>
    )
}
