
import { useState } from 'react';
import { getStorageUrl } from '@/helpers'
import { useAppSelector } from '@/redux/hooks'
import { Avatar, Image, message, Popconfirm } from 'antd'
import dayjs from 'dayjs'
import { BsSendFill } from 'react-icons/bs'
import getBrokenUser from '@/helpers/getBrokenUser'
import { useCreateComentarioMutation, useDeleteComentarioMutation, useGetComentariosQuery } from '@/redux/features/comentarios/comentariosThunk';
import { ComentarioProps } from '@/interfaces';
import { BiTrash } from 'react-icons/bi';

interface Props {
    comentableType: string
    comentableId: string | number
    maxSize?: number | 'auto'
}

export const Comentarios = ({comentableType, comentableId, maxSize = 300}:Props) => {

    const { userAuth } = useAppSelector(state => state.auth)
    const [ comentario , setComentario] = useState('')
    

    const { data: comentarios, isLoading } = useGetComentariosQuery({comentableId, comentableType}, { skip: !comentableId || !comentableType })
    const [createComentario, {isLoading: isCreating}] = useCreateComentarioMutation()
    const [deleteComentario, {isLoading: isDeleting}] = useDeleteComentarioMutation()
    

    const handleCreateComentario = async () => {

        if(comentario.length > 0 && comentario.trim().length > 0){
            createComentario({mensaje: comentario, comentableType, comentableId}).unwrap().then(() => {
                message.success('Comentario creado')
                setComentario('')
            }).catch(() => {
                message.error('Error al crear el comentario')
            })
        }
    }

    const handleDeleteComentario = async (comentario: ComentarioProps) => {
        await deleteComentario({id: comentario.id, comentableId, comentableType}).unwrap().then(() => {
            message.success('Comentario eliminado')
        }).catch(() => {
            message.error('Error al eliminar el comentario')
        })
    }

    const handleChange = (e: any) => {
        setComentario(e.target.value)
    }    

    if( isLoading ) return <p>Cargando...</p>
    
    return (
        <>
            <div className={`overflow-y-auto pr-2`} style={{
                maxHeight: maxSize + 'px'
            }}>
                {
                    comentarios && comentarios.map(comentario => (
                    <div className='flex pb-5 items-center gap-x-2 max-h-[300px] overflow-y-auto' key={comentario.id}>
                        <div className='flex-shrink-0'>
                            <Avatar shape='circle' size={'large'}  src={<Image className='w-full' src={getStorageUrl(comentario.autor?.foto)} preview={false} fallback={getBrokenUser()} /> } />
                        </div>
                        <div className='ml-3 w-full'>
                            <div className='flex gap-3'>
                                <p className='text-sm font-medium text-devarana-dark-graph'>
                                    { comentario.autor?.nombre } { comentario.autor?.apellidoPaterno }  
                                    <span className='text-xs text-devarana-graph font-light pl-3'>
                                        { dayjs(comentario.createdAt).fromNow() }
                                    </span>
                                </p>
                                <Popconfirm
                                    title="¿Estás seguro de eliminar este comentario?"
                                    onConfirm={() => handleDeleteComentario(comentario)}
                                    okText="Si"
                                    cancelText="No"
                                    okButtonProps={{
                                        className: 'rounded-full mr-2 bg-primary'
                                    }}
                                    cancelButtonProps={{
                                        className: 'rounded-full mr-2 bg-error-light text-white'
                                    }}
                                >
                                    <button className='text-error-light'>
                                        <BiTrash />
                                    </button>
                                </Popconfirm>
                            </div>
                            <div className='mt-1 max-h-20 overflow-y-auto flex flex-row justify-between'>
                                <div className='text-devarana-graph font-light text-sm w-full py-0.5'>
                                    { comentario.mensaje }
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>

            {/* Crear nuevos comentarios  */}
            <div className='flex gap-5'>
                <Avatar shape='circle' size={'large'} src={<Image src={getStorageUrl(userAuth.foto)} preview={false} fallback={getBrokenUser()} /> } />
                <input
                    disabled={isCreating}
                    onKeyDown={(e) => {
                        if(e.key === 'Enter'){
                            handleCreateComentario()
                        }}
                    }
                    type="text" className='bg-gray-100 rounded-full flex-1 px-2 py-2' placeholder='Escribe un comentario... ' onChange={handleChange} value={comentario}/>
                <button disabled={ comentario.trim().length === 0} className='disabled:opacity-10 bg-gradient-to-t from-primary to-primary-light shadow-sm rounded-full h-8 w-9 flex justify-center items-center hover:opacity-80' onClick={handleCreateComentario}>
                    <BsSendFill className='text-white text-xs fill-white' /> 
                </button>
            </div>

        </>
    )
}
