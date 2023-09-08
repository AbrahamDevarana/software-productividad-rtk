import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { PerfilProps } from "@/interfaces";
import { getEvaluacionThunk, postEvaluacionThunk } from "@/redux/features/perfil/perfilThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Image, Input, Rate, Segmented, Skeleton, Space, Steps, message } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useState } from "react";
import { Button } from "../ui";


interface Props {
    perfil: PerfilProps
    year: number
    quarter: number
}


interface Pregunta {
    id: number;
    texto: string;
    descripcion: string;
  }
  
  interface Respuesta {
    id: string;
    preguntaId: string;
    evaluacionId: number;
    usuarioId: string;
    rate: number;
    comentarios: string;
  }
  
  interface PreguntasWizardProps {
    preguntasEvaluacion: Pregunta[];
  }


const FormEvaluacion = ({perfil, year, quarter}: Props) => {

    const [ activeEvaluate, setActiveEvaluate ] = useState<string | number>('')
    const { isLoadingEvaluation } = useAppSelector(state => state.profile)
    const [fetching, setFetching] = useState(false);

    const [currentStep, setCurrentStep] = useState<number>(0);
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);

    const general = {
        evaluacionId: perfil.evaluaciones.evaluacion.id,
        usuarioId: perfil.id,
        evaluacionUsuarioId: activeEvaluate as string,
        quarter,
        year
    }

    
    const dispatch = useAppDispatch()

    const { TextArea } = Input

    if(isLoadingEvaluation) return <Skeleton active={true} paragraph={{ rows: 4 }} />

    const usuariosAEvaluar = [...perfil.evaluaciones.usuariosColaborador, ...perfil.evaluaciones.usuariosLider]

    const options = usuariosAEvaluar?.map((usuario) => {
        if(usuario){
            return {
                label: (
                    <div style={{ padding: 4 }}>
                        <Avatar 
                            src={<Image src={`${getStorageUrl(usuario?.foto)}`} preview={false} fallback={getBrokenUser()} />}
                            className=''
                        >
                            {usuario?.iniciales}
                        </Avatar>
                        <div>{ usuario.nombre }</div>
                    </div>
                ),
                value: usuario.id
            }
        }else{
            return {
                label: 'Sin usuarios',
                value: 'user1'
            }
        }
    })

    const handleSelectUser = async (value: SegmentedValue) => {        
        setFetching(true)
        await dispatch(getEvaluacionThunk({usuarioId: perfil.id, year, quarter, evaluadoId: value as string }))
        setActiveEvaluate(value)
        setFetching(false)

       setRespuestas([])
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
            // Si estás en el último paso, puedes enviar las respuestas
            console.log('Respuestas finales:', respuestas);
            console.log('General', general);
            
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
        <div>

            
            <div className="gap-5 flex align-middle items-center flex-col">
                <Space align="center" size={12}>
                    <Segmented
                        options={options}
                        value={activeEvaluate}
                        onChange={handleSelectUser}
                    />
                </Space>
                {
                    activeEvaluate === ''
                    ? 
                    <div className="flex items-center align-middle">
                        <h1>Es tiempo de evaluar, selecciona un usuario a quien evaluar</h1>
                    </div>
                    : fetching 
                    ? <Skeleton active={true} paragraph={{ rows: 4 }} className="shadow-ext rounded-ext p-5" /> 
                    : perfil.evaluaciones.evaluacion.preguntasEvaluacion.length > 0 &&

                    !perfil.evaluaciones.evaluacion.status ?
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
                    : 
                    <>
                     <h1>Ya has presentado esta encuesta</h1>
                    </>
                }
            </div>
        </div>
    </> );
}
 
export default FormEvaluacion;