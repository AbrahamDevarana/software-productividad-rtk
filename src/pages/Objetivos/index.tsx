import { Icon } from '@/components/Icon';
import { Box } from '@/components/ui';
import { useGetColor } from '@/hooks/useGetColor';
import { Avatar, Avatar as Avt, DatePicker, Divider, FloatButton, Progress } from 'antd'
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/redux/hooks';
import { getOperativosThunk, getProyectosThunk } from '@/redux/features/operativo/operativosThunk';

export const Objetivos : React.FC = () => {

    const dispatch = useAppDispatch()

    const [lastDayOfQuarter, setLastDayOfQuarter] = useState<any>()

    const validateRangePicker = (date: any, dateString: any) => {
        setLastDayOfQuarter(dayjs(dateString[0]).endOf('quarter'))
    }


    useEffect(() => {
        dispatch(getOperativosThunk({}))
        dispatch(getProyectosThunk({}))
    }, [])

    return (
        <>
            <div className='grid grid-cols-12 md:gap-x-10 gap-y-4'>
                <Box className='md:col-span-8 col-span-12'>
                    <DatePicker.RangePicker onCalendarChange={validateRangePicker} 
                        disabledDate={ (current) => current && current > lastDayOfQuarter }
                    />

                </Box>
                <Box className='md:col-span-4 col-span-12'>
                </Box>

                <Box className='md:col-span-8 col-span-12 p-5 grid grid-cols-12'>
                    <div className='shadow rounded-ext p-5 md:col-span-4 col-span-12'>
                        <div className='w-full flex justify-around text-devarana-graph text-center'>  
                            <div className=''>
                                <p> Resultados Clave </p>
                                <p> 1 / 2</p>
                            </div>
                            <div className='border-x px-5'>
                                <p>Indicadores </p>
                                <p> 1 / 2</p>
                            </div>
                            <div className=''>
                                <p>Acciones </p>
                                <p> 1 / 2</p>
                            </div>
                        </div>
                        <Divider />
                        <p className='text-center text-devarana-graph font-medium uppercase'> Objetivo 1 </p>
                        <Progress 
                            percent={32}
                            type='circle'
                            strokeLinecap='square'
                            className='flex justify-center py-5'
                            strokeWidth={10}
                            strokeColor={{
                                "0%": useGetColor(2, .8)?.rgba || '#108ee9',
                                "100%": useGetColor(2, .8)?.rgba || '#108ee9'
                            }}
                        />
                        <Divider />
                        <Avatar.Group className='flex justify-center'>
                            <Avt src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                            <Avt src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                            <Avt src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        </Avatar.Group>
                    </div>
                </Box>
                <Box className='md:col-span-4 col-span-12'>
                </Box>
            </div>
            
            <FloatButton
                shape="circle"
                icon={<Icon iconName='faPlus' />}
            />
        </>
    ) 

}
