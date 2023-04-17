import {FC} from 'react'
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Avatar, Button, Card, Divider, Dropdown, Image, MenuProps, Progress, Space } from 'antd'
import { Icon, IconName } from '../Icon';
import { getObjetivoThunk } from '@/redux/features/operativo/operativosThunk';
import { useColor } from '@/hooks';


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
        <Card className='md:col-span-4 col-span-12 group shadow-ext' key={objetivo.id}
        // actions={
        //     [ <Button type='text'  onClick={ () => handleEditObjetivo(objetivo.id) } icon={<Icon iconName='faEdit' className='text-devarana-graph'/> } />]
        // }
        >

          


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
                strokeColor={useColor(2).color}

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

            <Dropdown className='absolute hidden group-hover:block top-0 right-0' menu={{items}} trigger={['click']} placement='bottomRight'>
                <Button className='' type='text' icon={<Icon iconName='faEllipsisH' className='text-devarana-graph text-xl'/> } />
            </Dropdown>
        </Card>
    )
}
