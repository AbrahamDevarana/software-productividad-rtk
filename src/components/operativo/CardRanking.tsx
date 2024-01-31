import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { useGetRankingsQuery } from '@/redux/features/ranking/rankingThunk'
import { useAppSelector } from '@/redux/hooks'
import { Avatar, Image, Segmented, message } from 'antd'
import { useState } from 'react'

export const CardRanking = () => {

    const { currentConfig: {year, quarter} } = useAppSelector(state => state.global)
    const {data, isError} = useGetRankingsQuery({year, quarter})

    const [ranking , setRanking] = useState<string | number>('ranking')

    console.log(data?.rankingUsuarios, isError, 'data');
    

    isError && message.error( {
        content: 'Error al cargar el ranking',
        key: 'ranking',
        duration: 2
    })
    
    return (
            <>

                <Segmented
                    title='Ranking'
                    className=''
                    block
                    options={[
                        { label: 'Ranking', value: 'ranking' },
                        { label: 'Competencias', value: 'competencias' }
                    ]}
                    value={ranking}
                    onChange={setRanking}
                >

                </Segmented>



                {
                    ranking === 'ranking' && (
                        <>

                        <hr className='my-3' /> 

                        <h1 className='text-primary font-medium'> Ranking DEVARANA </h1>
                            {data?.rankingUsuarios?.map((ranking, index) => (
                                <li className='flex justify-between items-center my-2 gap-x-1 w-full border-b border-devarana-graph border-dotted border-opacity-40 py-3' key={index} >
                                    <Avatar size="large" src={<Image src={`${getStorageUrl(ranking?.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                                    <p className='font-medium text-devarana-graph text-sm'
                                        style={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >{ranking?.nombre} {ranking?.apellidoPaterno}</p>
                                    <div className='bg-primary rounded'>
                                        <p className='text-white px-1 py-1 text-xs'>{ ( Math.trunc(ranking.rendimiento[0].resultadoFinal * 100) / 100).toFixed(2) } % </p>
                                    </div>
                                </li>
                            ))}
                        </>
                    )
                }
                {
                    ranking === 'competencias' && (
                        <>
                        <hr className='my-3' />
                        <h1 className='text-primary font-medium'> Ranking Competencias </h1>
                        {data?.rankingCompetencias?.map((ranking, index) => (
                            <li className='flex justify-between items-center my-2 gap-x-1 w-full border-b border-devarana-graph border-dotted border-opacity-40 py-3' key={index} >
                                <Avatar size="large" src={<Image src={`${getStorageUrl(ranking?.foto)}`} preview={false} fallback={getBrokenUser()} />} />
                                <p className='font-medium text-devarana-graph text-sm'
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}
                                >{ranking?.nombre} {ranking?.apellidoPaterno}</p>
                                <div className='bg-primary rounded'>
                                    <p className='text-white px-1 py-1 text-xs'>{ ( Math.trunc(ranking.rendimiento[0].resultadoCompetencias * 100) / 100).toFixed(2) } % </p>
                                </div>
                            </li>
                        ))}
                        </>
                    )
                }
            </>
    )
}
