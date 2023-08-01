import { useObjetivo } from '@/hooks/useObjetivos'
import { OperativoProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { Avatar, DatePicker, Image } from 'antd'
import dayjs from 'dayjs'
import { TabStatus } from '../ui/TabStatus'
import CountUp from 'react-countup';


interface Props {
	operativos: OperativoProps[]
	handleDateChange: (date: any, dateString: string) => void
	quarter: number
	year: number
}

export const CardResumen = ({operativos, handleDateChange, quarter, year}:Props) => {
	const { userAuth } = useAppSelector(state => state.auth)
	const { accionesCount, misObjetivosCount, objetivosCompartidosCount, resultadosClaveCount } = useObjetivo({operativos})

  return (
    <>
		<div className='flex justify-between w-full'>
			<h1>Resumen</h1>
			<div>
				<DatePicker picker='quarter' onChange={handleDateChange} value={ dayjs().quarter(quarter).year(year) }  clearIcon={false} format={'Qº [Trimestre] YYYY'} size='small' suffixIcon={false} />
			</div>
		</div>
		<div className='my-5 p-5 flex items-center bg-gray-100 bg-opacity-15 rounded'>
			<Avatar src={<Image src={`${getStorageUrl(userAuth.foto)}`} preview={false} fallback={getBrokenUser()} />} />
			<div className='ml-2'>
				<p className='font-medium'>{userAuth.nombre}</p>
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
				<p>Resultadoc Clave: </p> <CountUp end={resultadosClaveCount} separator="," />
			</div>
			<div className='font-light flex justify-between'>
				<p>Acciones: </p> <CountUp end={accionesCount} separator="," />
			</div>

		</div>
		<div className='mt-auto ml-auto'>
			<TabStatus status='EN_TIEMPO' />
		</div>
	</>
  )
}
