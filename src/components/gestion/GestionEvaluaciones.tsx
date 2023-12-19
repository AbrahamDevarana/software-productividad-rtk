import { useCreateAsignacionEvaluacionMutation, useGetEvaluacionUsuarioQuery } from '@/redux/features/evaluaciones/evaluacionesThunk'
import { useAppSelector } from '@/redux/hooks'
import { Avatar, Image, Select, Spin, Tooltip } from 'antd'
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
	const { data, isError, isFetching, isLoading } = useGetEvaluacionUsuarioQuery({usuarioId, year, quarter})
	const [createAsignacionEvaluacion ] = useCreateAsignacionEvaluacionMutation()

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
		const filteredUsuarios = usuarios.filter((usuario) => usuario.id !== usuarioId)
		return filteredUsuarios.map((usuario) => ({ 
			label: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`, 
			value: usuario.id,
			dataName: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
		}))
		
	}, [usuarios, usuarioId])

	const optionsColaborador = useMemo(() => {
		if(!usuarios) return []
		const filteredUsuarios = usuarios.filter((usuario) => usuario.id !== usuarioId)
		return filteredUsuarios.map((usuario) => ({
			label: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`, 
			value: usuario.id,
			dataName: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
		}))
	}, [usuarios, usuarioId])

	const optionsPropia = useMemo(() => {
		if(!usuarios) return []
		return usuarios.map((usuario) => ({
			label: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`, 
			value: usuario.id,
			dataName: `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`
		}))
	}, [usuarios, usuarioId])


	if( !usuario || isLoading || isFetching ) return <Spinner />


	const handleAddEvaluacion = (evaluadorId: string, tipoEvaluacion: number) => {		
		createAsignacionEvaluacion({
			tipoEvaluacionId: tipoEvaluacion,
			evaluadorId: evaluadorId,
			evaluadoId: usuarioId,
			year,
			quarter
		})
	}

    return (
		<>
			<div className='grid grid-cols-12 h-80'>
				<div className="col-span-4 flex items-center justify-center flex-col">
			
					<Avatar 
						src={<Image src={`${getStorageUrl(usuario?.foto)}`} preview={false} fallback={getBrokenUser()} />}
						size={100}
					>
						{data?.iniciales}
					</Avatar>
					<h1 className='text-lg text-center py-5'>{ usuario.nombre} { usuario.apellidoPaterno} {usuario.apellidoMaterno} </h1>


				</div>
				<div className='grid grid-cols-12 col-span-8'>
					<div className='col-span-6 border rounded-tl-2xl p-3 flex flex-col justify-between'>
						<div>
							<h1 className='text-center'> Evaluación de lider </h1>	
							{
								usuario.evaluacionLider?.map((evaluacion) => (
									<div className='flex items-center justify-center flex-col' key={evaluacion.id}>
										<Tooltip title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno} ${evaluacion.apellidoMaterno}`}>
											<Avatar 
												src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
												size={50}
												
											>
												{evaluacion.iniciales}
											</Avatar>
										</Tooltip>
									</div>
								))
							}
						</div>
						
						<Select 
							onChange={(value)=>handleAddEvaluacion(value, 1)} 
							options={optionsLider} 
							className='w-full'
							showSearch
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/>
					</div>
					<div className='col-span-6 border rounded-tr-2xl p-3 flex flex-col justify-between'>
						<div>
							<h1 className='text-center'> Evaluación de colaboradores </h1>
							<Avatar.Group maxCount={5} key={1} className='z-50'>
							{
								usuario.evaluacionColaborador?.map((evaluacion) => (
									<div className='flex items-center justify-center flex-col' key={evaluacion.id}>
										<Tooltip title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno} ${evaluacion.apellidoMaterno}`}>
											<Avatar 
												src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
												size={50}
												
											>
												{evaluacion.iniciales}
											</Avatar>
										</Tooltip>
									</div>
								))
							}
							</Avatar.Group>
						</div>
						<Select 
							onChange={(value)=>handleAddEvaluacion(value, 2)} 
							options={optionsColaborador} 
							showSearch
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/>
						
					</div>
					<div className='col-span-6 border rounded-bl-2xl p-3 flex flex-col justify-between'>
						<div>
							<h1 className='text-center'> Evaluación propia </h1>
							<Avatar.Group maxCount={5} key={1} className='z-50'>
							{
								usuario.evaluacionPropia?.map((evaluacion) => (
									<div className='flex items-center justify-center flex-col' key={evaluacion.id}>
										<Tooltip title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno} ${evaluacion.apellidoMaterno}`}>
											<Avatar 
												src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
												size={50}
												
											>
												{evaluacion.iniciales}
											</Avatar>
										</Tooltip>
									</div>
								))
							}
							</Avatar.Group>
						</div>
						<Select 
							onChange={(value)=>handleAddEvaluacion(value, 3)} 
							options={optionsPropia}
							showSearch
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/>
					</div>
					<div className='col-span-6 border rounded-br-2xl p-3 flex flex-col justify-between'>
						<div>
							<h1 className='text-center'> Evaluación de lider - colaboradores </h1>
							<Avatar.Group maxCount={5} key={1} className='z-50'>
							{
								usuario.evaluacionLiderColaborador?.map((evaluacion) => (
									<div className='flex items-center justify-center flex-col' key={evaluacion.id}>
										<Tooltip title={`${evaluacion.nombre} ${evaluacion.apellidoPaterno} ${evaluacion.apellidoMaterno}`}>
											<Avatar 
												src={<Image src={`${getStorageUrl(evaluacion.foto)}`} preview={false} fallback={getBrokenUser()} />}
												size={50}
												
											>
												{evaluacion.iniciales}
											</Avatar>
										</Tooltip>
									</div>
								))
							}
							</Avatar.Group>
						</div>
						<Select 
							onChange={(value)=>handleAddEvaluacion(value, 4)} 
							options={optionsLider}
							showSearch
							filterOption={(input, option) => (option as DefaultOptionType)?.dataName!.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0 }
						/>
					</div>

				</div>
			</div>
		</>
	)
}
