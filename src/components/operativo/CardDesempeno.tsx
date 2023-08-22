import { DatePicker } from 'antd'
import React, { useEffect } from 'react'
import MixedChart from '../complexUI/MixedChart'
import { getProfileEvaluationThunk } from '@/redux/features/perfil/perfilThunk'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'

interface Props {
    quarter: number,
    year: number
}

export const CardDesempeno = ({quarter, year}:Props) => {

    const { userAuth } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if(userAuth) {
            dispatch(getProfileEvaluationThunk(userAuth?.id))
        }
    }, [userAuth])
  return (
    <>
        <div className='text-devarana-graph flex flex-col w-full'>
            <div className='flex justify-between w-full'>
                <h1 className='font-medium text-primary'>Historial de desempeño</h1>
                <DatePicker picker='year' size='small' suffixIcon={false} clearIcon={false} />
            </div>
            <div className='my-auto w-full'>
                <MixedChart  values={[100, 50, 80, 20]} quarter={quarter} year={year}/>
            </div>
        </div>
    </>
  )
}
