import {FC, useMemo,} from 'react'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Icon } from '../Icon';
import { getOperativoThunk } from '@/redux/features/operativo/operativosThunk';
import { Avatar, Card, Divider, Image, Progress, Space, Tooltip } from 'antd'
import { getStorageUrl } from '@/helpers';
import { Link } from 'react-router-dom';
import getBrokenUser from '@/helpers/getBrokenUser';

import { ProgressBar } from '../complexUI/ProgressDoughtnut';

interface Props {
    objetivo: OperativoProps,
    setIsModalVisible: (value: boolean) => void
    year: number
    quarter: number
}

export const CardObjetivo: FC<Props> = ({objetivo, setIsModalVisible, year, quarter}) => {

    const { userAuth } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const handleEditObjetivo = (id: string) => {
        dispatch(getOperativoThunk(id))
        setIsModalVisible(true)

        
    }
    

    const { progresoAsignado, progresoReal } = objetivo.operativosResponsable.find(responsable => responsable.id === userAuth?.id)!.scoreCard
    const fixedProgresoReal = useMemo(() => Number(progresoReal.toFixed(2)), [progresoReal])


    const {firstColor, secondColor} = useMemo(() => { 
        
        
    //  Encontrar si userAuth es autor del objetivo.operativoPropietario.find(responsable => responsable.id === userAuth?.id)

''

        const esAutor = objetivo.operativosResponsable.filter((item) => item.scoreCard.propietario === true).map((item) => item.id).includes(userAuth?.id!)

        if(esAutor) {
            return {
                firstColor: 'rgba(9, 103, 201, 1)',
                secondColor: 'rgba(9, 103, 201, .5)'
            }
        }

        return {
            firstColor: 'rgba(229, 17, 65, 1)',
            secondColor: 'rgba(229, 17, 65, .5)'
        }

    }, [objetivo.operativoPropietario?.id, userAuth?.id])

    const resultadoClaveDoneCount = useMemo(() => {
        let total = 0
        objetivo.resultadosClave.forEach(resultado => {
            resultado.progreso === 100 && total++
        })
        return total
    }, [objetivo])


    

    const orderedResponsables = useMemo(() => {
        const responsables = objetivo.operativosResponsable
        // poner primero al responsable.propietario === true
        const responsablePropietario = responsables.find(responsable => responsable.scoreCard.propietario === true)
        const responsablesSinPropietario = responsables.filter(responsable => responsable.scoreCard.propietario === false)
        return [responsablePropietario, ...responsablesSinPropietario]
    }, [objetivo.operativosResponsable])


    return (
        <Card className='md:col-span-4 col-span-12 group shadow-ext' key={objetivo.id} >
            <div className='w-full flex justify-around text-devarana-graph text-center'>  
                <div>
                    <p> Resultados Clave </p>
                    <p> {resultadoClaveDoneCount} / { objetivo.resultadosClave.length } </p>
                </div>
                <div>
                    <p>Acciones </p>
                    <p> 0 / 0 </p>
                </div>
                <div>
                    <p> Ponderacion </p>
                    <p> 
                        { progresoAsignado.toFixed(2) }%
                    </p>
                </div>
            </div>
            <Divider />
            <p className='text-center text-devarana-graph font-medium uppercase'> {objetivo.nombre} </p>

            <div className='max-w-[130px] mx-auto py-5'>
                {/* <DoughnutChart value={value} firstColor={firstColor} secondColor={secondColor}/>
                <button onClick={ () =>  setValue (prev => prev + 10) }> + </button> */}
            </div>
            <ProgressBar maxValue={fixedProgresoReal} firstColor={firstColor} secondColor={secondColor} />

            
            <Avatar.Group maxCount={3} className='flex justify-center' maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}>
                {
                    
                    orderedResponsables?.map((responsable, index) => (
                        <Link to={`/perfil/${responsable?.slug}`} className='first-of-type:border-devarana-pink border-2 rounded-full'>
                            <Tooltip title={`${responsable?.nombre} ${responsable?.apellidoPaterno}`} placement='top' key={index} >
                                <Avatar key={index} src={<Image src={`${getStorageUrl(responsable?.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                    {responsable?.iniciales} 
                                </Avatar>
                            </Tooltip>
                        </Link>
                    ))
                    
                }
            </Avatar.Group>


            <div className='flex py-5 gap-10 justify-center'>
                <Link to={`/objetivo/${objetivo.id}`} className='text-devarana-graph hover:opacity-80 hover:text-devarana-graph'
                    state={{
                        year,
                        quarter
                    }}
                >
                    <Icon iconName='faEye'/>
                    <span> Ver </span> 
                </Link>
                <Space onClick={ () => handleEditObjetivo(objetivo.id) } className='cursor-pointer text-devarana-graph hover:opacity-80'  >
                    <Icon iconName='faEdit'/>
                    <span> Editar </span>
                </Space>
            </div>
            
        </Card>
    )
}
