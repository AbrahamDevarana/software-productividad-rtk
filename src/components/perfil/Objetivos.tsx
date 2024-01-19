import { Box } from '../ui'
import { Link } from 'react-router-dom';
import { Avatar, Image, Progress, Tooltip } from 'antd';
import { getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';
import { useAppSelector } from '@/redux/hooks';
import CountUp from 'react-countup';
import { OperativoProps, SinglePerfilProps } from '@/interfaces';
import { useOthersOperativo } from '@/hooks/useOthersOperativo';
import { FaEye } from 'react-icons/fa';

interface Props {
	objetivo: OperativoProps;
	visitante?: boolean;
	usuarioActivo: SinglePerfilProps
}

export const Objetivos = ({objetivo, visitante, usuarioActivo}: Props) => {

	const { currentConfig: {year, quarter}} = useAppSelector(state => state.global)
	const { resultadoClaveDoneCount, progresoAsignado, firstColor, fixedProgresoReal, secondColor, orderedResponsables} = useOthersOperativo({objetivo, usuarioId: usuarioActivo.id})
  	return (
		<Box className="w-[350px] flex-none" key={objetivo.id}>
			<div className="p-5 shadow rounded-ext bg-gradient-to-tr from-dark to-dark-light flex gap-x-10 -mt-10">
				<div className='w-full flex justify-around text-white text-center'>  
						<div>
							<p className='font-light'> Resultados Clave </p>
							<p> {resultadoClaveDoneCount} / { objetivo.resultadosClave.length } </p>
						</div>
						<div>
							<p className='font-light'>Acciones </p>
							<p> 0 / 0 </p>
						</div>
						<div>
							<p className='font-light'> Ponderacion </p>
							<p> 
								{ progresoAsignado.toFixed(2) }%
							</p>
						</div>
					</div>
			</div>
			<div className="pt-5">
				<div className='h-16 overflow-y-auto flex flex-col justify-center items-center'>
					<p className='text-center text-devarana-graph font-medium'> {objetivo.nombre} </p>
				</div>
				<Progress 
					percent={fixedProgresoReal} 
					strokeWidth={15}
					className='progressStyle py-5 px-5'
					strokeColor={{
						'0%': firstColor,
						'100%': secondColor,
						direction: 'to top',
					}}
					trailColor={secondColor}
					format={() => <CountUp style={{
						fontSize: '10px',
						fontWeight: 'bold',
						color: '#FFFFFF'
					}}  end={fixedProgresoReal} duration={1} suffix='%' decimals={2} decimal='.' />}					
				/>

				<Avatar.Group maxCount={3} className='flex justify-center pb-5' maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}>
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
				<div className="flex gap-10 justify-center">
					{ !visitante && 
						<Link to={`/objetivo/${objetivo.id}`} className='text-devarana-graph hover:opacity-80 hover:text-devarana-graph'>
							<div className='flex items-center gap-x-2'>
								<FaEye />
								<span> Ver </span> 
							</div>
						</Link>
					}
				</div>
			</div>
		</Box>
	)
}
