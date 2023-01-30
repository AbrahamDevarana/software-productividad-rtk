import { Card, Progress } from 'antd'
import { Avatar, Box } from '../../components/ui'
import { Segmented } from 'antd';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { DashOutlined, PlusOutlined } from '@ant-design/icons';
import * as Icon from '@ant-design/icons'


export const Objetivos = () => {

    const [value, setValue] = useState<string | number>('Estrategicos'); 


    const Estrategia1 = [
        {
            id: 1,
            uid: '1',
            titulo: 'P1: Incrementar los ingresos con el lanzamiento de nuevos productos y servicios',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
            icon: <Icon.DashOutlined />
        },
        {
            id: 2,
            uid: '2',
            titulo: 'P2: Incrementar los ingresos con el lanzamiento de nuevos productos y servicios',
            descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
        }
    ]


    return (
        <>
            <Segmented block options={['Estrategicos', 'Personales']} value={value} onChange={setValue} className='mb-5'/>
            {

                value === 'Estrategicos'
                &&
                (
                    <>
                    <Box className='animate__animated animate__fadeIn aniname__faster flex justify-between items-center'>
                        <h1 className='font-playfair text-devarana-blue text-2xl py-5'>Objetivos Estratégicos</h1>
                        <Button className='bg-devarana-blue text-white'>Agregar Objetivo</Button>
                    </Box>

                    <div className='flex flex-col gap-y-5 my-8 animate__animated animate__fadeIn aniname__faster'>
                        <Box className='align-middle grid grid-flow-col gap-x-10 bg-devarana-blue justify-start'>
                            {
                                Estrategia1.map( item => (
                                    <Card size='small' className='w-[250px] bg-white backdrop-blur bg-opacity-50' extra = { item.icon }  bordered={false} headStyle={{ border: 'none' }}>
                                        <p className='text-devarana-dark-graph'>
                                            { item.titulo }
                                        </p>
                                    </Card>
                                ))
                            }
                        </Box>
                        <Box className='align-middle grid grid-flow-col gap-x-10 bg-devarana-pink justify-start'>
                            <Card size='small' className='w-[250px] bg-white backdrop-blur bg-opacity-50' extra = { <DashOutlined /> }  bordered={false} headStyle={{ border: 'none' }}>
                                <p className='text-devarana-dark-graph'> 
                                    P1: Incrementar los ingresos con el lanzamiento de nuevos productos y servicios
                                </p>
                            </Card>
                        </Box>
                        <Box className='align-middle grid grid-flow-col gap-x-10 bg-devarana-pollito justify-start'>
                            <Card size='small' className='w-[250px] bg-white backdrop-blur bg-opacity-50' extra = { <DashOutlined /> }  bordered={false} headStyle={{ border: 'none' }}>
                                <p className='text-devarana-dark-graph'> 
                                    P1: Incrementar los ingresos con el lanzamiento de nuevos productos y servicios
                                </p>
                            </Card>
                        </Box>
                        <Box className='align-middle grid grid-flow-col gap-x-10 bg-devarana-babyblue justify-start'>
                            <Card size='small' className='w-[250px] bg-white backdrop-blur bg-opacity-50' extra = { <DashOutlined /> }  bordered={false} headStyle={{ border: 'none' }}>
                                <p className='text-devarana-dark-graph'> 
                                    P1: Incrementar los ingresos con el lanzamiento de nuevos productos y servicios
                                </p>
                            </Card>
                        </Box>
                        <Box className='align-middle grid grid-flow-col gap-x-10 bg-devarana-graph justify-start'>
                            <Card size='small' className='w-[250px] bg-white backdrop-blur bg-opacity-50 text-center' bordered={false} headStyle={{ border: 'none' }}>
                                <PlusOutlined className='text-5xl mx-auto text-white text-opacity-35' />
                                <p className='mx-auto text-white text-opacity-35'>Nuevo</p>
                            </Card>
                        </Box>
                    </div>
                    </>
                )


            }

            {
                value === 'Personales' 
                && 
                (
                    <>
                    <Box className='animate__animated animate__fadeIn aniname__faster'>
                        <h1>Mis Objetivos</h1>
                        <Progress percent={20} className="py-2" strokeWidth={20} strokeLinecap='square'/>
                    </Box>

                    <div className='grid grid-cols-4 gap-5 my-8 animate__animated animate__fadeIn aniname__faster'>
                        <Box className='flex flex-col align-middle'>
                            <Progress percent={15} className="py-5 mx-auto" strokeWidth={15} type="circle" strokeColor="#d64767"/>
                            <h1 className='text-center font-extrabold'>Objetivo 1</h1>
                            <p className='text-center font-semibold text-devarana-graph'>Ponderación <span> 33% </span></p>
                        </Box>
                        <Box className='flex flex-col align-middle'>
                            <Progress percent={50} className="py-5 mx-auto" strokeWidth={15} type="circle" strokeColor="#d64767"/>
                            <h1 className='text-center font-extrabold'>Objetivo 2</h1>
                            <p className='text-center font-semibold text-devarana-graph'>Ponderación <span> 33% </span></p>
                        </Box>
                        <Box className='flex flex-col align-middle items-center'>
                            <Progress percent={95} className="py-5 mx-auto" strokeWidth={15} type="circle" strokeColor="#d64767"/>
                            <h1 className='text-center font-extrabold'>Objetivo 3</h1>
                            <p className='text-center font-semibold text-devarana-graph'>Ponderación <span> 33% </span></p>

                            <div>
                                <Avatar size='small' />
                                <Avatar size='small' />
                            </div>
                            
                        </Box>


                    </div>
                    </>
                )
            }
        </>
    )
}
