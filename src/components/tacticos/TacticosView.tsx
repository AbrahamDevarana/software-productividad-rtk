import { useGetColorByStatus } from '@/hooks/useGetColorByStatus';
import { TacticoProps } from '@/interfaces'
import { Avatar, Divider, FloatButton, Progress, Tooltip } from 'antd';
import { status, statusString } from '@/helpers/status';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loading from '../antd/Loading';
import { Icon } from '../Icon';

interface TacticosViewProps {
    setShowEdit: (value: boolean) => void
    currentTactico?: TacticoProps | null
}


export const TacticosView = ({setShowEdit, currentTactico}: TacticosViewProps) => {

    if(!currentTactico) return <Loading />

    return (
        <>
            <div className='grid grid-cols-12'>
                <h1 className='text-2xl col-span-10'> {currentTactico.nombre} </h1>
                <div className='col-span-1 rounded-ext text-white text-center text-lg' style={{ backgroundColor: useGetColorByStatus(status[currentTactico.status]).hex }} />
            </div>

            <Divider />

            <Progress 
                className='drop-shadow progressStyle' percent={currentTactico.progreso} strokeWidth={20} 
                strokeColor={{
                    from: useGetColorByStatus(status[currentTactico.status]).hex,
                    to: useGetColorByStatus(status[currentTactico.status]).hexLow,
                }}
                
                trailColor={useGetColorByStatus(status[currentTactico.status], .3).rgba} 
            />

            <div>
                { currentTactico.objetivo_tact.length > 0 && currentTactico.objetivo_tact.map( (obj:any, i:number) => ( 
                    <p key={i} className='text-devarana-graph'>
                        Objetivo Estrategico: { obj.nombre }
                    </p>
                ))}
            </div>

            <div>
                { currentTactico.areas.length > 0 && currentTactico.areas.map( (obj:any, i:number) => ( 
                    <p key={i} className='text-devarana-graph'>
                        Áreas: { obj.nombre }
                    </p>
                ))}
            </div>

            <div className='grid grid-cols-2 gap-10 py-5'>
                <div className='flex flex-col col-span-1'>
                    <p className='text-devarana-graph'>Fecha Inicio: </p>
                    <span className='bg-gray-200 p-2 rounded-ext'>{dayjs(currentTactico.fechaInicio).format('DD/MM/YYYY')}</span>
                </div>
                <div className='flex flex-col col-span-1'>
                    <p className='text-devarana-graph'>Fecha Inicio: </p>
                    <span className='bg-gray-200 p-2 rounded-ext'>{dayjs(currentTactico.fechaFin).format('DD/MM/YYYY')}</span>
                </div>
            </div>

            <p className='text-devarana-graph'>Responsables:</p>
            <Avatar.Group maxCount={3}>
                {
                currentTactico.responsables?.map((responsable, index) => (
                    <Link to={`/perfil/${responsable.id}`} key={index}>
                        <Tooltip title={`${responsable.nombre} ${ responsable.apellidoPaterno }`}>
                            <Avatar key={index} src={`https://i.pravatar.cc/300`}  />
                        </Tooltip>
                    </Link>
                ))
                }
            </Avatar.Group>

            <div className='col-span-3'>
                <Divider orientation='left'>Meta:</Divider>
                <div className='w-full border border-t-0 rounded-b-ext py-5 px-5'>
                    <p className='text-devarana-graph'>
                        { currentTactico.meta }
                    </p>
                </div>
            </div>

            <div className='col-span-3'>
                <Divider orientation='left'>Indicador:</Divider>
                <div className='w-full border border-t-0 rounded-b-ext py-5 px-5'>
                    <p className='text-devarana-graph'>
                        { currentTactico.indicador }
                    </p>
                </div>
            </div>

            {
            
                <FloatButton 
                    onClick={() => setShowEdit(true)}
                    icon={<Icon iconName='faPencil' className='text-devarana-midnight'/>}
                    className='mx-2 absolute bottom-8 right-4 rounded-full'
                />

            }
            


        </>
    )
}
