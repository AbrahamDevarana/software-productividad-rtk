import React, { useEffect, useState } from 'react'
import { Avatar, Divider, Image, Modal } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { SinglePerfilProps } from '@/interfaces'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { FaArrowRight, FaEquals } from 'react-icons/fa'
import { getOperativosUsuarioThunk } from '@/redux/features/operativo/operativosThunk'
import { CardObjetivo } from '../CardObjetivo'
import { CardObjetivoSimple } from './CardObjetivoSimple'

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




	return (
		<>
			<div className='flex gap-10 p-5 border shadow-ext rounded-ext'>
				<Avatar src={<Image src={`${getStorageUrl(activeUsuario?.foto)}`} preview={false} fallback={getBrokenUser()} />} size={'large'}>
					{activeUsuario?.iniciales} 
				</Avatar>
				<div className='flex flex-col '>
					<h1>{activeUsuario.nombre} {activeUsuario.apellidoPaterno} {activeUsuario.apellidoMaterno}</h1>
					<p className='text-devarana-graph'>{activeUsuario.email}</p>
				</div>
			</div>

			<h1 className='p-5'>Objetivos</h1>

			<div className='grid grid-cols-12 gap-10' style={{
				height: 'calc(100vh - 200px)'
			}}>
				<div className='col-span-9 grid grid-cols-4 gap-10 hover:overflow-y-auto overflow-hidden p-2'>
					{

						operativosUsuario.map((operativo, index) => (
							<div className='p-5 rounded-ext shadow-ext' key={index}>
								<CardObjetivoSimple objetivo={operativo} usuarioId={activeUsuario.id} />
							</div>
						))
					}
				</div>
				<div className='col-span-3 row-span-3 flex overflow-y-auto px-2'>
					<Divider className='row-span-2 h-full' type='vertical' />
					<div className='w-full'>
						<table className='w-full'>
							<thead className='text-devarana-graph'>
								<tr>
									<th className='font-light text-left text-sm w-2/4'>Nombre</th>
									<th className='font-light text-center text-sm w-1/4'>Asignado</th>
									<th className='font-light text-center text-sm w-1/4'></th>
									<th className='font-light text-center text-sm w-1/4'>Nuevo</th>

								</tr>
							</thead>
							<tbody className='text-devarana-dark-graph'>
								<tr>
									<td>Objetivo 1</td>
									<td className='text-center'>25</td>
									<td className=''> <FaArrowRight className='mx-auto'/> </td>
									<td className='text-center'>35</td>
								</tr>
								<tr>
									<td>Objetivo 2</td>
									<td className='text-center'>75</td>
									<td className=''> <FaEquals className='mx-auto'/> </td>
									<td className='text-center'>45</td>
								</tr>
								<tr>
									<td>Objetivo 3</td>
									<td className='text-center'>0</td>
									<td className=''> <FaArrowRight className='mx-auto'/> </td>
									<td className='text-center'>20</td>
								</tr>

								<tr>
									<td>Total</td>
									<td className='text-center'>100</td>
									<td className=''> <FaEquals className='mx-auto'/> </td>
									<td className='text-center'>100</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			
		</>
	)
}
