import { Icon } from '@/components/Icon'
import Loading from '@/components/antd/Loading'
import { EstrategiaView } from '@/components/estrategia/EstrategiaView'
import { TablaTacticos } from '@/components/tacticos/TablaTacticos'
import { Box, Button } from '@/components/ui'
import { getEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Segmented, FloatButton, Drawer } from 'antd';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { getTacticoFromEstrategiaThunk } from '@/redux/features/tacticos/tacticosThunk'
import { FormTactico } from '../../components/tacticos/FormTacticos';

export const ObjEstrategico = () => {

	const [active, setActive] = useState<string | number>('tacticos')
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [showDrawer, setShowDrawer] = useState(false)

	const { currentEstrategico } = useAppSelector(state => state.estrategicos)
    const { tacticos } = useAppSelector(state => state.tacticos)
	const { perspectivas = [] } = currentEstrategico

	useEffect(() => {
		if(id && currentEstrategico.id === "" ){
			getEstrategiaInfo(id)
		}
	}, [id])

    useEffect(() => {
        if(currentEstrategico.id !== ""){
            setActive('tacticos')
        }
    }, [currentEstrategico])


    const getEstrategiaInfo = (id:string) => {
        dispatch(getEstrategicoThunk(id))
        dispatch(getTacticoFromEstrategiaThunk(id))
    }

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


	if(currentEstrategico.id === ""){
        return <Loading />
    }

	return (
        <div className='grid grid-cols-12 gap-5'>
            <Box className='col-span-4'>
                <EstrategiaView estrategico={currentEstrategico}  perspectiva={perspectivas[0]} />
            </Box>
            <div className='col-span-8'>
                <Segmented block options={options} value={active} onChange={setActive} className='mb-5'/>
                <Box className=''>
                    { active === 'tacticos' && <TablaTacticos tacticos={tacticos} /> }
                </Box>
            </div>
            <FloatButton
                icon={<Icon iconName='faAngleLeft' />}
                onClick={() => navigate(-1)}
                className='left-28 bottom-5'
            />

            <Drawer
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                className='rounded-l-ext'
                destroyOnClose={true}
            >

                <FormTactico estrategicoId={id} />

            </Drawer>

    
           <FloatButton 
                icon={<Icon iconName='faPlus' /> }
                onClick={() => setShowDrawer(true)}
                className='bottom-5'
                
            />
            
        </div>
	)
}
