import { useGetCategoriasResultadosQuery, useGetEvaluacionResultadosCategoriaQuery } from '@/redux/features/evaluaciones/evaluacionesThunk';
import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { Spinner } from '../antd/Spinner';
import { getValueColaborador } from '@/helpers/getValueComment';
import { toast } from 'sonner';


interface Props {
    usuarioId: string
}

export const ResultadosCompetencias = ({usuarioId}: Props) => {

    const { currentConfig: {year, quarter} } = useAppSelector(state => state.global)
    

    const [categoria, setCategoria] = useState(0)
    const {data, isLoading: isLoadingResultados, isFetching: isFetchingResultados} = useGetEvaluacionResultadosCategoriaQuery({ year, quarter, categoriaId: categoria, usuarioId}, {
        skip: categoria === 0
    })
    const { data: categorias, isLoading:isLoadingCategorias, isError: isErrorCategorias, isUninitialized} = useGetCategoriasResultadosQuery({ year, quarter, usuarioId })

    const handleGetResultados = (categoria: number) => {
        setCategoria(categoria)
    }

    !isLoadingCategorias && isErrorCategorias && toast.error('Ocurrió un error al cargar las categorías')
    !isLoadingResultados && data?.resultado.respuestas.usuario.length === 0 && data?.resultado.respuestas.otras.length === 0 && toast.error('No hay resultados')
     
    return (
        <div className='grid grid-cols-12 gap-2 min-h-[500px] overflow-y-hidden'>

            {
                !isLoadingCategorias && (!categorias || categorias.length === 0) ? (
                    <div className='text-center text-devarana-dark-graph flex items-center justify-center col-span-12 text-2xl'>Tu equipo no ha realizado evaluaciones</div>
                ) : (
                    <>
                        <div className='col-span-4 border rounded p-3'>
                        <h3 className='text-devarana-dark-graph pb-5'>Categoría</h3>
                        {
                            isLoadingCategorias ? <Spinner height='200px' /> :
                            (

                                categorias?.map((item: any, index: number) => {
                                    if (item.id <= 6) {
                                        return (
                                            <div className={`flex items-center px-1 ${categoria === parseInt(item.id) ? 'bg-gray-200': ''} hover:bg-gray-100`} key={index}>
                                                <div className='bg-devarana-pink w-3 h-3'>

                                                </div>
                                                <button key={index} className={`px-2 py-1 text-devarana-graph block w-full text-left`} onClick={() => handleGetResultados(parseInt(item.id))}>{ item.nombre }</button>
                                            </div>

                                        )
                                    }else {
                                        return (
                                            <div className={`flex items-center px-1 ${categoria === parseInt(item.id) ? 'bg-gray-200': ''} hover:bg-gray-100`} key={index}>
                                                <div className='bg-devarana-blue w-3 h-3'>

                                                </div>
                                                <button key={index} className={`px-2 py-1 text-devarana-graph block w-full text-left`} onClick={() => handleGetResultados(parseInt(item.id))}>{ item.nombre }</button>
                                            </div>
                                        )
                                    }
                                })


                            )
                        }
                         </div>
                    <div className='col-span-8 border rounded p-3 overflow-y-auto' style={{
                        maxHeight: '500px'
                    }}>
                        <h3 className='text-devarana-dark-graph pb-5'>Resultado</h3>
                        <div className='flex justify-center items-center'>
                                <Rating initialValue={Number(data?.resultado?.promedio) || 0} size={45} readonly allowFraction transition emptyStyle={{ display: "flex" }} fillStyle={{ display: "-webkit-inline-box" }} fillColor='rgba(9, 103, 201, 1)'
                                />
                                
                            <p className='px-2 text-2xl text-devarana-graph'>
                                { Math.trunc(Number(data?.resultado?.promedio) * 100) / 100 || 0 } / 5
                            </p>
                        </div>
                        <div className='text-center text-devarana-graph'>
                            { getValueColaborador(Number(data?.resultado?.promedio) || 0) }
                        </div>

                        <hr className='my-5' />
                    {

                            !data || data?.resultado.respuestas.usuario.length === 0 && data?.resultado.respuestas.otras.length === 0 ? (
                                <div className='text-center text-devarana-dark-graph flex items-center justify-center' style={{height: '100px'}}>No hay resultados</div>
                            ) :
                            isLoadingResultados || isFetchingResultados ? <Spinner height='200px' /> : 
                            (
                               
                                <div className='text-devarana-graph'>

                                    {
                                         data?.resultado.respuestas.usuario.length === 0 ? (
                                           null
                                        ) : (
                                            <>
                                            <h3 className='font-medium  text-devarana-midnight'> Auto Evaluación </h3>
                                            <ul className='list-disc list-inside'>
                                            {
                                                data?.resultado.respuestas.usuario.map((item: any, index: number) => {
                                                    return (
                                                        <li key={index} className='py-2'>
                                                            { item }    
                                                        </li>
                                                    )
                                                })   
                                            }
                                            </ul>
                                            </>
                                        )
                                    }
                                    
                                    {
                                        data?.resultado.respuestas.otras.length === 0 ? (
                                            null
                                        ) : (
                                            <>
                                            <h3 className='font-medium  text-devarana-midnight'> Mis Evaluaciones </h3>
                                            <ul className='list-disc list-inside'>
                                            {
                                                data?.resultado.respuestas.otras.map((item: any, index: number) => {
                                                    return (
                                                        <li key={index} className='py-2'>
                                                            { item }    
                                                        </li>
                                                    )
                                                })   
                                            }
                                            </ul>
                                            </>
                                        )
                                    }
                                </div>
                            )
                    }
                    </div>
                    </>
                )
            }
          
        </div>
    )
}
