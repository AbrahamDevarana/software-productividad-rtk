import { getStorageUrl } from '@/helpers'
import getBrokenUser from '@/helpers/getBrokenUser'
import { useGetRankingsQuery } from '@/redux/features/ranking/rankingThunk'
import { useAppSelector } from '@/redux/hooks'
import { Avatar, Image } from 'antd'

export const CardRanking = () => {

    const { currentConfig: {year, quarter} } = useAppSelector(state => state.global)
    
    const {data: rankingUsuarios, isFetching, isLoading} = useGetRankingsQuery({year, quarter})
    
    return (
            <>
                <h1 className='text-primary font-medium'> Ranking DEVARANA </h1>
                {
                    rankingUsuarios?.map((ranking, index) => (
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
                                <p className='text-white px-1 py-1 text-xs'>{ ranking.rendimiento[0].resultadoFinal.toFixed(2)} % </p>
                            </div>
                        </li>
                    ))
                }
            </>
    )
}
