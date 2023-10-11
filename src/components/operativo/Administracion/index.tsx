import { useEffect, useMemo } from 'react'
import { Avatar, Divider, Image, Modal, Popconfirm, Skeleton, Spin, Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { SinglePerfilProps } from '@/interfaces'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { cierreCicloThunk, getOperativosUsuarioThunk } from '@/redux/features/operativo/operativosThunk'
import { CardObjetivoSimple } from './CardObjetivoSimple'
import { useObjetivo } from '@/hooks/useObjetivos'
import { Button } from '@/components/ui'
import { getEvaluacionResultadosLiderThunk } from '@/redux/features/evaluaciones/evaluacionesThunk'
import { Rating } from 'react-simple-star-rating'

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

	const { confirm } = Modal;


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


	const promedioOjetivos = useMemo(() => {
		// 100 es a 90% como promedio es a x
		const total = (ponderacionObjetivos * 90) / 100
		return total
	}, [ponderacionObjetivos])

	const promedioEvaluaciones = useMemo(() => {
		return resultadoMisEvaluaciones.reduce((acc, evaluacion) => acc + evaluacion.resultado, 0) / resultadoMisEvaluaciones.length || 0
	}, [resultadoMisEvaluaciones])

	const ponderacionEvaluciones = useMemo(() => {
		// 5 es a 100 como promedioEvaluaciones es a x
		return  (promedioEvaluaciones * 100) / 5
	}, [promedioEvaluaciones])



	const evaluacionesCheck = useMemo(() => {
		if(resultadoMisEvaluaciones.length === 0 || resultadoMisEvaluados.length === 0) return false
		const evaluaciones = resultadoMisEvaluaciones.every(evaluacion => evaluacion.status === true)
		const evaluados = resultadoMisEvaluados.every(evaluacion => evaluacion.status === true)
		return evaluaciones && evaluados
	}, [resultadoMisEvaluaciones, resultadoMisEvaluados])

	const allClosed = useMemo(() => {
		if(operativosUsuario.length === 0) return false
		const operativos = operativosUsuario.every(operativo => operativo.operativosResponsable.find(responsable => responsable.id === activeUsuario.id)?.scoreCard.status === 'APROBADO')
		const evaluaciones = evaluacionesCheck
		return operativos && evaluaciones
	}, [operativosUsuario])

	const mesInicio = useMemo(() => {
		switch (quarter) {
			case 1:
				return 'ENE'
			case 2:
				return 'ABR'
			case 3:
				return 'JUL'
			case 4:
				return 'OCT'
			default:
				return ''
		}
	}, [quarter])

	const mesFin = useMemo(() => {
		switch (quarter) {
			case 1:
				return 'MAR'
			case 2:
				return 'JUN'
			case 3:
				return 'SEP'
			case 4:
				return 'DIC'
			default:
				return ''
		}
	}, [quarter])


	const handleCierraObjetivos = () => {

		confirm({
			title: <h1> Cerrar Objetivos </h1>,
			content: 'Una vez cerrados los objetivos no podrán ser modificados',
			okText: 'Si, Cerrar',
			okButtonProps: { 
				type: 'default',
			 },
			cancelText: 'Cancelar',
			onOk() {
				dispatch(cierreCicloThunk({usuarioId: activeUsuario.id, year, quarter}))
			},
			onCancel() {
				console.log('Cancel');
			},
		});

	}

	if(isLoadingOperativosUsuario) return (<div className='h-96 flex items-center justify-center'> <Spin /> </div>)

	return (
		<div className="overflow-y-auto"
			style={{
				height: 'calc(100vh - 200px)'
			}}
			>
			<div className='flex gap-x-10 p-5 border shadow-ext rounded-ext justify-between bg-gradient-to-tr from-dark to-dark-light'>
				<div className='flex gap-x-5 items-center'>
					<div className='text-center'>
						<h1 className='font-light text-white'>Trimestre </h1>
						<p className='text-white'>{mesInicio} - {mesFin}</p>
						<p className='text-white'>{year}</p>
					</div>
					<Divider className='h-full bg-white' type='vertical' />
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
								promedioOjetivos.toFixed(2) 
							} %
						</p>
					</div>
					<div>
						<h2 className='font-light text-lg text-white text-center'>Competencias Soft: </h2>
						<p className='text-2xl text-white text-center'>
							{
								ponderacionEvaluciones.toFixed(2)
							} %
						</p>
					</div>
					<div>
						<h2 className='font-light text-lg text-white text-center'>Resultado Final: </h2>
						<p className='text-2xl text-white text-center'>
							{
								(promedioOjetivos + promedioEvaluaciones).toFixed(2)
							} %
						</p>
					</div>
					
				</div>
			</div>
			<div className='grid grid-cols-12 items-start' style={{
				height: 'calc(100vh - 315px)'
			}} >

		
								
				<div className='md:col-span-8 col-span-12  p-5 overflow-y-auto '
				>
					<h1 className='font-bold text-primary pb-2'> Objetivos </h1>
					<div className='grid grid-cols-12 gap-5'>
						{
							operativosUsuario.map((operativo, index) => (
								<div className='p-5 rounded-ext shadow-ext col-span-4 max-h-[350px]' key={index}>
									<CardObjetivoSimple objetivo={operativo} activeUsuario={activeUsuario} />
								</div>
							))
						}
					</div>

				</div>
				<div className='md:col-span-4 col-span-12 p-5 overflow-y-auto px-2 '>
					<h1 className='font-bold text-primary pb-2'> Competencias Soft </h1>
					<div className='flex gap-x-10'>
						<Divider className='h-full' type='vertical' />
						<div className='w-full'>
							<div className='overflow-y-auto pb-10'>
								
								<div className='text-center pb-5'>
									<Tooltip title={promedioEvaluaciones} >
										<Rating initialValue={Number(promedioEvaluaciones)} readonly allowFraction transition emptyStyle={{ display: "flex" }} fillStyle={{ display: "-webkit-inline-box" }}/>
									</Tooltip>
								</div>
								
								<table className='w-full'>
									<thead className='text-devarana-dark-graph'>
										<tr>
											<th className='w-2/4'>Mis Evaluadores</th>
											<th className='w-2/4'></th>
										</tr>
									</thead>
									<tbody>
									{
										resultadoMisEvaluaciones.map((evaluacion, index) => (
											<tr key={index} className='text-devarana-graph'>
												<td>{evaluacion.evaluador}</td>
												<td> {evaluacion.status ? <p className='text-green-500'> Completado </p> : <p className='text-red-500'> Pendiente </p>}  </td>
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
											<th className='w-2/4'></th>
										</tr>
									</thead>
									<tbody>
									{
										resultadoMisEvaluados.map((evaluacion, index) => (
											<tr key={index} className='text-devarana-graph'>
												<td>{evaluacion.evaluado}</td>
												<td> {evaluacion.status ? <p className='text-green-500'> Completado </p> : <p className='text-red-500'> Pendiente </p>}  </td>
											</tr>
											))	
										}
									</tbody>
								</table>							
							</div>
							<Divider className='my-5' />
							<div className="flex items-center">
								<Button 
									disabled={!allClosed} 
									classColor='dark' classType='regular' onClick={handleCierraObjetivos} >
									Autorizar Cierre de Objetivos
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
