import {useState,} from 'react'
import { Link } from 'react-router-dom';
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { cambioEstatusObjetivoThunk, getOperativoThunk } from '@/redux/features/operativo/operativosThunk';
import { Avatar, Divider, Image, Modal, Space, Switch, Tooltip, message } from 'antd'
import { getColor, getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';
import { ProgressBar } from '../complexUI/ProgressDoughtnut';
import { useOperativo } from '@/hooks/useOperativo';
import { FaEdit, FaEye } from 'react-icons/fa';


interface Props {
    objetivo: OperativoProps,
    setFormVisible: (value: boolean) => void
    etapa: {
        etapaActual: string,
        color: string,
        isClosed: boolean,
        isCierreObjetivos: boolean,
    }
}

export const CardObjetivo = ({objetivo, setFormVisible, etapa }:Props) => {

    const { confirm } = Modal;
    const { userAuth } = useAppSelector(state => state.auth)
    const { currentConfig: {year, quarter}} = useAppSelector(state => state.global)

    const dispatch = useAppDispatch()

    const handleEditObjetivo = (id: string) => {
        dispatch(getOperativoThunk(id))
        setFormVisible(true)
    }
    const {firstColor, fixedProgresoReal, orderedResponsables, progresoAsignado, resultadoClaveDoneCount, secondColor, usuarioPropietaro, statusObjetivo, taskCount, taskCountDone, statusText } = useOperativo({objetivo})

    const showConfirm = (checked :boolean) => {


        if(checked) {
            confirm({
                title: <p className='text-devarana-dark-graph'>¿ Confirmas deseas enviar a aprobación ?</p>,
                width: 600,
                okButtonProps: {
                    danger: true
                },
                okText: 'Enviar',
                cancelText: 'Cancelar',
                content: 
                <div className='text-devarana-graph'>
                    <p> 
                        Te sugerimos considerar los siguientes aspectos:
                    </p>
                    <ul style={{
                        listStyle: 'disc',
                        listStylePosition: 'inside',
                    }}>
                        <li> En este punto debes haber revisado con los participantes del objetivo el avance y resultados obtenidos. </li>
                        <li> El objetivo no podrá ser modificado por el propietario y/o sus participantes. </li>
                        <li> Una vez cerrado, el objetivo está listo para ser revisado y autorizado por tu líder. </li>
                    </ul>
                </div>,
                async onOk() {
                   await dispatch(cambioEstatusObjetivoThunk({ operativoId: objetivo.id, checked})).unwrap().then(() => {
                        message.success('Objetivo cerrado correctamente')
                   })
                },
                onCancel() {
                    console.log('Cancel');  
                },
            })
        }else {
            confirm({
                title: <p className='text-devarana-dark-graph'>¿ Confirmas que deseas abrir el objetivo ?</p>,
                width: 600,
                okButtonProps: {
                    danger: true
                },
                okText: 'Abrir',
                cancelText: 'Volver',
                content: 
                <div className='text-devarana-graph'>
                     <p> 
                        Te sugerimos considerar los siguientes aspectos:
                    </p>
                    <ul style={{
                        listStyle: 'disc',
                        listStylePosition: 'inside',
                    }}>
                        <li> Al habilitar esto los participantes no podrán realizar el cierre de ciclo </li>
                    </ul>
                </div>,
                async onOk() {
                   await dispatch(cambioEstatusObjetivoThunk({ operativoId: objetivo.id, checked})).unwrap().then(() => {
                        message.success('Objetivo abierto correctamente')
                   })
                },
                onCancel() {
                    console.log('Cancel');  
                },
            })
        }

      
    };

    const showConfirmOpen = (checked: boolean) => {
       if(checked){
            confirm({
                title: <p className='text-devarana-dark-graph'>¿ Confirmas que deseas enviar a aprobación el objetivo ?</p>,
                width: 600,
                okButtonProps: {
                    danger: true
                },
                okText: 'Enviar',
                cancelText: 'Cancelar',
                content: 
                <div className='text-devarana-graph'>
                    <p className='text-devarana-graph'>
                        Te sugerimos considerar los siguientes aspectos:
                    </p>
                    <ul style={{
                            listStyle: 'disc',
                            listStylePosition: 'inside',
                        }}>
                        <li> En este punto tu lider podrá revisar el objetivo y autorizarlo para su ejecución. </li>
                        <li> Los cambios realizados una vez aprobado quedarán registrados. </li>
                    </ul>
                    
                </div>,
                async onOk() {
                await dispatch(cambioEstatusObjetivoThunk({ operativoId: objetivo.id, checked})).unwrap().then(() => {
                        message.success('Objetivo abierto correctamente')
                })
                },
                onCancel() {
                    return false
                },
            })
       }else{
            confirm({
                title: <p className='text-devarana-dark-graph'>¿ Confirmas que deseas modificar el objetivo ?</p>,
                width: 600,
                okButtonProps: {
                    danger: true
                },
                okText: 'Enviar',
                cancelText: 'Cancelar',
                content: 
                <div className='text-devarana-graph'>
                     <p className='text-devarana-graph'>
                        Te sugerimos considerar los siguientes aspectos:
                    </p>
                    <ul style={{
                            listStyle: 'disc',
                            listStylePosition: 'inside',
                        }}>
                        <li> Al hacer esto tu lider no podrá revisar el objetivo y autorizarlo para su ejecución. </li>
                    </ul>                    
                </div>,
                async onOk() {
                await dispatch(cambioEstatusObjetivoThunk({ operativoId: objetivo.id, checked})).unwrap().then(() => {
                        message.success('Objetivo abierto correctamente')
                })
                },
                onCancel() {
                    return false
                },
            })
       }
    }


    
    

    
    return (
        <div className='xl:col-span-4 lg:col-span-6 col-span-12 group shadow-ext bg-white rounded-ext' key={objetivo.id} >

            <div className='p-5'>
                <div className='w-full flex justify-around text-devarana-graph text-center'>  
                    <div>
                        <p> Resultados Clave </p>
                        <p> {resultadoClaveDoneCount} / { objetivo.resultadosClave.length } </p>
                    </div>
                    <div>
                        <p>Acciones </p>
                        <p> {taskCountDone} / { taskCount } </p>
                    </div>
                    <div>
                        <p> Ponderacion </p>
                        <p className={`text-center text-devarana-graph ${usuarioPropietaro?.id === userAuth?.id ? 'text-primary' : 'text-secondary'}`}>
                            { progresoAsignado.toFixed(2) }%
                        </p>
                    </div>
                </div>
                <Divider />

                {/*  ( usuarioPropietaro?.id === userAuth?.id ) */}
                <p className={`text-center text-devarana-graph font-medium text-lg ${usuarioPropietaro?.id === userAuth?.id ? 'text-primary' : 'text-secondary'}`}>
                    {objetivo.nombre}
                </p>
                <ProgressBar maxValue={fixedProgresoReal} firstColor={firstColor} secondColor={secondColor}  /> 
                <p className={`text-center uppercase font-bold pb-2`}
                    style={{
                        color: getColor(statusObjetivo).color
                    }}
                > 
                   { statusText }
                </p>
                <Avatar.Group maxCount={3} className='flex justify-center' maxStyle={{ marginTop: 'auto', marginBottom: 'auto', alignItems: 'center', color: '#FFFFFF', display: 'flex', backgroundColor: '#408FE3', height: '20px', width: '20px', border: 'none' }}>
                    {
                        
                        orderedResponsables?.map((responsable, index) => (
                            <Link key={index} to={`/perfil/${responsable?.slug}`} className={`border-2 rounded-full ${responsable?.scoreCard.propietario === true ? 'border-devarana-pink' : '' }`}>
                                <Tooltip title={`${responsable?.nombre} ${responsable?.apellidoPaterno}`} placement='top' key={index} >
                                    <Avatar key={index} src={<Image src={`${getStorageUrl(responsable?.foto)}`} preview={false} fallback={getBrokenUser()} />} >
                                        {responsable?.iniciales} 
                                    </Avatar>
                                </Tooltip>
                            </Link>
                        ))
                        
                    }
                </Avatar.Group>


                <div>
                    <div className='flex py-5 gap-10 justify-center'>
                        <Link to={`/objetivo/${objetivo.id}`} className='text-devarana-graph hover:opacity-80 hover:text-devarana-graph'
                            state={{
                                year,
                                quarter
                            }}
                        >
                            <div className='flex items-center gap-x-2'>
                                <FaEye />
                                <span> Ver </span> 
                            </div>
                        </Link>
                    {
                        ( usuarioPropietaro?.id === userAuth?.id && (objetivo.status === 'NUEVO' || objetivo.status === 'ABIERTO') ) && (
                            <Space onClick={ () => handleEditObjetivo(objetivo.id) } className='cursor-pointer text-devarana-graph hover:opacity-80'  >
                                <FaEdit />
                                <span> Editar </span>
                            </Space>
                        )
                    }

                        {/* Definición de Objetivos */}

                    {
                        ( usuarioPropietaro?.id === userAuth?.id ) &&
                        ( objetivo.status === 'POR_AUTORIZAR' || objetivo.status === 'NUEVO' ) && 
                        (
                            <Space>
                                <Switch
                                    
                                    size='small'
                                    checked={
                                        ( objetivo.status === 'POR_AUTORIZAR' ) ? true : false
                                    } 
                                    onChange={ showConfirmOpen }
                                    style={{
                                        backgroundColor: ( objetivo.status === 'POR_AUTORIZAR' ) ? '#656A76' : '#A6AFC3',
                                    }}
                                />
                                <span className='text-devarana-graph'> 
                                {
                                    objetivo.status === 'POR_AUTORIZAR' ? 'Modificar' : 'Solicitar Aprobación'
                                }
                                </span>
                            </Space>
                        )
                        
                    }
                        {/* Aprobación de Objetivos */}
                    {
                        etapa.isCierreObjetivos && ( usuarioPropietaro?.id === userAuth?.id ) &&
                        ( objetivo.status === 'ABIERTO' ||  objetivo.status === 'POR_APROBAR')
                        && (
                                <Space>
                                    <Switch
                                        
                                        size='small'
                                        checked={
                                            ( objetivo.status === 'POR_APROBAR' ) ? true : false
                                        }
                                        onChange={ showConfirm }
                                        style={{
                                            backgroundColor: ( objetivo.status === 'POR_APROBAR' ) ? '#656A76' : '#A6AFC3',
                                        }}
                                    />
                                    <span className='text-devarana-graph'> 
                                    {
                                        objetivo.status === 'POR_APROBAR' ? 'Modificar' : 'Solicitar Evaluación'
                                    } 
                                    </span>
                                </Space>
                        )
                    }
                    </div>
                </div>
            </div>

        </div>
    )
}
