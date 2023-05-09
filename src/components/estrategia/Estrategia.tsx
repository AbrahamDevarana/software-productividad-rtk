import { Icon } from '../Icon'
import { PerspectivaProps } from '@/interfaces'
import { TablaEstrategia } from './TablaPerspectiva'
import { Drawer, FloatButton } from 'antd';
import { useState } from 'react'
import { FormEstrategia } from './FormEstrategia'

interface EstrategiaProps {
    perspectivas: PerspectivaProps[]
}

export const Estrategia: React.FC<EstrategiaProps> = ({perspectivas}) => {

    const [open, setOpen] = useState<boolean>(false)

    
    return (
        <>
            {
                perspectivas && perspectivas.map((perspectiva: PerspectivaProps, index: number) => (
                    
                
                <div key={index} className='rounded-l-ext gap-x-5 flex flex-row pb-10'>
                    <p></p>
                    <div className='flex shadow rounded-l-ext'>
                        <div className={`rounded-l-ext min-h-[240px] h-full flex flex-col justify-center items-center w-14`} style={{
                            backgroundColor: perspectiva.color
                        }}>
                            <p className='inline-block transform text-center -rotate-90 text-white font-normal tracking-wider leading-4 py-2 w-[170px] drop-shadow '> Perspectiva <br/> { perspectiva.nombre }</p>
                        </div>
                        <div className='bg-white flex justify-center items-center flex-col align-middle min-w-[160px]'>
                            <Icon iconName={`${perspectiva.icono || 'faAtom' }`} className='text-devarana-graph text-5xl' />
                            {/* <p className='text-devarana-graph'>Ver más...</p> */}
                        </div>
                    </div>
                    <div className='bg-white py-10 px-5 w-full shadow relative'>
                        <TablaEstrategia perspectiva={perspectiva} setOpen={setOpen}/>
                    </div>
                </div>
            ))}

           
            <Drawer
                onClose={() => setOpen(false)}
                open={open}
                width={window.innerWidth > 1200 ? 600 : '100%'}
                className='rounded-l-ext'
                destroyOnClose={true}
                // exit={{ opacity: 0 }}
            >
                <FormEstrategia setOpen={ setOpen } />
            </Drawer>

            <FloatButton
                onClick={() => setOpen(true)}
                icon={<Icon iconName="faPlus"/>} 
                className='bottom-5'
            />
        </>
    )
}
