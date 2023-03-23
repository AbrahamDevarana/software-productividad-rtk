import { Icon } from '@/components/Icon'
import Loading from '@/components/antd/Loading'
import { EstrategiaView } from '@/components/estrategia/EstrategiaView'
import { TablaTacticos } from '@/components/tacticos/TablaTacticos'
import { Box } from '@/components/ui'
import { getEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Segmented } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ObjEstrategico = () => {

	const [active, setActive] = useState<string | number>('tacticos')
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()

	const { currentEstrategico, isLoading } = useAppSelector(state => state.estrategicos)
	const { perspectivas } = currentEstrategico

	useEffect(() => {
		if(id && currentEstrategico.id === "" ){
			dispatch(getEstrategicoThunk(id))
		}
	}, [id])

	const options = [
		{
			label: 'Tácticos',
			value: 'tacticos',
			icon: <Icon iconName='faTachometer' />
		},
		{
			label: 'Proyectos',
			value: 'proyectos',
			icon: <Icon iconName='faAmbulance' />
		},
	]


	if(isLoading || currentEstrategico.id === ""){
        return <Loading />
    }

	return (
		<>
			<div className='grid grid-cols-12 gap-5 animate__fadeInRightBig animate__animated animate__faster'>
				<Box className='col-span-4'>
					<EstrategiaView estrategico={currentEstrategico} perspectiva={perspectivas[0]} />
				</Box>
				<div className='col-span-8'>
					<Segmented block options={options} value={active} onChange={setActive} className='mb-5'/>
					<Box className=''>
						{ active === 'tacticos' && <TablaTacticos  /> }
					</Box>
				</div>
			</div>
		</>
	)
}
