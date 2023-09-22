import { useObjetivo } from '@/hooks/useObjetivos'
import { OperativoProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { Avatar, Divider, Image, Modal } from 'antd'
import CountUp from 'react-countup';
import { useState } from 'react'
import { FormPonderacion } from './FormPonderacion'
import { periodoTypes } from '@/types'


interface Props {
	operativos: OperativoProps[]
	handleDateChange: (date: any, dateString: string) => void
}

export const CardResumen = ({operativos, handleDateChange }:Props) => {
	const { perfil } = useAppSelector(state => state.profile)
	const [ isPonderacionVisible, setPonderacionVisible ] = useState(false)
	
	const { accionesCount, misObjetivosCount, objetivosCompartidosCount, resultadosClaveCount } = useObjetivo({operativos})

	const handleCancelPonderacion = () => {
        setPonderacionVisible(false)
    }

  return (
    <>
		<div className='flex justify-between w-full'>
			<h1 className='text-primary font-medium text-[16px]'>Resumen</h1>
		</div>
		<div className='my-5 p-5 flex items-center bg-primary bg-opacity-20 rounded'>
			<Avatar className='h-20 w-20 border-primary border-2' src={<Image src={`${getStorageUrl(perfil.foto)}`} preview={false} fallback={getBrokenUser()} />} />
			<div className='ml-5'>
				<p className='font-medium text-xl text-devarana-graph'>{perfil.nombre}</p>
			</div>
		</div>
		<div>
			<div className='font-light flex justify-between'>
				<p>Mis Objetivos: </p> <CountUp end={misObjetivosCount} separator="," />
			</div>
			<Divider className='my-2' dashed />
			<div className='font-light flex justify-between'>
				<p>Objetivos Compartidos: </p> <CountUp end={objetivosCompartidosCount} separator="," />
			</div>
			<Divider className='my-2' dashed />
			<div className='font-light flex justify-between'>
				<p>Resultados Clave: </p> <CountUp end={resultadosClaveCount} separator="," />
			</div>
			<Divider className='my-2' dashed />
			<div className='font-light flex justify-between'>
				<p>Acciones: </p> <CountUp end={accionesCount} separator="," />
			</div>
			<Divider className='my-2' dashed />
			
			<div className='flex justify-between'>
				<p> { periodoTypes.EN_CURSO } </p>
				<p className='cursor-pointer text-primary' onClick={ () => setPonderacionVisible(true)}>
					Asignación Ponderación
				</p>
				{/* <Button classType='regular' width={60} classColor='dark' onClick={handleEvaluation}>
					<MdStarRate className='text-xl' />
				</Button>
				<Button width={60} classColor='primary' classType='regular' onClick={() => setPonderacionVisible(true)}>
					<PiStrategyBold className='text-xl'/>
				</Button> */}
			</div>

			<Modal
                open={isPonderacionVisible}
                footer={null}
                width={1000}
                closable={false}
                destroyOnClose={true}
                onCancel={handleCancelPonderacion}
            >
                <FormPonderacion operativos={operativos} />
            </Modal>

			
		</div>
	</>
  )
}
