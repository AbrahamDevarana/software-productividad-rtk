import { ComentarioProps } from '@/interfaces'

import dayjs from 'dayjs'

interface Props {
    comentarios: ComentarioProps[]
}

export const Comentarios = () => {

    const comentarios: ComentarioProps[] = [
        {
            id: 'asdasd',
            mensaje: 'Hola',
            createdAt: new Date(),
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
  return (
    <>
        <div className='flex'>
            <div className='flex-shrink-0'>
                <img className='h-10 w-10 rounded-full' src='https://picsum.photos/200' alt='' />
            </div>
            <div className='ml-3'>
                <div className=''>
                    <p className='text-sm font-medium text-devarana-dark-graph'>
                        Abraham Alvarado
                        <span className='text-xs text-devarana-graph font-light pl-3'>
                            { dayjs().fromNow() }
                        </span>
                    </p>
                </div>
                <div className='mt-1 text-sm text-gray-700'>
                    <p className='text-devarana-graph font-light'>
                        mensaje de prueba muy largo para ver como se ve en la pantalla
                    </p>
                </div>
            </div>
        </div>

    </>
  )
}
