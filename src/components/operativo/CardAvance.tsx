import { useObjetivo } from '@/hooks/useObjetivos'
import { GaugeChart } from '../complexUI/Gauge'
import { Divider, Progress, Rate } from 'antd'
import { OperativoProps } from '@/interfaces'


interface Props {
    operativos: OperativoProps[]
}
export const CardAvance = ({operativos}:Props) => {

    const { ponderacionTotal} = useObjetivo({operativos})
  return (
    <>
        <div className='px-5 text-center text-devarana-graph'>
            <p className='font-medium'>Avance</p>
            <GaugeChart value={ponderacionTotal}/>
            <div className='pt-5'>
                <Progress percent={ponderacionTotal} format={percent =><p className='text-devarana-graph'>{percent?.toFixed(2)}%</p>}
                strokeColor={{
                    '0%': 'rgba(9, 103, 201, 1)',
                    '100%': 'rgba(9, 103, 201, .5)',
                }}
                />
                <p>Logro Objetivos</p>
                <Divider className='my-2'/>
                <Rate defaultValue={4} allowHalf className='text-primary' />
                <p>Evaliación Competitiva</p>
            </div>
        </div>
    
    </>
  )
}
