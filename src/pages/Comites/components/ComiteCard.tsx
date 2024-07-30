import dayjs from 'dayjs'
import { Box, Button } from '../../../components/ui'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import { Avatar, Image, Popconfirm, Tooltip } from 'antd'
import { ComitesProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { statusColors } from '@/components/tasks/utils'

interface Props {
	comite: ComitesProps
	handleView: (comiteId: string) => void
	handleEdit: (comite: ComitesProps) => void
	handleDelete : (comiteId: string) => void
}

export const ComiteCard = ({comite, handleView, handleEdit, handleDelete, }: Props) => {    

	const { titulo, descripcion, imagen, fechaInicio, propietario, usuariosComite, id } = comite
	const { userAuth } = useAppSelector(state => state.auth)

	return (
		<Box className="2xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12">
			<div className="relative group z-0 pt-8">
				<Image className="shadow-card-picture max-h-[150px] object-fill z-30 rounded-ext group-hover:-translate-y-12 transition-all duration-500 ease-out" preview={false} 
					src={getStorageUrl(imagen)} 
					fallback={`${import.meta.env.VITE_STORAGE_URL}custom-images/noBanner.png`}
					wrapperStyle={{ width: '100%', height: '150px', objectFit: 'cover', objectPosition: 'center'}}
					/>
				<div className="flex absolute left-0 right-0 bottom-4 justify-center gap-x-5 -z-10 group-hover:z-10">
						<Button className='text-xs' size='sm' classType='regular' classColor='primary' width={100}  onClick={ () => handleView(id)} >
                            Ver Comite
                        </Button>
					{
                        <Button className='text-xs' size='sm' classType='icon' classColor='dark' width={100} onClick={ () => handleEdit(comite)} >
                            Editar
                        </Button>
					}
					{
						userAuth.id === comite.propietarioId ?
                        <Popconfirm title="¿Estás seguro de eliminar este comite?" onConfirm={() => handleDelete(id)} okText="Si" cancelText="No" okButtonProps={{className: 'text-white bg-error-light'}} cancelButtonProps={{className: 'text-devarana-dark-graph'}}>
                            <Button className='text-xs' size='sm' classType='icon' classColor='error' width={100} >
                                Eliminar
                            </Button>
                        </Popconfirm>
                        : null
					}
					
				</div>
			</div>

			<div className="pb-5 pt-5" style={{height: '150px', overflowY: 'auto'}}>
				<div className='flex justify-between items-center'>
                    <h1 className="text-devarana-dark-graph text-xl font-bold">{titulo}</h1>
                    <p className="text-devarana-graph font-light text-xs"> Creado : { dayjs(fechaInicio).format('DD MMM') }</p>
                    
                </div>
				<p className="text-devarana-graph font-light pt-5">{descripcion}</p>
			</div>

			<hr className="flex-shrink-0 border-t border-r border-l border-transparent bg-transparent h-[0.0625rem] my-5 opacity-25 bg-gradient-to-r from-transparent via-slate-400 to-transparent "  />

			<div className="flex justify-between items-center">
                <Avatar.Group maxCount={3} className='z-50'
                        maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
                    >
                    {
                        propietario && (
                            <Tooltip title={`${propietario.nombre + ' ' + propietario.apellidoPaterno}`} placement='top'>
                                <Avatar src={<Image src={`${getStorageUrl(propietario.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                    {propietario.iniciales}
                                </Avatar>
                            </Tooltip>
                        )
                    }
                    {
                        usuariosComite?.map((participante, index) => (
                            <Tooltip key={index} title={`${participante.nombre + ' ' + participante.apellidoPaterno}`} placement='top'>
                                <Avatar src={<Image src={`${getStorageUrl(participante.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                    {participante.iniciales}
                                </Avatar>
                            </Tooltip>
                        ))
                    }
                </Avatar.Group>
				<div className="flex gap-x-2 items-center">
                        <div className={`h-3 w-3 rounded-full ${statusColors[comite.status].gradient}`} />
                        <p className={`text-${statusColors[comite.status].colorBase}`}>{statusColors[comite.status].label} </p>
                </div>
			</div>

		</Box>
	)
}
