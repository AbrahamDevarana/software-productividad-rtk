import { Icon } from "@/components/Icon"
import { FormAcciones } from "@/components/acciones/FormAcciones"
import Loading from "@/components/antd/Loading"
import ListadoResultados from "@/components/resultados/ListadoResultados"
import { Proximamente } from "@/components/ui"
import { getStorageUrl } from "@/helpers"
import getBrokenUser from "@/helpers/getBrokenUser"
import { clearObjetivoThunk, getOperativoThunk } from "@/redux/features/operativo/operativosThunk"
import { clearResultadoThunk, createResultadoThunk } from "@/redux/features/resultados/resultadosThunk"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Avatar, Drawer, FloatButton, Image, Segmented, Tooltip } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useParams,  } from "react-router-dom"

type SegmentTypes = 'listado' | 'kanban' | 'gantt' | 'calendario'

export const OperativoView = () => {

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const [value, setValue] = useState<SegmentTypes>('listado');
    const [visible, setVisible] = useState<boolean>(false);
    const { currentOperativo, isLoadingObjetivo } = useAppSelector(state => state.operativos)

    // get sate from Link react-router-dom

    const location = useLocation()


    const options = [
        {
            label: 'Resultados Clave',
            value: 'listado',
            icon: <Icon iconName='faList' />
        },
        {
            label: 'Kanban',
            value: 'kanban',
            icon: <Icon iconName='faColumns' />
        },
        {
            label: 'Gantt',
            value: 'gantt',
            icon: <Icon iconName='faChartGantt' />
        },
    ]


    const handleNuevoResultado = () => {
        dispatch(createResultadoThunk({operativoId: currentOperativo.id}))
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
            dispatch(clearResultadoThunk())
        }
    }, [id])

    if(isLoadingObjetivo) return <Loading />

    return (
        <>
            <div className='min-h-[500px]'>
                <div className="flex w-full items-center px-5 py-5 relative border rounded-ext shadow-ext">
                    <div>
                        <p className="text-base text-devarana-graph text-opacity-50"> Objetivo </p>
                        <h1 className="text-2xl">
                            {/* { currentOperativo.nombre } */}
                            Implementación de software CRM Salesforce
                        </h1>
                    </div>

                    <div className="ml-auto flex items-center align-middle flex-col">
                        <p className="text-xs text-devarana-graph text-opacity-50 block pb-2"> Responsables </p>
                        <Avatar.Group className=''>
                        {
                            currentOperativo.operativosResponsable.map((participante) => (
                                <Tooltip key={participante.id} title={`${participante.nombre} ${participante.apellidoPaterno}`}>
                                    <Avatar src={<Image src={`${getStorageUrl(participante.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                        {participante.iniciales}
                                    </Avatar>
                                </Tooltip>
                            ))
                        }
                        </Avatar.Group>
                    </div>
                    <div className="absolute -bottom-0.5 left-0 h-3 bg-gradient-to-r  from-primary to-primary-light text-right rounded-bl-ext rounded-br-ext"
                    style={{
                        width: `75%`
                    }}
                    >
                        <p className="text-white -translate-x-3 -translate-y-0.5 text-xs">75%</p>

                    </div>
                </div>
                <Segmented
                    className='my-4 px-5'
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
                                        <ListadoResultados currentOperativo={currentOperativo} setVisible={ () => {} } />
                                    </div>
                                )
                            }
                            {
                                value === 'gantt' && (
                                    <Proximamente avance={78} />
                                )
                            }
                            {
                                value === 'kanban' && (
                                    <Proximamente avance={55} />
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
