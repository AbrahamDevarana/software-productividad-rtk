import { Icon } from "@/components/Icon"
import Loading from "@/components/antd/Loading"
import ListadoResultados from "@/components/resultados/ListadoResultados"
import { Proximamente } from "@/components/ui"
import { getStorageUrl } from "@/helpers"
import getBrokenUser from "@/helpers/getBrokenUser"
import { useOperativo } from "@/hooks/useOperativo"
import { clearObjetivoThunk, getOperativoThunk } from "@/redux/features/operativo/operativosThunk"
import { clearResultadoThunk, createResultadoThunk } from "@/redux/features/resultados/resultadosThunk"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Avatar, FloatButton, Image, Input, Segmented, Select, Tooltip } from "antd"
import { useEffect, useMemo, useState } from "react"
import { Link, useParams,  } from "react-router-dom"

type SegmentTypes = 'listado' | 'kanban' | 'gantt' | 'calendario'

export const OperativoView = () => {

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>()
    const [value, setValue] = useState<SegmentTypes>('listado');
    const { currentOperativo, isLoadingObjetivo } = useAppSelector(state => state.operativos)
    const { resultadosClave } = useAppSelector(state => state.resultados)
    const [ isCreating , setIsCreating ] = useState(false)

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

    const handleNuevoResultado = async () => {
        setIsCreating(true)
        await dispatch(createResultadoThunk({operativoId: currentOperativo.id})).unwrap().then((data) => {
            const element = document.getElementById(`resultado-${data.id}`)
            element?.classList.add('ant-collapse-item-active')
            element?.scrollIntoView({behavior: 'smooth'})
        })
        setIsCreating(false)
        
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

    const {orderedResponsables, statusObjetivo, progresoReal} = useOperativo({objetivo: currentOperativo})  
    
    const isClosed = useMemo(() => {
        return currentOperativo.status === 'CERRADO'
    }, [currentOperativo])    
    
    
    if(isLoadingObjetivo) return <Loading />
    
    return (
        <>
            <div className="mb-2">
                <Link to='/objetivos' className='text-devarana-midnight text-sm'> <Icon iconName='faArrowLeft' /> Regresar </Link>
            </div>

            <div className='min-h-[500px]'>
                <div className="flex w-full items-center px-5 py-5 relative border justify-between rounded-ext shadow-ext bg-devarana-pearl flex-row gap-x-2">
                    <div>
                        <p className="text-base text-devarana-graph text-opacity-50"> Objetivo </p>
                        <h1 className="text-2xl">
                            { currentOperativo.nombre }
                        </h1>
                        <p className="text-devarana-graph text-xs line-clamp-3">
                            {
                                currentOperativo.meta
                            }
                        </p>
                    </div>

                    <div className="ml-auto flex items-center align-middle flex-col">
                        <p className="text-xs text-devarana-graph text-opacity-50 block pb-2"> Responsables </p>
                        <Avatar.Group maxCount={3} className='flex justify-center' maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}>
                            {
                                orderedResponsables?.map((responsable, index) => (
                                    <Link key={index} to={`/perfil/${responsable?.slug}`} className={`border-2 rounded-full ${responsable?.scoreCard.propietario === true ? 'border-devarana-pink' : '' }`}>
                                        <Tooltip title={`${responsable?.nombre} ${responsable?.apellidoPaterno}`} placement='top' key={index} >
                                            <Avatar key={index} src={<Image src={`${getStorageUrl(responsable?.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                                {responsable?.iniciales} 
                                            </Avatar>
                                        </Tooltip>
                                    </Link>
                                ))
                            }
                        </Avatar.Group>
                    </div>
                    <div className="absolute -bottom-0.5 left-0 h-3 bg-gradient-to-r  from-primary to-primary-light text-right rounded-bl-ext rounded-br-ext"
                    style={{
                        width: `${Math.min(progresoReal + 5, 100)}%`
                    }}
                    >
                        <p className="text-white -translate-x-3 -translate-y-0.5 text-xs">{Math.min(progresoReal, 100)}%</p>

                    </div>
                </div>
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
                                        <ListadoResultados currentOperativo={currentOperativo} isClosed={isClosed}/>
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

            {
                resultadosClave && resultadosClave.length > 0 && !isClosed && (
                    (
                        <FloatButton
                            onClick={() => {
                                isCreating ? null :
                                handleNuevoResultado()
                            }}
                            icon={<Icon iconName='faPlus' />}
                            type="primary"
                        />
                    )
                )
            }

        </>
    )
}
