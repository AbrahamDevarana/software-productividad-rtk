import {FC, useMemo} from 'react'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Icon } from '../Icon';
import { getOperativoThunk } from '@/redux/features/operativo/operativosThunk';
import { Avatar, Badge, Button, Card, Divider, Dropdown, Image, MenuProps, Progress, Space } from 'antd'
import { getColor, getStorageUrl } from '@/helpers';
import { Link } from 'react-router-dom';
import getBrokenUser from '@/helpers/getBrokenUser';


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
                        { progresoAsignado }%
                    </p>
                </div>
            </div>
            <Divider />
            <p className='text-center text-devarana-graph font-medium uppercase'> {objetivo.nombre} </p>
            <Progress 
                percent={  progresoReal }
                type='circle'
                strokeLinecap='square'
                className='flex justify-center py-5'
                strokeWidth={10}
                // strokeColor={{ '0%': '#ff0025', '85%': '#ff0025', '87%': '#ff914d', '89%': '#ffbd59', '91%': '#ffde59', '93%': '#c1ff72' , '95%': '#7ed9577' , '97%': '#00bf63', '99%': '#5ce1e6' , '100%': '#0cc0df' }}
                strokeColor={getColor('SIN_INICIAR').color}

            />
            <Avatar.Group className='flex justify-center' maxCount={3}
                maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}
            >
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
