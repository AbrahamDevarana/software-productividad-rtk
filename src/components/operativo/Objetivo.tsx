import {FC} from 'react'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Icon } from '../Icon';
import { getOperativoThunk } from '@/redux/features/operativo/operativosThunk';
import { Avatar, Badge, Button, Card, Divider, Dropdown, Image, MenuProps, Progress, Space } from 'antd'
import { getColor } from '@/helpers';
import { Link } from 'react-router-dom';


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
                        <Avatar size={'large'} key={objetivo.operativoPropietario.id} src={<Image title={objetivo.operativoPropietario.nombre} src={`${import.meta.env.VITE_STORAGE_URL}${objetivo.operativoPropietario.foto}`} /> }> {objetivo.operativoPropietario.iniciales} </Avatar>
                    )
                }
                {
                    
                    objetivo.operativosResponsable?.map((responsable, index) => (
                        <Avatar size={'large'} key={index} src={<Image title={responsable.nombre} src={`${import.meta.env.VITE_STORAGE_URL}${responsable.foto}`} /> }> {responsable.iniciales} </Avatar>
                    ))
                    
                }
            </Avatar.Group>


            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 -z-50 group-hover:z-50 flex  items-center justify-center w-full bottom-0 bg-black bg-opacity-70 text-white transition-all duration-300 rounded-ext gap-10'>
                    <Link to={`${objetivo.id}`} >
                        <Icon iconName='faEye' className='text-devarana-graph'/>
                        <span> Ver </span>
                    </Link>
                    <Space onClick={ () => handleEditObjetivo(objetivo.id) } className='cursor-pointer' >
                        <Icon iconName='faEdit' className='text-devarana-graph'/>
                        <span>Editar</span>
                    </Space>
            </div>
            
        </Card>
    )
}
