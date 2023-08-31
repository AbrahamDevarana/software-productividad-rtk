import { getStorageUrl } from "@/helpers";
import getBrokenUser from "@/helpers/getBrokenUser";
import { PerfilProps } from "@/interfaces";
import { getEvaluacionThunk } from "@/redux/features/perfil/perfilThunk";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Avatar, Image, Rate, Segmented, Skeleton, Space, Steps } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { useEffect, useState } from "react";
import { StepEvaluacion } from "./StepEvaluacion";


interface Props {
    perfil: PerfilProps
    year: number
    quarter: number
}

interface RespuestaProps {
    id: string
    rate: number
    comentario: string
}

const FormEvaluacion = ({perfil, year, quarter}: Props) => {

    const [ activeEvaluate, setActiveEvaluate ] = useState<string | number>('')
    const { isLoadingEvaluation } = useAppSelector(state => state.profile)
    const [current, setCurrent] = useState(0);
    const [fetching, setFetching] = useState(false);
    const [ respuesta , setRespuesta ] = useState<RespuestaProps>({
        id: '',
        rate: 0,
        comentario: ''
    })


    const dispatch = useAppDispatch()

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
        await dispatch(getEvaluacionThunk({usuarioId: perfil.id, year, quarter, asignadorId: value as string }))
        setActiveEvaluate(value)
        setFetching(false)
    }

    const items = perfil.evaluaciones.evaluacion?.preguntasEvaluacion.map((pregunta, index) => {
        return {
            title: `Pregunta ${index + 1}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        }
    })

    const next = () => {
        setCurrent(current + 1);
      };
    
      const prev = () => {
        setCurrent(current - 1);
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
                    <>
                        <div className="shadow-ext rounded-ext">
                            <div className="p-5 shadow-ext rounded-ext from-dark to-dark-light bg-gradient-to-tr flex justify-between items-center">
                                <h1 className="text-white">{perfil.evaluaciones.evaluacion? perfil.evaluaciones.evaluacion.nombre : 'Sin evaluación'}</h1>
                                <Steps
                                    direction="vertical"
                                    initial={0}
                                    items={items}
                                    type="inline"
                                    onChange={(current) => setCurrent(current)}
                                    current={current}
                            />
                        </div>
                        <div className="p-5">
                            <StepEvaluacion pregunta={perfil.evaluaciones.evaluacion.preguntasEvaluacion[current]} respuesta={respuesta} setRespuesta={setRespuesta}/>
                        </div>
                    </div>
                    </>
                }
            </div>
        </div>
    </> );
}
 
export default FormEvaluacion;