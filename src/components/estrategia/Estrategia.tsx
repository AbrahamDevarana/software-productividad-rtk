import { Icon } from '../Icon'
import { Perspectiva } from '@/interfaces'
import { TablaEstrategia } from './TablaEstrategia'
import { Drawer } from 'antd'
import { useState } from 'react'

export const Estrategia = ({perspectivas, data}: any) => {

    const [open, setOpen] = useState(false)
    const [color, setColor] = useState('')
    const [perspectivaId, setPerspectivaId] = useState(0)

    const handleNewEstrategia = (perspectiva: Perspectiva) => {
        setOpen(true)
        setColor(perspectiva.color)
        setPerspectivaId(perspectiva.id)
    }

    
    return (
        <>
            {
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
                    <div className='bg-white py-10 px-5 w-full shadow relative'>
                        <button className='absolute -right-2 -top-2 border rounded-full px-2 text-2xl text-white' onClick={ () => handleNewEstrategia(perspectiva)} style={{ backgroundColor: perspectiva.color}}> + </button>
                        <TablaEstrategia data={data} color={perspectiva.color} perspectivaId={perspectiva.id} />
                    </div>
                </div>
            ))}

            <Drawer
                onClose={() => setOpen(false)}
                open={open}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                headerStyle={{
                    backgroundColor: color,
                }}
                className='rounded-2xl'
                contentWrapperStyle={{
                    borderRadius: '0 0 2rem 2rem',
                }}
            >

            </Drawer>
        </>
    )
}
