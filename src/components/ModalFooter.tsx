import { Button } from 'antd'
import React from 'react'

interface ModalFooterProps {
    onSubmit: () => void
    onCancel: () => void
}

export const ModalFooter = ({onSubmit, onCancel}: ModalFooterProps) => {
  return (
    <div className='modal__footer'> 
        <Button>Cancelar</Button>
        <Button>Guardar</Button>
    </div>
  )
}
