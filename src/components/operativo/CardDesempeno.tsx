import { DatePicker } from 'antd'
import { useMemo } from 'react'
import MixedChart from '../complexUI/MixedChart'
import { useAppSelector } from '@/redux/hooks'
import dayjs from 'dayjs'
import { BsFillCalendarFill } from 'react-icons/bs'
import { useGetHistorialQuery } from '@/redux/features/perfil/perfilThunk'

export const CardDesempeno = () => {

    const { year, quarter } = useAppSelector(state => state.global.currentConfig)
    const { userAuth } = useAppSelector(state => state.auth)
    // const { perfil: {historialRendimiento} } = useAppSelector(state => state.profile)

    const { data: historialRendimiento} = useGetHistorialQuery({year, usuarioId: userAuth?.id})

    const historial = useMemo(() => {
    //    Si el historial de rendimiento no existe, retornar un arreglo de 4 ceros
        if(!historialRendimiento) return [0, 0, 0, 0]

        // Deberá considerar los 4 quarter del año y retornar un arreglo de 4 elementos si uno no lo encuentra devolver 0 
        const historial = [0, 0, 0, 0]
        historialRendimiento.forEach((item) => {
            historial[item.quarter - 1] = Math.trunc(item.resultadoFinal * 100) / 100
        })
        
        return historial
        
    }, [historialRendimiento])
    
    return (
        <>
            <div className='text-devarana-graph flex flex-col w-full'>
                <div className='flex justify-between w-full'>
                    <h1 className='font-medium text-primary'>Historial de desempeño</h1>
                    <DatePicker picker='year' size='small' style={{ width: '80px' }} value={dayjs(`${year}-01-01`)} suffixIcon={<BsFillCalendarFill className='text-devarana-babyblue' />} clearIcon={false} disabled />
                </div>
                <div className='my-auto w-full'>
                    <MixedChart values={historial} quarter={quarter} year={year}/>
                </div>
            </div>
        </>
    )
}
