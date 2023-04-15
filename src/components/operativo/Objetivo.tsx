import {FC} from 'react'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Avatar, Button, Card, Divider, Image, Progress, Space } from 'antd'
import { Icon, IconName } from '../Icon';
import { getObjetivoThunk } from '@/redux/features/operativo/operativosThunk';


interface ObjetivoProps {
    objetivo: OperativoProps,
    setIsModalVisible: (value: boolean) => void
}

export const Objetivo: FC<ObjetivoProps> = ({objetivo, setIsModalVisible}) => {

    const { userAuth } = useAppSelector(state => state.auth)
    const { currentOperativo } = useAppSelector(state => state.operativos)
    const dispatch = useAppDispatch()

    const handleEditObjetivo = (id: string) => {
        dispatch(getObjetivoThunk(id))
        setIsModalVisible(true)

    }

    return (
        <Card className='md:col-span-4 col-span-12' key={objetivo.id} 
        actions={
            [ <Button type='text'  onClick={ () => handleEditObjetivo(objetivo.id) } icon={<Icon iconName='faEdit' className='text-devarana-graph'/> } />]
        }>
            <div className='w-full flex justify-around text-devarana-graph text-center'>  
                <div className=''>
                    <p> Resultados Clave </p>
                    <p> 0 / { objetivo.resultados_clave?.length } </p>
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
                    objetivo.responsables_op?.map(responsable => {
                        if( responsable.id === userAuth?.id ) {
                            return responsable.scoreCard?.progresoFinal
                        }
                    })[0]
                }
                type='circle'
                strokeLinecap='square'
                className='flex justify-center py-5'
                strokeWidth={10}
            />
            <Avatar.Group className='flex justify-center'>
                {
                    objetivo.propietario_op && (
                        <Avatar size={'large'} key={objetivo.propietario_op.id} src={<Image title={objetivo.propietario_op.nombre} src={`${import.meta.env.VITE_STORAGE_URL}${objetivo.propietario_op.foto}`} /> }> {objetivo.propietario_op.iniciales} </Avatar>
                    )
                }
                {
                    
                    objetivo.responsables_op?.map((responsable, index) => (
                        <Avatar size={'large'} key={index} src={<Image title={responsable.nombre} src={`${import.meta.env.VITE_STORAGE_URL}${responsable.foto}`} /> }> {responsable.iniciales} </Avatar>
                    ))
                    
                }
            </Avatar.Group>
        </Card>
    )
}
