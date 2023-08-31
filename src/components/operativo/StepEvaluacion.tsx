import { PreguntasEvaluacionProps } from '@/interfaces'
import { Rate } from 'antd'
import React from 'react'

interface RespuestaProps {
    id: string
    rate: number
    comentario: string
}
interface Props {
    pregunta: PreguntasEvaluacionProps
    respuesta: RespuestaProps
    setRespuesta: React.Dispatch<React.SetStateAction<RespuestaProps>>
}



export const StepEvaluacion = ({pregunta, respuesta, setRespuesta}: Props) => {
  return (
    <>
        <div>
            <p className='text-devarana-graph font-medium text-base'>
                {
                    pregunta?.texto
                }
            </p>
        </div>
        <div className='py-5'>
            <p className='text-devarana-graph'>
                {
                    pregunta?.descripcion
                }
            </p>
        </div>

        <Rate />
    </>
  )
}
