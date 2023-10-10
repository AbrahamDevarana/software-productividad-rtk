import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { PerfilProps } from "@/interfaces";
import { postEvaluacionThunk } from "@/redux/features/perfil/perfilThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Divider, Image, Input, Rate, Segmented, Skeleton, Space, Steps, Tooltip, message } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useMemo, useState } from "react";
import { EncuestaPresentada } from "./EncuestaPresentada";
import { EncuestaPreguntas } from "./EncuestaPreguntas";
import { getEvaluacionThunk } from "@/redux/features/evaluaciones/evaluacionesThunk";


interface Props {
    perfil: PerfilProps
}

  
interface Respuesta {
    id: string;
    preguntaId: string;
    evaluacionId: number;
    usuarioId: string;
    rate: number;
    comentarios: string;
}


const FormEvaluacion = ({perfil}: Props) => {

    
    const { isLoading, evaluacionLider, evaluacionPropia, evaluacionColaborador ,evaluacion } = useAppSelector(state => state.evaluaciones)
    const [fetching, setFetching] = useState(false);
    const { periodControls: nextPeriodAvailable, currentConfig: {year, quarter} } = useAppSelector(state => state.global)
    const [ activeEvaluate, setActiveEvaluate ] = useState<string | number>('')
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);

    
    const dispatch = useAppDispatch()


    if(isLoading) return <Skeleton active={true} paragraph={{ rows: 4 }} />

    const handleSelectUser = async (value: SegmentedValue) => {        
        setFetching(true)
        await dispatch(getEvaluacionThunk({usuarioId: perfil.id, year, quarter, evaluadoId: value as string }))
        setActiveEvaluate(value)
        setFetching(false)
       setRespuestas([])
    }

    const isLider = useMemo(() => {
        return activeEvaluate === evaluacionLider?.id
    }, [activeEvaluate, evaluacionLider])



    return (
    <>
        <div>
            <div className="gap-5 flex align-middle items-center flex-col">
                <Space align="center" size={12}>
                    <div className="px-2">
                        { evaluacionPropia.id !== '' && (
                            <div className="flex flex-col items-center">
                                <h1 className="text-devarana-graph font-medium">Auto Evaluación</h1>
                                <div className={`hover:bg-devarana-graph hover:bg-opacity-20 transition-all ease-in-out duration-300 text-center p-2 rounded-sm cursor-pointer ${activeEvaluate === evaluacionPropia.id? 'bg-devarana-graph bg-opacity-20' : ''}`} onClick={() => handleSelectUser(evaluacionPropia.id)}>
                                   <Tooltip title={`${ evaluacionPropia.nombre } ${evaluacionPropia.apellidoPaterno}`}>
                                        <Avatar 
                                                src={<Image src={`${getStorageUrl(evaluacionPropia.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                                className=''
                                            >
                                            {evaluacionPropia.iniciales}
                                        </Avatar>
                                   </Tooltip>
                                </div>
                            </div>
                        )}
                    </div>
                    {

                    evaluacionColaborador.length > 0 &&
                    <>
                        <Divider type="vertical" className="h-20"/>
                        <div className="px-2" >
                                <h1 className="text-devarana-graph font-medium text-center">Evaluación de Colaborador</h1>
                                <div className="flex items-center justify-center">
                                    {
                                        evaluacionColaborador.length > 0 && evaluacionColaborador.map((item, index) => (
                                            <div key={index} className={`hover:bg-devarana-graph hover:bg-opacity-20 transition-all ease-in-out duration-300 text-center p-2 rounded-sm cursor-pointer ${activeEvaluate === item.id? 'bg-devarana-graph bg-opacity-20' : ''}`} onClick={() => handleSelectUser(item.id)}>
                                                <Tooltip title={`${ item.nombre } ${item.apellidoPaterno}`}>
                                                    <Avatar 
                                                            src={<Image src={`${getStorageUrl(item.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                                            className=''
                                                        >
                                                        {item.iniciales}
                                                    </Avatar>
                                                </Tooltip>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    }
                    <Divider type="vertical" className="h-20"/>                
                    <div className="px-2">
                        { evaluacionLider.id !== '' && (
                            <div className="flex flex-col items-center">
                                <h1 className="text-devarana-graph font-medium">Evaluación de Líder</h1>
                                <div className={`hover:bg-devarana-graph hover:bg-opacity-20 transition-all ease-in-out duration-300 text-center p-2 rounded-sm cursor-pointer ${activeEvaluate === evaluacionLider.id? 'bg-devarana-graph bg-opacity-20' : ''}`} onClick={() => handleSelectUser(evaluacionLider.id)}>
                                    <Tooltip title={`${ evaluacionLider.nombre } ${evaluacionLider.apellidoPaterno}`}>
                                        <Avatar 
                                                src={<Image src={`${getStorageUrl(evaluacionLider.foto)}`} preview={false} fallback={getBrokenUser()} />}
                                                className=''
                                            >
                                            {evaluacionLider.iniciales}
                                        </Avatar>
                                    </Tooltip>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </Space>
                {
                    activeEvaluate === '' 
                    ? 
                        <div className="px-10">
                            <h1 className="text-xl ">¡Hola {perfil.nombre}!</h1>
                            <p className="text-devarana-graph py-3">Bienvenido a nuestra evaluación de competencias DEVARANA. Este espacio esta diseñado para realizar de forma trimestral la evaluación de las competencias que nos definen como colaborador DEVARANA y nos impulsan a ser mejores día a día.</p>
                            <p className="text-devarana-graph">Tu evaluación de competencias, representa el <span className="font-bold">10%</span> de tu calificación total y se compone de la siguiente manera: </p>
                            <p className="text-devarana-graph py-3"><span className="font-bold text-devarana-dark-graph">Evaluación de Lider: </span> Te permite realizar una evaluación cualitativa de las habilidades de liderazgo de tu líder de área.</p>
                            <p className="text-devarana-graph"><span className="font-bold text-devarana-dark-graph">Autoevaluación: </span> Te brinda un espacio para tomar consciencia y reflexionar sobre tu desempeño en el trimestre. Reconociendo tus logros, fortalezas o áreas de oportunidad. </p>
                            <p className="text-devarana-graph"><span className="font-bold text-devarana-dark-graph">Evaluación de Colaborador: </span> En caso de tener personal a tu cargo, te permite realizar una evaluación cualitativa de su desempeño basado en competencias. </p>
                        </div>
                    : fetching 
                        ? <Skeleton active={true} paragraph={{ rows: 4 }} className="shadow-ext rounded-ext p-5" /> 
                        : evaluacion.preguntasEvaluacion.length === 0 ? 
                            <p className="text-2xl text-devarana-graph">Esta encuesta no está completada, contacta soporte.</p>
                        : !evaluacion.status 
                        ? <EncuestaPreguntas perfil={perfil} isLider={isLider} activeEvaluate={activeEvaluate} setActiveEvaluate={setActiveEvaluate} respuestas={respuestas} setRespuestas={setRespuestas}/>
                        : <EncuestaPresentada />
                }
            </div>
        </div>
    </> );
}
 
export default FormEvaluacion;