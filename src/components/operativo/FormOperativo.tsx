import React from 'react'
import { useState } from 'react';
import { Box } from '../ui';
import { Steps } from 'antd';

export const FormOperativo = () => {

    const [ current, setCurrent] = useState<number>(0)

    const {Step} = Steps

    return (
        <>
            <Box className="-my-16 bg-gradient-to-tr from-[#2E3136] to-[#656A76]">
                <Steps current={current} progressDot={true} size="small" onChange={ (current) => setCurrent(current) }>
                    <Step title="General" onStepClick={setCurrent} />
                    <Step title="Profesional" onStepClick={setCurrent} />
                    <Step title="Personal" onStepClick={setCurrent} />
                </Steps>
            </Box>

            <div className={`pt-24`}>                
                
            </div>  
        </>
    )
}
