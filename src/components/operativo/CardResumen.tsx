import { useObjetivo } from '@/hooks/useObjetivos'
import { OperativoProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { Avatar, DatePicker, Divider, Image } from 'antd'
import dayjs from 'dayjs'
import { TabStatus } from '../ui/TabStatus'
import CountUp from 'react-countup';
import { Button } from '../ui'
import { useState } from 'react'
import ModalEvaluacion from './ModalEvaluacion'


interface Props {
	operativos: OperativoProps[]
	handleDateChange: (date: any, dateString: string) => void
	quarter: number
	year: number
}

export const CardResumen = ({operativos, handleDateChange, quarter, year}:Props) => {
	const { userAuth } = useAppSelector(state => state.auth)
	const { perfil } = useAppSelector(state => state.profile)
	

	const { accionesCount, misObjetivosCount, objetivosCompartidosCount, resultadosClaveCount } = useObjetivo({operativos})

	const [ isEvaluacionVisible, setEvaluacionVisible ] = useState(false)
	const handleCancel = () => {
		setEvaluacionVisible(false)
	}

	    
    const handleEvaluation = () => {
        setEvaluacionVisible(!isEvaluacionVisible)
    }

  return (
    <>
		<div className='flex justify-between w-full'>
			<h1 className='text-primary font-medium text-[16px]'>Resumen</h1>
			<div>
				<DatePicker className='border-primary w-auto' picker='quarter' onChange={handleDateChange} value={ dayjs().quarter(quarter).year(year) }  clearIcon={false} format={'[Q]Q YYYY'} size='small' suffixIcon={false} 
					style={{
						width: '75px',
					}}
				/>
			</div>
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
			<div className='font-light flex justify-between'>
				<p>Objetivos Compartidos: </p> <CountUp end={objetivosCompartidosCount} separator="," />
			</div>
			<div className='font-light flex justify-between'>
				<p>Resultados Clave: </p> <CountUp end={resultadosClaveCount} separator="," />
			</div>
			<div className='font-light flex justify-between'>
				<p>Acciones: </p> <CountUp end={accionesCount} separator="," />
			</div>

			<Divider className='my-5' />
			<Button classType='regular' classColor='dark' onClick={handleEvaluation}>
				Evaluar
			</Button>
			<ModalEvaluacion  handleCancel={handleCancel} visible={isEvaluacionVisible} perfil={perfil} />
		</div>
	</>
  )
}
