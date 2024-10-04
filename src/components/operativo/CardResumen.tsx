import { useObjetivo } from '@/hooks/useObjetivos'
import { OperativoProps, PerfilProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { Avatar, Divider, Image, Modal } from 'antd'
import CountUp from 'react-countup';
import { FormPonderacion } from './FormPonderacion'


interface Props {
	operativos: OperativoProps[]
	isPonderacionVisible: boolean
	setPonderacionVisible: React.Dispatch<React.SetStateAction<boolean>>
	etapa: {
		etapaActual: string,
		color: string,
		isClosed: boolean
	}
    perfil?: PerfilProps
}

export const CardResumen = ({operativos, isPonderacionVisible, setPonderacionVisible, etapa, perfil}:Props) => {
    
	
	const { currentConfig: {year, quarter}, periodControls } = useAppSelector(state => state.global)
	
	const { taskCount, misObjetivosCount, objetivosCompartidosCount, resultadosClaveCount,  } = useObjetivo({operativos})


	const handleCancelPonderacion = () => {
        setPonderacionVisible(false)
    }


  return (
    <>
		<div className='flex justify-between w-full'>
			<h1 className='text-primary font-medium text-[16px]'>Resumen</h1>
		</div>
		<div className='my-5 p-5 flex flex-wrap bg-primary bg-opacity-20 rounded gap-x-5 gap-y-3 items-center justify-center'>
			<Avatar className='w-20 h-20 border-primary border-2' src={<Image src={`${getStorageUrl(perfil?.foto)}`} preview={false} fallback={getBrokenUser()} />} />
			<div className=''>
				<p className='font-medium text-devarana-graph text-xl'
				>{perfil?.nombre}</p>
			</div>
		</div>
		<div>
			<div className='font-light flex justify-between'>
				<p>Mis Objetivos: </p> <CountUp end={misObjetivosCount} separator="," />
			</div>
			<Divider className='my-3' dashed />
			<div className='font-light flex justify-between'>
				<p>Objetivos Compartidos: </p> <CountUp end={objetivosCompartidosCount} separator="," />
			</div>
			<Divider className='my-3' dashed />
			<div className='font-light flex justify-between'>
				<p>Resultados Clave: </p> <CountUp end={resultadosClaveCount} separator="," />
			</div>
			<Divider className='my-3' dashed />
			<div className='font-light flex justify-between'>
				<p>Acciones: </p> <CountUp end={taskCount} separator="," />
			</div>
			<Divider className='my-3' dashed />
			
			<div className='flex justify-between items-center align-middle gap-x-5'>
				<div
					className='text-white py-0.5 px-2.5 rounded-ext'
					style={{
						backgroundColor: etapa.color,
					}}
				> 
					<p className='text-xs drop-shadow text-center'> { etapa.etapaActual } </p> 
				</div>
				<button 
				disabled={perfil?.rendimiento?.status === 'CERRADO'  || etapa.isClosed }
				className='border border-devarana-dark-graph py-0.5 px-2.5 text-devarana-dark-graph shadow
							text-xs rounded-ext font-light disabled:cursor-not-allowed hover:opacity-70 transition duration-100' 
				onClick={ () => setPonderacionVisible(true)}>
					Asignar Ponderación
				</button>
			</div>

			<Modal
                open={isPonderacionVisible}
                footer={null}
                width={1000}
                
                destroyOnClose={true}
                onCancel={handleCancelPonderacion}
            >
                <FormPonderacion operativos={operativos} handleCancelPonderacion={handleCancelPonderacion} />
            </Modal>

			
		</div>
	</>
  )
}
