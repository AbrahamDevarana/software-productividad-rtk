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
import { useObjetivo } from '@/hooks/useObjetivos';

export const Objetivos : React.FC = () => {

    const dispatch = useAppDispatch()

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

    const handleCancel = () => {
        setIsModalVisible(false)
        dispatch(clearObjetivoThunk())
        dispatch(clearResultadoThunk())
    }

    const { ponderacionTotal, misObjetivosCount, objetivosCompartidosCount, resultadosClaveCount, accionesCount, misObjetivos, objetivosCompartidos} = useObjetivo({operativos})

    return (
        <>
            <div className="flex gap-5">
                <Box className='w-[20%] px-5 text-devarana-graph flex flex-col'>
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
                            <p>Mis Objetivos: </p> <CountUp end={misObjetivosCount} separator="," />
                        </div>
                        <div className='font-light flex justify-between'>
                            <p>Objetivos Compartidos: </p> <CountUp end={objetivosCompartidosCount} separator="," />
                        </div>
                        <div className='font-light flex justify-between'>
                            <p>Resultadoc Clave: </p> <CountUp end={resultadosClaveCount} separator="," />
                        </div>
                        <div className='font-light flex justify-between'>
                            <p>Acciones: </p> <CountUp end={accionesCount} separator="," />
                        </div>
                
                    </div>
                    <div className='mt-auto ml-auto'>
                        <TabStatus status='EN_TIEMPO' />
                    </div>
                </Box>
                <Box className='w-[20%] flex justify-center'>
                    <div className='px-5 text-center text-devarana-graph'>
                        <p className='font-medium'>Avance</p>
                        <GaugeChart value={ponderacionTotal}/>
                        <div className='pt-5'>
                            <Progress percent={ponderacionTotal} format={percent =><p className='text-devarana-graph'>{percent?.toFixed(2)}%</p>}
                            strokeColor={{
                                '0%': 'rgba(9, 103, 201, 1)',
                                '100%': 'rgba(9, 103, 201, .5)',
                            }}
                            />
                            <p>Logro Objetivos</p>
                            <Divider className='my-2'/>
                            <Rate defaultValue={4} allowHalf className='text-primary' />
                            <p>Evaliación Competitiva</p>
                        </div>
                    </div>
                </Box>
                <Box className='w-[35%] flex justify-center'>
                    <div className='text-devarana-graph flex flex-col w-full'>
                        <div className='flex justify-between w-full'>
                            <h1>Historial de desempeño</h1>
                            <DatePicker picker='year' size='small' suffixIcon={false} clearIcon={false} />
                        </div>
                        <div className='my-auto w-full'>
                            <MixedChart  values={[100, 50, 80, 20]} quarter={quarter} year={year}/>
                        </div>
                    </div>
                </Box>
                <div className='w-[25%] p-5 shadow-ext rounded-ext from-primary to-primary-light bg-gradient-to-tr'>
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



            <div className='grid grid-cols-12 gap-5'>
                <div className='col-span-9 py-5 grid grid-cols-12 gap-5'>
                    {
                        isLoading && operativos.length === 0 ? 
                            <div className='col-span-12'>
                                <Loading  />
                            </div>
                        : 

                        <>
                        {
                            misObjetivos && misObjetivos.length > 0 && misObjetivos.map((operativo, index) => (
                                <Objetivo objetivo={operativo} key={index} setIsModalVisible={setIsModalVisible}/>
                            ))
                        }
                        {
                            objetivosCompartidos && objetivosCompartidos.length > 0 && objetivosCompartidos.map((operativo, index) => (
                                <Objetivo objetivo={operativo} key={index} setIsModalVisible={setIsModalVisible}/>
                            ))
                        }
                        </>
                    }
                </div>

                <Box className='col-span-3 row-span-2 my-5'>
                    <h1 className='text-devarana-graph'>Ranking Devarana</h1>
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
