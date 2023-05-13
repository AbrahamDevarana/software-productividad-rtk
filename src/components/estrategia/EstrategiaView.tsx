
import { EstrategicoProps } from '@/interfaces';
import dayjs from 'dayjs';
import Loading from '../antd/Loading';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../Icon';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { updateEstrategicoThunk } from '@/redux/features/estrategicos/estrategicosThunk';
import type { MenuProps } from 'antd';
import { TabStatus } from '../ui/TabStatus';
import createDOMPurify from 'dompurify';
import { getFile } from '@/helpers';
import { useColor } from '@/hooks';
import { Divider, Avatar, Button, Tooltip, FloatButton, Slider, Dropdown, Progress } from 'antd';


interface EstrategiaViewProps{
    estrategico: EstrategicoProps;
    // perspectiva: PerspectivaProps;
    isLoading?: boolean;
    edit?: boolean;
    view?: boolean;
    setShowEdit?: any;
}


export const EstrategiaView: React.FC<EstrategiaViewProps> = ({estrategico, isLoading, edit, view, setShowEdit}) => {

  

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const DOMPurify = createDOMPurify(window)
    
    const [statusEstrategico, setStatusEstrategico] = useState<number>(estrategico.status);
    const [progresoEstrategico, setProgresoEstrategico] = useState<number>(estrategico.progreso);
    

    const handleChangeProgreso = (value: number) => {

        if(view){
            
            setProgresoEstrategico(value); 
            const updateEstrategico = {
                ...estrategico,
                progreso: value
            }
    
            dispatch(updateEstrategicoThunk(updateEstrategico));  
        }else{
            setProgresoEstrategico(progresoEstrategico);
        }
             
    }

    const handleChangeStatus = (value: number) => {
        setStatusEstrategico(value); 
        const updateEstrategico = {
            ...estrategico,
            status: value
        }

        dispatch(updateEstrategicoThunk(updateEstrategico));       
    }
    
    const handleView = (id:string) => {
        setShowEdit(false);
        navigate(`/estrategia/${id}`)
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

                <div className='flex justify-between'>
                    <p className='text-devarana-graph'><span className='text-3xl'>{progresoEstrategico}</span> % / 100 %</p>

                    <div className='bg-gray-50 rounded-full px-2'>
                        <Dropdown menu={{items}} overlayClassName='bg-transparent' disabled={!view} >
                            <button onClick={(e) => e.preventDefault()}>
                                <TabStatus statusId={statusEstrategico} />
                            </button>
                        </Dropdown>
                    </div>
                </div>

                {
                    !view
                    ? (
                        <Progress 
                            className='drop-shadow progressStyle'
                            percent={progresoEstrategico}
                            strokeColor={{
                                from: useColor(statusEstrategico).color,
                                to: useColor(statusEstrategico, .5).color,
                                direction: 'to top'
                            }}
                            trailColor={useColor(statusEstrategico, .2)?.color}
                            strokeWidth={20}
                            showInfo={false}
                        />
                    )
                    : (
                    <Slider
                        className='drop-shadow progressStyle'
                        defaultValue={progresoEstrategico}
                        min={0}
                        max={100}
                        onAfterChange={ handleChangeProgreso }
                        trackStyle={{
                            backgroundColor: useColor(statusEstrategico).color,
                            borderRadius: 10,

                        }}
                        railStyle={{
                            backgroundColor: useColor(statusEstrategico, .3).color,
                            borderRadius: 10,
                        }}
                        
                    />
                    )

                }

                

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
                        <span className='text-sm rounded-ext text-white text-center p-2' style={{ backgroundColor: estrategico.perspectivas?.color }}>
                            { estrategico.perspectivas?.nombre }
                        </span>
                    </div>
                </div>



                <Divider orientation='left'>Propietario:</Divider>
                <Tooltip title={`${estrategico.propietario?.nombre} ${ estrategico.propietario?.apellidoPaterno }`}>
                    <Avatar key={estrategico.propietario?.id} src={getFile(estrategico.propietario?.foto)}  > { estrategico.propietario?.iniciales } </Avatar>
                </Tooltip>

                <Divider orientation='left'>Co-Responsables:</Divider>
                <Avatar.Group maxCount={3}>
                    {
                    estrategico.responsables?.map((responsable, index) => (
                        <Link to={`/perfil/${responsable.id}`} key={index}>
                            <Tooltip title={`${responsable.nombre} ${ responsable.apellidoPaterno }`}>
                                <Avatar key={index} src={getFile(responsable.foto)}  />
                            </Tooltip>
                        </Link>
                    ))
                    }
                </Avatar.Group>
                <Divider orientation='left'>Meta:</Divider>
                <div className='w-full border border-t-0 rounded-b-ext py-5 px-5'>
                    <div className='text-devarana-graph' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(estrategico.descripcion) }}>
                        
                    </div>
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
                        <Button onClick={()=>handleView(estrategico.id)} style={{ backgroundColor: estrategico.perspectivas?.color }} className='rounded-full  text-white border-none absolute -left-4 top-20' icon={<Icon iconName='faArrowLeft' />} /> 
                        // <Link to={`/estrategia/${estrategico.id}`} className='' > 
                        // </Link>  
                    )
                }
            </div>
        </>
    )
}
