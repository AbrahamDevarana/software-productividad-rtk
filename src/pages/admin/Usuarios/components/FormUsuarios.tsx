import { Steps, Modal } from 'antd';
import { useState } from "react";
import { Box } from "@/components/ui"


import { Contacto } from "./Contacto";
import { Domicilio } from "./Domicilio";
import { Profesional } from "./Profesional";
import { ModalProps } from '@/interfaces/modal';




export const FormUsuarios = ({visible, handleModal}: ModalProps) => {

    const [ current, setCurrent] = useState<number>(2);
    const [ usuario, setUsuario ] = useState ({});

    const { Step } = Steps;


    const handleSteps = (values:any) => {
        setUsuario({
            ...usuario,
            ...values
        })
        setCurrent(Math.min(current + 1, 2)); 
    }
    
    const handleCancel = () => {
        handleModal(false)
        // dispatch(clearCurrentAreaThunk())
    }   

    return (
        <Modal
            open={visible}
            onCancel={ handleCancel }
            destroyOnClose={true}
            width={1000}
            footer={null}
            closable = {false}
            maskClosable = {false}
            bodyStyle={{ backgroundColor: 'transparent' }}
        >
            <div className="animate__animated animate__fadeIn animate__faster py-10">
                <Box className="-my-16 bg-gradient-to-tr from-[#1a73e8] to-[#49a3f1]">
                    <Steps current={current} progressDot={true} size="small">
                        <Step title="Perfil" onStepClick={setCurrent} />
                        <Step title="Domicilio" onStepClick={setCurrent} />
                        <Step title="Profesional" onStepClick={setCurrent} />
                    </Steps>
                </Box>

                <div className={`pt-24`}>                
                    {current === 0 ? <Contacto usuario={usuario} handleSteps={handleSteps} /> : ""}
                    {current === 1 ? <Domicilio usuario={usuario} handleSteps={handleSteps} /> : ""}
                    {current === 2 ? <Profesional usuario={usuario} handleSteps={handleSteps} /> : ""}
                </div>  
            </div>
        </Modal>
    )
}
