import {FC} from 'react'
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
            </div>
            <Divider />
            <p className='text-center text-devarana-graph font-medium uppercase'> {objetivo.nombre} </p>
            <Progress 
                percent={
                    objetivo.operativosResponsable?.map(responsable => {
                        if( responsable.id === userAuth?.id ) {
                            return responsable.scoreCard?.progresoFinal
                        }
                    })[0]
                }
                type='circle'
                strokeLinecap='square'
                className='flex justify-center py-5'
                strokeWidth={10}
                strokeColor={getColor('SIN_INICIAR').color}

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
