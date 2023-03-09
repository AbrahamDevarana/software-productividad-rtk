import Box from '../../components/ui/Box';
import { Icon } from '../../components/Icon';
import { Table, Progress, Avatar } from 'antd';
import { useGetColorByStatus } from '../../hooks/useGetColorByStatus';
import { DateTime } from 'luxon';

export const EstrategíaHome = () => {
  return (
    <>
        <Box>

        </Box>
        {/* <Box className='mt-5'> */}
            
            <div className='rounded-l-ext grid grid-cols-12 gap-x-5 mt-5'>
                <div className="grid grid-cols-12 col-span-2 shadow-md bg-white">
                    <div className='bg-devarana-blue rounded-l-ext col-span-3 h-80 flex flex-col justify-center items-center'>
                        <h1 className='inline-block transform -rotate-90 text-white font-normal tracking-wider py-2'>Estrategia</h1>
                    </div>
                    <div className="col-span-9 flex justify-center items-center flex-col">
                        <Icon iconName='faChartLine' className='text-devarana-graph text-5xl' />
                        <p className='text-devarana-graph'>Ver más...</p>
                    </div>
                </div>
                <div className='col-span-10 shadow-md bg-white p-5'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='text-devarana-graph'>Tareas</th>
                                <th className='text-devarana-graph'>Status</th>
                                <th className='text-devarana-graph'>Progreso</th>
                                <th className='text-devarana-graph'>Fecha de Entrega</th>
                                <th className='text-devarana-graph'>Objetivo</th>
                                <th className='text-devarana-graph'>Responsables</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            <tr>
                                <td className='text-devarana-graph border-l-4 border-devarana-blue'>Tarea 1</td>
                                <td className='text-devarana-blue font-bold'>En Progreso</td>
                                <td className=''>  
                                    <Progress percent={30}  strokeColor={`${ useGetColorByStatus('success', 1).rgba }`} strokeWidth={15} trailColor={`${ useGetColorByStatus('success', .5).rgba }`} />
                                </td>
                                <td className='text-devarana-graph'>{ DateTime.local().toFormat('DDD') }</td>
                                <td className='text-devarana-graph'>Objetivo 1</td>
                                <td className='text-devarana-graph'>
                                    <Avatar.Group maxCount={2}>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Avatar.Group>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-devarana-graph border-l-4 border-devarana-dark-graph'>Tarea 1</td>
                                <td className='text-devarana-dark-graph font-bold'>En Progreso</td>
                                <td className=''>  
                                    <Progress percent={30}  strokeColor={`${ useGetColorByStatus('black', 1).rgba }`} strokeWidth={15} trailColor={`${ useGetColorByStatus('black', .5).rgba }`} />
                                </td>
                                <td className='text-devarana-graph'>{ DateTime.local().toFormat('DDD') }</td>
                                <td className='text-devarana-graph'>Objetivo 1</td>
                                <td className='text-devarana-graph'>
                                    <Avatar.Group maxCount={2}>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Avatar.Group>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-devarana-graph border-l-4 border-red-500'>Tarea 1</td>
                                <td className='text-red-500 font-bold'>En Progreso</td>
                                <td className=''>  
                                    <Progress percent={30}  strokeColor={`${ useGetColorByStatus('error', 1).rgba }`} strokeWidth={15} trailColor={`${ useGetColorByStatus('error', .5).rgba }`} />
                                </td>
                                <td className='text-devarana-graph'>{ DateTime.local().toFormat('DDD') }</td>
                                <td className='text-devarana-graph'>Objetivo 1</td>
                                <td className='text-devarana-graph'>
                                    <Avatar.Group maxCount={2}>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Avatar.Group>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-devarana-graph border-l-4 border-devarana-blue'>Tarea 1</td>
                                <td className='text-devarana-blue font-bold'>En Progreso</td>
                                <td className=''>  
                                    <Progress percent={30}  strokeColor={`${ useGetColorByStatus('primary', 1).rgba }`} strokeWidth={15} trailColor={`${ useGetColorByStatus('primary', .5).rgba }`} />
                                </td>
                                <td className='text-devarana-graph'>{ DateTime.local().toFormat('DDD') }</td>
                                <td className='text-devarana-graph'>Objetivo 1</td>
                                <td className='text-devarana-graph'>
                                    <Avatar.Group maxCount={2}>
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </Avatar.Group>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        {/* </Box> */}
    </>
  )
}
