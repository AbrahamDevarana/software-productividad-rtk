
import { EstrategicoProps } from '@/interfaces';
import { Progress, Divider, Avatar, Button, Tooltip, FloatButton, Select } from 'antd';
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


export const EstrategiaView: React.FC<EstrategiaViewProps> = ({estrategico, perspectiva, isLoading, edit, view, setShowEdit }) => {

    
    if(isLoading){
        return <Loading />
    }

    return (
        <>
            <div className='w-full'>

                <div className="flex justify-between">
                    <div className='text-xl col-span-7 flex flex-col'>
                        <p className='text-devarana-graph'>Nombre: </p>
                        <h1 className='text-xl font-medium text-devarana-graph'>{estrategico.nombre}</h1>
                    </div>
                    
                    <div className="col-span-1 flex flex-col px-5 border-l-devarana-graph border-l border-opacity-10"> 
                        <p className='text-devarana-graph '>Código: </p>
                        <h2 className='text-xl font-medium text-devarana-graph'>{estrategico.codigo }</h2>
                    </div>
                </div>

                <Divider />

    
                <Progress 
                    className='drop-shadow progressStyle' percent={estrategico.progreso} strokeWidth={20} 
                    strokeColor={{
                        from: useGetColorByStatus(status[estrategico.status]).hex,
                        to: useGetColorByStatus(status[estrategico.status]).hexLow,
                    }}
                    trailColor={useGetColorByStatus(status[estrategico.status], .3).rgba} 
                    
                />

                <Divider />

                

                <div className='grid grid-cols-3 gap-10 py-5'>
                    <div className='flex flex-col col-span-1'>
                        <p className='text-devarana-graph'>Fecha Inicio: </p>
                        <span className='bg-gray-50 rounded-ext text-sm text-center p-2'>{dayjs(estrategico.fechaInicio).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className='flex flex-col col-span-1'>
                        <p className='text-devarana-graph'>Fecha Inicio: </p>
                        <span className='bg-gray-50 rounded-ext text-sm text-center p-2'>{dayjs(estrategico.fechaFin).format('DD/MM/YYYY')}</span>
                    </div>
                    
                    <div className='flex flex-col col-span-1'>
                    <p className='text-devarana-graph'>Perspectiva: </p>
                        <span className='text-sm rounded-ext text-white text-center p-2' style={{ backgroundColor: perspectiva.color }}>
                            { perspectiva.nombre }
                        </span>
                    </div>
                </div>
                    

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
                <Divider orientation='left'>Meta:</Divider>
                <div className='w-full border border-t-0 rounded-b-ext py-5 px-5'>
                    <p className='text-devarana-graph'>
                        { estrategico.descripcion }
                    </p>
                </div>
                <Divider orientation='left'>Indicador:</Divider>
                <div className='w-full border border-t-0 rounded-b-ext py-5 px-5'>
                    <p className='text-devarana-graph'>
                        { estrategico.indicador }
                    </p>
                </div>
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
                        <Button style={{ backgroundColor: perspectiva.color }} className='rounded-full  text-white border-none' icon={<Icon iconName='faArrowLeft' />} /> 
                    </Link>  )
                }
            </div>
        </>
    )
}
