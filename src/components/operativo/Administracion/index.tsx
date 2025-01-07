import { useEffect, useMemo, useState } from 'react'
import { Avatar, Divider, Image, Modal, Spin, Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { SinglePerfilProps } from '@/interfaces'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { cierreCicloThunk, getOperativosUsuarioThunk } from '@/redux/features/operativo/operativosThunk'
import { CardObjetivoSimple } from './CardObjetivoSimple'
import { Button } from '@/components/ui'
import { getEvaluacionResultadosLiderThunk } from '@/redux/features/evaluaciones/evaluacionesThunk'
import { Rating } from 'react-simple-star-rating'
import { useOtherObjetivo } from '@/hooks/useOthersObjetivos'
import { usePonderaciones } from '@/hooks/usePonderaciones'
import {getMesFin, getMesInicio} from '@/helpers'
import { ResultadosCompetencias } from '../ResultadosCompetencias'
import { IoIosEye } from 'react-icons/io'
import useCalculoBono from '@/hooks/useBono'

interface Props {
	activeUsuario: SinglePerfilProps
	isLeader: boolean
}	

export const Administracion = ({activeUsuario, isLeader}:Props) => {
	
	const { year, quarter } = useAppSelector(state => state.global.currentConfig)

	const { operativosUsuario, isLoadingOperativosUsuario, isClosingCicle } = useAppSelector(state => state.operativos)
	const { evaluacionResultados, evaluacionResultadosColaboradores } = useAppSelector(state => state.evaluaciones)
	const [ isModalVisible, setIsModalVisible ] = useState(false)
	
	

	const dispatch = useAppDispatch()

	useEffect(() => {
		if(!activeUsuario) return
		dispatch(getOperativosUsuarioThunk({usuarioId: activeUsuario.id, year, quarter}))
		dispatch(getEvaluacionResultadosLiderThunk({usuarioId: activeUsuario.id, year, quarter}))
	}, [activeUsuario])

	const { confirm } = Modal;
	const { ponderacionObjetivos } = useOtherObjetivo({operativos: operativosUsuario, usuarioId: activeUsuario.id})
	const { resultadoMisEvaluaciones, resultadoMisEvaluados, ponderacionEvaluciones, promedioOjetivos, finalEvaluaciones, promedioEvaluaciones } = usePonderaciones({evaluacionResultados, evaluacionResultadosColaboradores, ponderacionObjetivos})


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

	const mesInicio = getMesInicio(quarter)
	const mesFin = getMesFin(quarter)
	

	const objetivosId = useMemo(() => {
		return operativosUsuario.map(operativo => operativo.id)
	}, [operativosUsuario])


	const handleCierraObjetivos = () => {

		confirm({
			title: <h1 className='text-devarana-dark-graph'> Autorizar Cierre </h1>,
			content: <p className='text-devarana-graph'>Toma en cuenta que una vez que hayas aprobado los objetivos de <span className='font-medium'>{ activeUsuario.nombre } { activeUsuario.apellidoPaterno }</span> y autorices el cierre, ya no podrán ser modificados.</p>,
			okText: 'Autorizar',
			width: 800,
			okButtonProps: {
				danger: true	
			},
			cancelText: 'Cancelar',
			onOk() {
				dispatch(cierreCicloThunk({usuarioId: activeUsuario.id, year, quarter, objetivosId}))
			},
			onCancel() {
				
			},
		})
	}

	const calculoBono = useCalculoBono(promedioOjetivos + finalEvaluaciones)


	const orderedObjetivos = useMemo(() => {
		return operativosUsuario
			.filter(item => item.operativosResponsable && item.operativosResponsable.length > 0) // Filtrar los elementos con operativosResponsable definido y no vacío
			.sort((a, b) => {
				const aResponsable = a.operativosResponsable.find(item => item.id === activeUsuario.id);
				const bResponsable = b.operativosResponsable.find(item => item.id === activeUsuario.id);
	
				// Comprobar si aResponsable y bResponsable son definidos antes de comparar
				if (aResponsable && bResponsable) {
					return  bResponsable.scoreCard.progresoAsignado - aResponsable.scoreCard.progresoAsignado ; // Reemplaza someProperty con la propiedad que deseas comparar
				}
	
				// Si aResponsable o bResponsable son undefined, colócalos al final del arreglo
				if (aResponsable) {
					return -1;
				}
				if (bResponsable) {
					return 1;
				}
	
				return 0; // Ambos son undefined, mantener el orden original
			});
	}, [operativosUsuario, activeUsuario]);
	

	if(isLoadingOperativosUsuario) return (<div className='h-96 flex items-center justify-center'> <Spin /> </div>)

	return (
		<div className="overflow-y-auto mt-5"
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
				<div className='flex items-center gap-x-4'>
					<div>
						<h2 className='font-light text-lg text-white'>Objetivos: </h2>
						<p className='text-xl text-white text-center'>
							{
								Math.trunc(ponderacionObjetivos * 100) / 100
							} %
						</p>
						<p className='text-[9px] text-white mx-auto text-center leading-none'> Representa el 90%</p>
					</div>
					<div>
						<h2 className='font-light text-lg text-white text-center'>Competencias Soft: </h2>
						<p className='text-xl text-white text-center'>
							{
								Math.trunc(ponderacionEvaluciones * 100) / 100
							} %
						</p>
						<p className='text-[9px] text-white mx-auto text-center leading-none'> Representa el 10%</p>
					</div>
					<div>
						<h2 className='font-light text-lg text-white text-center'>Resultado Final: </h2>
						<p className='text-xl text-white text-center'>
							{
								Math.trunc((promedioOjetivos + finalEvaluaciones) * 100) / 100
							} %
						</p>
						<p className="invisible text-[9px] text-white mx-auto text-center leading-none">100%</p>
					</div>
					<div>
						<h2 className='font-light text-lg text-white text-center'>Bono: </h2>
						<p className='text-xl text-white text-center'>
							{
								calculoBono
							} %
						</p>
						<p className="invisible text-[9px] text-white mx-auto text-center leading-none">100%</p>
					</div>
					
				</div>
			</div>
			<div className='grid grid-cols-12 items-start' style={{
				height: 'calc(100vh - 315px)'
			}} >							
				<div className='md:col-span-8 col-span-12 p-5 overflow-y-auto '
				>
					<h1 className='font-bold text-primary pb-2'> Objetivos </h1>
					<div className='grid grid-cols-12 gap-5'>
						{
							orderedObjetivos.map((operativo, index) => (
								<div className='p-5 rounded-ext shadow-ext col-span-4 max-h-[350px]' key={index}>
									<CardObjetivoSimple objetivo={operativo} activeUsuario={activeUsuario} isLeader={isLeader}/>
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
								
								<div className='text-center pb-5 flex items-center justify-center gap-5'>
									<Tooltip title={promedioEvaluaciones} >
										<Rating initialValue={Number(promedioEvaluaciones)} readonly allowFraction transition emptyStyle={{ display: "flex" }} 
                                            SVGstyle={{ display: "inline-block", marginBottom: 10 }}
                                        />
									</Tooltip>
									<button onClick={() => setIsModalVisible(true)}>
										<IoIosEye className='text-devarana-dark-graph hover:text-devarana-graph transition-all duration-300' size={20} />
									</button>
								</div>
								{
									resultadoMisEvaluaciones.length > 0 &&  resultadoMisEvaluados.length > 0 && (
									<>
										<table className='w-full'>
											<thead className='text-devarana-dark-graph'>
												<tr>
													<th className='w-2/4 text-left' colSpan={2}>Personas que evaluaron a {activeUsuario.nombre} { activeUsuario.apellidoPaterno }</th>
													{/* <th className='w-2/4'></th> */}
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
													<th className='w-2/4 text-left' colSpan={2}>Personas que {activeUsuario.nombre} { activeUsuario.apellidoPaterno } evaluó</th>
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
									</>
									) 
								}							
							</div>
							<Divider className='my-5' />
							{
								isLeader && (
								<div className="flex items-center">
									<Button 
										disabled={!allClosed || isClosingCicle} 
										classColor='dark' classType='regular' onClick={handleCierraObjetivos} >
										{ isClosingCicle ? <Spin /> : 'Autorizar Cierre' }
									</Button>
								</div>
								)
							}
							
						</div>
					</div>
				</div>
			</div>
			<Modal
				title={<p className='text-devarana-dark-graph font-bold'>Resultados Competencias</p>}
				open={isModalVisible}
				footer={null}
				width={1000}
				destroyOnClose={true}
				onCancel={() => setIsModalVisible(false)}
				
			>
				<ResultadosCompetencias  usuarioId={activeUsuario.id} />
			</Modal>
		</div>
	)
}
