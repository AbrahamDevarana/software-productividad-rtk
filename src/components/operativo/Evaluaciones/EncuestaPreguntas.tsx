import { Button } from '@/components/ui'
import { getValueColaborador } from '@/helpers/getValueComment';
import { PerfilProps } from '@/interfaces';
import { postEvaluacionThunk } from '@/redux/features/perfil/perfilThunk';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Input, Rate, Spin, Steps, message } from 'antd'
import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating';


interface Respuesta {
    id: string;
    preguntaId: string;
    evaluacionId: number;
    usuarioId: string;
    rate: number;
    comentarios: string;
}


interface Props {
    isLider: boolean
    perfil: PerfilProps
    activeEvaluate: string | number
    setRespuestas: React.Dispatch<React.SetStateAction<Respuesta[]>>
    respuestas: any[]
    setActiveEvaluate: React.Dispatch<React.SetStateAction<string | number>>
}

export const EncuestaPreguntas = ({perfil, activeEvaluate, setRespuestas, respuestas, setActiveEvaluate, isLider}: Props) => {

    const { TextArea } = Input
    const { evaluacion } = useAppSelector(state => state.evaluaciones)
    const { year, quarter } = useAppSelector(state => state.global.currentConfig)
    const [currentStep, setCurrentStep] = useState<number>(0);
        
    const dispatch = useAppDispatch()

    const general = {
        evaluacionId: evaluacion?.id,
        usuarioId: perfil.id,
        evaluacionUsuarioId: activeEvaluate as string,
        quarter,
        year
    }

        const items = evaluacion?.preguntasEvaluacion.map((pregunta, index) => {
            return {
                title: `Pregunta ${index + 1}`,
            }
        })

        const preguntasEvaluacion = evaluacion?.preguntasEvaluacion


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
            if (!respuestas[currentStep]) {
                message.error('Debes seleccionar una calificación');
                return;
            }
            // Validar que el usuario haya seleccionado un rate sino no dejar avanzar
            const { rate } = respuestas[currentStep];
            const { comentarios } = respuestas[currentStep];

            if (rate === 0) {
                return;
            }

            if (!comentarios && comentarios.trim() === '') {
                message.error('Debes agregar un comentario');
                return;
            }
        
            const siguientePregunta = preguntasEvaluacion[currentStep + 1];
            if (siguientePregunta) {
                setCurrentStep(currentStep + 1);
            } else {
                await dispatch(postEvaluacionThunk({respuestas, ...general})).unwrap().then(() => {
                    message.success('Evaluación enviada correctamente')
                })
                setActiveEvaluate('')
            }

         
           
        };
        
        const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    return (
        <>
            <div className="shadow-ext rounded-ext w-full">
                <div className={`p-5 shadow-ext rounded-ext ${isLider ? 'from-devarana-blue to-devarana-blue' : 'from-devarana-pink to-devarana-pink' } bg-gradient-to-r flex justify-between items-center`}>
                    <h1 className="text-white">{evaluacion? evaluacion.nombre : 'Sin evaluación'}</h1>
                    <Steps
                        direction="vertical"
                        initial={0}
                        items={items}
                        type="inline"
                        current={currentStep}
                        responsive={true}
                        
                        // onChange={(current) => setCurrentStep(current)}
                />
            </div>
            <div className="p-5">
                <div>
                    <h2 className="text-devarana-dark-graph pb-2 text-xl font-light">{preguntasEvaluacion[currentStep].texto}</h2>
                    <Rating fillColor={isLider ? '#56739B' : '#d64767'} onClick={handleRateChange} initialValue={Number(respuestas[currentStep]?.rate || 0)} allowFraction transition emptyStyle={{ display: "flex" }} fillStyle={{ display: "-webkit-inline-box" }}/>
                    <div className=' text-default'> { isLider? '' : getValueColaborador(Number(respuestas[currentStep]?.rate || 0) ) } </div>
                    <p className="text-devarana-graph py-2">Comentarios:</p>
                    <TextArea
                        onChange={(e) => handleComentariosChange(e.target.value)}
                        value={respuestas[currentStep]?.comentarios || ''}
                    />
                </div>
            </div>

            <div className="p-5 flex justify-between">
                {
                    currentStep === 0 && (
                        <Button classType="regular" width={100} classColor="error" onClick={() => setActiveEvaluate('')} >
                            Cancelar
                        </Button>
                    )
                }
               {
                    currentStep > 0 && (
                        <Button classType="regular" width={100} classColor="dark" onClick={prevStep} disabled={currentStep === 0}>
                            Anterior
                        </Button>
                    )
               }
                <Button  classType="regular" width={100} classColor="dark" onClick={nextStep} disabled={currentStep === evaluacion.preguntasEvaluacion.length}>
                    {
                        currentStep === evaluacion.preguntasEvaluacion.length - 1 ? 'Finalizar' : 'Siguiente'
                    }
                </Button>
            </div>
            </div>
        </>
    )
}
