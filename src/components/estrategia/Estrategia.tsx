import { PerspectivaProps } from '@/interfaces'
import { TablaEstrategia } from './TablaPerspectiva'
import { Drawer, FloatButton } from 'antd';
import { useState } from 'react'
import { FormEstrategia } from './FormEstrategia'
import { FaPlus } from 'react-icons/fa';
import { Icon } from '../Icon'
interface EstrategiaProps {
    perspectivas: PerspectivaProps[]
}

export const Estrategia: React.FC<EstrategiaProps> = ({perspectivas}) => {
    
    return (
        <>
            {
                perspectivas && perspectivas.map((perspectiva: PerspectivaProps, index: number) => (
                    
                
                <div key={index} className='rounded-l-ext flex flex-row pb-10'>
                    <p></p>
                    <div className='flex rounded-l-ext shadow'>
                        <div className={`rounded-l-ext min-h-[240px] h-full flex flex-col justify-center items-center w-14`} style={{
                            backgroundColor: perspectiva.color
                        }}>
                            <p className='inline-block transform text-center -rotate-90 text-white font-normal tracking-wider leading-4 py-2 w-[170px] drop-shadow'> Perspectiva <br/> { perspectiva.nombre }</p>
                        </div>
                        <div className='bg-white flex justify-center items-center flex-col align-middle w-[160px] relative group overflow-hidden'>
                            <div className='group-hover:opacity-0 transition-all duration-300 ease-in-out'>
                                <Icon iconName={`${perspectiva.icono || 'faAtom' }`} className='text-devarana-graph text-5xl' />
                            </div>
                            <div className='absolute inset-0 px-3 py-5 flex items-center text-white group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out overflow-auto group-hover:transform group-hover:scale-110' style={{
                                backgroundColor: perspectiva.color
                            }}>
                                <p className='leading-5 cursor-default'>
                                    {
                                        perspectiva.descripcion
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white px-5 w-full relative rounded-r-ext shadow'>
                        <TablaEstrategia perspectiva={perspectiva}/>
                    </div>
                </div>
            ))}
        </>
    )
}
