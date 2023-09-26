import { DatePicker } from 'antd'
import React, { useEffect } from 'react'
import MixedChart from '../complexUI/MixedChart'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

export const CardDesempeno = () => {

    const { userAuth } = useAppSelector(state => state.auth)
    const { year, quarter } = useAppSelector(state => state.global.currentConfig)

    const dispatch = useAppDispatch()

    
    return (
        <>
            <div className='text-devarana-graph flex flex-col w-full'>
                <div className='flex justify-between w-full'>
                    <h1 className='font-medium text-primary'>Historial de desempeño</h1>
                    <DatePicker picker='year' size='small' suffixIcon={false} clearIcon={false} />
                </div>
                <div className='my-auto w-full'>
                    <MixedChart  values={[0, 0, 0, 0]} quarter={quarter} year={year}/>
                </div>
            </div>
        </>
    )
}
