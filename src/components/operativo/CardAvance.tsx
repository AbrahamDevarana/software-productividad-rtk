import { useObjetivo } from '@/hooks/useObjetivos'
import { GaugeChart } from '../complexUI/Gauge'
import { Divider, Progress, Rate } from 'antd'
import { OperativoProps } from '@/interfaces'


interface Props {
    operativos: OperativoProps[]
}
export const CardAvance = ({operativos}:Props) => {

    const { ponderacionObjetivos } = useObjetivo({operativos})
    return (
        <>
            <div className='px-5  text-devarana-graph'>
                <h1 className='font-medium text-primary'>Avance</h1>
                <GaugeChart value={ponderacionObjetivos}/>
                <div className='pt-5'>
                    <Progress percent={ponderacionObjetivos} format={percent =><p className='text-devarana-graph'>{percent?.toFixed(2)}%</p>}
                    strokeColor={{
                        '0%': 'rgba(9, 103, 201, 1)',
                        '100%': 'rgba(9, 103, 201, .5)',
                    }}
                    />
                    <p className='text-center'>Logro Objetivos</p>
                    <Divider className='my-2'/>
                   <div className='flex items-center flex-col align-middle h-full'>
                        <Rate defaultValue={4} allowHalf className='text-primary' />
                        <p>Evaluación Competitiva</p>
                   </div>
                </div>
            </div>
        
        </>
    )
}
