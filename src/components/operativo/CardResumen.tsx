import { useObjetivo } from '@/hooks/useObjetivos'
import { OperativoProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { Avatar, Divider, Image, Modal } from 'antd'
import CountUp from 'react-countup';
import { useMemo } from 'react'
import { FormPonderacion } from './FormPonderacion'
import dayjs from 'dayjs'


interface Props {
	operativos: OperativoProps[]
	isPonderacionVisible: boolean
	setPonderacionVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const CardResumen = ({operativos, isPonderacionVisible, setPonderacionVisible }:Props) => {
	const { perfil } = useAppSelector(state => state.profile)
	const { currentConfig: {year, quarter}, periodControls } = useAppSelector(state => state.global)
	
	const { rendimiento } = perfil
	const { taskCount, misObjetivosCount, objetivosCompartidosCount, resultadosClaveCount,  } = useObjetivo({operativos})


	const handleCancelPonderacion = () => {
        setPonderacionVisible(false)
    }

	const etapaPeriodo = useMemo(() => {

        const {postPeriodDefinitionDays, prePeriodDefinitionDays, postClosureDays, preClosureDays} = periodControls
        const today = dayjs()
        const month = quarter * 3       
        const lastDay = dayjs(`${year}-${month}-01`).endOf('quarter')

        const preClosureDate = lastDay.subtract(preClosureDays, 'day')
        const postClosureDate = lastDay.add(postClosureDays, 'day')

        const preDefinitionDate = lastDay.subtract(prePeriodDefinitionDays, 'day')
        const postDefinitionDate = lastDay.add(postPeriodDefinitionDays, 'day')


		if(today.isBefore(preDefinitionDate)) return <p className=''> No Iniciado </p>

        if (today.isBetween(preDefinitionDate, postDefinitionDate) && rendimiento.status === 'ABIERTO') {
            return <p className=''> En Definición </p>
        }

        if (today.isBetween(preClosureDate, postClosureDate) && rendimiento.status === 'ABIERTO') {
            return <p className=''> En Cierre </p>
        }
        if(rendimiento.status === 'ABIERTO') return <p className=''> En Progreso </p>
        if(rendimiento.status === 'CERRADO') return <p className=''> Cerrado </p>

        return <p className=''> Cerrado </p>
    }, [rendimiento])

  return (
    <>
		<div className='flex justify-between w-full'>
			<h1 className='text-primary font-medium text-[16px]'>Resumen</h1>
		</div>
		<div className='my-5 p-5 flex flex-wrap bg-primary bg-opacity-20 rounded gap-x-5 gap-y-3 items-center justify-center'>
			<Avatar className='w-20 h-20 border-primary border-2' src={<Image src={`${getStorageUrl(perfil.foto)}`} preview={false} fallback={getBrokenUser()} />} />
			<div className=''>
				<p className='font-medium text-devarana-graph text-xl'
				>{perfil.nombre}</p>
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
			
			<div className='flex justify-between items-center flex-wrap align-middle'>
				<div> { etapaPeriodo } </div>
				<button 
				disabled={rendimiento.status === 'CERRADO'}
				className='border border-devarana-dark-graph px-2 py-1 text-devarana-dark-graph text-xs rounded-ext font-light disabled:cursor-not-allowed' onClick={ () => setPonderacionVisible(true)}>
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
