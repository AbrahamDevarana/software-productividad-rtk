import { Box } from '@/components/ui';
import { DatePicker, Divider, FloatButton, Modal, Progress, Rate } from 'antd'
import { useState, useEffect, useMemo } from 'react';
import dayjs, {Dayjs} from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearObjetivoThunk, getOperativosThunk } from '@/redux/features/operativo/operativosThunk';
import Loading from '@/components/antd/Loading';

import { Objetivo } from '@/components/operativo/Objetivo';
import { clearResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { FaPlus } from 'react-icons/fa';
import { getColor } from '@/helpers';
import { FormObjetivo } from '@/components/operativo/FormObjetivo';
import GaugeChart from '@/components/complexUI/Gauge';

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
            <DatePicker 
                picker='quarter'
                className='block max-w-xs ml-auto mb-3'
                onChange={handleDateChange}
                value={ dayjs().quarter(quarter).year(year) }
                allowClear={false}
                format={'Qº [Trimestre] YYYY'}
            />
            <div className="grid grid-cols-12 gap-5">
                <Box className='col-span-4 flex justify-evenly md:flex-row flex-col'>
                    <div className='px-5 text-devarana-graph text-center'>
                        <p className='font-medium'>Avance Total de Objetivos</p>
                        <p className='py-3'>Ponderación  80% </p>
                        <Progress 
                            percent={ponderacionTotal} 
                            type='dashboard' 
                            className='flex justify-center'
                            strokeColor={getColor('SIN_INICIAR').color}
                            strokeWidth={10}

                        />
                    </div>
                </Box>
                <Box className='col-span-4 flex justify-evenly md:flex-row flex-col'>
                    <div className='px-5 text-center text-devarana-graph'>
                        <p className='font-medium'>Avance</p>
                        <GaugeChart />
                    </div>
                </Box>
                <Box className='col-span-4 flex justify-evenly md:flex-row flex-col'>
                    <div className='text-devarana-graph text-center px-5'>
                        <p className='font-medium'>Desempeño</p>
                        <p className=''> Ponderación 20 %</p>
                        <div>
                            <Rate allowHalf defaultValue={3} />
                        </div>
                    </div>
                </Box>
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
