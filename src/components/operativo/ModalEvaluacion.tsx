import { UsuarioProps } from "@/interfaces";
import { Modal, Rate } from "antd";


interface Props {
    usuario: UsuarioProps
    visible: boolean
    handleCancelEv: () => void
}

const ModalEvaluacion = ({usuario, visible, handleCancelEv}: Props) => {
    return (
    <>
        <Modal
            open={visible}
            footer={null}
            width={1000}
            closable={false}
            destroyOnClose={true}
            title={  <h1 className='font-medium'> Evaluación competitiva </h1> }
        >
            <>
                <div className='grid grid-cols-2'>
                    <div className='col-span-1'>
                        <p>Pregunta 1</p>
                        <p>Pregunta 2</p>
                        <p>Pregunta 3</p>
                        <p>Pregunta 4</p>
                        <p>Pregunta 5</p>
                    </div>
                    <div className='col-span-1'>
                        <Rate className='block'/>
                        <Rate className='block'/>
                        <Rate className='block'/>
                        <Rate className='block'/>
                        <Rate className='block'/>

                    </div>
                </div>
            </>
        </Modal>
    </> );
}
 
export default ModalEvaluacion;