import { Perspectiva } from '@/interfaces'
import { Progress, Divider, Slider, Avatar } from 'antd';

export const EstrategiaDrawer = () => {
  return (
    <>
        <div className='w-full'>
            <h1 className='text-2xl'>Estrategía Title</h1>

            <Divider />

            <Slider defaultValue={30}  />

            <Divider />

            <div className='grid grid-cols-3 gap-10'>
                <div className='flex flex-col col-span-1'>
                    <p>Fecha Inicio: </p>
                    <span className='bg-gray-300 p-2'>01/01/2021</span>
                </div>
                <div className='flex flex-col col-span-1'>
                    <p>Fecha Inicio: </p>
                    <span className='bg-gray-300 p-2'>01/01/2021</span>
                </div>
                <div className='flex flex-col col-span-1'>
                    <p>Perspectiva </p>
                    <span className='bg-devarana-blue rounded-ext text-white text-center text-lg'>Financiera</span>
                </div>

                <div className='col-span-3'>
                    <p>Pertenece a:</p>
                    <Avatar.Group maxCount={3}>
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                    </Avatar.Group>
                </div>
                <div className='col-span-3'>
                    <p>Meta:</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    </p>
                </div>

                <div className='col-span-3'>
                    <p>Indicador:</p>
                    <p> Prioridad 1</p>
                </div>
                
            </div>
        </div>
    </>
  )
}
