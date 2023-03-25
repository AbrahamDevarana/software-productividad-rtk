
import { Estrategico } from '@/interfaces';
import { Progress, Divider, Slider, Avatar, Drawer, Button } from 'antd';
import dayjs from 'dayjs';
import { Perspectiva } from '../../interfaces/perspectiva';
import Loading from '../antd/Loading';
import { useState } from 'react';
import { FormEstrategia } from './FormEstrategia';
import { Link } from 'react-router-dom';
import { Icon } from '../Icon';
import { useGetColorByStatus } from '@/hooks/useGetColorByStatus';
import { status, statusString } from '@/helpers/status';

interface EstrategiaViewProps{
    estrategico: Estrategico;
    perspectiva: Perspectiva;
    isLoading?: boolean;
    edit?: boolean;
    view?: boolean;
    setOpen?: any;
    setShowDrawer?: any;
}


export const EstrategiaView = ({estrategico, perspectiva, isLoading, edit, view, setOpen, setShowDrawer}: EstrategiaViewProps) => {

    
    const [ showChildrenDrawer, setShowChildrenDrawer ] = useState<boolean>(false);

    if(isLoading){
        return <Loading />
    }

    return (
        <>
            <div className='w-full'>
                <h1 className='text-2xl'>{estrategico.nombre}</h1>

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

                <div className='grid grid-cols-3 gap-10'>
                    <div className='flex flex-col col-span-1'>
                        <p>Fecha Inicio: </p>
                        <span className='bg-gray-300 p-2'>{dayjs(estrategico.fechaInicio).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className='flex flex-col col-span-1'>
                        <p>Fecha Inicio: </p>
                        <span className='bg-gray-300 p-2'>{dayjs(estrategico.fechaFin).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className='flex flex-col col-span-1'>
                        <span className='rounded-ext text-white text-center text-lg' style={{ backgroundColor: perspectiva.color }}>
                            { perspectiva.nombre }
                        </span>
                    </div>

                    <div className='col-span-3'>
                        <p>Pertenece a:</p>
                        <Avatar.Group maxCount={3}>
                           {
                                 estrategico.responsables?.map((responsable, index) => (
                                    <Avatar key={index} src={`https://i.pravatar.cc/300`} />
                                ))
                           }
                        </Avatar.Group>
                    </div>
                    <div className='col-span-3'>
                        <p>Meta:</p>
                        <p>
                        { estrategico.descripcion }
                        </p>
                    </div>

                    <div className='col-span-3'>
                        <p>Indicador:</p>
                        <p> Prioridad 1</p>
                    </div>
                        
                   
                    
                    <div className='col-span-3'>
                        {
                            view && ( <Link to={`/estrategia/${estrategico.id}`} > <Button icon={<Icon iconName='faArrowRight' />} /> </Link>  )
                        }

                        {
                            edit && ( <Button icon={<Icon iconName='faPencil' />} className='mx-2' onClick={() => setShowChildrenDrawer(true)} /> )
                        }
                    </div>
                    
                </div>

                <Drawer
                    open={showChildrenDrawer}
                    width={window.innerWidth > 1200 ? 600 : '100%'}
                    closable={false}
                    onClose={() =>{ setShowChildrenDrawer(false); }}
                >
                    <FormEstrategia estrategico={ estrategico } perspectiva={ perspectiva } setShowDrawer={setShowDrawer} />
                </Drawer>
            </div>
        </>
    )
}
