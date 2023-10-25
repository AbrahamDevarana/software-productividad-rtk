import { getColor, getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { OperativoProps, SinglePerfilProps } from '@/interfaces'
import { objetivosTypes, statusType, statusTypes } from '@/types'
import { Avatar, Image, Modal, Progress, Spin, Switch, Tooltip } from 'antd'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ObjetivoPreview from './ObjetivoPreview'
import { FaEye } from 'react-icons/fa'
import { useOperativo } from '@/hooks/useOperativo'
import { useAppDispatch } from '@/redux/hooks'
import { cierreObjetivoLiderThunk } from '@/redux/features/operativo/operativosThunk'
import { useOthersOperativo } from '@/hooks/useOthersOperativo'
import { ProgressBar } from '@/components/complexUI/ProgressDoughtnut'
import CountUp from 'react-countup';

interface Props {
    objetivo: OperativoProps
    activeUsuario:  SinglePerfilProps
    isLeader: boolean
}

export const CardObjetivoSimple = ({objetivo, activeUsuario, isLeader}: Props) => {

    const dispatch = useAppDispatch()
    const [ isUpdating, setIsUpdating ] = useState(false)

    const [ isModalObjetivoVisible, setIsModalObjetivoVisible ] = useState(false)
    const handleOpenModaObjetivo = () => {
        setIsModalObjetivoVisible(true)
    }

    const handleCloseModalObjetivo = () => {
        setIsModalObjetivoVisible(false)
    }

    const orderedResponsables = useMemo(() => {
        const responsables = objetivo.operativosResponsable
        // poner primero al responsable.propietario === true
        const responsablePropietario = responsables.find(responsable => responsable.scoreCard.propietario === true)
        const responsablesSinPropietario = responsables.filter(responsable => responsable.scoreCard.propietario === false)
        return [responsablePropietario, ...responsablesSinPropietario]
    }, [objetivo.operativosResponsable])

    const statusObjetivo = useMemo(() => {
        return objetivo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.status || 'ABIERTO'
    }, [objetivo.operativosResponsable, activeUsuario.id])


    const { progresoReal, progresoAsignado, firstColor, secondColor } = useOthersOperativo({objetivo, usuarioId: activeUsuario.id})

    const aprovacionObjetivo = (checked :boolean) => {
        setIsUpdating(true)
        dispatch(cierreObjetivoLiderThunk({objetivoId: objetivo.id, checked, usuarioId: activeUsuario.id})).unwrap().then(() => {
            setIsUpdating(false)
        })
    }

    return (
        <>
            <div className=''>
                <div className='h-10 flex items-center justify-center'>
                    <Tooltip title={objetivo.nombre} >
                        <h1 className='text-center' style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>{ objetivo.nombre }</h1>
                    </Tooltip>
                </div>

                <div className='py-5'>
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

                    <div className='text-center py-5'>
                        <Progress type='line' percent={Number(progresoReal.toFixed(2))} 
                            strokeColor={{
                                '0%': firstColor,
                                '50%': firstColor,
                                // '100%': secondColor,
                            }}  
                            format={() => <CountUp className='text-devarana-graph text-[10px]' end={progresoReal} duration={1} suffix='%' decimals={2} decimal='.' />}
                        /> 
                        <p className='text-devarana-graph'>
                            Ponderación: <span>{ progresoAsignado.toFixed(2) }%</span>
                        </p>
                        <p className='text-devarana-dark-graph font-light'>Estatus: </p>
                        <div className='flex items-center justify-center gap-2 px-2 py-1 rounded-full min-w-[100px]'>

                            {
                                  isUpdating ? <Spin/> : (
                                   <>

                                    <div style={{ 
                                        backgroundColor: getColor(statusObjetivo).color,
                                        width: '6px',
                                        height: '6px',
                                        borderRadius: '25%'
                                    }}  
                                    />
                                    <p style={{
                                        color: getColor(statusObjetivo).color,
                                        fontWeight: 600
    
                                    }}> {objetivosTypes[statusObjetivo]}</p>
                                   </>
                                )
                            }
                            </div>
                        </div>
                            <div className='flex justify-center gap-x-10'>  
                            {
                                true && (
                                    <button className='btn btn-devarana-primary' onClick={handleOpenModaObjetivo}>
                                        <FaEye className='mr-2 text-devarana-graph' />
                                    </button>
                                    )
                            }
                            {
                                isLeader && (
                                <Switch
                                    onChange={ aprovacionObjetivo }
                                    disabled={ isUpdating || ( statusObjetivo !== 'APROBADO' && statusObjetivo !== 'PENDIENTE_APROBACION' )}
                                    defaultChecked={ statusObjetivo === 'APROBADO' }
                                    />
                                )
                            }
                            
                        </div> 
                </div>

            </div>

            <Modal
				open={isModalObjetivoVisible}
				onCancel={handleCloseModalObjetivo}
				destroyOnClose={true}
				footer={null}
				width={window.innerWidth > 1200 ? 'CALC(95% - 90px)' : '100%' }
                className='bg-devarana-background'
				style={{
					top: 100,
					left: 35,
					bottom: 0,
                    padding: 0,
					height: 'calc(100% - 150px)',
					overflowY: 'hidden',
					borderRadius: '10px'
				}}
			>
				<ObjetivoPreview objetivo={objetivo} activeUsuario={activeUsuario} />
			</Modal>
        </>
    )
    }
