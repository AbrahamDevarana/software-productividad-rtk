
import { EstrategicoProps } from '@/interfaces';
import { Progress, Divider, Avatar, Button, Tooltip, FloatButton } from 'antd';
import dayjs from 'dayjs';
import { Perspectiva } from '../../interfaces/perspectiva';
import Loading from '../antd/Loading';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { useGetColorByStatus } from '@/hooks/useGetColorByStatus';
import { status, statusString } from '@/helpers/status';

interface EstrategiaViewProps{
    estrategico: EstrategicoProps;
    perspectiva: Perspectiva;
    isLoading?: boolean;
    edit?: boolean;
    view?: boolean;
    setShowEdit?: any;
}


export const EstrategiaView = ({estrategico, perspectiva, isLoading, edit, view, setShowEdit }: EstrategiaViewProps) => {

    
    if(isLoading){
        return <Loading />
    }

    return (
        <>
            <div className='w-full'>
                <h1 className='text-2xl'>{estrategico.nombre}</h1>

                <Progress 
                    className='drop-shadow progressStyle' percent={estrategico.progreso} strokeWidth={20} 
                    strokeColor={{
                        from: useGetColorByStatus(status[estrategico.status]).hex,
                        to: useGetColorByStatus(status[estrategico.status]).hexLow,
                    }}
                    trailColor={useGetColorByStatus(status[estrategico.status], .3).rgba} 
                    
                />

                <div className='flex flex-col col-span-1'>
                    <span className='rounded-ext text-white text-center text-lg' style={{ backgroundColor: perspectiva.color }}>
                        { perspectiva.nombre }
                    </span>
                </div>

                <div className='grid grid-cols-2 gap-10 py-5'>
                    <div className='flex flex-col col-span-1'>
                        <p className='text-devarana-graph'>Fecha Inicio: </p>
                        <span className='bg-gray-200 p-2 rounded-ext'>{dayjs(estrategico.fechaInicio).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className='flex flex-col col-span-1'>
                        <p className='text-devarana-graph'>Fecha Inicio: </p>
                        <span className='bg-gray-200 p-2 rounded-ext'>{dayjs(estrategico.fechaFin).format('DD/MM/YYYY')}</span>
                    </div>
                    

                    <div className='col-span-3'>
                        <p className='text-devarana-graph'>Responsable:</p>
                        <Avatar.Group maxCount={3}>
                           {
                            estrategico.responsables?.map((responsable, index) => (
                                <Link to={`/perfil/${responsable.id}`} key={index}>
                                    <Tooltip title={`${responsable.nombre} ${ responsable.apellidoPaterno }`}>
                                        <Avatar key={index} src={`https://i.pravatar.cc/300`}  />
                                    </Tooltip>
                                </Link>
                            ))
                           }
                        </Avatar.Group>
                    </div>
                    <div className='col-span-3'>
                        <Divider orientation='left'>Meta:</Divider>
                        <div className='w-full border border-t-0 rounded-b-ext py-5 px-5'>
                            <p className='text-devarana-graph'>
                                { estrategico.descripcion }
                            </p>
                        </div>
                    </div>

                    <div className='col-span-3'>
                        <Divider orientation='left'>Indicador:</Divider>
                        <div className='w-full border border-t-0 rounded-b-ext py-5 px-5'>
                            <p className='text-devarana-graph'>
                                { estrategico.indicador }
                            </p>
                        </div>
                    </div>
                        
     
                    <div className='col-span-3'>

                        {
                            edit && ( 
                                <FloatButton
                                    icon={<Icon iconName='faPencil' className='text-devarana-midnight'/>}
                                    className='mx-2 absolute bottom-8 right-4 rounded-full'
                                    onClick={() => setShowEdit(true)}
                                />
                            )
                        }
                        {
                            view && ( 
                            <Link to={`/estrategia/${estrategico.id}`} className='absolute -left-4 top-20' > 
                                <Button style={{ backgroundColor: perspectiva.color }} className='rounded-full  text-white border-none' icon={<Icon iconName='faArrowRight' />} /> 
                            </Link>  )
                        }
                    </div>
                    
                </div>
            </div>
        </>
    )
}
