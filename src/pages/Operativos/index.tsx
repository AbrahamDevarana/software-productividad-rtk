import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { clearObjetivoThunk, getOperativosThunk } from '@/redux/features/operativo/operativosThunk';
import { getResultadosThunk } from '@/redux/features/admin/usuarios/usuariosThunks';
import { clearResultadoThunk } from '@/redux/features/resultados/resultadosThunk';
import { Box } from '@/components/ui';
import {FloatButton, Modal, Rate, } from 'antd'
import dayjs from 'dayjs';
import Loading from '@/components/antd/Loading';

import { CardObjetivo } from '@/components/operativo/CardObjetivo';
import { FaPlus } from 'react-icons/fa';
import { FormObjetivo } from '@/components/operativo/FormObjetivo';

import { useObjetivo } from '@/hooks/useObjetivos';
import { CardResumen } from '@/components/operativo/CardResumen';
import { CardAvance } from '@/components/operativo/CardAvance';
import { CardDesempeno } from '@/components/operativo/CardDesempeno';
import CardEquipo from '@/components/operativo/CardEquipo';
import { useParams } from 'react-router-dom';
import { getProfileThunk } from '@/redux/features/profile/profileThunk';

export const Objetivos : React.FC = () => {

    const dispatch = useAppDispatch()    

    const { operativos, isLoading } = useAppSelector(state => state.operativos)
    const { userAuth } = useAppSelector(state => state.auth)
    const [ year, setYear] = useState(dayjs().year())
    const [ quarter, setQuarter ] = useState(dayjs().quarter())
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    
    
    const {id} = useParams<{id: string}>()

        const handleDateChange = (date: any, dateString: string) => {
        setYear(dayjs(date).year())
        setQuarter(dayjs(date).quarter())
    }
    useEffect(() => {
        dispatch(getOperativosThunk({year, quarter, usuarioId: id || userAuth?.id}))
    }, [year, quarter])

    useEffect(() => {
        dispatch(getProfileThunk(id || userAuth?.id))
    }, [userAuth, id])

    const handleCancel = () => {
        setIsModalVisible(false)
        dispatch(clearObjetivoThunk())
        dispatch(clearResultadoThunk())
    }

    

    const { ponderacionTotal, misObjetivos, objetivosCompartidos} = useObjetivo({operativos})

    return (
        <>
            <div className="flex gap-5">
                <Box className='w-[20%] px-5 text-devarana-graph flex flex-col'>
                    <CardResumen operativos={operativos} handleDateChange={handleDateChange} quarter={quarter} year={year} />
                </Box>
                <Box className='w-[20%] flex justify-center'>
                    <CardAvance operativos={operativos} />
                </Box>
                <Box className='w-[35%] flex justify-center'>
                    <CardDesempeno quarter={quarter} year={year}/>
                </Box>
                <CardEquipo />
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
                                <CardObjetivo objetivo={operativo} key={index} setIsModalVisible={setIsModalVisible}/>
                            ))
                        }
                        {
                            objetivosCompartidos && objetivosCompartidos.length > 0 && objetivosCompartidos.map((operativo, index) => (
                                <CardObjetivo objetivo={operativo} key={index} setIsModalVisible={setIsModalVisible}/>
                            ))
                        }
                        </>
                    }
                </div>

                <Box className='col-span-3 row-span-2 my-5'>
                    <h1 className='text-primary font-medium'>Ranking Devarana</h1>
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
                <FormObjetivo year={year} quarter={quarter} />
            </Modal>

          
            <FloatButton
                shape="circle"
                icon={<FaPlus />}
                onClick={() => setIsModalVisible(true)}
            />

            
        </>
    ) 

}
