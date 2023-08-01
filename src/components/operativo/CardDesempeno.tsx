import { DatePicker } from 'antd'
import React from 'react'
import MixedChart from '../complexUI/MixedChart'

interface Props {
    quarter: number,
    year: number
}

export const CardDesempeno = ({quarter, year}:Props) => {
  return (
    <>
        <div className='text-devarana-graph flex flex-col w-full'>
            <div className='flex justify-between w-full'>
                <h1>Historial de desempeño</h1>
                <DatePicker picker='year' size='small' suffixIcon={false} clearIcon={false} />
            </div>
            <div className='my-auto w-full'>
                <MixedChart  values={[100, 50, 80, 20]} quarter={quarter} year={year}/>
            </div>
        </div>
    </>
  )
}
