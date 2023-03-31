import { useGetColor } from '@/hooks/useGetColor';
import { TacticoProps } from '@/interfaces'
import { Avatar, Divider, Dropdown, FloatButton, MenuProps, Slider, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Loading from '../antd/Loading';
import { Icon } from '../Icon';
import { TabStatus } from '../ui/TabStatus';
import { useState } from 'react';

interface TacticosViewProps {
    setShowEdit: (value: boolean) => void
    currentTactico?: TacticoProps | null
}


export const TacticosView = ({setShowEdit, currentTactico}: TacticosViewProps) => {

    const [statusEstrategico, setStatusEstrategico] = useState<number>(currentTactico?.status || 0);
    const [progresoEstrategico, setProgresoEstrategico] = useState<number>(currentTactico?.progreso || 0);

    if(!currentTactico) return <Loading />

    const handleChangeProgreso = (value: number) => {
        setProgresoEstrategico(value); 
    }

    const handleChangeStatus = (value: number) => {
        setStatusEstrategico(value);   
    }

    const items: MenuProps['items'] = [
        {
          key: '1',
          label: (
            <button onClick={() => handleChangeStatus(1)}> <TabStatus statusId={1} /> </button>
          ),
        },
        {
            key: '2',
            label: (
                <button onClick={() => handleChangeStatus(2)}> <TabStatus statusId={2} /> </button>
            ),
        },
        {
            key: '3',
            label: (
                <button onClick={() => handleChangeStatus(3)}> <TabStatus statusId={3} /> </button>
            ),
        },
        {
            key: '4',
            label: (
                <button onClick={() => handleChangeStatus(4)}> <TabStatus statusId={4} /> </button>
            ),
        },
        {
            key: '5',
            label: (
                <button onClick={() => handleChangeStatus(5)}> <TabStatus statusId={5} /> </button>
            ),
        },
    ]

    return (
        <>
            <div className='flex justify-between'>
                <h1 className='text-xl font-medium text-devarana-graph'> {currentTactico.nombre} </h1>
                <div className='bg-gray-50 rounded-full px-2'>
                    <Dropdown menu={{items}} overlayClassName='bg-transparent'>
                        <button onClick={(e) => e.preventDefault()}>
                            <TabStatus statusId={statusEstrategico} />
                        </button>
                    </Dropdown>
                </div>
            </div>

            <Divider />

            <Slider
                className='drop-shadow progressStyle'
                defaultValue={progresoEstrategico}
                min={0}
                max={100}
                onAfterChange={ handleChangeProgreso }
                trackStyle={{
                    backgroundColor: useGetColor(statusEstrategico)?.hex,
                    borderRadius: 10,

                }}
                railStyle={{
                    backgroundColor: useGetColor(statusEstrategico, .3)?.rgba,
                    borderRadius: 10,
                }}
                
            />

            <div>
                { currentTactico.objetivo_tact&& currentTactico.objetivo_tact.length > 0 && currentTactico.objetivo_tact.map( (obj:any, i:number) => ( 
                    <p key={i} className='text-devarana-graph'>
                        Objetivo Estrategico: { obj.nombre }
                    </p>
                ))}
            </div>

            <div>
                {  currentTactico.areas && currentTactico.areas.length > 0 && currentTactico.areas.map( (obj:any, i:number) => ( 
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
