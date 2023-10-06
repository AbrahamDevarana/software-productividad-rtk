import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Divider, Image, Modal, Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { SinglePerfilProps } from '@/interfaces'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { FaArrowRight, FaEquals } from 'react-icons/fa'
import { getOperativosUsuarioThunk } from '@/redux/features/operativo/operativosThunk'
import { CardObjetivo } from '../CardObjetivo'
import { CardObjetivoSimple } from './CardObjetivoSimple'
import { useOperativo } from '@/hooks/useOperativo'
import { useObjetivo } from '@/hooks/useObjetivos'
import { Button } from '@/components/ui'

interface Props {
	activeUsuario: SinglePerfilProps
}

export const Administracion = ({activeUsuario}:Props) => {
	
	const { year, quarter } = useAppSelector(state => state.global.currentConfig)

	const { operativosUsuario, isLoadingOperativosUsuario } = useAppSelector(state => state.operativos)




	const dispatch = useAppDispatch()

	useEffect(() => {
		if(!activeUsuario) return
		dispatch(getOperativosUsuarioThunk({usuarioId: activeUsuario.id, year, quarter}))
	}, [activeUsuario,])

	const { ponderacionObjetivos } = useObjetivo({operativos: operativosUsuario})

	const allClosed = useMemo(() => {
		return operativosUsuario.every(operativo => operativo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.status === 'PENDIENTE_APROBACION')

	}, [operativosUsuario])

	return (
		<div className='p-5'>
			<div className='flex gap-x-10 p-5 border shadow-ext rounded-ext justify-between bg-gradient-to-tr from-dark to-dark-light'>
				<div className='flex gap-x-10'>
					<Avatar src={<Image src={`${getStorageUrl(activeUsuario?.foto)}`} preview={false} fallback={getBrokenUser()} />} size={'large'}>
						{activeUsuario?.iniciales} 
					</Avatar>
					<div className='flex flex-col'>
						<h1 className='font-bold text-white'>{activeUsuario.nombre} {activeUsuario.apellidoPaterno} {activeUsuario.apellidoMaterno}</h1>
						<p className='text-white'>{activeUsuario.email}</p>
					</div>
				</div>
				<div className='flex items-center gap-x-3'>
					<h2 className='font-light text-lg text-white'>Avance total: </h2>
					<p className='text-2xl text-white'>
						{
							ponderacionObjetivos
						}
					</p>
				</div>
			</div>

			<h1 className='p-5'>Objetivos</h1>
			<div className='grid grid-cols-12' >
				<div className='md:col-span-8 col-span-12 grid grid-cols-12 gap-5 p-5 overflow-y-auto max-h-[600px]'
				>
					{
						operativosUsuario.map((operativo, index) => (
							<div className='p-5 rounded-ext shadow-ext col-span-4 max-h-[350px]' key={index}>
								<CardObjetivoSimple objetivo={operativo} activeUsuario={activeUsuario} />
							</div>
						))
					}

				</div>
				<div className='md:col-span-4 col-span-12 overflow-y-auto px-2 flex gap-x-10'>
					<Divider className='h-full' type='vertical' />
					<div className='w-full'>
						<div className='h-full max-h-[60%] overflow-y-auto'>
							<table className='w-full '>
								<thead className='text-devarana-graph'>
									<tr>
										<th className='font-light text-left text-sm w-2/4'>Nombre</th>
										<th className='font-light text-center text-sm w-1/4'>Asignado</th>
										<th className='font-light text-center text-sm w-1/4'></th>
										<th className='font-light text-center text-sm w-1/4'>Real</th>

									</tr>
								</thead>
								<tbody className='text-devarana-dark-graph items-start'>
									{
										operativosUsuario.map((operativo, index) => (
											<tr className='border-b border-dashed' key={index}>
												<td className='py-2'> { operativo.nombre } </td>
												<td className='text-center'>{ operativo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.progresoAsignado }</td>
												<td className='text-center'><FaArrowRight className='mx-auto' /></td>
												<td className='text-center'>
													{ operativo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.progresoReal }
												</td>
											</tr>
										))
									
									}
								</tbody>
							</table>
						</div>
						<Divider className='my-5' />
						<div className="flex items-center">
							<Button disabled={!allClosed} classColor='dark' classType='regular' >
								Autorizar Cierre de Objetivos
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
