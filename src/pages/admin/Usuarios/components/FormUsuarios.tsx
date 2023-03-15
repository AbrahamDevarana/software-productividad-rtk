import { Steps, Modal } from 'antd';
import { useState } from "react";
import { Box } from "@/components/ui"


import { General } from "./General";
import { Personal } from "./Personal";
import { Profesional } from "./Profesional";
import { ModalProps } from '@/interfaces/modal';
import { useAppDispatch } from '@/redux/hooks';
import { cleanCurrentUsuarioThunk } from '@/redux/features/admin/usuarios/usuariosThunks';




export const FormUsuarios = ({visible, handleModal}: ModalProps) => {

    const [ current, setCurrent] = useState<number>(0);
    const dispatch = useAppDispatch()
    const { Step } = Steps;


    const handleSteps = (values:any) => {
        setCurrent(Math.min(values, 2)); 
    }
    
    const handleCancel = () => {
        handleModal(false)
        dispatch(cleanCurrentUsuarioThunk())
        handleSteps(0)
        
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
            <div className="animate__animated animate__fadeIn animate__faster">
                <Box className="-my-16 bg-gradient-to-tr from-[#1a73e8] to-[#49a3f1]">
                    <Steps current={current} progressDot={true} size="small" onChange={ (current) => setCurrent(current) }>
                        <Step title="General" onStepClick={setCurrent} />
                        <Step title="Profesional" onStepClick={setCurrent} />
                        <Step title="Personal" onStepClick={setCurrent} />
                    </Steps>
                </Box>

                <div className={`pt-24`}>                
                    {current === 0 ? <General handleSteps={handleSteps} handleCancel={handleCancel}/> : ""}
                    {current === 1 ? <Profesional handleSteps={handleSteps} handleCancel={handleCancel}/> : ""}
                    {current === 2 ? <Personal handleSteps={handleSteps} handleCancel={handleCancel}/> : ""}
                </div>  
            </div>
        </Modal>
    )
}