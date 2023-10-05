import { DatePicker } from 'antd'
import React, { useEffect, useMemo } from 'react'
import MixedChart from '../complexUI/MixedChart'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import dayjs from 'dayjs'

export const CardDesempeno = () => {

    const { userAuth } = useAppSelector(state => state.auth)
    const { year, quarter } = useAppSelector(state => state.global.currentConfig)
    const { perfil: {historialRendimiento} } = useAppSelector(state => state.profile)

    const dispatch = useAppDispatch()


    const historial = useMemo(() => {
    //    Si el historial de rendimiento no existe, retornar un arreglo de 4 ceros
        if(!historialRendimiento) return [0, 0, 0, 0]

        // Deberá considerar los 4 quarter del año y retornar un arreglo de 4 elementos si uno no lo encuentra devolver 0 
        const historial = [0, 0, 0, 0]
        historialRendimiento.forEach((item) => {
            historial[item.quarter - 1] = item.resultadoFinal
        })
        return historial
        
    }, [historialRendimiento])
    
    return (
        <>
            <div className='text-devarana-graph flex flex-col w-full'>
                <div className='flex justify-between w-full'>
                    <h1 className='font-medium text-primary'>Historial de desempeño</h1>
                    <DatePicker picker='year' size='small' value={dayjs()} suffixIcon={false} clearIcon={false} disabled />
                </div>
                <div className='my-auto w-full'>
                    <MixedChart values={historial} quarter={quarter} year={year}/>
                </div>
            </div>
        </>
    )
}
