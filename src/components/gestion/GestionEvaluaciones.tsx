import { useCreateAsignacionEvaluacionMutation, useDeleteAsignacionEvaluacionMutation, useGetEvaluacionUsuarioQuery } from '@/redux/features/evaluaciones/evaluacionesThunk'
import { useAppSelector } from '@/redux/hooks'
import { Avatar, Image, Select, Spin, Tooltip, message } from 'antd'
import React, { useMemo } from 'react'
import { Spinner } from '../antd/Spinner'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { useGetUsuariosQuery } from '@/redux/features/usuarios/usuariosThunks'
import { Button } from '../ui'
import { FaPlus } from 'react-icons/fa'
import { DefaultOptionType } from 'antd/es/select'

export const GestionEvaluaciones = ({usuarioId}: {usuarioId:string}) => {
	const { currentConfig: { quarter, year } } = useAppSelector((state) => state.global)
	const { data: usuarios, isFetching: isFetchingUsuarios, isLoading: isLoadingUsuarios } = useGetUsuariosQuery({})
	const { data, isError, isFetching, isLoading, isUninitialized } = useGetEvaluacionUsuarioQuery({usuarioId, year, quarter})

	const [ deleteAsignacionEvaluacion, { isLoading: isDeleting } ] = useDeleteAsignacionEvaluacionMutation()
	const [ createAsignacionEvaluacion, { isLoading: isCreating } ] = useCreateAsignacionEvaluacionMutation()


	const usuario = useMemo(() => {

		if(!data) return null

		const evaluacionLider = data.evaluacionesEvaluado
		.filter((evaluacion) => evaluacion.evaluacionId === 1)
		.map((evaluacion) => evaluacion.evaluador);

		const evaluacionColaborador = data.evaluacionesEvaluado
		.filter((evaluacion) => evaluacion.evaluacionId === 2)
		.map((evaluacion) => evaluacion.evaluador);

		const evaluacionPropia = data.evaluacionesEvaluado
		.filter((evaluacion) => evaluacion.evaluacionId === 3)
		.map((evaluacion) => evaluacion.evaluador);

		const evaluacionLiderColaborador = data.evaluacionesEvaluado
		.filter((evaluacion) => evaluacion.evaluacionId === 4)
		.map((evaluacion) => evaluacion.evaluador);


		return {
			...data,
			evaluacionLider,
			evaluacionColaborador,
			evaluacionPropia,
			evaluacionLiderColaborador,
		}
		
	}, [data])


	const optionsLider = useMemo(() => {
		if(!usuarios) return []
		// Filtrar al usuario (usuario.id !== usuarioId) y los de evaluacionLider[] 
		const filteredUsuarios = usuarios.filter((usuario) => usuario.id !== usuarioId)


		return filteredUsuarios.map((usuario) => ({ 
			label: <p className='text-devarana-graph'> {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}</p>,
			value: usuario.id,
			dataName: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
		}))
		
	}, [usuarios, usuarioId])

	const optionsColaborador = useMemo(() => {
		if(!usuarios) return []
		const filteredUsuarios = usuarios.filter((usuario) => usuario.id !== usuarioId)
		return filteredUsuarios.map((usuario) => ({
			label: <p className='text-devarana-graph'> {usuario.nombre} {usuario.apellidoPaterno} {usuario.apellidoMaterno}</p>,
			value: usuario.id,
			dataName: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
		}))
	}, [usuarios, usuarioId])

	const optionsPropia = useMemo(() => {
		if(!usuarios) return []
		const findUsuario = usuarios.find((usuario) => usuario.id === usuarioId)
		if(!findUsuario) return []

		return [{
			label: <p className='text-devarana-graph'> {findUsuario?.nombre} {findUsuario?.apellidoPaterno} {findUsuario?.apellidoMaterno}</p>, 
			value: findUsuario?.id,
			dataName: `${findUsuario?.nombre} ${findUsuario?.apellidoPaterno} ${findUsuario?.apellidoMaterno}`
		}]
	}, [usuarios, usuarioId])

	
	if( !usuario || isLoading  ) return <Spinner />
	

	const handleAddEvaluacion = (evaluadorId: string, tipoEvaluacionId: number) => {		
		createAsignacionEvaluacion({
			tipoEvaluacionId,
			evaluadorId: evaluadorId,
			evaluadoId: usuarioId,
			year,
			quarter
		}).unwrap().then(() => {
			message.success('Evaluación agregada')
		})
	}

	const handleDeleteEvaluacion = (evaluadorId: string, tipoEvaluacionId: number) => {
		deleteAsignacionEvaluacion({
			tipoEvaluacionId,
			evaluadorId: evaluadorId,
			evaluadoId: usuarioId,
			year,
			quarter
		}).unwrap().then(() => {
			message.success('Evaluación eliminada')
		})
	}

    return (
		<>
			<div className='grid grid-cols-12 h-80 gap-5'>
				<div className="col-span-4 flex items-center justify-center flex-col">
			
					<Avatar 
						src={<Image src={`${getStorageUrl(usuario?.foto)}`} preview={false} fallback={getBrokenUser()} />}
						size={100}
					>
						{data?.iniciales}
					</Avatar>
					<h1 className='text-lg text-center py-5'>{ usuario.nombre} { usuario.apellidoPaterno} {usuario.apellidoMaterno} </h1>
					<div className='p-5 border rounded-2xl w-full'>

					</div>


				</div>
				<div className='grid grid-cols-12 col-span-8'>
				<div className='col-span-6 border rounded-bl-2xl p-3 flex flex-col justify-between'>
						<div>
							<h1 className='text-center'> Autoevaluación </h1>
							<div className='flex py-3'>
							{
								usuario.evaluacionPropia?.map((evaluacion) => (
									<div className='flex items-center justify-center relative' key={evaluacion.id}>
										<Tooltip title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno} ${evaluacion.apellidoMaterno}`}>
											<Avatar 
												src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
												size={50}
												
											>
												{evaluacion.iniciales}
											</Avatar>
										</Tooltip>
										<button 
											onClick={()=>handleDeleteEvaluacion(evaluacion.id, 3)}
											className='text-[10px] text-white bg-devarana-dark-graph absolute -top-0 -right-0 rounded-full flex items-center px-1'
											disabled = {isCreating || isDeleting}
											>
											X
										</button>
									</div>
								))
							}
							</div>
						</div>
						<Select 
							onChange={(value)=>handleAddEvaluacion(value, 3)} 
							options={optionsPropia}
							showSearch
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/>
					</div>
					<div className='col-span-6 border rounded-tr-2xl p-3 flex flex-col justify-between'>
						<div>
							<h1 className='text-center'> Colaboración </h1>
							<div className='flex py-3'>
							{
								usuario.evaluacionColaborador?.map((evaluacion) => (
									<div className='flex items-center justify-center relative' key={evaluacion.id}>
										<Tooltip title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno} ${evaluacion.apellidoMaterno}`}>
											<Avatar 
												src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
												size={50}
												
											>
												{evaluacion.iniciales}
											</Avatar>
										</Tooltip>
										<button 
											onClick={()=>handleDeleteEvaluacion(evaluacion.id, 2)}
											className='text-[10px] text-white bg-devarana-dark-graph absolute -top-0 -right-0 rounded-full flex items-center px-1'
											disabled = {isCreating || isDeleting}
											>
											X
										</button>
									</div>
								))
							}
							</div>
						</div>
						<Select 
							onChange={(value)=>handleAddEvaluacion(value, 2)} 
							options={optionsColaborador} 
							showSearch
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/>
						
					</div>
					<div className='col-span-6 border rounded-tl-2xl p-3 flex flex-col justify-between'>
						
						<div>
							<h1 className='text-center'> Liderazgo </h1>	
							<div className='flex py-3'>
								{
									usuario.evaluacionLider?.map((evaluacion) => (
										<div className='flex items-center justify-center relative' key={evaluacion.id}>
											<Tooltip title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno} ${evaluacion.apellidoMaterno}`}>
												<Avatar 
													src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
													size={50}
													
												>
													{evaluacion.iniciales}
												</Avatar>
											</Tooltip>
											<button 
												onClick={()=>handleDeleteEvaluacion(evaluacion.id, 1)}
												className='text-[10px] text-white bg-devarana-dark-graph absolute -top-0 -right-0 rounded-full flex items-center px-1'
												disabled = {isCreating || isDeleting}
												>
												X
											</button>
										</div>
									))
								}
							</div>
						</div>
						
						<Select 
							onChange={(value)=>handleAddEvaluacion(value, 1)} 
							options={optionsLider} 
							className='w-full'
							showSearch
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/>
					</div>
					
					
					<div className='col-span-6 border rounded-br-2xl p-3 flex flex-col justify-between'>
						<div>
							<h1 className='text-center'> Evaluados </h1>
							<div className='flex py-3'>
							{
								usuario.evaluacionLiderColaborador?.map((evaluacion) => (
									<div className='flex items-center justify-center relative' key={evaluacion.id}>
										<Tooltip title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno} ${evaluacion.apellidoMaterno}`}>
											<Avatar 
												src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
												size={50}
												
											>
												{evaluacion.iniciales}
											</Avatar>
										</Tooltip>
										<button 
											onClick={()=>handleDeleteEvaluacion(evaluacion.id, 1)}
											className='text-[10px] text-white bg-devarana-dark-graph absolute -top-0 -right-0 rounded-full flex items-center px-1'
											disabled = {isCreating || isDeleting}
											>
											X
										</button>
									</div>
								))
							}
							</div>
						</div>
						{/* <Select 
							onChange={(value)=>handleAddEvaluacion(value, 4)} 
							options={optionsLider}
							showSearch
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/> */}
					</div>

				</div>
			</div>
		</>
	)
}
