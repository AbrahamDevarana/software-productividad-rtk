
import { useState } from 'react';
import { getStorageUrl } from '@/helpers'
import { ComentarioProps } from '@/interfaces'
import { useAppSelector } from '@/redux/hooks'
import { Avatar, Image } from 'antd'
import dayjs from 'dayjs'
import { BsSendFill } from 'react-icons/bs'
import getBrokenUser from '@/helpers/getBrokenUser'

interface Props {
    comentarios: ComentarioProps[]
    comentableType: string
}

export const Comentarios = () => {


    const { userAuth } = useAppSelector(state => state.auth)

    const comentarios: ComentarioProps[] = [
        {
            id: 'asdasd',
            //mensaje: Lorem large text
            mensaje: 'Lorem ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi  ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi Lorem ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi  ipsum dolor sit amet consectetur adipi  ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi Lorem ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi  ipsum dolor sit amet consectetur adipi  ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi Lorem ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi  ipsum dolor sit amet consectetur adipi  ipsum dolor sit amet consectetur adipi ipsum dolor sit amet consectetur adipi ',
            createdAt: new Date('2021-08-10T00:00:00.000Z'),
            comentableId: 'asdasd',
            comentableType: 'asdasd',
            autorId: 'asdasd',
            autor: {
                id: 'asdas',
                nombre: 'Juan',
                apellidoPaterno: 'Perez',
                foto: 'https://picsum.photos/200',
                apellidoMaterno: 'Perez',
                email: '',
                iniciales: 'JP'
            }
        }
    ]

    const [comentario , setComentario] = useState('')


    const createComentario = () => {
        console.log(comentario)
        setComentario('')
    }


    const handleChange = (e: any) => {
        setComentario(e.target.value)
    }
    
  return (
    <>
        {
            comentarios.map(comentario => (
            <div className='flex' key={comentario.id}>
                <div className='flex-shrink-0'>
                    <Avatar src={<Image src={getStorageUrl(comentario.autor.foto)} preview={false} fallback={getBrokenUser()} /> } />
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
            <button className='bg-gradient-to-t from-primary to-primary-light shadow-sm rounded-full h-8 w-9 flex justify-center items-center hover:opacity-80' onClick={createComentario}>
                <BsSendFill className='text-white text-xs fill-white' /> 
            </button>
        </div>

    </>
  )
}
