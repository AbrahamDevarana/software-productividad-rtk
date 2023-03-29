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

export const ObjEstrategico: React.FC = () => {

	const [active, setActive] = useState<string | number>('tacticos')
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const [showDrawer, setShowDrawer] = useState(false)

	const { currentEstrategico } = useAppSelector(state => state.estrategicos)
    const { tacticos } = useAppSelector(state => state.tacticos)
	const { perspectivas = [] } = currentEstrategico

	useEffect(() => {
		if( id ){
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
        <Box className='flex gap-5'>
            <div className='p-5 max-w-[600px] w-full' style={{ boxShadow: '5px 0px 5px -5px rgba(0,0,0,0.1)' }} >
                <EstrategiaView estrategico={currentEstrategico}  perspectiva={perspectivas[0]} />
            </div>
            <div className='w-full'>
            
            <Segmented block options={options} value={active} onChange={setActive} className='mb-5'/>            
            <div className=''>
                { active === 'tacticos' && <TablaTacticos tacticos={tacticos} /> }
            </div>
            </div>
            <FloatButton
                icon={<Icon iconName='faAngleLeft' />}
                onClick={() => navigate( '/estrategia', {
                    state: {
                        estrategico: currentEstrategico,
                        back: true
                    },
                    replace: true
                })}
                className='left-28 bottom-5'
            />

            <Drawer
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                className='rounded-l-ext'
                destroyOnClose={true}
            >

                <FormTactico estrategicoId={id} setShowEdit={setShowDrawer} />

            </Drawer>

    
           <FloatButton 
                icon={<Icon iconName='faPlus' /> }
                onClick={() => setShowDrawer(true)}
                className='bottom-5'
                
            />
            
        </Box>
	)
}
