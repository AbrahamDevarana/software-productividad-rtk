import { FC, useState } from 'react';
import { Box } from '../ui';
import { Skeleton, Steps } from 'antd';
import { FormObjetivo } from './FormObjetivo';
import { useAppSelector } from '@/redux/hooks';
import { FormResultados } from '@/components/resultados/FormResultados';



export const WizardOperativo:FC = () => {

    const [ current, setCurrent] = useState<number>(0)

    const { currentOperativo, isLoadingObjetivo } = useAppSelector(state => state.operativos)


    // Si existe currentOperativo, entonces se edita
    // Si no existe, entonces se crea uno nuevo
    // Al finalizar el wizard, currentOperativo se resetea a null

    
    const handleCurrent = (current: number) => {
        setCurrent(current)
    }
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


            {
                isLoadingObjetivo 
                ? <Skeleton active className='pt-24' paragraph={{ rows: 13 }} /> 
                : (
                    <div className={`pt-24`}>
                        { current === 0 && <FormObjetivo currentOperativo={currentOperativo} handleCurrent={handleCurrent} current={current}/> }
                        { current === 1 && <FormResultados currentOperativo={currentOperativo} handleCurrent={handleCurrent} current={current}/> }
                    </div>
                )
            }

           
        </>
    )
}
