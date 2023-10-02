import {FC, useMemo, useState,} from 'react'
import { Link } from 'react-router-dom';
import { OperativoProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Icon } from '../Icon';
import { getOperativoThunk } from '@/redux/features/operativo/operativosThunk';
import { Avatar, Card, Divider, Image, Segmented, Space, Switch, Tooltip } from 'antd'
import { getStorageUrl } from '@/helpers';
import getBrokenUser from '@/helpers/getBrokenUser';

import { ProgressBar } from '../complexUI/ProgressDoughtnut';
import { TabStatus } from '../ui/TabStatus';
import { TimeLine } from './TimeLine';
import { useOperativo } from '@/hooks/useOperativo';

interface Props {
    objetivo: OperativoProps,
    setFormVisible: (value: boolean) => void
}

export const CardObjetivo: FC<Props> = ({objetivo, setFormVisible}) => {

    const { userAuth } = useAppSelector(state => state.auth)
    const { currentConfig: {year, quarter}} = useAppSelector(state => state.global)
    const [ setCardSegmented, setCardSegmentedValue ] = useState<string | number>('objetivo')
    const dispatch = useAppDispatch()

    const handleEditObjetivo = (id: string) => {
        dispatch(getOperativoThunk(id))
        setFormVisible(true)
    }
    const {firstColor, fixedProgresoReal, orderedResponsables, progresoAsignado, resultadoClaveDoneCount, secondColor, usuarioPropietaro, statusObjetivo} = useOperativo({objetivo})




    return (
        <div className='md:col-span-4 col-span-12 group shadow-ext bg-white rounded-ext' key={objetivo.id} >
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
                            ( usuarioPropietaro?.id === userAuth?.id ) && ( statusObjetivo === 'APROBADO' || statusObjetivo === 'CANCELADO' ) && (
                                <Space onClick={ () => handleEditObjetivo(objetivo.id) } className='cursor-pointer text-devarana-graph hover:opacity-80'  >
                                    <Icon iconName='faEdit'/>
                                    <span> Editar </span>
                                </Space>
                            )
                                
                          }
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
