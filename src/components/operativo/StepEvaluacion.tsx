import { PreguntasEvaluacionProps } from '@/interfaces'
import { Rate } from 'antd'
import React from 'react'


interface Props {
    pregunta: PreguntasEvaluacionProps
}

export const StepEvaluacion = ({pregunta}: Props) => {
  return (
    <>
        <div>
            {
                pregunta.texto
            }
        </div>
        <div>
            {
                pregunta.descripcion
            }
        </div>

        <Rate />
    </>
  )
}
