import { FC, useState } from 'react';
import { Box } from '../ui';
import { Steps } from 'antd';
import { CrearObjetivo } from './CrearObjetivo';

export const WizardOperativo:FC = () => {

    const [ current, setCurrent] = useState<number>(0)


    // Si existe currentOperativo, entonces se edita
    // Si no existe, entonces se crea uno nuevo
    // Al finalizar el wizard, currentOperativo se resetea a null

    return (
        <>
            <Box className="-my-16 bg-gradient-to-tr from-[#2E3136] to-[#656A76]">
                <Steps 
                current={current} 
                progressDot={true} 
                size="small"
                onChange={ (current) => setCurrent(current) }
                items={[
                    { title: 'Objetivo' },
                    { title: 'Resultados Clave' },
                ]}
                />
            </Box>

            <div className={`pt-24`}>
                { current === 0 && <CrearObjetivo /> }
                
                { current === 1 && <div>Resultados Clave</div> }
            </div>
        </>
    )
}
