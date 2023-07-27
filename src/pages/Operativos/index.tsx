import { Box } from '@/components/ui';
import { Avatar, DatePicker, Divider, FloatButton, Image, Modal, Progress, Rate } from 'antd'
import { useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearObjetivoThunk, getOperativosThunk } from '@/redux/features/operativo/operativosThunk';
import Loading from '@/components/antd/Loading';
import CountUp from 'react-countup';
import { Objetivo } from '@/components/operativo/Objetivo';
import { clearResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { FaPlus } from 'react-icons/fa';
import { getStorageUrl } from '@/helpers';
import { FormObjetivo } from '@/components/operativo/FormObjetivo';
import { GaugeChart } from '@/components/complexUI/Gauge';
import getBrokenUser from '@/helpers/getBrokenUser';
import { TabStatus } from '@/components/ui/TabStatus';
import MixedChart from '@/components/complexUI/MixedChart';
import { AiOutlineEllipsis } from 'react-icons/ai';

export const Objetivos : React.FC = () => {

    const dispatch = useAppDispatch()

    const [ lastDayOfQuarter, setLastDayOfQuarter ] = useState<any>()
    const { userAuth } = useAppSelector(state => state.auth)
    const { operativos, isLoading } = useAppSelector(state => state.operativos)
    const [ year, setYear] = useState(dayjs().year())
    const [ quarter, setQuarter ] = useState(dayjs().quarter())
    const [ isModalVisible, setIsModalVisible ] = useState(false)

     const handleDateChange = (date: any, dateString: string) => {
        setYear(dayjs(date).year())
        setQuarter(dayjs(date).quarter())
    }
    useEffect(() => {
        dispatch(getOperativosThunk({year, quarter}))
    }, [year, quarter])

    const ponderacionTotal = useMemo(() => {
        let total = 0
      
        operativos.forEach(operativo => {
            operativo.operativosResponsable?.map(responsable => {
                if( responsable.id === userAuth?.id ) {
                    total += (responsable.scoreCard?.progresoReal * responsable.scoreCard?.progresoAsignado) / 100
                }
            })
        })
        return total
        
    }, [operativos])


    const handleCancel = () => {
        setIsModalVisible(false)
        dispatch(clearObjetivoThunk())
        dispatch(clearResultadoThunk())
    }
    
    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <Box className='col-span-3 px-5 text-devarana-graph flex flex-col'>
                    <div className='flex justify-between w-full'>
                        <h1>Resumen</h1>
                        <div>
                            <DatePicker picker='quarter' onChange={handleDateChange} value={ dayjs().quarter(quarter).year(year) }  clearIcon={false} format={'Qº [Trimestre] YYYY'} size='small' suffixIcon={false} />
                        </div>
                    </div>
                    <div className='my-5 p-5 flex items-center bg-gray-100 bg-opacity-15 rounded'>
                        <Avatar src={<Image src={`${getStorageUrl(userAuth.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                        <div className='ml-2'>
                            <p className='font-medium'>{userAuth.nombre}</p>
                        </div>
                    </div>
                    <div>
                        <div className='font-light flex justify-between'>
                            <p>Mis Objetivos: </p> <CountUp end={10} separator="," />
                        </div>
                        <div className='font-light flex justify-between'>
                            <p>Objetivos Compartidos: </p> <CountUp end={3} separator="," />
                        </div>
                        <div className='font-light flex justify-between'>
                            <p>Resultadoc Clave: </p> <CountUp end={5} separator="," />
                        </div>
                        <div className='font-light flex justify-between'>
                            <p>Acciones: </p> <CountUp end={32} separator="," />
                        </div>
                
                    </div>
                    <div className='mt-auto ml-auto'>
                        <TabStatus status='EN_TIEMPO' />
                    </div>
                </Box>
                <Box className='col-span-3 flex justify-center'>
                    <div className='px-5 text-center text-devarana-graph'>
                        <p className='font-medium'>Avance</p>
                        <GaugeChart value={ponderacionTotal}/>
                        <div className='pt-5'>
                            <Progress percent={ponderacionTotal} />
                            <p>Logro Objetivos</p>
                            <Divider className='my-2'/>
                            <Rate disabled defaultValue={4} />
                            <p>Evaliación Competitiva</p>
                        </div>
                    </div>
                </Box>
                <Box className='col-span-3 flex w-full justify-center'>
                    <div className='text-devarana-graph flex flex-col w-full'>
                        <div className='flex justify-between w-full'>
                            <h1>Historial de desempeño</h1>
                            <DatePicker picker='year' size='small' suffixIcon={false} clearIcon={false} />
                        </div>
                        <div className='my-auto w-full'>
                            <MixedChart />

                        </div>
                    </div>
                </Box>
                <div className='p-5 shadow-ext rounded-ext col-span-3 bg-devarana-blue'>
                    <h1 className='text-white'>Mi Equipo</h1>
                    <ul>
                        <li className='flex items-center my-5 gap-x-5 w-full'>
                            <Avatar src={<Image src={`${getStorageUrl(userAuth.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                            <p className='font-medium text-white mx-auto'>{userAuth.nombre}</p>
                            <div className='px-2 bg-white rounded'>
                                <p className='text-devarana-blue font-medium'> 93.5% </p>
                            </div>
                            <div className='border-white border rounded'>
                                <AiOutlineEllipsis className='text-white text-2xl' />
                            </div>
                        </li>
                        <li className='flex items-center my-5 gap-x-5 w-full'>
                            <Avatar src={<Image src={`${getStorageUrl(userAuth.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                            <p className='font-medium text-white mx-auto'>{userAuth.nombre}</p>
                            <div className='px-2 bg-white rounded'>
                                <p className='text-devarana-blue font-medium'> 93.5% </p>
                            </div>
                            <div className='border-white border rounded'>
                                <AiOutlineEllipsis className='text-white text-2xl' />
                            </div>
                        </li>
                    </ul>
                    
                </div>
            </div>
            <div className='grid grid-cols-12 gap-x-10 gap-5'>
                <div className='col-span-9 py-5 grid grid-cols-12 md:gap-x-5 gap-y-5'>
                    {
                        isLoading && operativos.length === 0 ? 
                            <div className='col-span-12'>
                                <Loading  />
                            </div>
                        : (
                            operativos && operativos.length > 0 && operativos.map((operativo, index) => (
                                <Objetivo objetivo={operativo} key={index} setIsModalVisible={setIsModalVisible}/>
                            ))
                        )
                    }
                </div>

                <Box className='col-span-3 row-span-3 my-5'>

                </Box>
            </div>
            

            <Modal 
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                width={1000}
                closable={false}
                destroyOnClose={true}
            >
                <FormObjetivo year={year} />

            </Modal>

            <FloatButton
                shape="circle"
                icon={<FaPlus />}
                onClick={() => setIsModalVisible(true)}
            />
        </>
    ) 

}
