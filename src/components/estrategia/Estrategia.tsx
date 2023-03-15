import { Icon } from '../Icon'
import { Perspectiva } from '@/interfaces'
import { TablaEstrategia } from './TablaEstrategia'

export const Estrategia = ({perspectivas, data}: any) => {

    
    return (
            perspectivas && perspectivas.map((perspectiva: Perspectiva, index: number) => (

            <div key={index} className='rounded-l-ext gap-x-5 flex flex-row pb-10'>
                <div className='flex shadow rounded-l-ext'>
                    <div className={`rounded-l-ext min-h-[240px] h-full flex flex-col justify-center items-center w-14`} style={{
                        backgroundColor: perspectiva.color
                    }}>
                        <h1 className='inline-block transform text-center -rotate-90 text-white font-normal tracking-wider py-2'>{ perspectiva.nombre }</h1>
                    </div>
                    <div className='bg-white flex justify-center items-center flex-col align-middle min-w-[160px]'>
                        <Icon iconName='faChartLine' className='text-devarana-graph text-5xl' />
                        <p className='text-devarana-graph'>Ver más...</p>
                    </div>
                </div>
                <div className='bg-white p-5 w-full shadow'>
                    <TablaEstrategia data={data} color={perspectiva.color} />
                </div>
            </div>
        ))
    )
}
