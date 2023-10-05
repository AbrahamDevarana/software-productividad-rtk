import {FC, useMemo, useState,} from 'react'
import { Link } from 'react-router-dom';
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Icon } from '../Icon';
import { cerrarObjetivoThunk, getOperativoThunk } from '@/redux/features/operativo/operativosThunk';
import { Avatar, Button, Card, Divider, Image, Modal, Segmented, Space, Switch, Tooltip } from 'antd'
import { getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';

import { ProgressBar } from '../complexUI/ProgressDoughtnut';
import { TabStatus } from '../ui/TabStatus';
import { TimeLine } from './TimeLine';
import { useOperativo } from '@/hooks/useOperativo';
import { FaExclamationTriangle } from 'react-icons/fa';

interface Props {
    objetivo: OperativoProps,
    setFormVisible: (value: boolean) => void
}

export const CardObjetivo: FC<Props> = ({objetivo, setFormVisible}) => {

    const { confirm } = Modal;
    const { userAuth } = useAppSelector(state => state.auth)
    const { currentConfig: {year, quarter}} = useAppSelector(state => state.global)
    const [ setCardSegmented, setCardSegmentedValue ] = useState<string | number>('objetivo')
    const dispatch = useAppDispatch()

    const handleEditObjetivo = (id: string) => {
        dispatch(getOperativoThunk(id))
        setFormVisible(true)
    }
    const {firstColor, fixedProgresoReal, orderedResponsables, progresoAsignado, resultadoClaveDoneCount, secondColor, usuarioPropietaro, statusObjetivo} = useOperativo({objetivo})


    const showConfirm = (id: string) => {
        confirm({
            title: <p>¿ Confirmas que deseas cerrar el objetivo ?</p>,
            width: 600,
            okButtonProps: {
                danger: true
            },
            okText: 'Cerrar',
            cancelText: 'Volver',
            content: 
            <div>
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
               await dispatch(cerrarObjetivoThunk(id)).unwrap().then(() => {
               })
            },
            onCancel() {
                console.log('Cancel');  
            },
        });
    };

    return (
        <div className='lg:col-span-4 md:col-span-6 col-span-12 group shadow-ext bg-white rounded-ext' key={objetivo.id} >
            {
                setCardSegmented === 'objetivo' && 
                (
                    <div className='p-5'>
                        <div className='w-full flex justify-around text-devarana-graph text-center'>  
                            <div>
                                <p> Resultados Clave </p>
                                <p> {resultadoClaveDoneCount} / { objetivo.resultadosClave.length } </p>
                            </div>
                            <div>
                                <p>Acciones </p>
                                <p> 0 / 0 </p>
                            </div>
                            <div>
                                <p> Ponderacion </p>
                                <p> 
                                    { progresoAsignado.toFixed(2) }%
                                </p>
                            </div>
                        </div>
                        <Divider />
                        <p className='text-center text-devarana-graph font-medium text-lg'> {objetivo.nombre} </p>
                        <ProgressBar maxValue={fixedProgresoReal} firstColor={firstColor} secondColor={secondColor}  /> 
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
                                    <Icon iconName='faEye'/>
                                    <span> Ver </span> 
                                </Link>
                            {
                                ( usuarioPropietaro?.id === userAuth?.id && objetivo.status !== 'CERRADO'  ) && (
                                    <Space onClick={ () => handleEditObjetivo(objetivo.id) } className='cursor-pointer text-devarana-graph hover:opacity-80'  >
                                        <Icon iconName='faEdit'/>
                                        <span> Editar </span>
                                    </Space>
                                )
                            }
                            {
                               ( usuarioPropietaro?.id === userAuth?.id ) && (
                                    // <Space onClick={ () => showConfirm(objetivo.id) } className='cursor-pointer text-devarana-graph hover: opacity-80'>
                                    //     <Icon iconName='faCheckDouble'/>
                                    //     <span> Cerrar </span>
                                    // </Space>
                                    <Tooltip
                                        title='El cierre se estará habilitando proximamente'
                                    >
                                        <Space>
                                            <Switch 
                                                // size='small'
                                                size='small'
                                                checked={
                                                    objetivo.status === 'CERRADO' ? true : false
                                                } 
                                                // si el objetivo esta cerrado, no se puede cambiar el estado
                                                disabled={ true || objetivo.status === 'CERRADO' ? true : false }
                                                onChange={ () => showConfirm(objetivo.id) }
                                            />
                                            <span className='text-devarana-graph'> Cerrar </span>
                                        </Space>
                                    </Tooltip>
                                )
                            }
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                        
                        </div>
                    </div>
                )
            }
            {
                setCardSegmented === 'historial' && (<TimeLine></TimeLine>)
            }
               
        </div>
    )
}
