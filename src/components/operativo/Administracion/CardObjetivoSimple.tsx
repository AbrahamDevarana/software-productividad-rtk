import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { OperativoProps } from '@/interfaces'
import { objetivosTypes } from '@/types'
import { Avatar, Image, Modal, Tooltip } from 'antd'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ObjetivoPreview from './ObjetivoPreview'
import { FaEye } from 'react-icons/fa'

interface Props {
    objetivo: OperativoProps
    usuarioId: string
}

export const CardObjetivoSimple = ({objetivo, usuarioId}: Props) => {

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

    const statusObjetivo = objetivo.operativosResponsable.find(responsable => responsable.id === usuarioId)?.scoreCard.status || 'ABIERTO'

    return (
        <>
            <div className=''>
                <h1 className='text-center '>{ objetivo.nombre }</h1>

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
                        <p className='text-devarana-dark-graph font-light'>Estatus: </p>
                        <p className='text-devarana-graph font-bold uppercase'>
                            {
                                objetivosTypes[statusObjetivo]
                            }
                        </p>
                    </div>
                    <div className='flex justify-center gap-x-10'>
                            <button className='btn btn-devarana-primary' onClick={handleOpenModaObjetivo}>
                                <FaEye className='mr-2 text-devarana-graph' />
                            </button>
                    </div>        
                </div>

            </div>

            <Modal
				title='Objetivo View 1'
				open={isModalObjetivoVisible}
				onCancel={handleCloseModalObjetivo}
				destroyOnClose={true}
				footer={null}
				width={window.innerWidth > 1200 ? 'CALC(95% - 90px)' : '100%' }
				style={{
					top: 60,
					left: 35,
					bottom: 0,
					height: 'calc(100% - 100px)',
					overflowY: 'hidden',
					borderRadius: '10px'
				}}
			>
				<ObjetivoPreview objetivo={objetivo} />
			</Modal>
        </>
    )
    }
