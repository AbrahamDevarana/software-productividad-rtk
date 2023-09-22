import { Button } from '@/components/ui'
import { PerfilProps } from '@/interfaces';
import { postEvaluacionThunk } from '@/redux/features/perfil/perfilThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Input, Rate, Steps } from 'antd'
import React, { useState } from 'react'


interface Respuesta {
    id: string;
    preguntaId: string;
    evaluacionId: number;
    usuarioId: string;
    rate: number;
    comentarios: string;
}


interface Props {
    perfil: PerfilProps
    activeEvaluate: string | number
    setRespuestas: React.Dispatch<React.SetStateAction<Respuesta[]>>
    respuestas: any[]
}

export const EncuestaPreguntas = ({perfil, activeEvaluate, setRespuestas, respuestas}: Props) => {

    const { TextArea } = Input
    const { year, quarter } = useAppSelector(state => state.global.currentConfig)
    const [currentStep, setCurrentStep] = useState<number>(0);
        
    const dispatch = useAppDispatch()

    const general = {
        evaluacionId: perfil.evaluaciones.evaluacion?.id,
        usuarioId: perfil.id,
        evaluacionUsuarioId: activeEvaluate as string,
        quarter,
        year
    }

        const items = perfil.evaluaciones.evaluacion?.preguntasEvaluacion.map((pregunta, index) => {
            return {
                title: `Pregunta ${index + 1}`,
            }
        })

        const preguntasEvaluacion = perfil.evaluaciones.evaluacion?.preguntasEvaluacion


        const handleComentariosChange = (comentarios: string) => {
        // Obtén la respuesta actual o crea una nueva si aún no existe
            const respuestaActual = respuestas[currentStep] || {
            id: '',
            preguntaId: preguntasEvaluacion[currentStep].id,
            rate: 0,
            comentarios: '',
            };
        
            // Actualiza solo los comentarios
            respuestaActual.comentarios = comentarios;
        
            // Copiar el estado actual de las respuestas
            const nuevasRespuestas = [...respuestas];
            nuevasRespuestas[currentStep] = respuestaActual;
        
            setRespuestas(nuevasRespuestas);
        };
    
        const handleRateChange = (rate: number) => {
            // Obtén la respuesta actual o crea una nueva si aún no existe
            const respuestaActual = respuestas[currentStep] || {
                id: '',
                preguntaId: preguntasEvaluacion[currentStep].id,
                rate: 0,
                comentarios: '',
            };
            
            // Actualiza solo el valor del "rate"
            respuestaActual.rate = rate;
            
            // Copiar el estado actual de las respuestas
            const nuevasRespuestas = [...respuestas];
            nuevasRespuestas[currentStep] = respuestaActual;
            
            setRespuestas(nuevasRespuestas);
        };
    
        const nextStep = async () => {
            if (currentStep < preguntasEvaluacion.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                await dispatch(postEvaluacionThunk({respuestas, ...general}));
            }
        };
        
        const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    

    return (
        <>
            <div className="shadow-ext rounded-ext">
                <div className="p-5 shadow-ext rounded-ext from-dark to-dark-light bg-gradient-to-tr flex justify-between items-center">
                    <h1 className="text-white">{perfil.evaluaciones.evaluacion? perfil.evaluaciones.evaluacion.nombre : 'Sin evaluación'}</h1>
                    <Steps
                        direction="vertical"
                        initial={0}
                        items={items}
                        type="inline"
                        current={currentStep}
                        responsive={true}
                        onChange={(current) => setCurrentStep(current)}
                />
            </div>
            <div className="p-5">
                <div>
                    <h2 className="text-devarana-dark-graph">{preguntasEvaluacion[currentStep].texto}</h2>
                    <p className="text-devarana-graph font-light">{preguntasEvaluacion[currentStep].descripcion}</p>

                    <p className="text-devarana-graph">Calificación: </p>
                    <Rate
                        onChange={handleRateChange}
                        value={respuestas[currentStep]?.rate || 0}
                        allowHalf
                    />
                    <p className="text-devarana-graph">Comentarios:</p>
                    <TextArea
                        onChange={(e) => handleComentariosChange(e.target.value)}
                        value={respuestas[currentStep]?.comentarios || ''}
                    />
                </div>
            </div>

            <div className="p-5 flex justify-between">
                <Button classType="regular" width={100} classColor="dark" onClick={prevStep} disabled={currentStep === 0}>
                    Anterior
                </Button>
                <Button  classType="regular" width={100} classColor="dark" onClick={nextStep} disabled={currentStep === perfil.evaluaciones.evaluacion.preguntasEvaluacion.length}>
                    {
                        currentStep === perfil.evaluaciones.evaluacion.preguntasEvaluacion.length - 1 ? 'Finalizar' : 'Siguiente'
                    }
                </Button>
            </div>
            </div>
        </>
    )
}
