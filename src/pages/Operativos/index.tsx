import { Icon } from '@/components/Icon';
import { Box } from '@/components/ui';
import { Divider, FloatButton, Modal, Progress, Rate } from 'antd'
import { useState, useEffect, useMemo } from 'react';
import dayjs, {Dayjs} from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearObjetivoThunk, getOperativosThunk, getProyectosThunk } from '@/redux/features/operativo/operativosThunk';
import Loading from '@/components/antd/Loading';

import { WizardOperativo } from '@/components/operativo/WizardOperativo';
import { Objetivo } from '@/components/operativo/Objetivo';
import { clearResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { useColor } from '@/hooks';

export const Objetivos : React.FC = () => {

    const dispatch = useAppDispatch()

    const [ lastDayOfQuarter, setLastDayOfQuarter ] = useState<any>()
    const { userAuth } = useAppSelector(state => state.auth)
    const { operativos, proyectos, isLoading } = useAppSelector(state => state.operativos)

    const [ isModalVisible, setIsModalVisible ] = useState(false)


    const validateRangePicker = (date: [Dayjs, Dayjs], dateString: [string, string]) => {
        setLastDayOfQuarter(dayjs(dateString[0]).endOf('quarter'))
    }


    useEffect(() => {
        dispatch(getOperativosThunk({}))
        dispatch(getProyectosThunk({}))
    }, [])


    
    const ponderacionTotal = useMemo(() => {
        let total = 0
      
        operativos.forEach(operativo => {
            operativo.responsables_op?.map(responsable => {
                if( responsable.id === userAuth?.id ) {
                    total += responsable.scoreCard?.progresoFinal || 0
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
            <div className='grid grid-cols-12 md:gap-x-10 gap-y-4'>
                <Box className='md:col-span-9 col-span-12 flex justify-evenly md:flex-row flex-col'>
                    {/* <DatePicker.RangePicker onCalendarChange={ () => validateRangePicker} 
                        disabledDate={ (current) => current && current > lastDayOfQuarter }
                    /> */}

                    <div className='px-5 text-devarana-graph text-center'>
                        <p className='font-medium'>Avance Total de Objetivos</p>
                        <p className='py-3'>Ponderación  80% </p>
                        <Progress 
                            percent={ponderacionTotal} 
                            type='dashboard' 
                            className='flex justify-center'
                            strokeColor={useColor(2).color}
                            strokeWidth={10}

                        />
                    </div>
                        <Divider type='vertical' className='h-full' />
                    <div className='px-5 text-center text-devarana-graph'>
                        <p className='font-medium'>Cumplimiento de Objetivos</p>
                        <p className='py-3'> Decimales Extra </p>
                        <div>
                            <p className='text-3xl'>
                                3 / {operativos.length}
                            </p>
                        </div>
                    </div>
                    <Divider type='vertical' className='h-full' />
                    <div className='text-devarana-graph text-center px-5'>
                        <p className='font-medium'>Desempeño</p>
                        <p className=''> Ponderación 20 %</p>
                        <div>
                            <Rate allowHalf defaultValue={3} />
                        </div>
                    </div>
                </Box>
                <Box className='md:col-span-3 col-span-12 row-span-3'>

                </Box>

                <div className='md:col-span-9 col-span-12 py-5 grid grid-cols-12 md:gap-x-5 gap-y-5'>
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
            </div>
            

            <Modal 
                open={isModalVisible}
                footer={null}
                onCancel={handleCancel}
                width={1000}
                closable={false}
                destroyOnClose={true}
            >
                <WizardOperativo />

            </Modal>

            <FloatButton
                shape="circle"
                icon={<Icon iconName='faPlus' />}
                onClick={() => setIsModalVisible(true)}
            />
        </>
    ) 

}
