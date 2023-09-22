import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { PerfilProps } from "@/interfaces";
import { getEvaluacionThunk, postEvaluacionThunk } from "@/redux/features/perfil/perfilThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Image, Input, Rate, Segmented, Skeleton, Space, Steps, message } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useState } from "react";
import { Button } from "../../ui";
import dayjs from 'dayjs'
import { NoEvaluacion } from "./NoEvaluacion";
import { EncuestaPresentada } from "./EncuestaPresentada";
import { EncuestaPreguntas } from "./EncuestaPreguntas";


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

    
    const { isLoadingEvaluation } = useAppSelector(state => state.profile)
    const [fetching, setFetching] = useState(false);
    const { periodControls: nextPeriodAvailable, currentConfig: {year, quarter} } = useAppSelector(state => state.global)
    const [ activeEvaluate, setActiveEvaluate ] = useState<string | number>('')
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);

    
    const dispatch = useAppDispatch()


    if(isLoadingEvaluation) return <Skeleton active={true} paragraph={{ rows: 4 }} />

    const usuariosAEvaluar = [...perfil.evaluaciones.evaluacionColaborador, perfil.evaluaciones.evaluacionLider, perfil.evaluaciones.evaluacionPropia]
    
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

    const isDueDate = () => {

        const { prePeriodDefinitionDays: days } = nextPeriodAvailable

        // obtener mes del trimestre
        const month = (quarter - 1) * 3 + 1;
        // obtener ultimo día del trimestre
        const lastDay = dayjs(`${year}-${month}-01`).endOf('quarter')
        // obtener ultimo día del trimestre - days
        const lastDayMinusRange = lastDay.subtract(days, 'day')
        // obtener fecha actual
        const today = dayjs()
        // validar si la fecha actual esta entre el ultimo día del trimestre y el ultimo día del trimestre - days
        const isDue = !today.isBetween(lastDayMinusRange, lastDay)
        return isDue
    }

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
                    // Validar si estamos en periodo de evaluación y sino se han solicitado las evaluaciones
                    isDueDate() && usuariosAEvaluar.length === 0
                    ? <NoEvaluacion/>
                    : activeEvaluate === '' 
                    ? 
                        <div className="flex items-center align-middle">
                            <h1>Es tiempo de evaluar, selecciona un usuario a quien evaluar</h1>
                        </div>
                    : fetching 
                        ? <Skeleton active={true} paragraph={{ rows: 4 }} className="shadow-ext rounded-ext p-5" /> 
                        : perfil.evaluaciones.evaluacion.preguntasEvaluacion.length > 0 && !perfil.evaluaciones.evaluacion.status ?
                        <EncuestaPreguntas perfil={perfil} activeEvaluate={activeEvaluate} respuestas={respuestas} setRespuestas={setRespuestas}/>
                        : <EncuestaPresentada />
                }
            </div>
        </div>
    </> );
}
 
export default FormEvaluacion;