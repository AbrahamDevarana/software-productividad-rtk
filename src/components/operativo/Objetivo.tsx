import {FC, useMemo} from 'react'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Icon } from '../Icon';
import { getOperativoThunk } from '@/redux/features/operativo/operativosThunk';
import { Avatar, Badge, Button, Card, Divider, Dropdown, Image, MenuProps, Progress, Space } from 'antd'
import { getColor, getStorageUrl } from '@/helpers';
import { Link } from 'react-router-dom';
import getBrokenUser from '@/helpers/getBrokenUser';
import DoughnutChart from '../complexUI/Doughtnut';
import { log } from 'console';


interface ObjetivoProps {
    objetivo: OperativoProps,
    setIsModalVisible: (value: boolean) => void
}

export const Objetivo: FC<ObjetivoProps> = ({objetivo, setIsModalVisible}) => {

    const { userAuth } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const handleEditObjetivo = (id: string) => {
        dispatch(getOperativoThunk(id))
        setIsModalVisible(true)
    }

    const { progresoAsignado, progresoReal } = objetivo.operativosResponsable.find(responsable => responsable.id === userAuth?.id)!.scoreCard
    const fixedProgresoReal = useMemo(() => Number(progresoReal.toFixed(2)), [progresoReal])


    const {first, second} = useMemo(() => {        

        const first = userAuth?.id === objetivo.propietarioId ? 'rgba(9, 103, 201, 1)' : 'rgba(229, 17, 65, 1)'
        const second = userAuth?.id === objetivo.propietarioId ? 'rgba(9, 103, 201, .5)' : 'rgba(229, 17, 65, .5)'
        return {first, second}
    }, [objetivo.operativoPropietario?.id, userAuth?.id])
    

    return (
        <Card className='md:col-span-4 col-span-12 group shadow-ext' key={objetivo.id} >
            <div className='w-full flex justify-around text-devarana-graph text-center'>  
                <div>
                    <p> Resultados Clave </p>
                    <p> 0 / { objetivo.resultadosClave?.length } </p>
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

            {/* <DoughnutChart value={progresoReal}/> */}

            <Progress
                className='flex items-center justify-center py-5'
                rootClassName=''
                type='circle'
                strokeColor={{
                    '0%': first,
                    '100%': second,
                }}
                percent={fixedProgresoReal}
                size={100}
                
                />
            <Avatar.Group className='flex justify-center'>
                {
                    objetivo.operativoPropietario && (
                        <Avatar src={<Image src={`${getStorageUrl(objetivo.operativoPropietario.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                            {objetivo.operativoPropietario.iniciales} 
                        </Avatar>
                    )
                }
                {
                    
                    objetivo.operativosResponsable?.map((responsable, index) => (
                        <Avatar key={index} src={<Image src={`${getStorageUrl(responsable.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                            {responsable.iniciales} 
                        </Avatar>
                    ))
                    
                }
            </Avatar.Group>


            <div className='flex py-5 gap-10 justify-center'>
                <Link to={`${objetivo.id}`} className='text-devarana-graph hover:opacity-80 hover:text-devarana-graph'>
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
