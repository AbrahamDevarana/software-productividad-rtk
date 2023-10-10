import React, { useEffect, useMemo, useState } from 'react'
import { Avatar, Divider, Image, Modal, Skeleton, Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { SinglePerfilProps } from '@/interfaces'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { FaArrowRight, FaCheck, FaEquals, FaTimes } from 'react-icons/fa'
import { getOperativosUsuarioThunk } from '@/redux/features/operativo/operativosThunk'
import { CardObjetivo } from '../CardObjetivo'
import { CardObjetivoSimple } from './CardObjetivoSimple'
import { useOperativo } from '@/hooks/useOperativo'
import { useObjetivo } from '@/hooks/useObjetivos'
import { Button } from '@/components/ui'
import { getEvaluacionResultadosLiderThunk } from '@/redux/features/evaluaciones/evaluacionesThunk'

interface Props {
	activeUsuario: SinglePerfilProps
}

export const Administracion = ({activeUsuario}:Props) => {
	
	const { year, quarter } = useAppSelector(state => state.global.currentConfig)

	const { operativosUsuario, isLoadingOperativosUsuario } = useAppSelector(state => state.operativos)
	const { evaluacionResultados, evaluacionResultadosColaboradores } = useAppSelector(state => state.evaluaciones)

	const dispatch = useAppDispatch()

	useEffect(() => {
		if(!activeUsuario) return
		dispatch(getOperativosUsuarioThunk({usuarioId: activeUsuario.id, year, quarter}))
		dispatch(getEvaluacionResultadosLiderThunk({usuarioId: activeUsuario.id, year, quarter}))
	}, [activeUsuario])

	const { ponderacionObjetivos } = useObjetivo({operativos: operativosUsuario})



	const resultadoMisEvaluaciones = useMemo(() => {
		return evaluacionResultados.map(evaluacion => {
		 	return {
				evaluador: evaluacion.evaluador.nombre + ' ' + evaluacion.evaluador.apellidoPaterno,
				resultado: ( evaluacion.evaluacion_respuesta.reduce((acc, respuesta) => acc + respuesta.resultado, 0)) / evaluacion.evaluacion_respuesta.length || 0,
				status: evaluacion.evaluacion_respuesta.length > 0 ? evaluacion.evaluacion_respuesta?.every(respuesta => respuesta.status === true) : false
				
			}
		})
	}, [evaluacionResultados])


	const resultadoMisEvaluados = useMemo(() => {
		return evaluacionResultadosColaboradores.map(evaluacion => {
		 	return {
				evaluado: evaluacion.evaluado.nombre + ' ' + evaluacion.evaluado.apellidoPaterno,
				resultado: ( evaluacion.evaluacion_respuesta.reduce((acc, respuesta) => acc + respuesta.resultado, 0)) / evaluacion.evaluacion_respuesta.length || 0,
				status: evaluacion.evaluacion_respuesta.length > 0 ? evaluacion.evaluacion_respuesta?.every(respuesta => respuesta.status === true) : false
			}
		})
	}, [evaluacionResultados])


	const puntajeEvaluaciones = useMemo(() => {
		return resultadoMisEvaluaciones.reduce((acc, evaluacion) => acc + evaluacion.resultado, 0) / resultadoMisEvaluaciones.length || 0
	}, [resultadoMisEvaluaciones])


	const evaluacionesCheck = useMemo(() => {
		if(resultadoMisEvaluaciones.length === 0 || resultadoMisEvaluados.length === 0) return false
		const evaluaciones = resultadoMisEvaluaciones.every(evaluacion => evaluacion.status === true)
		const evaluados = resultadoMisEvaluados.every(evaluacion => evaluacion.status === true)
		return evaluaciones && evaluados
	}, [resultadoMisEvaluaciones, resultadoMisEvaluados])

	const allClosed = useMemo(() => {
		if(operativosUsuario.length === 0) return false
		const operativos = operativosUsuario.every(operativo => operativo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.status === 'PENDIENTE_APROBACION')
		const evaluaciones = evaluacionesCheck
		return operativos && evaluaciones
	}, [operativosUsuario])



	if(isLoadingOperativosUsuario) return <Skeleton paragraph={{ rows: 8 }} />

	return (
		<div className='p-5'>
			<div className='flex gap-x-10 p-5 border shadow-ext rounded-ext justify-between bg-gradient-to-tr from-dark to-dark-light'>
				<div className='flex gap-x-10 items-center'>
					<Avatar src={<Image src={`${getStorageUrl(activeUsuario?.foto)}`} preview={false} fallback={getBrokenUser()} />} size={'large'}>
						{activeUsuario?.iniciales} 
					</Avatar>
					<div className='flex flex-col'>
						<h1 className='font-bold text-white'>{activeUsuario.nombre} {activeUsuario.apellidoPaterno} {activeUsuario.apellidoMaterno}</h1>
						<p className='text-white'>{activeUsuario.email}</p>
					</div>
				</div>
				<div className='flex items-center gap-x-3'>
					<div>
						<h2 className='font-light text-lg text-white t'>Objetivos: </h2>
						<p className='text-2xl text-white text-center'>
							{
								ponderacionObjetivos.toFixed(2)
							}
						</p>
					</div>
					<div>
						<h2 className='font-light text-lg text-white text-center'>Competencias: </h2>
						<p className='text-2xl text-white text-center'>
							{
								puntajeEvaluaciones.toFixed(2)
							}
						</p>
					</div>
					<div>
						<h2 className='font-light text-lg text-white text-center'>Resultado: </h2>
						<p className='text-2xl text-white text-center'>
							{
								(ponderacionObjetivos + puntajeEvaluaciones).toFixed(2)
							}
						</p>
					</div>
					
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
							<table className='w-full'>
								<thead className='text-devarana-dark-graph'>
									<tr>
										<th className='w-2/4'>Mis Evaluadores</th>
										<th className='w-1/4'>Resultado</th>
										<th className='w-1/4'>Status</th>
									</tr>
								</thead>
								<tbody>
								{
									resultadoMisEvaluaciones.map((evaluacion, index) => (
										<tr key={index} className='text-devarana-graph'>
											<td>{evaluacion.evaluador}</td>
											<td className='text-center'>{evaluacion?.resultado.toFixed(2) || 0 }</td>
											<td> {evaluacion.status ? <FaCheck className="text-green-500 mx-auto" /> : <FaTimes className="text-red-500 mx-auto" />}  </td>
										</tr>
										))	
									}
								</tbody>
							</table>		
							<Divider className='my-5' />					
							<table className='w-full'>
								<thead className='text-devarana-graph'>
									<tr>
										<th className='w-2/4'>Mis Evaluados</th>
										<th className='w-1/4'>Resultado</th>
										<th className='w-1/4'>Status</th>
									</tr>
								</thead>
								<tbody>
								{
									resultadoMisEvaluados.map((evaluacion, index) => (
										<tr key={index} className='text-devarana-graph'>
											<td>{evaluacion.evaluado}</td>
											<td className='text-center'>{evaluacion?.resultado.toFixed(2) || 0 }</td>
											<td> {evaluacion.status ? <FaCheck className="text-green-500 mx-auto" /> : <FaTimes className="text-red-500 mx-auto" />}  </td>
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
