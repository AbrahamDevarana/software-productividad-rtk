
import { useEffect, useState } from 'react';
import { getStorageUrl } from '@/helpers'
import { ComentarioProps } from '@/interfaces'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Avatar, Image } from 'antd'
import dayjs from 'dayjs'
import { BsSendFill } from 'react-icons/bs'
import getBrokenUser from '@/helpers/getBrokenUser'
import { createComentarioThunk, getComentariosThunk } from '@/redux/features/comentarios/comentariosThunk';

interface Props {
    comentableType: string
    comentableId: string | number
    setComentariosCount: React.Dispatch<React.SetStateAction<number>>
}

export const Comentarios = ({comentableType, comentableId, setComentariosCount}:Props) => {

    const dispatch = useAppDispatch()

    const { userAuth } = useAppSelector(state => state.auth)
    const { comentarios, isLoading } = useAppSelector(state => state.comentarios)
    const [comentario , setComentario] = useState('')
    



    const createComentario = async () => {

        if(comentario.length > 0 && comentario.trim().length > 0){

            await dispatch(createComentarioThunk({
                mensaje: comentario,
                comentableType,
                comentableId
            }))
            setComentario('')
            setComentariosCount(comentarios.length + 1)
        }
    }

    const handleDeleteComentario = async (id: number) => {
        // await dispatch(deleteComentarioThunk(id))
        setComentariosCount(comentarios.length - 1)
    }

    const handleChange = (e: any) => {
        setComentario(e.target.value)
    }    


    useEffect(() => {
        dispatch(getComentariosThunk({ comentableType, comentableId }))
    }, [])

    if(isLoading) return <p>Cargando...</p>
    
    return (
        <>
            {
                comentarios.map(comentario => (
                <div className='flex pb-5' key={comentario.id}>
                    <div className='flex-shrink-0'>
                        <Avatar src={<Image src={getStorageUrl(comentario.autor?.foto)} preview={false} fallback={getBrokenUser()} /> } />
                    </div>
                    <div className='ml-3'>
                        <div className=''>
                            <p className='text-sm font-medium text-devarana-dark-graph'>
                                { comentario.autor.nombre } { comentario.autor.apellidoPaterno }  
                                <span className='text-xs text-devarana-graph font-light pl-3'>
                                    { dayjs(comentario.createdAt).fromNow() }
                                </span>
                            </p>
                        </div>
                        <div className='mt-1 max-h-20 overflow-y-scroll'>
                            <p className='text-devarana-graph font-light text-sm'>
                                { comentario.mensaje }
                            </p>
                        </div>
                    </div>
                </div>
                ))
            }

            {/* Crear nuevos comentarios  */}
            <div className='flex gap-3 py-5'>
                <Avatar src={<Image src={getStorageUrl(userAuth.foto)} preview={false} /> } />
                <input type="text" className='bg-gray-100 rounded-full w-full px-2' placeholder='Escribe un comentario... ' onChange={handleChange} value={comentario}/>
                <button disabled={ comentario.trim().length === 0} className='disabled:opacity-10 bg-gradient-to-t from-primary to-primary-light shadow-sm rounded-full h-8 w-9 flex justify-center items-center hover:opacity-80' onClick={createComentario}>
                    <BsSendFill className='text-white text-xs fill-white' /> 
                </button>
            </div>

        </>
    )
}
