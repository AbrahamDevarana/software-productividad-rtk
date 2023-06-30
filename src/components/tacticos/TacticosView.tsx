import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AreaProps, TacticoProps } from '@/interfaces'
import dayjs from 'dayjs';
import { useAppSelector } from '@/redux/hooks';
import Loading from '../antd/Loading';
import { Icon } from '../Icon';
import { TabStatus } from '../ui/TabStatus';
import { getFile, getColor } from '@/helpers';
import { Avatar, Divider, Dropdown, FloatButton, MenuProps, Slider, Tooltip } from 'antd';
import { statusType } from '@/types';

interface TacticosViewProps {
    setShowEdit: (value: boolean) => void
    currentTactico?: TacticoProps | null
}


export const TacticosView = ({setShowEdit}: TacticosViewProps) => {

    const { currentTactico, isLoading } = useAppSelector(state => state.tacticos)
    const [statusEstrategico, setStatusEstrategico] = useState<statusType>(currentTactico.status);
    const [progresoEstrategico, setProgresoEstrategico] = useState<number>(currentTactico.progreso);
    
    if(!currentTactico) return <Loading />

    const handleChangeProgreso = (value: number) => {
        setProgresoEstrategico(value); 
    }

    const handleChangeStatus = (value: statusType) => {
        setStatusEstrategico(value);   
    }

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <button onClick={() => handleChangeStatus('SIN_INICIAR')}> <TabStatus status={'SIN_INICIAR'} /> </button>
          ),
        },
        {
            key: '2',
            label: (
                <button onClick={() => handleChangeStatus('EN_TIEMPO')}> <TabStatus status={'EN_TIEMPO'} /> </button>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={() => handleChangeStatus('FINALIZADO')}> <TabStatus status={'FINALIZADO'} /> </button>
            ),
        },
        {
            key: '4',
            label: (
                <button onClick={() => handleChangeStatus('EN_PAUSA')}> <TabStatus status={'EN_PAUSA'} /> </button>
            ),
        },
        {
            key: '5',
            label: (
                <button onClick={() => handleChangeStatus('CANCELADO')}> <TabStatus status={'CANCELADO'} /> </button>
            ),
        },
    ]

    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-xl font-medium text-devarana-graph'> {currentTactico.nombre} </h1>

            </div>

            <Divider />

            <div className='flex justify-between'>
                <p className='text-devarana-graph'><span className='text-3xl'>{progresoEstrategico}</span> % / 100 %</p>

                <div className='bg-gray-50 rounded-full px-2'>
                    <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                        <button onClick={(e) => e.preventDefault()}>
                            <TabStatus status={statusEstrategico} />
                        </button>
                    </Dropdown>
                </div>
            </div>

            <Slider
                className='drop-shadow progressStyle'
                defaultValue={progresoEstrategico}
                min={0}
                max={100}
                onAfterChange={ handleChangeProgreso }
                trackStyle={{
                    backgroundColor: getColor(statusEstrategico).color,
                    borderRadius: 10,

                }}
                railStyle={{
                    backgroundColor: getColor(statusEstrategico, .3).color,
                    borderRadius: 10,
                }}
                
            />


            <Divider orientation='left'> Objetivo Estrategico:</Divider>
            <div>
                { currentTactico.estrategico && (
                    <Link to={`/estrategia/${currentTactico.estrategico.id}`}>
                        <p className='text-devarana-graph'> {currentTactico.estrategico.nombre} </p>
                    </Link>
                )}
            </div>

            <Divider orientation='left'> Áreas:</Divider>
            <div className='px-5'>
                <ul>
                    {  currentTactico.areas && currentTactico.areas.length > 0 && currentTactico.areas.map( (obj:AreaProps) => ( 
                        <li key={obj.id} className='text-devarana-graph list-disc'>
                           {obj.nombre}
                        </li>
                    ))}
                </ul>
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

            <Divider orientation='left'>Propietario:</Divider>
            <Tooltip title={`${currentTactico.propietario?.nombre} ${ currentTactico.propietario?.apellidoPaterno }`}>
                <Avatar key={currentTactico.propietario?.id} src={ getFile(currentTactico.propietario?.foto ) }  > { currentTactico.propietario?.iniciales } </Avatar>
            </Tooltip>

            <Divider orientation='left'>Co-Responsables:</Divider>
            <Avatar.Group maxCount={3}>
                {
                currentTactico.responsables?.map((responsable, index) => (
                    <Link to={`/perfil/${responsable.id}`} key={index}>
                        <Tooltip title={`${responsable.nombre} ${ responsable.apellidoPaterno }`}>
                            <Avatar key={index} src={responsable.foto} >
                                {responsable.iniciales}
                            </Avatar>
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
