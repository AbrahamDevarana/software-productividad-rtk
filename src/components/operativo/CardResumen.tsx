import { useObjetivo } from '@/hooks/useObjetivos'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { Avatar, DatePicker, Divider, Image, Modal } from 'antd'
import dayjs from 'dayjs'
import { MdStarRate } from 'react-icons/md'
import CountUp from 'react-countup';
import { Button } from '../ui'
import { useState } from 'react'
import FormEvaluacion from './FormEvaluacion'
import { FormPonderacion } from './FormPonderacion'
import { PiStrategyBold } from 'react-icons/pi'
import { getUsuariosAEvaluarThunk } from '@/redux/features/perfil/perfilThunk'


interface Props {
	operativos: OperativoProps[]
	handleDateChange: (date: any, dateString: string) => void
	quarter: number
	year: number
}

export const CardResumen = ({operativos, handleDateChange, quarter, year}:Props) => {
	const { userAuth } = useAppSelector(state => state.auth)
	const { perfil } = useAppSelector(state => state.profile)
	const [ isPonderacionVisible, setPonderacionVisible ] = useState(false)

	const dispatch = useAppDispatch()
	
	const { accionesCount, misObjetivosCount, objetivosCompartidosCount, resultadosClaveCount } = useObjetivo({operativos})

	const [ isEvaluacionVisible, setEvaluacionVisible ] = useState(false)

	const handleCancelEvaluacion = () => {
		setEvaluacionVisible(false)
	}
	    
    const handleEvaluation = async () => {
		dispatch(getUsuariosAEvaluarThunk({usuarioId: perfil.id, year, quarter }))
        setEvaluacionVisible(!isEvaluacionVisible)
    }

	const handleCancelPonderacion = () => {
        setPonderacionVisible(false)
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
			<div className='flex justify-between'>
				<Button classType='regular' width={60} classColor='dark' onClick={handleEvaluation}>
					<MdStarRate className='text-xl' />
				</Button>
				<Button width={60} classColor='primary' classType='regular' onClick={() => setPonderacionVisible(true)}>
					<PiStrategyBold className='text-xl'/>
				</Button>
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

			<Modal
                open={isEvaluacionVisible}
                footer={null}
                width={1000}
                closable={false}
                destroyOnClose={true}
                onCancel={handleCancelEvaluacion}
            >
                <FormEvaluacion perfil={perfil} quarter={quarter} year={year} />
            </Modal>
		</div>
	</>
  )
}
