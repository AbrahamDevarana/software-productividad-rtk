import dayjs from 'dayjs'
import { Box } from '../../../components/ui'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Avatar, Image, Tooltip } from 'antd'
import { ProyectosProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'

interface Props {
	proyecto: ProyectosProps
	handleView: (proyectoId: string) => void
	handleEdit: (proyectoId: string) => void
	handleDelete : (proyectoId: string) => void
}

export const ProyectoCard = ({proyecto, handleView, handleEdit, handleDelete, }: Props) => {

	const { titulo, descripcion, imagen, fechaFin, fechaInicio, icono, participantes, propietarioId, proyectosHito, status, usuariosProyecto, id } = proyecto
	const { userAuth } = useAppSelector(state => state.auth)

	return (
		<Box className="lg:col-span-4 md:col-span-6 col-span-12">
			<div className="relative group z-0">
				<Image className="shadow-card-picture max-h-[150px] z-30 rounded-ext group-hover:-translate-y-8 transition-all duration-500 ease-out" preview={false} 
					src={getStorageUrl(imagen)} 
					fallback={`${import.meta.env.VITE_STORAGE_URL}custom-images/noBanner.png`}
					wrapperStyle={{ width: '100%', height: '150px', objectFit: 'cover', objectPosition: 'center'}}
					/>
				<div className="flex absolute left-0 right-0 bottom-4 justify-center gap-x-5 -z-10 group-hover:z-10">
					<Tooltip title="Ver" placement='bottom'>
						<FaEye className="text-devarana-graph cursor-pointer" onClick={ () => handleView(id)}/>
					</Tooltip>
					{
						userAuth.id === proyecto.propietarioId ?
						<Tooltip title="Editar" placement='bottom'>
						<FaEdit className="text-devarana-graph cursor-pointer" onClick={ () => handleEdit(id)}/>
						</Tooltip>
						: null
					}
					{
						userAuth.id === proyecto.propietarioId ?
						<Tooltip title="Eliminar" placement='bottom'>
							<FaTrash className="text-devarana-graph cursor-pointer" onClick={ () => handleDelete(id)}/>
						</Tooltip>
						: null
					}
					

				</div>
			</div>

			<div className="pb-5 pt-3" style={{height: '150px', overflowY: 'auto'}}>
				<h1 className="text-devarana-dark-graph text-center text-xl font-normal">{titulo}</h1>
				<p className="text-devarana-graph font-light pt-5">{descripcion}</p>
			</div>

			<hr className="flex-shrink-0 border-t border-r border-l border-transparent bg-transparent h-[0.0625rem] my-5 opacity-25 bg-gradient-to-r from-transparent via-slate-400 to-transparent" />

			<div className="flex justify-between items-center">
                <Avatar.Group maxCount={3} className='z-50'
                        maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
                    >
                    {
                        usuariosProyecto?.map((participante, index) => (
                            <Tooltip key={index} title={`${participante.nombre + ' ' + participante.apellidoPaterno}`} placement='top'>
                                <Avatar src={<Image src={`${getStorageUrl(participante.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                    {participante.iniciales}
                                </Avatar>
                            </Tooltip>
                        ))
                    }
                </Avatar.Group>
				<div className="text-center">
					<p className="text-devarana-graph font-light text-xs"> Creado : { dayjs(fechaInicio).format('DD MMM') }</p>
				</div>
			</div>

		</Box>
	)
}
