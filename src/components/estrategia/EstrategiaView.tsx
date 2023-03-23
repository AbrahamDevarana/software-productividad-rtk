
import { Estrategico } from '@/interfaces';
import { Progress, Divider, Slider, Avatar, Drawer } from 'antd';
import dayjs from 'dayjs';
import { Perspectiva } from '../../interfaces/perspectiva';
import Loading from '../antd/Loading';
import { useState } from 'react';
import { FormEstrategia } from './FormEstrategia';
import { Link } from 'react-router-dom';

export const EstrategiaView = ({estrategico, perspectiva, isLoading}: {estrategico: Estrategico, perspectiva:Perspectiva, isLoading?:boolean}) => {

    
    const [ showChildrenDrawer, setShowChildrenDrawer ] = useState<boolean>(false);

    if(isLoading){
        return <Loading />
    }

    return (
        <>
            <div className='w-full'>
                <h1 className='text-2xl'>{estrategico.nombre}</h1>

                <Divider />

                <Slider defaultValue={estrategico.progreso}  />

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
                            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                            <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
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

                    <Link to={`/estrategia/${estrategico.id}`} > Ver más </Link>

                    <button onClick={() => setShowChildrenDrawer(true)}>Editar</button>
                    
                </div>

                <Drawer
                    open={showChildrenDrawer}
                    width={window.innerWidth > 1200 ? 600 : '100%'}
                    closable={false}
                    onClose={() => setShowChildrenDrawer(false)}
                >
                    <FormEstrategia estrategico={ estrategico } perspectiva={ perspectiva } />
                </Drawer>
            </div>
        </>
    )
}
