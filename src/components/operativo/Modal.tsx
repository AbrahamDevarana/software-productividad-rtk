import React from 'react'
import { Modal } from 'antd'


interface Props {
    activeModal: boolean
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>
}
export const ModalAprobacion = ({activeModal, setActiveModal}: Props) => {
  return (
    <>

    <Modal
        open={activeModal}
        onCancel={() => setActiveModal(false)}
        footer={null}
    >

    </Modal>
    
    </>
  )
}
