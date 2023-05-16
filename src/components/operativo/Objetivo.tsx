import {FC} from 'react'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Icon } from '../Icon';
import { getObjetivoThunk } from '@/redux/features/operativo/operativosThunk';
import { Avatar, Button, Card, Divider, Dropdown, Image, MenuProps, Progress, Space } from 'antd'
import { getColor } from '@/helpers';


interface ObjetivoProps {
    objetivo: OperativoProps,
    setIsModalVisible: (value: boolean) => void
}

export const Objetivo: FC<ObjetivoProps> = ({objetivo, setIsModalVisible}) => {

    const { userAuth } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    const handleEditObjetivo = (id: string) => {
        dispatch(getObjetivoThunk(id))
        setIsModalVisible(true)
    }

    const items: MenuProps['items'] = [
        {
            key: 'edit',
            label: (
                <Space onClick={ () => handleEditObjetivo(objetivo.id) } >
                    <Icon iconName='faEdit' className='text-devarana-graph'/>
                    <span>Editar</span>
                </Space>
            )
            
        }
    ]

    return (
        <Card className='md:col-span-4 col-span-12 group shadow-ext' key={objetivo.id} >
            <div className='w-full flex justify-around text-devarana-graph text-center'>  
                <div className=''>
                    <p> Resultados Clave </p>
                    <p> 0 / { objetivo.resultadosClave?.length } </p>
                </div>
                <div className='border-x px-5'>
                    <p>Indicadores </p>
                    <p> 0 / 2</p>
                </div>
                <div className=''>
                    <p>Acciones </p>
                    <p> 0 / 2</p>
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

            <Dropdown className='absolute hidden group-hover:block top-0 right-0' menu={{items}} trigger={['click']}>
                <Button className='' type='text' icon={<Icon iconName='faEllipsisH' className='text-devarana-graph text-xl'/> } />
            </Dropdown>
        </Card>
    )
}
