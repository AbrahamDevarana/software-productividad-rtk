import {FC} from 'react'
import { OperativoProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { Avatar, Divider, Image, Progress } from 'antd'


interface ObjetivoProps {
    objetivo: OperativoProps
}

export const Objetivo: FC<ObjetivoProps> = ({objetivo}) => {

    const { userAuth } = useAppSelector(state => state.auth)

    return (
        <div className='shadow rounded-ext p-5 md:col-span-4 col-span-12' key={objetivo.id}>
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
                // strokeColor={{
                //     "0%": useGetColor(2, .8)?.rgba || '#108ee9',
                //     "100%": useGetColor(2, .8)?.rgba || '#108ee9'
                // }}
            />
            <Divider />
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
        </div>
    )
}
