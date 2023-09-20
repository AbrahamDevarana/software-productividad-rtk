import { useObjetivo } from '@/hooks/useObjetivos'
import { GaugeChart } from '../complexUI/Gauge'
import { Divider, Progress, Rate } from 'antd'
import { OperativoProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'


interface Props {
    operativos: OperativoProps[]
}
export const CardAvance = ({operativos}:Props) => {
    const { ponderacionObjetivos } = useObjetivo({operativos})
    const {perfil: {evaluaciones: {resultados}}} = useAppSelector(state => state.profile)

    return (
        <>
            <div className='px-5  text-devarana-graph flex flex-col'>
                <h1 className='font-medium text-primary'>Avance</h1>
                <div className='pb-5'>
                    <GaugeChart value={ponderacionObjetivos}/>
                </div>
                <div className='flex flex-col items-center align-middle'>
                    <div className='w-full'>
                        <Progress percent={ponderacionObjetivos} format={percent =><p className='text-devarana-graph'>{percent?.toFixed(2)}%</p>}
                        strokeColor={{
                            '0%': 'rgba(9, 103, 201, 1)',
                            '100%': 'rgba(9, 103, 201, .5)',
                        }}
                        />
                        <p className='text-center'>Logro Objetivos</p>
                    </div>
                    <Divider className='my-2'/>
                   <div className='flex flex-col items-end'>
                        <div className='flex items-center gap-5 align-middle'>
                            <Rate value={resultados} allowHalf disabled className='text-primary' />
                            <p> {`${ resultados.toFixed(2) || 0 } / 5` } </p>
                        </div>
                        <p>Evaluación Competitiva</p>
                   </div>
                </div>
            </div>
        
        </>
    )
}
